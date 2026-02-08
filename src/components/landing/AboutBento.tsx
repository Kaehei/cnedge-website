"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code, Box, Compass } from "lucide-react";

const features = [
    {
        title: "平面设计",
        description: "主要创作海报、logo等设计类作品",
        icon: Palette,
    },
    {
        title: "编程",
        description: "主要创作APP、网站",
        icon: Code,
    },
    {
        title: "我的世界",
        description: "主要创作我的世界作品",
        icon: Box,
    },
    {
        title: "更多的发展方向",
        description: "等待你的探索……",
        icon: Compass,
    },
];

export function AboutBento() {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="mb-12 w-full text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">我们的发展方向</h2>
                <p className="mt-4 text-muted-foreground">多方向发展，各类型作品，尽在 Cnedge！
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group flex flex-col items-start p-6"
                    >
                        <div className="mb-4 text-primary/80 transition-colors group-hover:text-primary">
                            <feature.icon className="h-8 w-8 stroke-1" />
                        </div>
                        <h3 className="mb-2 text-xl font-medium tracking-tight font-mono">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed font-light">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
