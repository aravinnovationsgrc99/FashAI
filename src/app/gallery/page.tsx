import type { Metadata } from "next";
import GalleryView from "@/components/sections/GalleryView";
import { MODELS_DATA } from "@/data/models";
import Image from "next/image";

export const metadata: Metadata = {
  title: "GALLERY — FASHPRISM INTERNATIONALS",
  description:
    "The Faces of Fashprism. High-definition luxury fashion visual archive and digital runway exhibition featuring 100 model captures across 04 international collections.",
};

export default function GalleryPage() {
  return (
    <div className="bg-brand-void text-brand-off-white min-h-screen">
      {/* Editorial Exhibition Hero */}
      <section className="relative min-h-[65vh] sm:min-h-[80vh] w-full flex flex-col justify-end px-6 sm:px-12 pt-32 pb-16 border-b border-hairline-gold overflow-hidden">
        {/* Visual Anchor Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={MODELS_DATA.models[0]?.coverImage || "/assets/models/model-01/image-01.webp"}
            alt="Fashprism Visual Anchor"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-25 filter grayscale contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-vignette opacity-90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-gold mb-6">
            <span className="h-px w-8 bg-brand-gold" />
            <span className="uppercase font-semibold">FASHPRISM VISUAL ARCHIVE</span>
            <span className="text-brand-gold/60">•</span>
            <span className="border border-hairline-gold px-2.5 py-0.5 text-[10px]">
              {MODELS_DATA.totalImages} IMAGES / {MODELS_DATA.totalModels} MODELS
            </span>
          </div>

          <h1 className="font-serif-display text-5xl xs:text-6xl sm:text-8xl md:text-[9rem] font-light leading-none tracking-tight">
            THE FACES <br />
            <span className="italic text-gold-gradient font-normal">
              OF FASHPRISM
            </span>
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between border-t border-hairline-gold pt-6 gap-4">
            <p className="font-serif-display text-lg sm:text-2xl text-brand-platinum italic font-light">
              "A luxury fashion editorial × digital exhibition archive."
            </p>
            <div className="flex items-center gap-4 text-[10px] font-syne tracking-micro text-brand-gold uppercase">
              <span>PARIS × DUBAI RUNWAY ARCHIVE</span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Model Exhibition Index & Gallery */}
      <GalleryView />
    </div>
  );
}


