"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Users, Handshake, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    const contacts = [
        {
            title: "电子邮件",
            value: "cnedgemail@126.com",
            icon: Mail,
            description: "商务合作与咨询",
            action: "mailto:cnedgemail@126.com",
            actionLabel: "发送邮件"
        },
        {
            title: "交流群",
            value: "275435628",
            icon: MessageCircle,
            description: "加入我们的玩家社区",
            action: "https://qm.qq.com/cgi-bin/qm/qr?k=n1fVH9pa3tCdCLJFrAssnnRgdWDCKUtP&authKey=2Xc%2BGR7seUqxDEHb31%2BqB8gMnhxflQPF2GWdRQHBMmfeEY9xcZIX8hci8fCcubTW&noverify=0&group_code=275435628",
            actionLabel: "加入群聊"
        },
        {
            title: "审核群",
            value: "940597748",
            icon: Users,
            description: "加入创无止界联盟",
            action: "https://qm.qq.com/cgi-bin/qm/qr?k=n1fVH9pa3tCdCLJFrAssnnRgdWDCKUtP&authKey=2Xc%2BGR7seUqxDEHb31%2BqB8gMnhxflQPF2GWdRQHBMmfeEY9xcZIX8hci8fCcubTW&noverify=0&group_code=940597748",
            actionLabel: "申请加入"
        },
        {
            title: "合作伙伴",
            value: "Cooperation",
            icon: Handshake,
            description: "期待与您的合作",
            action: "mailto:cnedgemail@126.com",
            actionLabel: "联系我们"
        },
    ];

    return (
        <main className="container mx-auto min-h-[calc(100vh-4rem)] px-4 py-8 md:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-left"
            >
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">联系我们</h1>
                <p className="mt-2 text-muted-foreground text-lg">随时与我们取得联系，期待您的声音。</p>
            </motion.div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {contacts.map((contact, index) => (
                    <motion.div
                        key={contact.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex flex-col justify-between border-t py-6 transition-colors hover:border-primary/50"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">{contact.title}</span>
                                <contact.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-mono font-medium tracking-tight mb-1 truncate" title={contact.value}>
                                    {contact.value}
                                </div>
                                <p className="text-xs text-muted-foreground font-mono opacity-60">
                                    {contact.description}
                                </p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-between"
                                onClick={() => window.open(contact.action, '_blank')}
                            >
                                {contact.actionLabel}

                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-24"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Response Time */}
                    <div>
                        <h2 className="mb-8 text-xl font-medium tracking-tight font-mono border-b pb-4">响应时间</h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between group">
                                <span className="flex items-center gap-3">
                                    <div className="relative flex h-2 w-2">
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </div>
                                    <span className="font-medium text-sm">QQ消息</span>
                                </span>
                                <span className="text-sm text-muted-foreground font-mono">
                                    工作日内24小时内回复
                                </span>
                            </div>
                            <div className="flex items-center justify-between group">
                                <span className="flex items-center gap-3">
                                    <div className="relative flex h-2 w-2">
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-muted-foreground/30"></span>
                                    </div>
                                    <span className="font-medium text-sm">邮件</span>
                                </span>
                                <span className="text-sm text-muted-foreground font-mono">
                                    1-3个工作日内回复
                                </span>
                            </div>
                            <div className="flex items-center justify-between group">
                                <span className="flex items-center gap-3">
                                    <div className="relative flex h-2 w-2">
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </div>
                                    <span className="font-medium text-sm">紧急事务</span>
                                </span>
                                <span className="text-sm text-muted-foreground font-mono">
                                    请优先使用QQ联系
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Instructions */}
                    <div>
                        <h2 className="mb-8 text-xl font-medium tracking-tight font-mono border-b pb-4">联系须知</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-3 group">
                                <div className="mt-2 relative flex h-2 w-2 flex-shrink-0">
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-muted-foreground/30"></span>
                                </div>
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    请详细描述您的需求或问题，以便我们更高效地为您服务。
                                </span>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <div className="mt-2 relative flex h-2 w-2 flex-shrink-0">
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-muted-foreground/30"></span>
                                </div>
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    商务合作请优先使用邮箱联系，并注明合作意向。
                                </span>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <div className="mt-2 relative flex h-2 w-2 flex-shrink-0">
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-muted-foreground/30"></span>
                                </div>
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                    作品投稿请申请加入审核群，联系管理员进行提交。
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
