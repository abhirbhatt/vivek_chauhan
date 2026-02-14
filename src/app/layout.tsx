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
  title: "Vivek Singh Chauhan - Cinematographer, Filmmaker & Videographer | Delhi NCR",
  description: "Award-winning cinematographer & filmmaker Vivek Singh Chauhan (AFilmCraft) specializing in cinematic wedding films, music videos, brand commercials & creative content production. Professional videographer, editor & color grading expert serving Delhi, Noida, Gurgaon & Pan India.",
  keywords: [
    // PRIMARY KEYWORDS
    "wedding videographer",
    "corporate video production",
    "event videographer",
    "commercial videography",
    "destination wedding videographer",

    // SECONDARY KEYWORDS
    "cinematic wedding films",
    "drone videography",
    "product videography",
    "music video production",
    "real estate videography",
    "brand video production",
    "documentary filmmaker",
    "videographer for hire",
    "social media videographer",
    "promotional video services",

    // LONG-TAIL KEYWORDS
    "professional wedding videographer near me",
    "affordable wedding videographer packages",
    "cinematic filmmaker for hire",
    "corporate event video production",
    "luxury destination wedding filmmaker",

    // Branding Keywords
    "Vivek Singh Chauhan",
    "Vivek Chauhan cinematographer",
    "Vivek Singh filmmaker",
    "AFilmCraft",
    "cinematographer in Delhi",
    "wedding cinematographer Delhi NCR",
    "professional videographer Delhi",
  ],
  authors: [{ name: "Vivek Singh Chauhan" }],
  creator: "Vivek Singh Chauhan",
  publisher: "AFilmCraft",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://afilcraftbysonty.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vivek Singh Chauhan - Cinematographer & Filmmaker | Delhi NCR",
    description: "Cinematic wedding films, music videos & brand commercials. Professional cinematographer serving Delhi, Noida, Gurgaon.",
    url: "https://afilcraftbysonty.in",
    siteName: "AFilmCraft - Vivek Singh Chauhan",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vivek Singh Chauhan - Cinematographer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Singh Chauhan - Cinematographer & Filmmaker",
    description: "Cinematic wedding films, music videos & brand commercials",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "AFilmCraft - Vivek Singh Chauhan",
              "image": "https://afilcraftbysonty.in/og-image.jpg",
              "description": "Professional cinematographer, filmmaker and videographer specializing in cinematic wedding films, music videos and brand commercials in Delhi NCR",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Delhi",
                "addressRegion": "NCR",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "28.6139",
                "longitude": "77.2090"
              },
              "url": "https://afilcraftbysonty.in",
              "telephone": "+91-9389856441",
              "priceRange": "₹₹₹",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "21:00"
              },
              "sameAs": [
                "https://www.instagram.com/afilmcraftbysonty",
                "https://youtube.com/@afilmcraft"
              ]
            })
          }}
        />
      </head>
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
