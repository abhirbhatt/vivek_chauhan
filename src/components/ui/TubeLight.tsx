'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TubeLightProps {
    className?: string;
    color?: string;
    flicker?: boolean;
}

export default function TubeLight({
    className,
    color = "rgba(255, 255, 255, 0.45)",
    flicker = true
}: TubeLightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <div
            ref={containerRef}
            className={cn(
                "absolute top-0 left-0 w-full h-[1px] z-10",
                flicker && "animate-pulse",
                className
            )}
            style={{
                background: `linear-gradient(to right, transparent, ${color}, transparent)`,
                boxShadow: `0 0 15px 2px ${color}`,
                opacity: 0.8,
            }}
        >
            <div
                className="absolute inset-x-0 h-[1px] top-0 blur-[4px]"
                style={{ backgroundColor: color }}
            />
            <div
                className="absolute inset-x-0 h-[10px] top-0 blur-[20px] opacity-50"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}
