import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocNode } from "@/lib/docs";

interface DocsPagerProps {
    doc: DocNode;
    prev?: DocNode;
    next?: DocNode;
}

export function DocsPager({ prev, next }: DocsPagerProps) {
    return (
        <div className="flex flex-row items-center justify-between">
            {prev && (
                <Link
                    href={`/docs/${prev.slug}`}
                    className={cn(buttonVariants({ variant: "ghost" }), "mr-auto")}
                >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    {prev.title}
                </Link>
            )}
            {next && (
                <Link
                    href={`/docs/${next.slug}`}
                    className={cn(buttonVariants({ variant: "ghost" }), "ml-auto")}
                >
                    {next.title}
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
            )}
        </div>
    );
}
