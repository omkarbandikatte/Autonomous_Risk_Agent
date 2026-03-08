"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function AgentVisual() {
    const [mounted, setMounted] = useState(false);
    const mouseX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
    const mouseY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set(e.clientX / innerWidth - 0.5);
            mouseY.set(e.clientY / innerHeight - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

    if (!mounted) return null;

    return (
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center [perspective:1000px]">
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
            >
                {/* Scanline Effect Overlay (Digital Look) */}
                <div className="absolute inset-0 pointer-events-none opacity-20 [background:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.05)_3px)] z-20" />

                {/* Central Core - The "Agent" */}
                <div className="absolute inset-0 flex items-center justify-center [transform:translateZ(50px)]">
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            rotate: [0, 180, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-primary/30 via-accent/20 to-primary/30 blur-[60px] animate-pulse"
                    />
                    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/5 border border-white/20 backdrop-blur-2xl flex items-center justify-center [transform:rotateX(45deg)_rotateY(45deg)] shadow-glow-purple">
                        <div className="w-6 h-6 rounded-full bg-primary glow-purple animate-ping opacity-40" />
                        <div className="absolute w-4 h-4 rounded-full bg-primary glow-purple" />
                    </div>
                </div>

                {/* Orbiting Nodes - Inner Layer */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            rotateZ: [0, 360],
                        }}
                        transition={{
                            duration: 15 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div
                            style={{
                                transform: `rotate(${(i * 360) / 8}deg) translateX(${140 + (i % 3) * 20}px)`,
                            }}
                            className="group"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.4, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    delay: i * 0.3,
                                    repeat: Infinity,
                                }}
                                className="w-3 h-3 rounded-md bg-primary/40 border border-primary/20 backdrop-blur-sm"
                            />
                        </div>
                    </motion.div>
                ))}

                {/* Orbiting Nodes - Outer Layer */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`outer-${i}`}
                        animate={{
                            rotateZ: [360, 0],
                        }}
                        transition={{
                            duration: 25 + i * 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div
                            style={{
                                transform: `rotate(${(i * 360) / 12}deg) translateX(${200 + (i % 4) * 15}px)`,
                            }}
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-accent/40 shadow-glow-cyan" />
                        </div>
                    </motion.div>
                ))}

                {/* Floating Glass Panels */}
                <motion.div
                    style={{ transform: "translateZ(100px)" }}
                    className="absolute -top-10 -right-10 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl hidden sm:block"
                >
                    <div className="flex flex-col gap-2">
                        <div className="w-24 h-2 bg-primary/20 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: ["0%", "80%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="h-full bg-primary"
                            />
                        </div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-primary/80">Agent Health: 98%</div>
                    </div>
                </motion.div>

                <motion.div
                    style={{ transform: "translateZ(-80px) rotateX(20deg)" }}
                    className="absolute -bottom-10 -left-10 p-4 rounded-2xl bg-white/3 border border-white/5 backdrop-blur-md shadow-2xl hidden sm:block"
                >
                    <div className="text-[8px] font-black uppercase tracking-widest text-accent/80 mb-2">Network Nodes: 2.4k</div>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((j) => (
                            <motion.div
                                key={j}
                                animate={{ height: [4, 12, 4] }}
                                transition={{ duration: 1, delay: j * 0.2, repeat: Infinity }}
                                className="w-1 h-3 bg-accent/40 rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Background Neural Web Effect */}
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                    <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-primary/30" />
                    <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 8" className="text-accent/30" />
                </svg>
            </div>
        </div>
    );
}
