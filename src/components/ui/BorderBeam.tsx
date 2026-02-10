'use client';

import { cn } from "@/lib/utils";

interface BorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
}

export const BorderBeam = ({
    className,
    size = 300,
    duration = 8,
    borderWidth = 1.5,
    colorFrom = "rgba(255, 255, 255, 0)",
    colorTo = "rgba(255, 255, 255, 1)",
    delay = 0,
}: BorderBeamProps) => {
    return (
        <div
            style={
                {
                    "--size": size,
                    "--duration": duration,
                    "--border-width": borderWidth,
                    "--color-from": colorFrom,
                    "--color-to": colorTo,
                    "--delay": delay,
                } as React.CSSProperties
            }
            className={cn(
                "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",

                // mask styles
                "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",

                // pseudo-element
                "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-[border-beam_var(--duration)s_linear_infinite] after:[animation-delay:calc(var(--delay)*1s)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:90%_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
                className,
            )}
        />
    );
};
