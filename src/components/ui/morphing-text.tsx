"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

interface MorphingTextProps {
    className?: string;
    text: string;
}

export function MorphingText({ text, className }: MorphingTextProps) {
    // Split text into characters
    const characters = useMemo(() => {
        // Determine if we should split by word or character. 
        // The user requested "morphing" which often implies character level.
        // However, splitting Chinese characters works well too.
        return text.split("");
    }, [text]);

    return (
        <div className={cn("relative block", className)}>
            <AnimatePresence mode="popLayout" initial={false}>
                {characters.map((char, index) => (
                    <motion.span
                        key={`${char}-${index}`} // Unique key for each character instance to force transition
                        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
                        transition={{
                            duration: 0.4,
                            delay: index * 0.02, // Stagger effect
                            type: "spring",
                            bounce: 0,
                        }}
                        className="inline-block whitespace-pre"
                    >
                        {char}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
}
