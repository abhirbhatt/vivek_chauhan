'use client';

import { useEffect, useRef, useState } from 'react';

interface UseSpotlightReturn {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    isVisible: boolean;
    isActive: boolean;
}

/**
 * Performance-optimized hook for spotlight effect restricted to a container.
 * Implements Intersection Observer, device detection, and RAF throttling.
 */
export function useSpotlight(containerRef: React.RefObject<HTMLElement | null>): UseSpotlightReturn {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // 1. Device & Motion Preference Detection
        const mobileQuery = window.matchMedia('(max-width: 768px)');
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const checkStatus = () => {
            setIsMobile(mobileQuery.matches || motionQuery.matches);
        };

        checkStatus();
        mobileQuery.addEventListener('change', checkStatus);
        motionQuery.addEventListener('change', checkStatus);

        // 2. Intersection Observer to only run when footer is visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
            mobileQuery.removeEventListener('change', checkStatus);
            motionQuery.removeEventListener('change', checkStatus);
        };
    }, [containerRef]);

    useEffect(() => {
        if (isMobile || !isVisible || !containerRef.current) return;

        const container = containerRef.current;

        const handleMouseEnter = () => setIsActive(true);
        const handleMouseLeave = () => setIsActive(false);

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isMobile, isVisible, containerRef]);

    return {
        canvasRef,
        isVisible: isVisible && !isMobile,
        isActive
    };
}
