'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import StarfieldBackground from './StarfieldBackground';

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
            className="w-full md:min-h-screen relative flex flex-col items-center justify-center antialiased overflow-hidden bg-neutral-950 py-20 pt-20  md:py-32  md:py-48"
        >
            {/* Background Effects Container */}
            <div className="absolute inset-0 z-0 opacity-40">
                <StarfieldBackground count={600} speed={0.4} starColor="#ffffff" />
            </div>

            <div
                ref={wrapperRef}
                className="book-appointment-content-wrapper relative z-10 w-full flex flex-col items-center mt-4"
            >

                <div className="relative text-white tracking-tighter max-w-7xl mt-12 w-full">
                    <div className="flex flex-col gap-4 md:gap-7 items-center text-center w-full">
                        <span
                            className="book-appointment-heading block text-[2.3rem] md:text-[2.5rem] lg:text-[5rem] tracking-tight font-bold text-[#d5dbe6]"
                            style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                        >
                            LET'S CREATE YOUR
                        </span>

                        <span
                            className="book-appointment-masterpiece block text-[2.6rem] md:text-[4.5rem] tracking-wide md:tracking-widest"
                            style={{ fontFamily: 'var(--font-cursive)', fontWeight: 400 }}
                        >
                            Next Masterpiece
                        </span>
                    </div>
                </div>

                <div className="book-appointment-button-wrapper relative mt-16 md:mt-20">
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center justify-center px-4 md:px-10 py-5 md:py-6 text-lg md:text-xl text-white rounded-[20px] md:rounded-[25px] overflow-hidden transition-all duration-500 hover:scale-105 border border-white/20 hover:border-white/40"
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
                        <ArrowRight className="relative z-10 w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" />

                        {/* Moving Shine Effect */}
                        <div className="absolute -inset-full h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-35deg] transition-all duration-1000 group-hover:left-full -left-full pointer-events-none" />

                        {/* Subtle Inner Glow */}
                        <div className="absolute inset-0 rounded-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] pointer-events-none" />
                    </Link>
                </div>

                <div className="book-appointment-available-text mt-10 md:mt-12 md:text-white/30 text-white/60 text-xl md:text-3xl relative text-center px-4"
                    style={{ fontFamily: 'var(--font-cursive)', fontWeight: 200, letterSpacing: "4px" }}>
                    Available for freelance & collaborations
                </div>

            </div>
        </section>
    );
}
