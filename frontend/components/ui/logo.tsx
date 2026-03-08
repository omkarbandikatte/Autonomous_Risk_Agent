"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    imageClassName?: string;
    iconOnly?: boolean;
}

export function SupplyGuardLogo({ className, imageClassName, iconOnly = false }: LogoProps) {
    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div className={cn("relative h-28 w-28 flex items-center justify-center transition-all duration-700 hover:scale-110", imageClassName)}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-110 animate-pulse" />

                <div className="relative h-full w-full">
                    <Image
                        src="/logo.png"
                        alt="SupplyGuard Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
