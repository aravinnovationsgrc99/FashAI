import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CursorInteraction from "@/components/cinematic/CursorInteraction";
import Preloader from "@/components/cinematic/Preloader";
import PageTransition from "@/components/cinematic/PageTransition";
import EventInfoModal from "@/components/ui/EventInfoModal";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://fashai-beryl.vercel.app"),
  title: "FashAI Universal — Powered by Arav Innovation",
  description:
    "FashAI Universal: Where fashion, technology and imagination converge. An architectural integration of computational fashion, spatial lighting, and high-couture identity.",
  keywords: [
    "FashAI Universal",
    "Arav Innovation",
    "Powered by Arav Innovation",
    "Fashion AI",
    "Haute Couture",
    "2026 Dubai",
    "Digital Atelier",
    "Luxury Fashion",
  ],
  authors: [{ name: "FashAI Universal — Powered by Arav Innovation" }],
  openGraph: {
    title: "FashAI Universal — Powered by Arav Innovation",
    description:
      "Where fashion, technology and imagination converge. Powered by Arav Innovation.",
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
    title: "FashAI Universal — Powered by Arav Innovation",
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
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
        </ThemeProvider>
      </body>
    </html>
  );
}
