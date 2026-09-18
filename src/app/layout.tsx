import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CursorInteraction from "@/components/cinematic/CursorInteraction";
import Preloader from "@/components/cinematic/Preloader";
import PageTransition from "@/components/cinematic/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://fashprisminternationals.com"),
  title: "FASHPRISM INTERNATIONALS — Fashion Beyond Borders",
  description:
    "Fashprism Internationals is a digital fashion atelier uniting international runway presentations, bespoke fashion symposiums, and luxury lifestyle experiences across Paris and Dubai.",
  keywords: [
    "Fashprism Internationals",
    "Fashprism",
    "Fashion Beyond Borders",
    "Haute Couture",
    "Runway 2025",
    "Dubai Fashion 2026",
    "Digital Atelier",
    "Luxury Fashion",
  ],
  authors: [{ name: "Fashprism Internationals" }],
  openGraph: {
    title: "FASHPRISM INTERNATIONALS — Fashion Beyond Borders",
    description:
      "A digital couture atelier synthesizing haute couture craftsmanship, international fashion films, and virtual runway presentations.",
    url: "https://fashprisminternationals.com",
    siteName: "Fashprism Internationals",
    images: [
      {
        url: "/assets/models/model_01.jpeg",
        width: 1200,
        height: 630,
        alt: "FashAI Universal Haute Couture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FASHAI UNIVERSAL — Fashion Beyond Borders",
    description:
      "Haute couture digital atelier uniting international runway presentations and luxury lifestyle experiences.",
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
      </head>
      <body className="bg-brand-void text-brand-off-white selection:bg-brand-gold-pure selection:text-brand-black font-sans-body">
        {/* Cinematic Initial Preloader */}
        <Preloader />

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
      </body>
    </html>
  );
}

