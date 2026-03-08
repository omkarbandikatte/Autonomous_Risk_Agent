"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AgentStreams() {
    const [mounted, setMounted] = useState(false);
    const [streams, setStreams] = useState<any[]>([]);

    useEffect(() => {
        setMounted(true);
        // Generate some random data streams
        const newStreams = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            width: Math.random() * 200 + 50,
            duration: Math.random() * 5 + 3,
            delay: Math.random() * 10,
        }));
        setStreams(newStreams);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none -z-[5] overflow-hidden opacity-30">
            {streams.map((stream) => (
                <motion.div
                    key={stream.id}
                    initial={{ x: `${stream.x}%`, y: "-10%", height: 0 }}
                    animate={{
                        y: "110%",
                        height: [0, stream.width, 0],
                    }}
                    transition={{
                        duration: stream.duration,
                        repeat: Infinity,
                        delay: stream.delay,
                        ease: "linear",
                    }}
                    className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent"
                />
            ))}
            {/* Horizontal streams occasionally */}
            {streams.slice(0, 5).map((stream, i) => (
                <motion.div
                    key={`h-${i}`}
                    initial={{ y: `${stream.y}%`, x: "-10%", width: 0 }}
                    animate={{
                        x: "110%",
                        width: [0, stream.width, 0],
                    }}
                    transition={{
                        duration: stream.duration + 2,
                        repeat: Infinity,
                        delay: stream.delay + 1,
                        ease: "linear",
                    }}
                    className="absolute h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
                />
            ))}
        </div>
    );
}
