import type { Metadata } from "next";
import { Great_Vibes, Bricolage_Grotesque } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const cursive = Great_Vibes({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vivek Singh - Filmmaker & Videographer",
  description: "Cinematic portfolio of Vivek Singh (AFilmCraft). Filmmaker and Videographer available worldwide.",
  verification: {
    google: "jwHduufa-_xoF4-NSIJsu3Ph1g6dqYeTAgGRTjBwMk4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cursive.variable} ${bricolage.variable} antialiased bg-background-primary text-text-primary`}
      >
        <SmoothScroll>
          {children}
          <SpeedInsights />
        </SmoothScroll>
      </body>
    </html>
  );
}
