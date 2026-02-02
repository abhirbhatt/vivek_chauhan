'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(2026);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="w-full bg-black border-t border-white/10 pt-20 pb-8 px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">

                {/* CTA Column */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-lg font-medium text-white">Book an appointment</h3>
                    <h4 className="text-2xl md:text-3xl font-light text-white/90 leading-tight">
                        Let's create your next video. Together.
                    </h4>
                    <Link
                        href="/contact"
                        className="inline-block mt-4 px-6 py-3 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 w-fit"
                    >
                        Contact us
                    </Link>
                </div>

                {/* Legal Links Column */}
                <div className="flex flex-col space-y-3 md:items-center">
                    <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Terms and Conditions
                    </Link>
                </div>

                {/* Contact Info Column */}
                <div className="flex flex-col space-y-2 md:items-end text-left md:text-right">
                    <a href="mailto:info@filippoforner.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                        info@filippoforner.com
                    </a>
                    <p className="text-gray-500 text-xs">P.IVA: 03131270302</p>
                    <p className="text-gray-500 text-xs">
                        Via Brunico 4, Monguelfo-Tesido (BZ), Italy
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-zinc-600">
                <p>&copy; {currentYear} Filippo Forner. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-zinc-400 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-zinc-400 transition-colors">Vimeo</a>
                    <a href="#" className="hover:text-zinc-400 transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}
