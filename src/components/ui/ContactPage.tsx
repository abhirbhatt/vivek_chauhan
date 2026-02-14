'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ChevronDown, Instagram, Mail, Linkedin, ArrowLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';
import TubeLight from '@/components/ui/TubeLight';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [showDropdown, setShowDropdown] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        // Initialize EmailJS with Public Key
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        if (publicKey) {
            emailjs.init(publicKey);
        }
    }, []);

    const subjects = ['General Inquiry', 'Wedding Film', 'Commercial Project', 'Music Video', 'Collaboration'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('❌ EmailJS Config Missing:', { serviceId, templateId, publicKey: !!publicKey });
            setStatus('error');
            return;
        }

        setStatus('sending');

        try {
            console.log('📤 Sending email via EmailJS...');

            // Trim keys in case of accidental spaces in .env file
            const sId = serviceId.trim();
            const tId = templateId.trim();
            const pKey = publicKey.trim();

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                inquiry_type: formData.subject,
                message: formData.message,
                submission_time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            };

            const result = await emailjs.send(
                sId,
                tId,
                templateParams,
                pKey
            );

            console.log('✅ EmailJS Response:', result.text);

            if (result.text === 'OK') {
                setStatus('success');
                setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                const msg = result.text || 'Unknown Error from EmailJS';
                alert(`Email Failed: ${msg}`);
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error: any) {
            console.error('❌ EmailJS Error:', error);
            // Detailed alert to catch the exact missing piece
            const errorMsg = error?.text || error?.message || 'Check network/console';
            alert(`EmailJS Error: ${errorMsg}\n\nHint: Restart your terminal if you just updated .env.local`);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <main className="min-h-screen bg-[#000000] text-white flex flex-col items-center px-6 py-12 md:py-24 relative overflow-hidden">
            <TubeLight />

            {/* Ambient background glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-8 left-8 z-50 transition-colors"
            >
                <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium tracking-wider">BACK</span>
                </Link>
            </motion.div>

            {/* Header Content */}
            <div className="max-w-4xl w-full mb-12 md:mb-20 text-center md:text-left mt-16 md:mt-0">
                <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-xs md:text-sm font-mono text-white/40 tracking-[0.4em] uppercase mb-4 block"
                >
                    Available Worldwide
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[3rem] md:text-[6rem] font-bold tracking-tighter leading-[0.9] mb-8 uppercase"
                >
                    LET'S CREATE <br />
                    SOMETHING <span className="text-white/30" style={{ fontFamily: 'var(--font-cursive)', fontWeight: 400, textTransform: 'none', fontSize: '1.2em', letterSpacing: '10px', marginLeft: '20px' }}>Great.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed"
                >
                    Whether you have a specific vision or just want to explore possibilities, I'm here to help you tell your story.
                </motion.p>
            </div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl w-full"
            >
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-12 md:space-y-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        <div className="relative group">
                            <input
                                type="text"
                                name="from_name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Your Name"
                                className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors placeholder:text-white/20 text-xl font-light"
                            />
                        </div>
                        <div className="relative group">
                            <input
                                type="email"
                                name="from_email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email Address"
                                className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors placeholder:text-white/20 text-xl font-light"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-[0.3em] mb-4 block">
                            Interested In
                        </label>
                        <div
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="w-full flex items-center justify-between border-b border-white/20 py-4 cursor-pointer hover:border-white transition-colors"
                        >
                            <span className="text-xl font-light text-white/80">{formData.subject}</span>
                            <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                            <input type="hidden" name="inquiry_type" value={formData.subject} />
                        </div>

                        <AnimatePresence>
                            {showDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute left-0 right-0 top-full mt-2 bg-[#111111] border border-white/10 rounded-lg overflow-hidden z-50 shadow-2xl"
                                >
                                    {subjects.map((subj) => (
                                        <div
                                            key={subj}
                                            onClick={() => {
                                                setFormData({ ...formData, subject: subj });
                                                setShowDropdown(false);
                                            }}
                                            className="px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer text-white/60 hover:text-white text-lg"
                                        >
                                            {subj}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="relative group">
                        <textarea
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Your Message..."
                            className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors placeholder:text-white/20 text-xl font-light resize-none"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
                        <button
                            disabled={status === 'sending'}
                            className={`relative group h-20 px-12 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 min-w-[280px]
                                ${status === 'success' ? 'bg-green-500 text-white' :
                                    status === 'error' ? 'bg-red-500 text-white' :
                                        'bg-white text-black hover:scale-105'}
                            `}
                        >
                            <AnimatePresence mode="wait">
                                {status === 'idle' ? (
                                    <motion.span key="submit" className="relative z-10 flex items-center gap-3 text-lg font-bold tracking-wider">
                                        SEND MESSAGE <Send className="w-5 h-5" />
                                    </motion.span>
                                ) : status === 'sending' ? (
                                    <motion.span key="sending" className="relative z-10 text-lg font-bold tracking-wider">SENDING...</motion.span>
                                ) : status === 'success' ? (
                                    <motion.span key="success" className="relative z-10 flex items-center gap-3 text-lg font-bold tracking-wider">
                                        SENT SUCCESSFULLY <CheckCircle2 className="w-6 h-6" />
                                    </motion.span>
                                ) : (
                                    <motion.span key="error" className="relative z-10 flex items-center gap-3 text-lg font-bold tracking-wider">
                                        FAILED - TRY AGAIN
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>

                        <div className="flex gap-8 items-center text-white/40">
                            <a
                                href="https://www.instagram.com/afilmcraftbysonty?igsh=MXJ0bmxxZXQwaXcwZw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors duration-300 transform hover:scale-110"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello.filmcraftbysonty@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors font-mono text-sm tracking-widest uppercase"
                            >
                                hello.filmcraftbysonty@gmail.com
                            </a>
                        </div>
                    </div>
                </form>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-24 md:mt-32 text-center text-white/10 text-[10px] font-mono uppercase tracking-[0.5em]"
            >
                © 2026 VIVEK SINGH — ALL RIGHTS RESERVED
            </motion.div>
        </main>
    );
}
