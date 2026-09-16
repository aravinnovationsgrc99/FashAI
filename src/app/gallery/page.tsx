import type { Metadata } from "next";
import GalleryView from "@/components/sections/GalleryView";

export const metadata: Metadata = {
  title: "GALLERY — FASHPRISM INTERNATIONALS",
  description:
    "Moments. Movement. Light. High-definition digital fashion exhibition showcasing couture moments across Paris and Dubai.",
};

export default function GalleryPage() {
  return (
    <div className="pt-28 pb-32 bg-brand-void text-brand-off-white min-h-screen">
      {/* Page Header */}
      <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto border-b border-hairline">
        <span className="text-xs font-syne tracking-micro text-brand-orange block mb-4">
          CHAPTER 04 / DIGITAL EXHIBITION
        </span>
        <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-none tracking-tight">
          GALLERY
        </h1>
        <p className="font-serif-display text-xl sm:text-3xl text-brand-gold italic font-light mt-4">
          "Moments. Movement. Light."
        </p>
      </section>

      {/* Main Interactive Exhibition Grid & Lightbox */}
      <GalleryView />
    </div>
  );
}
