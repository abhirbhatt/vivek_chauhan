'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BackgroundBeams } from './background-beams';

gsap.registerPlugin(ScrollTrigger);

export default function BookAppointment() {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Target elements
            const heading = '.book-appointment-heading';
            const masterpiece = '.book-appointment-masterpiece';
            const button = '.book-appointment-button-wrapper';
            const available = '.book-appointment-available-text';

            // Set initial state
            gsap.set([heading, masterpiece, button, available], {
                opacity: 0,
                y: 30,
                filter: 'blur(10px)'
            });

            // 🔹 Entrance Animation Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            });

            tl.to(heading, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'power4.out'
            })
                .to(masterpiece, {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.5,
                    ease: 'power3.out'
                }, '-=0.9')
                .to(button, {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: 'back.out(2)'
                }, '-=1')
                .to(available, {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'power2.out'
                }, '-=0.8');

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="contact"
            className="w-full min-h-screen relative flex flex-col items-center justify-center antialiased overflow-hidden bg-neutral-950 py-32 md:py-48"
        >
            {/* Background Beams with enhanced visibility */}
            <BackgroundBeams className="opacity-100" />

            {/* Add a subtle radial gradient to make beams fade at the edges and center text pop */}
            <div className="absolute inset-0 z-0 bg-transparent pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)' }} />

            <div
                ref={wrapperRef}
                className="book-appointment-content-wrapper relative z-10 w-full flex flex-col items-center mt-4"
            >

                <div className="relative text-white tracking-tighter max-w-7xl mt-12 w-full">
                    <div className="flex flex-col gap-4 md:gap-7 items-center text-center w-full">
                        <span
                            className="book-appointment-heading block text-[1.25rem] md:text-[2rem] lg:text-[5rem] tracking-tight font-bold text-[#d5dbe6]"
                            style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                        >
                            LET'S CREATE YOUR
                        </span>

                        <span
                            className="book-appointment-masterpiece block text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] tracking-widest"
                            style={{ fontFamily: 'var(--font-cursive)', fontWeight: 400 }}
                        >
                            Next Masterpiece
                        </span>
                    </div>
                </div>

                <div className="book-appointment-button-wrapper relative mt-20">
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center px-10 py-6 text-xl text-white rounded-[25px] overflow-hidden transition-all duration-500 hover:scale-105 border border-white/20 hover:border-white/40"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                            backdropFilter: 'blur(10px)',
                            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2), 0 10px 30px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Glossy Texture Highlight */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />

                        <span className="relative z-10 font-bold tracking-tight mr-2" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                            Book an Appointment
                        </span>
                        <ArrowRight className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />

                        {/* Moving Shine Effect */}
                        <div className="absolute -inset-full h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-35deg] transition-all duration-1000 group-hover:left-full -left-full pointer-events-none" />

                        {/* Subtle Inner Glow */}
                        <div className="absolute inset-0 rounded-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] pointer-events-none" />
                    </Link>
                </div>

                <div className="book-appointment-available-text mt-12 text-white/30 text-xl md:text-3xl  relative "
                    style={{ fontFamily: 'var(--font-cursive)', fontWeight: 200, letterSpacing: "8px" }}>
                    Available for freelance & collaborations
                </div>

            </div>
        </section>
    );
}
