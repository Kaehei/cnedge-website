import { getDocBySlug, getDocsStructure, DocNode } from "@/lib/docs";
import { notFound } from "next/navigation";
import { DocsArticle } from "@/components/docs/docs-article";

// Helper to flatten the tree to find prev/next
function flattenDocs(nodes: DocNode[], flat: DocNode[] = []) {
    nodes.forEach(node => {
        if (!node.children) {
            flat.push(node);
        } else {
            flattenDocs(node.children, flat);
        }
    });
    return flat;
}

interface DocsPageProps {
    params: Promise<{
        slug?: string[];
    }>;
}

export default async function DocsPage(props: DocsPageProps) {
    const { slug } = await props.params;

    // Handle root /docs -> index.md
    const docSlug = slug || ["index"];
    const doc = getDocBySlug(docSlug);

    if (!doc) {
        notFound();
    }

    // Logic for Pager
    const docsTree = getDocsStructure();
    const flatDocs = flattenDocs(docsTree);

    const currentSlugString = slug ? slug.join("/") : "index";

    const currentIndex = flatDocs.findIndex(d => d.slug === currentSlugString);

    const prev = currentIndex > 0 ? flatDocs[currentIndex - 1] : undefined;
    const next = currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : undefined;

    return (
        <main className="relative py-6 lg:gap-10 lg:py-8">
            <DocsArticle
                title={doc.title}
                description={doc.description}
                content={doc.content}
                slug={doc.slug}
                prev={prev}
                next={next}
            />
        </main>
    );
}
