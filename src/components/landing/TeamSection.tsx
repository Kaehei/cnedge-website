"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MorphingText } from "@/components/ui/morphing-text";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Team {
  name: string;
  displayName: string;
  description: string;
  backgroundImage: string;
  hasWebsite: boolean;
  websiteUrl?: string;
}

const teams: Team[] = [

  {
    name: "Zhulushuyuan",
    displayName: "逐鹿书院",
    description: "知识与智慧的殿堂，汇聚行业精英，传承与创新并重。",
    backgroundImage: "https://gwold.cnedge.net/wp-content/uploads/2022/03/17d30218bb7e7eb.png",
    hasWebsite: false,
  },
  {
    name: "TangJin",
    displayName: "塘锦工坊",
    description: "精工细作的匠心团队，由于对细节的极致追求，每一件作品都是艺术。",
    backgroundImage: "https://gwold.cnedge.net/wp-content/uploads/2022/03/锦鲤—黑黑.png",
    hasWebsite: false,
  },
  {
    name: "xueying",
    displayName: "雪影社",
    description: "影像艺术的探索者，用镜头记录瞬间，用光影讲述故事。",
    backgroundImage: "https://gwold.cnedge.net/wp-content/uploads/2022/03/雪影社logo.png",
    hasWebsite: false,
  },
  {
    name: "Cnedge Vision",
    displayName: "创界视觉",
    description: "视觉设计的先锋，打破常规，定义未来的视觉语言。",
    backgroundImage: "https://gwold.cnedge.net/wp-content/uploads/2022/03/创界视觉海报.png",
    hasWebsite: false,
  },
  {
    name: "Sunchat",
    displayName: "杉茶茶馆吹水团队",
    description: "嗯对，欢迎来喝茶（bushi），这里是大家闲聊的地方。",
    backgroundImage: "/images/sc.png",
    hasWebsite: false,
  },
];

export function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return teams.length - 1;
      if (nextIndex >= teams.length) return 0;
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-12 w-full text-center md:text-left">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">我们的团队</h2>
        <p className="mt-4 text-muted-foreground">
          来自五湖四海的朋友，组成了创无止界联盟这个大家庭！
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Side */}
          <div className="relative w-full aspect-video overflow-hidden bg-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={teams[currentIndex].backgroundImage}
                  alt={teams[currentIndex].displayName}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />

              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-10 md:bottom-8 md:right-8">
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur hover:bg-background"
                onClick={() => paginate(-1)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-10 w-10 rounded-full bg-background/80 backdrop-blur hover:bg-background"
                onClick={() => paginate(1)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>



          {/* Content Side */}
          <div className="flex flex-col justify-center items-start w-full p-8 md:p-12 lg:p-16 text-left">
            {/* Chinese Name - Big Impact */}
            <MorphingText
              text={teams[currentIndex].displayName}
              className="mb-6 text-3xl sm:text-5xl font-bold tracking-tight text-foreground font-mono leading-tight block"
            />

            {/* Description */}
            <MorphingText
              text={teams[currentIndex].description}
              className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light block"
            />

            {teams[currentIndex].hasWebsite && (
              <Button variant="outline" className="mt-4 rounded-full">
                访问官网 <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )}

            {/* Progress Indicators */}
            <div className="mt-12 flex gap-2">
              {teams.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-primary/20 hover:bg-primary/40"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
