import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "src/content/docs");

export type DocNode = {
    title: string;
    slug: string;
    children?: DocNode[];
};

export type DocContent = {
    slug: string;
    title: string;
    description?: string;
    content: string;
    data: any;
};

// Recursive function to get documentation tree
export function getDocsStructure(dir: string = docsDirectory, displayDir: string = ""): DocNode[] {
    if (!fs.existsSync(dir)) {
        return [];
    }

    const files = fs.readdirSync(dir);
    const nodes: DocNode[] = [];

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const children = getDocsStructure(filePath, path.join(displayDir, file));
            if (children.length > 0) {
                // Try to find index.md in directory for metadata, or use directory name
                // Basic implementation: Capitalize directory name
                const title = file.charAt(0).toUpperCase() + file.slice(1);
                nodes.push({
                    title: title,
                    slug: path.join(displayDir, file),
                    children: children
                });
            }
        } else if (file.endsWith(".md")) {
            const fileContent = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContent);

            let slug: string;
            if (file === "index.md") {
                slug = displayDir === "" ? "index" : displayDir;
            } else {
                slug = path.join(displayDir, file.replace(/\.md$/, ""));
            }

            // Skip index.md if it's strictly for the folder (handled by folder logic usually, 
            // but for simple structures index.md is the root)
            // For this simple implementation:

            nodes.push({
                title: data.title || file.replace(/\.md$/, ""),
                slug: slug,
            });
        }
    });

    // Sort nodes: directories first, then files, or by order if available
    return nodes.sort((a, b) => {
        if (a.slug === "index") return -1;
        if (b.slug === "index") return 1;

        if (a.children && !b.children) return 1;
        if (!a.children && b.children) return -1;
        return a.title.localeCompare(b.title);
    });
}

export function getDocBySlug(slugSegments: string[]): DocContent | null {
    // If empty slug, looking for index.md at root
    const slugPath = slugSegments.join("/");
    let fullPath = path.join(docsDirectory, `${slugPath}.md`);

    // Check if it might be a directory with index.md
    if (!fs.existsSync(fullPath)) {
        // Special case for "index" slug at root
        if (slugPath === "index") {
            fullPath = path.join(docsDirectory, "index.md");
        } else {
            fullPath = path.join(docsDirectory, slugPath, "index.md");
        }
    }

    if (!fs.existsSync(fullPath)) {
        return null; // Not found
    }

    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContent);

    return {
        slug: slugPath,
        title: data.title || "Untitled",
        description: data.description,
        content: content,
        data: data,
    };
}
