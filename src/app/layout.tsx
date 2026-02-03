import type { Metadata } from "next";
import { Inter, Poppins, Satisfy, Bungee } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sekuya = Satisfy({
  variable: "--font-sekuya",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Filippo Forner - Filmmaker & Videographer",
  description: "Cinematic portfolio of Filippo Forner (Replica). Filmmaker and Videographer available worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Gloock&family=Great+Vibes&family=Playwrite+GB+J+Guides:ital@0;1&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Satisfy&family=Sekuya&family=Staatliches&family=Zalando+Sans+Expanded:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${sekuya.variable} ${bungee.variable} antialiased bg-background-primary text-text-primary`}
      >
        {/* Film Grain Overlay */}
        <div className="grain-overlay" aria-hidden="true" />

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
