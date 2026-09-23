import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CursorInteraction from "@/components/cinematic/CursorInteraction";
import Preloader from "@/components/cinematic/Preloader";
import PageTransition from "@/components/cinematic/PageTransition";
import { ThemeProvider } from "@/context/ThemeContext";

const EventInfoModal = dynamic(() => import("@/components/ui/EventInfoModal"));
const FashAiConcierge = dynamic(() => import("@/components/concierge/FashAiConcierge"));
const LocalDevicePreview = dynamic(() => import("@/components/ui/LocalDevicePreview"));

export const metadata: Metadata = {
  metadataBase: new URL("https://fashai-beryl.vercel.app"),
  title: "FashAI Universal — International Luxury Fashion & Events Platform",
  description:
    "FashAI Universal is an international fashion, lifestyle, and events platform connecting global designers, models, creative talent, and brand experiences across Dubai, UAE & India.",
  keywords: [
    "FashAI Universal",
    "Fashion AI",
    "Haute Couture",
    "2026 Dubai",
    "Fashion Events Dubai",
    "Designer Applications",
    "Fashion Talent Network",
    "Luxury Fashion Events",
    "Lifestyle Events UAE",
    "Corporate Fashion Events",
    "Model Applications Dubai",
    "Choreographer Registrations",
  ],
  authors: [{ name: "FashAI Universal" }],
  openGraph: {
    title: "FashAI Universal — International Fashion & Events Platform",
    description:
      "Where fashion, technology and imagination converge. An international luxury fashion, lifestyle and event platform.",
    url: "https://fashai-beryl.vercel.app",
    siteName: "FashAI Universal",
    images: [
      {
        url: "/assets/models/model_01.jpeg",
        width: 1200,
        height: 630,
        alt: "FashAI Universal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FashAI Universal — International Fashion & Events Platform",
    description:
      "Where fashion, technology and imagination converge.",
    images: ["/assets/models/model_01.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://fashai-beryl.vercel.app/#organization",
        name: "FashAI Universal",
        url: "https://fashai-beryl.vercel.app",
        logo: "https://fashai-beryl.vercel.app/assets/brand/logo_transparent.png",
        sameAs: ["https://www.instagram.com/fashai_universal"],
        description:
          "FashAI Universal is an international fashion and events platform focused on fashion experiences, events, creative talent, designers, artists, and brand participation.",
      },
      {
        "@type": "WebSite",
        "@id": "https://fashai-beryl.vercel.app/#website",
        url: "https://fashai-beryl.vercel.app",
        name: "FashAI Universal",
        publisher: { "@id": "https://fashai-beryl.vercel.app/#organization" },
      },
      {
        "@type": "Event",
        name: "LifeStyle 2026 · Dubai",
        startDate: "2026-01-01",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Dubai, United Arab Emirates",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
        },
        description:
          "An international luxury fashion and lifestyle experience hosted in Dubai. Delegate registrations and sponsorship enquiries are currently open.",
        organizer: { "@id": "https://fashai-beryl.vercel.app/#organization" },
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-void text-brand-off-white selection:bg-brand-orange selection:text-white font-sans-body">
        <ThemeProvider>
          {/* Cinematic Initial Preloader */}
          <Preloader />

          {/* First-Visit Event Information Popup */}
          <EventInfoModal />

          {/* Custom Fine-Pointer Editorial Cursor */}
          <CursorInteraction />

          {/* Fixed Editorial Navigation Header */}
          <Header />

          {/* Main Content Sections */}
          <main>
            <PageTransition>{children}</PageTransition>
          </main>

          {/* Haute Couture Footer */}
          <Footer />

          {/* FashAI Universal AI Concierge Assistant */}
          <FashAiConcierge />

          {/* Local Development Only Device Preview Switcher */}
          <LocalDevicePreview />
        </ThemeProvider>
      </body>
    </html>
  );
}
