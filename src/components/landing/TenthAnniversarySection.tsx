"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ExternalLink, PartyPopper, Zap } from "lucide-react";
import Image from "next/image";

export function TenthAnniversarySection() {
    const router = useRouter();

    const handleLearnMore = () => {
        window.open(
            "https://www.bilibili.com/video/BV1XkeozSEBj?vd_source=3ecdcb17b480e8c7bdd69e6cebf10fd8",
            "_blank"
        );
    };

    const handleLearnMore2 = () => {
        router.push("/10th");
    };

    return (
        <section className="container mx-auto px-4 py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Content Section - The "Terminal" */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>DATE 2025-08-25</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                                创无止界联盟
                                <span className="block text-yellow-500/90 mt-1">十周年庆典</span>
                            </h2>

                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                十年风雨兼程，感恩有你相伴。
                                <br />
                                我们不仅仅是在庆祝一个时间节点，更是在致敬每一位为梦想付出的创造者。探索未知的疆域，打破常规的界限。
                            </p>
                        </div>

                        <div className="mt-auto pt-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    className="rounded-none h-11 px-8 font-mono text-sm tracking-wide bg-foreground text-background hover:bg-foreground/90"
                                    onClick={handleLearnMore}
                                >
                                    <PartyPopper className="mr-2 h-4 w-4" />
                                    回顾庆典
                                </Button>
                                <Button
                                    variant="outline"
                                    className="rounded-none h-11 px-8 font-mono text-sm tracking-wide border-input bg-background hover:bg-accent hover:text-accent-foreground group"
                                    onClick={handleLearnMore2}
                                >
                                    详情</Button>
                            </div>

                        </div>
                    </div>

                    {/* Visual Section - The "Viewport" */}
                    <div className="hidden md:block relative h-[300px] lg:h-auto group overflow-hidden">
                        <Image
                            src="https://gwold.cnedge.net/wp-content/uploads/2025/07/35F0225A2C94854BDEE2B41B3782EA7C.png"
                            alt="10th Anniversary"
                            fill
                            className="object-cover"
                            unoptimized
                        />

                        <div className="absolute top-4 left-4 flex gap-2">
                            <Badge variant="outline" className="bg-black/50 text-white border-0 backdrop-blur-md rounded-none font-mono text-[10px] tracking-wider uppercase">
                                <Zap className="mr-1 h-3 w-3 text-yellow-400" />
                                Live Event
                            </Badge>
                            <Badge variant="secondary" className="bg-yellow-500/90 text-black hover:bg-yellow-400 backdrop-blur-md rounded-none font-mono text-[10px] tracking-wider uppercase border-0">
                                10th Year
                            </Badge>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
