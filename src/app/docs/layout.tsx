import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getDocsStructure } from "@/lib/docs";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const docs = getDocsStructure();

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                    <ScrollArea className="h-full py-6 pr-6 lg:py-8">
                        <DocsSidebar items={docs} />
                    </ScrollArea>
                </aside>

                {/* Mobile: Sidebar removed as requested. Content only. */}
                <div className="flex flex-col min-w-0 w-full">
                    <main className="relative py-6 lg:gap-10 lg:py-8">
                        <div className="mx-auto w-full min-w-0">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
