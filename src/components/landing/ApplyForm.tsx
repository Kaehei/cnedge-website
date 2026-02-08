"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const SPECIALTIES = [
    "生电", "建筑", "生存", "技术",
    "PVP", "投影", "内饰", "农场设计"
];

const MBTI_DIMENSIONS = [
    { label: "Energy", options: [{ value: "E", label: "Extraverted" }, { value: "I", label: "Introverted" }] },
    { label: "Info", options: [{ value: "S", label: "Sensing" }, { value: "N", label: "Intuition" }] },
    { label: "Decisions", options: [{ value: "T", label: "Thinking" }, { value: "F", label: "Feeling" }] },
    { label: "Structure", options: [{ value: "J", label: "Judging" }, { value: "P", label: "Perceiving" }] }
];

// Define schema for all steps
const formSchema = z.object({
    // Step 1: Identity
    ign: z.string().min(2, { message: "游戏 ID 至少需要 2 个字符" }),
    qq: z.string().min(5, { message: "请输入有效的 QQ 号码" }),
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 13, {
        message: "您必须年满 13 岁才能申请",
    }),

    // Step 2: Specialization
    specialties: z.array(z.string()).min(1, { message: "请至少选择一项专长" }),
    mbti: z.string().length(4, { message: "请完成所有 MBTI 维度的选择" }).regex(/^[EI][SN][TF][JP]$/, { message: "无效的 MBTI 类型" }),

    // Step 3: Q&A
    onlineTime: z.string().min(1, { message: "请描述您的在线时间" }),
    experience: z.string().min(10, { message: "请至少输入 10 个字的介绍" }),

    // Step 4: Rules
    terms: z.boolean().refine((val) => val === true, {
        message: "您必须同意服务器条款",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = [
    { id: 1, title: "身份验证", fields: ["ign", "age", "qq"] },
    { id: 2, title: "专精", fields: ["specialties", "mbti"] },
    { id: 3, title: "问答", fields: ["onlineTime", "experience"] },
    { id: 4, title: "须知", fields: ["terms"] },
];

export function ApplyForm() {
    const [step, setStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ign: "",
            qq: "",
            age: "",
            specialties: [],
            mbti: "",
            onlineTime: "",
            experience: "",
            terms: false,
        },
        mode: "onChange",
    });

    // Calculate progress
    const progress = (step / STEPS.length) * 100;

    const nextStep = async () => {
        const fields = STEPS[step - 1].fields as any[];
        const isValid = await form.trigger(fields);
        if (isValid) {
            setStep((s) => Math.min(s + 1, STEPS.length));
        }
    };

    const prevStep = () => {
        setStep((s) => Math.max(s - 1, 1));
    };

    async function onSubmit(values: FormValues) {
        // Only submit if on last step
        if (step !== STEPS.length) return;

        try {
            const response = await fetch("https://admin.kaeshi.top/api/submit.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "提交失败");
            }

            setIsSuccess(true);
            toast.success("申请已提交！");
        } catch (error) {
            console.error(error);
            toast.error("提交失败", {
                description: error instanceof Error ? error.message : "请稍后重试",
            });
        }
    }

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-lg px-4 py-12 text-center"
            >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-primary stroke-1" />
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl font-mono">申请已收到</h2>
                <p className="mb-8 text-muted-foreground leading-relaxed">
                    感谢您申请加入 Pathvally。<br />
                    审核通过后会通过邮件联系您。
                </p>
                <Button
                    variant="outline"
                    onClick={() => {
                        setIsSuccess(false);
                        setStep(1);
                        form.reset();
                    }}
                    className="rounded-none font-mono tracking-tight px-8"
                >
                    提交新的申请
                </Button>
            </motion.div>
        );
    }

    return (
        <section id="apply" className="mx-auto max-w-xl min-h-[600px] flex flex-col">
            <div className="mb-8 space-y-2">
                <div className="flex items-center justify-between text-sm font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    <span>Step {step} of {STEPS.length}</span>
                    <span>{STEPS[step - 1].title}</span>
                </div>
                <Progress value={progress} className="h-1 rounded-none" />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1 flex flex-col">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2 mb-6">
                                    <h2 className="text-2xl font-bold font-mono">验证身份</h2>
                                    <p className="text-muted-foreground text-sm">我们需要了解你是谁。</p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="ign"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">游戏 ID (IGN)</FormLabel>
                                            <FormControl>
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                    <Input
                                                        placeholder="Minecraft ID"
                                                        {...field}
                                                        className="border-0 border-b border-muted bg-transparent px-0 py-2 rounded-none focus-visible:ring-0 focus-visible:border-primary shadow-none placeholder:text-muted-foreground/50 font-mono w-full sm:flex-1 text-base"
                                                    />
                                                    <Avatar className="h-10 w-10 rounded-sm border border-muted/50 hidden sm:block">
                                                        <AvatarImage src={`https://minotar.net/helm/${field.value || "Steve"}/100.png`} alt="Avatar" />
                                                        <AvatarFallback className="rounded-sm bg-muted/20 font-mono text-xs text-muted-foreground">ID</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="age"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">年龄</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="18"
                                                        {...field}
                                                        className="border-0 border-b border-muted bg-transparent px-0 py-2 rounded-none focus-visible:ring-0 focus-visible:border-primary shadow-none placeholder:text-muted-foreground/50 font-mono"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="qq"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">QQ 号码</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Contact QQ"
                                                        {...field}
                                                        className="border-0 border-b border-muted bg-transparent px-0 py-2 rounded-none focus-visible:ring-0 focus-visible:border-primary shadow-none placeholder:text-muted-foreground/50 font-mono"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </motion.div>
                        )}



                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2 mb-6">
                                    <h2 className="text-2xl font-bold font-mono">专精领域 / MBTI</h2>
                                    <p className="text-muted-foreground text-sm">您擅长什么？(可多选)</p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="specialties"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">TAGS</FormLabel>
                                            <FormControl>
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {SPECIALTIES.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant={field.value?.includes(tag) ? "default" : "outline"}
                                                            className={`cursor-pointer px-4 py-2 rounded-none font-mono text-sm transition-all hover:bg-primary/90 hover:text-primary-foreground ${field.value?.includes(tag) ? "border-primary" : "border-muted-foreground/30 text-muted-foreground hover:border-primary"
                                                                }`}
                                                            onClick={() => {
                                                                const current = field.value || [];
                                                                const next = current.includes(tag)
                                                                    ? current.filter((t) => t !== tag)
                                                                    : [...current, tag];
                                                                field.onChange(next);
                                                            }}
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="mbti"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">MBTI</FormLabel>
                                            <FormControl>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                                                    {MBTI_DIMENSIONS.map((dim, index) => (
                                                        <div key={dim.label} className="flex flex-col gap-2">
                                                            <span className="text-[10px] font-mono text-muted-foreground uppercase text-center sm:text-left tracking-widest">{dim.label}</span>
                                                            <div className="flex bg-muted/20 p-1 rounded-sm border border-muted/30">
                                                                {dim.options.map((opt) => {
                                                                    const isActive = field.value?.[index] === opt.value;
                                                                    return (
                                                                        <Button
                                                                            key={opt.value}
                                                                            type="button"
                                                                            variant={isActive ? "secondary" : "ghost"}
                                                                            size="sm"
                                                                            className={`flex-1 h-8 font-mono text-sm transition-all rounded-sm ${isActive
                                                                                ? "bg-background text-primary shadow-sm ring-1 ring-border"
                                                                                : "text-muted-foreground hover:bg-muted/50"}`}
                                                                            onClick={() => {
                                                                                const current = (field.value || "____").split("");
                                                                                current[index] = opt.value;
                                                                                field.onChange(current.join(""));
                                                                            }}
                                                                        >
                                                                            {opt.value}
                                                                        </Button>
                                                                    );
                                                                })}
                                                            </div>
                                                            <div className="text-[10px] text-center text-muted-foreground/50 h-3">
                                                                {field.value?.[index] ? dim.options.find(o => o.value === field.value[index])?.label : ''}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </FormControl>
                                            <div className="pt-2 text-right">
                                                <span className="font-mono text-2xl font-bold tracking-widest text-primary">
                                                    {field.value?.replace(/_/g, "-") || "----"}
                                                </span>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2 mb-6">
                                    <h2 className="text-2xl font-bold font-mono">问答环节</h2>
                                    <p className="text-muted-foreground text-sm">简单介绍一下自己。</p>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="onlineTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">在线时间</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="您一般在什么时间段在线？"
                                                    {...field}
                                                    className="border-0 border-b border-muted bg-transparent px-0 py-2 rounded-none focus-visible:ring-0 focus-visible:border-primary shadow-none placeholder:text-muted-foreground/50 font-mono"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="experience"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-mono text-xs uppercase tracking-wider text-muted-foreground">经验 / 简介</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="请简单介绍您的 Minecraft 经历之类的..."
                                                    {...field}
                                                    className="border-0 border-b border-muted bg-transparent px-0 py-2 rounded-none focus-visible:ring-0 focus-visible:border-primary shadow-none placeholder:text-muted-foreground/50 font-mono min-h-[150px] resize-none"
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                至少 10 个字符。
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2 mb-6">
                                    <h2 className="text-2xl font-bold font-mono">阅读须知</h2>
                                    <p className="text-muted-foreground text-sm">最后一步，由衷希望您能加入我们。</p>
                                </div>

                                <Card className="rounded-none border-muted bg-muted/10 shadow-none">
                                    <CardContent className="p-6 font-mono text-sm text-muted-foreground space-y-4">
                                        <div>
                                            <p className="font-bold text-foreground">1. 友善与尊重</p>
                                            <p className="mt-1">保持礼貌，禁止任何形式的辱骂、引战或人身攻击。尊重每一位玩家的游戏体验。</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">2. 游戏诚信</p>
                                            <p className="mt-1">严禁使用各类外挂（如 X-Ray, killaura 等）。经过允许的辅助模组（如 Litematica, Tweakeroo）可以使用。</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">3. 环境保护 & 建筑规则</p>
                                            <p className="mt-1">未经允许禁止破坏他人建筑或拿取物品。保持地形整洁，避免无意义的流水岩浆。</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">4. 服务器性能</p>
                                            <p className="mt-1">建造大型红石机器或实体农场前请咨询管理组，避免造成服务器卡顿。</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">5. 责任</p>
                                            <p className="mt-1">对自己账号的行为负责。提交申请即代表您已阅读并同意以上所有条款。</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <FormField
                                    control={form.control}
                                    name="terms"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-none border p-4 shadow-sm border-muted">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value ?? false}
                                                    onCheckedChange={field.onChange}
                                                    className="rounded-none data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground border-muted-foreground/50"
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    我已阅读并同意服务器条款
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                        )}

                    </AnimatePresence>

                    <div className="flex justify-between pt-8 mt-auto">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={prevStep}
                            disabled={step === 1}
                            className={`font-mono text-muted-foreground hover:text-foreground ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back
                        </Button>

                        {step < STEPS.length ? (
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="rounded-none font-mono px-8"
                            >
                                Next <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="rounded-none font-mono px-8"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </section>
    );
}
