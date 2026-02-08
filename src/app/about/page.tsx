"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, Handshake, Heart, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    const values = [
        {
            title: '平等',
            icon: Scale,
            description: '在Cnedge内部，所有人都是平等的。每个人都有同等的地位，具有相同的发展机会，享有同等的权利。',
            color: 'text-blue-500'
        },
        {
            title: '团结',
            icon: Handshake,
            description: '如果把每个人比作一滴水，一滴水是成不了水流的，只有大家合在一起，才能形成滔滔不绝的江河。',
            color: 'text-green-500'
        },
        {
            title: '友善',
            icon: Heart,
            description: '我们崇尚和平友善的外交，人与人之间的亲近和睦。同舟共济扬帆起，乘风破浪万里航。',
            color: 'text-red-500'
        }
    ];

    const teamMembers = [
        {
            name: '小马君',
            displayName: '小马君',
            role: '创无止界联盟负责人 / 创界视觉室长',
            category: '联盟负责人',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/03/QQ%E5%9B%BE%E7%89%8720220314151854.jpg'
        },
        {
            name: '剑宇',
            displayName: '剑宇',
            role: '创无止界联盟负责人 / 幻空团队室长',
            category: '联盟负责人',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/03/QQ%E5%9B%BE%E7%89%8720220314151921-1024x1024.jpg'
        },
        {
            name: '𝑻𝒊𝒂𝒏𝒊𝒆𝒍',
            displayName: '𝑻𝒊𝒂𝒏𝒊𝒆𝒍',
            role: '合作伙伴',
            category: '合作伙伴',
            avatar: 'https://q1.qlogo.cn/g?b=qq&nk=615207910&s=640'
        },
        {
            name: '易幕',
            displayName: '易幕',
            role: '创无止界联盟高层 / 塘锦工坊室长',
            category: '联盟高层',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/03/ym.jpg'
        },
        {
            name: '小邱',
            displayName: '小邱',
            role: '创无止界联盟高层 / 雪影社室长',
            category: '联盟高层',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030134440-768x768.jpg'
        },
        {
            name: 'yang',
            displayName: 'yang',
            role: '创无止界网站负责人 / 维护运营',
            category: '技术负责人',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030134234-768x768.jpg'
        },
        {
            name: '千阳',
            displayName: '千阳',
            role: '创无止界联盟高层 / 逐鹿书院室长',
            category: '联盟高层',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030134546-768x768.jpg'
        },
        {
            name: '小雪',
            displayName: '小雪',
            role: '创无止界SunChat项目管理团队团长 / 雪影社副室长',
            category: '项目管理',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030134643-768x768.jpg'
        },
        {
            name: '灵荟',
            displayName: '灵荟',
            role: '创无止界、塘锦工坊室娘立绘画师 / 幻空团队成员',
            category: '创意设计',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030134839-768x768.jpg'
        },
        {
            name: 'Yummy抹茶',
            displayName: 'Yummy抹茶',
            role: '创无止界联盟八周年生日会参与人员 / 幻空团队建筑部成员',
            category: '建筑设计',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030135250-768x767.jpg'
        },
        {
            name: '斯卡夫',
            displayName: '斯卡夫',
            role: '创无止界联盟八周年生日会"下北泽市区"作者 / 幻空团队建筑部成员',
            category: '建筑设计',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030135416-768x768.jpg'
        },
        {
            name: '曦幕',
            displayName: '曦幕',
            role: '创无止界联盟皮肤128×128高技术力大佬 / 幻空团队皮肤副部长',
            category: '皮肤设计',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030135528-768x768.jpg'
        },
        {
            name: 'at麦',
            displayName: 'at麦',
            role: '创无止界联盟八周年生日会参与人员 / 逐鹿书院皮肤部成员',
            category: '皮肤设计',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030135658-768x768.jpg'
        },
        {
            name: '木折',
            displayName: '木折',
            role: '创无止界联盟八周年生日会参与人员 / 全联盟唯一做模组的',
            category: '模组开发',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030135918-768x768.jpg'
        },
        {
            name: '谷雨',
            displayName: '谷雨',
            role: '创无止界联盟八周年生日会参与人员 / 逐鹿书院皮肤部成员',
            category: '皮肤设计',
            avatar: 'https://gwold.cnedge.net/wp-content/uploads/2022/10/QQ%E5%9B%BE%E7%89%8720221030140008-768x768.jpg'
        }
    ];

    return (
        <main className="container mx-auto min-h-[calc(100vh-4rem)] px-4 py-8 md:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-left"
            >
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">关于我们</h1>
                <p className="mt-2 text-muted-foreground">创意无限，合作共赢。</p>
            </motion.div>

            {/* Core Values Grid */}
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mb-24">
                {values.map((value, index) => (
                    <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex flex-col justify-between border-t py-6 transition-colors hover:border-primary/50"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">{value.title}</span>
                            <value.icon className={`h-5 w-5 ${value.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground/80 font-mono leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Team Members Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-24"
            >
                <h2 className="mb-8 text-xl font-medium tracking-tight font-mono border-b pb-4">联盟主要人员</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-4 p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
                        >
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border bg-muted">
                                <Image
                                    src={member.avatar}
                                    alt={member.displayName}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-sm text-foreground">{member.displayName}</h3>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border">
                                        {member.category}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground/80 line-clamp-2" title={member.role}>
                                    {member.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>



            {/* Join Us CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center py-12 border-t border-dashed"
            >
                <h3 className="text-2xl font-bold mb-4">欢迎加入创无止界联盟</h3>
                <p className="text-muted-foreground mb-8">与我们一起创造无限可能！</p>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => window.location.href = '/contact'}>
                        联系我们
                    </Button>
                    <Button variant="outline" onClick={() => window.open('https://qm.qq.com/cgi-bin/qm/qr?k=n1fVH9pa3tCdCLJFrAssnnRgdWDCKUtP&authKey=2Xc%2BGR7seUqxDEHb31%2BqB8gMnhxflQPF2GWdRQHBMmfeEY9xcZIX8hci8fCcubTW&noverify=0&group_code=940597748', '_blank')}>
                        加入审核群 <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </motion.div>
        </main>
    );
}
