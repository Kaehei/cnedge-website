"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t bg-background/50 backdrop-blur-md">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm text-muted-foreground">
                    {/* Brand & Intro */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <Image src="/logo.png" alt="Cnedge Logo" width={120} height={32} className="h-6 w-auto" />
                        </Link>
                        <p className="leading-relaxed">
                            创无止界联盟，成立于2014年9月29日。由塘锦工坊，逐鹿书院，雪影社，幻空团队，创界视觉，杉茶运营团队组成。并且在网易拥有网易开发者账号。
                        </p>
                        <p className="font-serif italic font-medium opacity-80">
                            同舟共济扬帆起，乘风破浪万里航。
                        </p>
                    </div>

                    {/* Links: Pages */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground">页面</h3>
                        <ul className="space-y-2">
                            {[
                                { label: "About", href: "/about" },
                                { label: "Blog", href: "/blog" },
                                { label: "Contact", href: "/contact" },
                                { label: "Home", href: "/" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="hover:text-primary transition-colors hover:underline underline-offset-4"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links: Friends */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground">友情链接</h3>
                        <ul className="space-y-2">
                            {[
                                "LHteam",
                                "MCEBS",
                                "KaeHei",
                                "Tianiel",
                                "fly6022",
                            ].map((name) => (
                                <li key={name}>
                                    <span className="hover:text-primary transition-colors cursor-pointer">
                                        {name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-foreground">联系我们</h3>
                        <ul className="space-y-2">
                            <li>交流群: 275435628</li>
                            <li>审核群: 940597748</li>
                            <li>
                                <a
                                    href="mailto:cnedgemail@126.com"
                                    className="hover:text-primary transition-colors hover:underline underline-offset-4"
                                >
                                    cnedgemail@126.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground/60">
                    <p>Copyright © 2026 Cnedge</p>
                </div>
            </div>
        </footer>
    );
}
