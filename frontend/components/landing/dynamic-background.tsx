"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function DynamicBackground() {
    const [mounted, setMounted] = useState(false);

    // Use springs for smooth mouse following
    const mouseX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
    const mouseY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });

    useEffect(() => {
        setMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            // Offset by half screen to center at screen edges
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
            {/* Interactive Blob that follows mouse subtly */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px]"
            />

            {/* Primary Blob */}
            <motion.div
                animate={{
                    x: [0, 200, -200, 0],
                    y: [0, -200, 200, 0],
                    scale: [1, 1.4, 0.9, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-primary/25 rounded-full blur-[160px]"
            />

            {/* Accent Blob */}
            <motion.div
                animate={{
                    x: [0, -250, 250, 0],
                    y: [0, 250, -250, 0],
                    scale: [1, 0.8, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-accent/20 rounded-full blur-[160px]"
            />

            {/* Extra Depth Blob */}
            <motion.div
                animate={{
                    x: [0, 300, -300, 0],
                    y: [0, 300, -300, 0],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[30%] right-[20%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"
            />

            {/* Noise Texture Overlay for Premium Feel */}
            <div className="absolute inset-0 opacity-[0.2] mix-blend-soft-light pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Dynamic Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_80%,transparent_100%)]" />
        </div>
    );
}
