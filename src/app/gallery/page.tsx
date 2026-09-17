import type { Metadata } from "next";
import GalleryView from "@/components/sections/GalleryView";

export const metadata: Metadata = {
  title: "GALLERY — FASHAI UNIVERSAL",
  description:
    "Moments. Movement. Light. High-definition digital fashion exhibition showcasing couture moments across Paris and Dubai.",
};

export default function GalleryPage() {
  return (
    <div className="bg-brand-void text-brand-off-white min-h-screen">
      {/* Hero Exhibition Intro */}
      <section className="relative min-h-[60vh] sm:min-h-[75vh] w-full flex flex-col justify-end px-4 sm:px-12 pt-28 pb-12 sm:pb-16 border-b border-hairline-gold overflow-hidden">
        {/* Ambient Dark Exhibition Background */}
        <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-80 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-gold mb-4 sm:mb-6">
            <span className="h-px w-6 sm:w-8 bg-brand-gold" />
            <span>CHAPTER 04 / DIGITAL EXHIBITION</span>
          </div>

          <h1 className="font-serif-display text-4xl xs:text-5xl sm:text-8xl md:text-9xl font-light leading-none tracking-tight">
            THE <br />
            <span className="italic text-gold-gradient font-normal">
              EXHIBITION.
            </span>
          </h1>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between border-t border-hairline pt-6 gap-3">
            <p className="font-serif-display text-lg sm:text-2xl text-brand-platinum italic font-light">
              "Moments. Movement. Light."
            </p>
            <span className="text-[9px] sm:text-[10px] font-syne tracking-micro text-brand-gold uppercase">
              HIGH-DEFINITION ARCHIVE — PARIS × DUBAI
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Exhibition Grid & Lightbox */}
      <GalleryView />
    </div>
  );
}

