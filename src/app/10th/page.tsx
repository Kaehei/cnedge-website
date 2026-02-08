"use client";

import React from "react";
import { motion } from "framer-motion";
import { History, Compass, PenTool, Hammer, Heart, Quote } from "lucide-react";


export default function TenthAnniversaryPage() {


    return (
        <main className="container mx-auto min-h-[calc(100vh-4rem)] px-4 py-8 md:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-left"
            >
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">十周年庆典</h1>
                <p className="mt-2 text-muted-foreground">十周年回顾与致谢</p>
            </motion.div>



            {/* Journey Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24"
            >
                <div className="border-t pt-6">
                    <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                        <History className="h-5 w-5" />
                        <span className="font-mono text-sm uppercase tracking-wider">The Beginning</span>
                    </div>
                    <h2 className="text-xl font-medium font-mono mb-4">多玩时期</h2>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        时光匆匆，“创无止界”从成立走到今天，每一步成长都浸透着大家的支持与陪伴。从最初的多玩时期开始，我们就在探索中前行——那些为项目熬夜的夜晚，那些攻克难题后的欢呼，都是我们共同走过的珍贵印记。
                    </p>
                </div>
                <div className="border-t pt-6">
                    <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                        <Compass className="h-5 w-5" />
                        <span className="font-mono text-sm uppercase tracking-wider">The Evolution</span>
                    </div>
                    <h2 className="text-xl font-medium font-mono mb-4">网易时期</h2>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                        进入网易时期，我们在协作中进步。那些反复打磨细节的讨论，那些离不开每一位伙伴真心付出与坚定同行的日子，构成了我们最宝贵的记忆。
                    </p>
                </div>
            </motion.div>

            {/* Acknowledgments Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-24"
            >
                <div className="mb-12">
                    <h2 className="text-2xl font-bold font-mono mb-2">特别致谢</h2>
                    <p className="text-muted-foreground">向所有自愿加入“创无止界联盟”的工作室致以最诚挚的感谢。</p>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
                    {[
                        { name: "逐鹿书院", desc: "深度协作，让创意有了更扎实的落地。", icon: PenTool },
                        { name: "塘锦工坊", desc: "匠心加持，让作品多了份细腻的温度。", icon: Hammer },
                        { name: "雪影社", desc: "一路相伴，让前行的路上多了份温暖的同行力量。", icon: Heart },
                    ].map((studio, index) => (
                        <div key={studio.name} className="group border-t pt-6 transition-colors hover:border-primary/50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-mono font-medium">{studio.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                                {studio.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Future Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
                <div>
                    <h2 className="mb-8 text-xl font-medium tracking-tight font-mono border-b pb-4">未来展望</h2>
                    <div className="space-y-6">
                        {[
                            { title: "平台运营", desc: "持续维护好官网、开发者账号与B站账号的日常运营，让平台始终“在线”。" },
                            { title: "作品发布", desc: "大家依然可以通过网易渠道发布作品，延续对创作的热爱。" },
                            { title: "社区联结", desc: "不定时组织线上活动，让这份联结始终鲜活。" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                                <div className="mt-1.5 relative flex h-2 w-2 flex-shrink-0">
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </div>
                                <div>
                                    <strong className="block font-mono text-sm mb-1">{item.title}</strong>
                                    <span className="text-sm text-muted-foreground leading-relaxed">
                                        {item.desc}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center text-center p-8 bg-muted/5 border-t">
                    <Quote className="h-8 w-8 text-muted-foreground/20 mb-6" />
                    <p className="font-mono text-lg font-medium text-foreground max-w-md mb-4">
                        “十年风雨，感恩同行；<br />未来之路，期待仍有你我。”
                    </p>
                    <div className="h-1 w-12 bg-primary/20 rounded-full" />
                </div>
            </motion.div>
        </main>
    );
}
