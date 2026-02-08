"use client";

import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DocsPager } from "@/components/docs/docs-pager";
import { DocNode } from "@/lib/docs";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DocsArticleProps {
    title: string;
    description?: string;
    content: string;
    slug: string;
    prev?: DocNode;
    next?: DocNode;
}

export function DocsArticle({ title, description, content, slug, prev, next }: DocsArticleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto w-full min-w-0"
        >
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground font-mono">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                        Docs
                    </div>
                    <span>/</span>
                    <div className="font-medium text-foreground">{title}</div>
                </div>

                {/* Top Navigation for Mobile (and Desktop) */}
                <div className="flex items-center gap-2">
                    {prev ? (
                        <Link
                            href={`/docs/${prev.slug}`}
                            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-8 w-8")}
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    ) : (
                        <div className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-8 w-8 opacity-50 cursor-not-allowed")}>
                            <ChevronLeft className="h-4 w-4" />
                        </div>
                    )}
                    {next ? (
                        <Link
                            href={`/docs/${next.slug}`}
                            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-8 w-8")}
                            aria-label="Next page"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    ) : (
                        <div className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-8 w-8 opacity-50 cursor-not-allowed")}>
                            <ChevronRight className="h-4 w-4" />
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight font-mono">
                    {title}
                </h1>
                {description && (
                    <p className="text-lg text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            <div className="pb-12 pt-8">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ node, ...props }: any) => <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight font-mono" {...props} />,
                        h2: ({ node, ...props }: any) => <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 font-mono" {...props} />,
                        h3: ({ node, ...props }: any) => <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight font-mono" {...props} />,
                        h4: ({ node, ...props }: any) => <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight font-mono" {...props} />,
                        h5: ({ node, ...props }: any) => <h5 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight font-mono" {...props} />,
                        h6: ({ node, ...props }: any) => <h6 className="mt-8 scroll-m-20 text-base font-semibold tracking-tight font-mono" {...props} />,
                        a: ({ node, ...props }: any) => <a className="font-medium underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors text-foreground" {...props} />,
                        p: ({ node, ...props }: any) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
                        ul: ({ node, ...props }: any) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
                        ol: ({ node, ...props }: any) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
                        li: ({ node, ...props }: any) => <li className="mt-2" {...props} />,
                        blockquote: ({ node, ...props }: any) => <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground" {...props} />,
                        img: ({ node, ...props }: any) => <img className="rounded-md border my-8" {...props} />,
                        hr: ({ node, ...props }: any) => <hr className="my-4 md:my-8" {...props} />,
                        table: ({ node, ...props }: any) => <div className="my-6 w-full overflow-y-auto"><table className="w-full" {...props} /></div>,
                        tr: ({ node, ...props }: any) => <tr className="m-0 border-t p-0 even:bg-muted" {...props} />,
                        th: ({ node, ...props }: any) => <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right" {...props} />,
                        td: ({ node, ...props }: any) => <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right" {...props} />,
                        pre: ({ node, ...props }: any) => <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4 px-4 text-white" {...props} />,
                        code: ({ node, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || "");
                            const isInline = !match && !String(children).includes("\n");
                            return (
                                <code
                                    className={cn(
                                        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground",
                                        !isInline && "bg-transparent text-inherit p-0", // reset for block code
                                        className
                                    )}
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
            <div className="mt-8 pt-8 border-t">
                <DocsPager doc={{ title, slug }} prev={prev} next={next} />
            </div>
        </motion.div>
    );
}
