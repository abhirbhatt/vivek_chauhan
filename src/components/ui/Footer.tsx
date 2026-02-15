'use client';

import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SpotlightCursor = lazy(() => import('./SpotlightCursor'));

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(2026);
    const footerRef = useRef<HTMLDivElement>(null);
    const backgroundVideoRef = useRef<HTMLVideoElement>(null);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());

        const ctx = gsap.context(() => {
            // Set initial state for elements to prevent flash or missing animation
            gsap.set(['.footer-brand-icons', '.footer-contact-cta', '.footer-tagline', '.footer-bottom-row'], {
                opacity: 0,
                y: 30
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'restart reverse restart reverse',
                }
            });

            tl.to('.footer-brand-icons', {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            })
                .to('.footer-contact-cta', {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=0.6')
                .to('.footer-tagline', {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.8')
                .to('.footer-bottom-row', {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: 'power2.out'
                }, '-=0.5');

            // 🔹 Background Video Visibility Logic
            const bgVideo = backgroundVideoRef.current;
            if (bgVideo) {
                const observer = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) {
                        bgVideo.play().catch(() => { });
                    } else {
                        bgVideo.pause();
                    }
                }, { threshold: 0.1 });
                observer.observe(footerRef.current!);
            }

        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="w-full min-h-screen pt-32 pb-12 px-6 md:px-12 relative z-[60] flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#0a0a0a' }}
        >
            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video
                    ref={backgroundVideoRef}
                    src="/media/Video Project 1.mp4"
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-100"
                />
                {/* Dark overlay removed to maximize visibility */}
            </div>

            {isDesktop && (
                <Suspense fallback={null}>
                    <SpotlightCursor
                        containerRef={footerRef}
                        glowColor="255, 255, 255"
                        spotlightSize={450}
                        spotlightIntensity={0.2}
                    />
                </Suspense>
            )}

            <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                <div className="footer-brand-icons mb-12">
                    <ul className="social-icons-wrapper flex list-none justify-center gap-4">
                        <li className="social-icon group relative">
                            <span className="social-tooltip group-hover:opacity-100 group-hover:-top-11 group-hover:visible" style={{ background: '#EA4335' }}>Email</span>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.filmcraftbysonty@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative bg-white/10 rounded-full w-[50px] h-[50px] flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-[#EA4335] hover:shadow-[0_0_20px_rgba(234,67,53,0.4)]"
                            >
                                <svg viewBox="0 0 24 24" height="1.4em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white/60 group-hover:text-white transition-colors">
                                    <path d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M20,8.236l-8,4.882l-8-4.882 V6l8,4.882L20,6V8.236z" />
                                </svg>
                            </a>
                        </li>
                        <li className="social-icon group relative">
                            <span className="social-tooltip group-hover:opacity-100 group-hover:-top-11 group-hover:visible" style={{ background: '#25D366' }}>WhatsApp</span>
                            <a href="https://wa.me/919389856441" target="_blank" rel="noopener noreferrer" className="relative bg-white/10 rounded-full w-[50px] h-[50px] flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]">
                                <svg height="1.6em" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" className="text-white/60 group-hover:text-white transition-colors p-[1px]">
                                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.4 2.4-11.1 2.4-2.4 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.5 5.5-9.2 1.9-3.7 1-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                </svg>
                            </a>
                        </li>
                        <li className="social-icon group relative">
                            <span className="social-tooltip group-hover:opacity-100 group-hover:-top-11 group-hover:visible" style={{ background: '#e4405f' }}>Instagram</span>
                            <a href="https://www.instagram.com/afilmcraftbysonty?igsh=MXJ0bmxxZXQwaXcwZw==" target="_blank" rel="noopener noreferrer" className="relative bg-white/10 rounded-full w-[50px] h-[50px] flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-[#e4405f] hover:shadow-[0_0_20px_rgba(228,64,95,0.4)]">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" fill="currentColor" viewBox="0 0 16 16" className="text-white/60 group-hover:text-white transition-colors">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Main Contact CTA */}
                <div className="footer-contact-cta mb-12 md:mb-20">
                    <div className="mb-4">
                        <a href="#hero" className="text-[13px] uppercase tracking-[0.2em] md:tracking-[0.5em] text-[#d5dbe6]/90 md:text-[#d5dbe6]/40 font-bold hover:text-white transition-colors cursor-pointer" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>Vivek Chauhan</a>
                    </div>
                    <h2
                        className="text-6xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-none text-[#d5dbe6]"
                    >
                        <span style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>GET IN </span>
                        <span className="ml-[-8px] md:ml-[-15px]" style={{ fontFamily: 'var(--font-cursive)', fontWeight: 300, textTransform: 'none' }}>Touch</span>
                    </h2>
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.filmcraftbysonty@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base md:text-xl text-gray-300 hover:text-white transition-colors duration-300 border-b border-gray-800 pb-2 lowercase tracking-wide block mx-auto w-fit"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                    >
                        hello.filmcraftbysonty@gmail.com
                    </a>
                </div>

                <div className="footer-tagline mb-12 md:mb-20">
                    <p className="text-lg md:text-2xl text-white/40 tracking-[2px] md:tracking-[4px]" style={{ fontFamily: 'var(--font-cursive)', textTransform: 'none' }}>
                        A Film Craft by Sonty
                    </p>
                </div>

                {/* Bottom Row */}
                <div className="footer-bottom-row w-full pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] md:text-xs text-[#d5dbe6]/30 uppercase tracking-widest order-2 md:order-1" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                        &copy; {currentYear} <a href="#hero" className="hover:text-white transition-colors">VIVEK CHAUHAN</a>
                    </div>

                    <div className="flex items-center gap-6 order-1 md:order-2">
                        <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors" style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}>
                            Terms of Use
                        </Link>
                        <div className="text-sm text-zinc-600 ml-4" style={{ fontFamily: 'var(--font-cursive)', letterSpacing: '2px' }}>
                            Filmcraft by Sonty
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
