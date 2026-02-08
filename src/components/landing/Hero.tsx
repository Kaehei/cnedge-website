"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Hero() {
    const handleCopyIp = () => {
        navigator.clipboard.writeText("暂未开服"); // Placeholder IP
        toast.success("服务器 IP 已复制！", {
            description: "期待在服务器见到你！",
        });
    };

    const images = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
    ];

    const [currentImage, setCurrentImage] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0 select-none">
                <div className="absolute inset-0 z-10 bg-black/30" /> {/* Reduced overlay opacity for clarity */}
                {images.map((img, index) => (
                    <motion.div
                        key={img}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImage ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
            </div>

            <div className="z-10 container mx-auto flex flex-col items-start px-4 text-left">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                        Happy Chinese New Year
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mb-8 text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white font-mono"
                >
                    I'm Sunchat
                    <span className="block text-xl sm:text-3xl md:text-4xl mt-4 sm:mt-6 font-normal tracking-normal opacity-80 pl-1">
                        创不曾止 · 志不曾息
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mb-10 max-w-xl text-base text-white/80 sm:text-lg pl-1 leading-relaxed font-light"
                >
                    从像素方块到无限创意，<br className="hidden sm:block" />
                    我们在数字世界中书写着属于我们的传奇故事。
                </motion.p>

                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col gap-4 sm:flex-row"
                >
                    <Button size="lg" asChild className="h-12 px-8 text-sm rounded-none bg-white text-black hover:bg-white/90 transition-none font-mono tracking-tight">
                        <Link href="/join">
                            申请加入 <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleCopyIp}
                        className="h-12 px-8 text-sm rounded-none bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors duration-200 font-mono tracking-tight"
                    >
                        复制服务器 IP <Copy className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div> */}
            </div>


        </section>
    );
}
