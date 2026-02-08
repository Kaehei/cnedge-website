"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Users, Clock, Server, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function StatusPage() {
    const [enabled, setEnabled] = useState<boolean | null>(null);
    const [serverData, setServerData] = useState({
        online: false,
        players: { online: 0, max: 0 },
        version: "Loading...",
        hostname: "mc.kaeshi.top",
        protocol: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if status page is enabled
        fetch("https://admin.kaeshi.top/api/settings.php")
            .then(res => res.json())
            .then(data => {
                setEnabled(data.enabled);
                if (data.enabled) {
                    fetchStatus();
                } else {
                    setLoading(false);
                }
            })
            .catch(() => {
                // If api fails, assume enabled or handle error
                setEnabled(true);
                fetchStatus();
            });
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await fetch("https://api.mcstatus.io/v2/status/java/mc.kaeshi.top:25565");
            const data = await response.json();
            setServerData({
                online: data.online,
                players: data.players || { online: 0, max: 0 },
                version: data.version?.name_clean || "Unknown",
                hostname: data.host || "mc.kaeshi.top",
                protocol: data.version?.protocol || 0,
            });
        } catch (error) {
            console.error("Failed to fetch server status", error);
            toast.error("无法获取服务器状态");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (enabled) {
            const interval = setInterval(fetchStatus, 60000); // Update every minute
            return () => clearInterval(interval);
        }
    }, [enabled]);

    if (enabled === false) {
        return (
            <main className="container mx-auto min-h-[calc(100vh-4rem)] px-4 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted/20">
                        <Server className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold font-mono tracking-tight">System Maintenance</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        服务器状态监控页面暂时关闭，请稍后访问。
                    </p>
                </motion.div>
            </main>
        );
    }

    if (enabled === null) {
        return (
            <main className="container mx-auto min-h-[calc(100vh-4rem)] px-4 flex flex-col items-center justify-center text-center">
                <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground font-mono animate-pulse">Checking status...</p>
            </main>
        );
    }

    const stats = [
        {
            title: "在线玩家",
            value: loading ? "..." : `${serverData.players.online} / ${serverData.players.max}`,
            icon: Users,
            description: serverData.online ? "服务器正常运行中" : "服务器离线",
        },
        {
            title: "服务器 TPS",
            value: serverData.online ? "20.00" : "N/A",
            icon: Activity,
            description: "运行目标",
        },
        {
            title: "协议版本",
            value: loading ? "..." : serverData.protocol,
            icon: Clock,
            description: "版本ID",
        },
        {
            title: "游戏版本",
            value: loading ? "..." : serverData.version,
            icon: Server,
            description: "原版",
        },
    ];

    return (
        <main className="container mx-auto min-h-[calc(100vh-4rem)] px-4 py-8 md:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-left"
            >
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl font-mono">系统状态</h1>
                <p className="mt-2 text-muted-foreground">实时监控指标与服务运行状况。</p>
            </motion.div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex flex-col justify-between border-t py-6 transition-colors hover:border-primary/50"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                            <stat.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                            <div className="text-3xl font-mono font-medium tracking-tight mb-1">{stat.value}</div>
                            <p className="text-xs text-muted-foreground font-mono opacity-60">
                                {stat.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-24"
            >
                <h2 className="mb-8 text-xl font-medium tracking-tight font-mono border-b pb-4">服务健康状况</h2>
                <div className="space-y-6">
                    <div className="flex items-center justify-between group">
                        <span className="flex items-center gap-3">
                            <div className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${serverData.online ? "bg-emerald-400" : "bg-red-400"}`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${serverData.online ? "bg-emerald-500" : "bg-red-500"}`}></span>
                            </div>
                            <span className="font-medium text-sm">主生存服</span>
                        </span>
                        <span className={`text-sm font-mono ${serverData.online ? "text-emerald-600" : "text-red-600"}`}>
                            {loading ? "..." : (serverData.online ? "正常运行" : "离线")}
                        </span>
                    </div>
                    <div className="flex items-center justify-between group">
                        <span className="flex items-center gap-3">
                            <div className="relative flex h-2 w-2">
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </div>
                            <span className="font-medium text-sm">网站 API</span>
                        </span>
                        <span className="text-sm text-yellow-600 font-mono">性能降级</span>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
