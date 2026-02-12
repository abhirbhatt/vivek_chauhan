'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Force scroll to top on refresh
        window.history.scrollRestoration = 'manual';
        window.scrollTo({ top: 0, left: 0 });

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        // @ts-ignore
        window.lenis = lenis;

        // 🔗 Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Drive Lenis via GSAP ticker (keep them in sync)
        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        // Force Lenis to top immediately
        lenis.scrollTo(0, { immediate: true });

        // Refresh ScrollTrigger after Lenis is ready so all triggers recalculate
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(tickerCallback);
        };
    }, []);

    return <>{children}</>;
}
