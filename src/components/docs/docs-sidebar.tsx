"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocNode } from "@/lib/docs";

interface DocsSidebarProps {
    items: DocNode[];
}

export function DocsSidebar({ items }: DocsSidebarProps) {
    const pathname = usePathname();

    return (
        <div className="w-full">
            <div className="flex flex-col gap-1 w-full text-sm font-mono">
                {items.map((item) => {
                    if (item.children) {
                        return (
                            <div key={item.slug} className="pt-4 pb-2 first:pt-0">
                                <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-bold tracking-tight">
                                    {item.title}
                                </h4>
                                <DocsSidebarNavItems items={item.children} pathname={pathname} />
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.slug}
                            href={`/docs/${item.slug}`}
                            className={cn(
                                "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
                                pathname === `/docs/${item.slug}`
                                    ? "font-medium text-foreground bg-accent/50"
                                    : ""
                            )}
                        >
                            {item.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

interface DocsSidebarNavItemsProps {
    items: DocNode[];
    pathname: string | null;
}

function DocsSidebarNavItems({ items, pathname }: DocsSidebarNavItemsProps) {
    return (
        <div className="grid grid-flow-row auto-rows-max text-sm text-muted-foreground">
            {items.map((item) => (
                item.children ? (
                    <div key={item.slug} className="pt-1">
                        <div className="flex w-full items-center rounded-md border border-transparent px-2 py-1 text-foreground font-semibold">
                            {item.title}
                        </div>
                        <div className="pl-4 border-l ml-2 mt-1 space-y-1 border-muted">
                            <DocsSidebarNavItems items={item.children} pathname={pathname} />
                        </div>
                    </div>
                ) : (
                    <Link
                        key={item.slug}
                        href={`/docs/${item.slug}`}
                        className={cn(
                            "group flex w-full items-center rounded-md border border-transparent px-2 py-1 transition-colors hover:text-foreground",
                            pathname === `/docs/${item.slug}`
                                ? "font-medium text-foreground text-primary" // Highlight active
                                : "text-muted-foreground"
                        )}
                    >
                        {item.title}
                    </Link>
                )
            ))}
        </div>
    );
}
