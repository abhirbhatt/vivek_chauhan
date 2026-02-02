'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading Reveal
            gsap.fromTo(
                headingRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );

            // Button Reveal
            gsap.fromTo(
                buttonRef.current,
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="contact"
            className="w-full py-32 md:py-48 px-6 bg-background-primary flex flex-col items-center justify-center text-center overflow-hidden"
        >
            <h2
                ref={headingRef}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-12 max-w-4xl leading-[1.1]"
            >
                LET'S CREATE YOUR<br />NEXT MASTERPIECE.
            </h2>

            <div ref={buttonRef}>
                <Link
                    href="mailto:hello@filippoforner.com"
                    className="group relative inline-flex items-center justify-center px-10 py-6 text-xl bg-white text-black rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                    <span className="relative z-10 font-medium mr-2">Book an Appointment</span>
                    <ArrowRight className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0" />
                </Link>
            </div>

            <div className="mt-16 text-gray-500 text-sm tracking-widest uppercase">
                Available for freelance & collaborations
            </div>
        </section>
    );
}
