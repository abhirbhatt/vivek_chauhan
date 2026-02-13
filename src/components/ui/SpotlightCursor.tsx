'use client';

import React, { useEffect, useRef } from 'react';
import { useSpotlight } from '@/hooks/use-spotlight';

interface SpotlightCursorProps {
    containerRef: React.RefObject<HTMLElement | null>;
    glowColor?: string; // Should be RGB numbers: "255, 255, 255"
    spotlightSize?: number;
    spotlightIntensity?: number;
    fadeSpeed?: number;
}

const SpotlightCursor: React.FC<SpotlightCursorProps> = ({
    containerRef,
    glowColor = '255, 255, 255',
    spotlightSize = 300,
    spotlightIntensity = 0.5,
    fadeSpeed = 0.1,
}) => {
    const { canvasRef, isVisible, isActive } = useSpotlight(containerRef);
    const mousePos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        if (!isVisible || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateSize = () => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                // Position relative to the container
                mousePos.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const render = () => {
            // Smooth position transition
            currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, fadeSpeed);
            currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, fadeSpeed);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Draw the dark "andhera" overlay initially as soon as footer is visible
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.95)'; // Increased darkness to 95%
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (isActive) {
                // 2. Cut a "hole" for the spotlight when mouse is inside
                ctx.globalCompositeOperation = 'destination-out';

                const holeGradient = ctx.createRadialGradient(
                    currentPos.current.x,
                    currentPos.current.y,
                    0,
                    currentPos.current.x,
                    currentPos.current.y,
                    spotlightSize
                );

                // Multiple stops create a soft, exponential falloff like a real torch light
                holeGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');      // Bright center
                holeGradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.9)'); // Soft core
                holeGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');  // Gentle fade
                holeGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');  // Far edge
                holeGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');      // Dissolve into darkness

                ctx.fillStyle = holeGradient;
                ctx.beginPath();
                ctx.arc(
                    currentPos.current.x,
                    currentPos.current.y,
                    spotlightSize,
                    0,
                    Math.PI * 2
                );
                ctx.fill();

                // 3. Add a very subtle color glow around the hole to soften the transition even more
                ctx.globalCompositeOperation = 'source-over';
                const glowGradient = ctx.createRadialGradient(
                    currentPos.current.x,
                    currentPos.current.y,
                    0,
                    currentPos.current.x,
                    currentPos.current.y,
                    spotlightSize * 1.2
                );
                glowGradient.addColorStop(0, `rgba(${glowColor}, 0.15)`);
                glowGradient.addColorStop(0.5, `rgba(${glowColor}, 0.05)`);
                glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = glowGradient;
                ctx.fill();
            }

            rafId.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', updateSize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [isVisible, isActive, spotlightSize, spotlightIntensity, fadeSpeed, glowColor, containerRef, canvasRef]);

    if (!isVisible) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-30"
        />
    );
};

export default SpotlightCursor;
