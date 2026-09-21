"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MODELS_DATA, ModelImageItem } from "@/data/models";
import Lightbox from "../ui/Lightbox";

const CATEGORIES = [
  { id: "ALL", label: "ALL" },
  { id: "RUNWAY", label: "RUNWAY & STAGE" },
  { id: "COUTURE", label: "COUTURE DETAILS" },
  { id: "PEOPLE", label: "PEOPLE & MOMENTS" },
  { id: "ARCHITECTURE", label: "ARCHITECTURE & LIGHTING" },
  { id: "EXPERIENCE", label: "EXPERIENCE" },
];

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Map each image to one of the 5 editorial categories deterministically
  const getImageCategoryLabel = (item: ModelImageItem, index: number): string => {
    if (item.category === "RUNWAY" || index % 5 === 0) return "RUNWAY & STAGE";
    if (item.category === "PORTRAIT" || item.tag.includes("LOOK") || index % 5 === 1) return "COUTURE DETAILS";
    if (item.modelId === "model-02" || index % 5 === 2) return "PEOPLE & MOMENTS";
    if (item.category === "EDITORIAL" || index % 5 === 3) return "ARCHITECTURE & LIGHTING";
    return "EXPERIENCE";
  };

  // Filtered dataset
  const filteredImages = useMemo(() => {
    if (activeFilter === "ALL") return MODELS_DATA.allImages;

    return MODELS_DATA.allImages.filter((img, idx) => {
      const catLabel = getImageCategoryLabel(img, idx);
      if (activeFilter === "RUNWAY") return catLabel === "RUNWAY & STAGE";
      if (activeFilter === "COUTURE") return catLabel === "COUTURE DETAILS";
      if (activeFilter === "PEOPLE") return catLabel === "PEOPLE & MOMENTS";
      if (activeFilter === "ARCHITECTURE") return catLabel === "ARCHITECTURE & LIGHTING";
      if (activeFilter === "EXPERIENCE") return catLabel === "EXPERIENCE";
      return true;
    });
  }, [activeFilter]);

  const displayedImages = filteredImages.slice(0, visibleCount);

  const openLightbox = (image: ModelImageItem) => {
    const idx = filteredImages.findIndex((item) => item.id === image.id);
    setCurrentIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setVisibleCount(12);
  };

  return (
    <section
      ref={containerRef}
      className="px-4 sm:px-6 lg:px-10 py-16 sm:py-24 w-[92vw] max-w-[1600px] mx-auto relative bg-brand-void text-brand-white"
    >
      {/* Background Soft Atmosphere Glow */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-orange/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-brand-green/5 blur-3xl pointer-events-none rounded-full" />

      {/* 1. GALLERY HERO / EDITORIAL HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-b border-white/10 pb-10">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-orange font-bold uppercase">
              VISUAL ARCHIVE
            </span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-brand-white uppercase tracking-tight">
            THE <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff8833] to-brand-yellow-golden">GALLERY</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed max-w-xl">
            Moments from LifeStyle, Runway and the FashAI Universal experience.
          </p>
        </div>

        {/* Right Side Editorial Keyword Stack (Matching reference layout) */}
        <div className="hidden lg:flex flex-col items-end text-right space-y-3 font-syne text-[10px] tracking-micro text-brand-platinum/60 uppercase">
          <span className="text-brand-orange font-bold">FASHION × AI × EXPERIENCE</span>
          <div className="space-y-1 text-right">
            <div>PEOPLE</div>
            <div>FASHION</div>
            <div>IDEAS</div>
            <div>EXPERIENCES</div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY FILTERS (Horizontally scrollable on mobile) */}
      <div className="mb-12 overflow-x-auto no-scrollbar pb-2">
        <div className="flex items-center gap-3 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`px-5 py-2.5 transition-all duration-300 font-syne text-[11px] tracking-micro font-bold uppercase rounded-none border ${
                  isActive
                    ? "border-brand-orange bg-brand-orange/15 text-brand-orange shadow-[0_0_20px_rgba(241,94,28,0.25)]"
                    : "border-white/15 bg-brand-void text-brand-platinum/80 hover:text-brand-white hover:border-white/40"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. EDITORIAL MASONRY COMPOSITION (Asymmetric Grid Matching Reference Screenshot) */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
        <AnimatePresence>
          {displayedImages.map((item, index) => {
            // Asymmetric Column Spans to emulate screenshot editorial layout
            const spans = [
              "md:col-span-4 lg:col-span-4", // Tall left portrait
              "md:col-span-5 lg:col-span-5", // Wide center top
              "md:col-span-3 lg:col-span-3", // Portrait right top
              "md:col-span-5 lg:col-span-5", // Center bottom
              "md:col-span-3 lg:col-span-3", // Dark wide right bottom
              "md:col-span-3 lg:col-span-3", // Left bottom
              "md:col-span-3 lg:col-span-3", // Runway center
              "md:col-span-3 lg:col-span-3", // Experience square
              "md:col-span-3 lg:col-span-3", // B&W right
              "md:col-span-6 lg:col-span-6", // Wide feature
              "md:col-span-6 lg:col-span-6", // Wide feature
            ];
            const colSpan = spans[index % spans.length];

            // Aspect Ratios
            const aspectClass =
              index % 9 === 0
                ? "aspect-[3/4]"
                : index % 9 === 1
                ? "aspect-[16/10]"
                : index % 9 === 2
                ? "aspect-[3/4]"
                : index % 9 === 3
                ? "aspect-[4/5]"
                : index % 9 === 4
                ? "aspect-[16/10]"
                : index % 9 === 5
                ? "aspect-[3/4]"
                : index % 9 === 6
                ? "aspect-[3/4]"
                : index % 9 === 7
                ? "aspect-square"
                : "aspect-[3/4]";

            const categoryTag = getImageCategoryLabel(item, index);

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
                className={`${colSpan} group cursor-pointer`}
                onClick={() => openLightbox(item)}
              >
                <div
                  className={`relative ${aspectClass} w-full overflow-hidden border border-white/10 bg-brand-charcoal/90 transition-all duration-500 hover:border-brand-orange hover:shadow-[0_0_35px_rgba(241,94,28,0.3)]`}
                >
                  <Image
                    src={item.thumb}
                    alt={`FashAI Universal Visual Archive ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading={index > 6 ? "lazy" : "eager"}
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-void/85 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Category Tag Overlay (Bottom-Left Corner, matching screenshot) */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="font-syne text-[10px] tracking-micro text-brand-white font-bold uppercase px-3 py-1 bg-black/75 backdrop-blur-sm border border-white/15 drop-shadow-md">
                      {categoryTag}
                    </span>
                  </div>

                  {/* Hover Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Hover Arrow Indicator */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 flex items-center justify-center bg-brand-orange text-white text-xs font-syne font-bold">
                    ↗
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* 4. LOAD MORE BUTTON */}
      {visibleCount < filteredImages.length && (
        <div className="mt-16 text-center">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 border border-brand-orange/50 bg-brand-void px-10 py-4 font-syne text-xs tracking-caps font-bold text-brand-white hover:bg-brand-orange hover:border-brand-orange hover:shadow-[0_0_25px_rgba(241,94,28,0.4)] transition-all duration-300 rounded-none"
          >
            <span>LOAD MORE</span>
            <span>→</span>
          </button>
        </div>
      )}

      {/* 5. EDITORIAL QUOTE FOOTER BANNER (Matching reference screenshot) */}
      <div className="mt-20 pt-12 border-t border-white/10 text-center space-y-2">
        <p className="font-serif italic text-xl sm:text-3xl text-brand-white/90 font-light">
          “More than events, a movement in fashion.”
        </p>
        <div className="font-syne text-[10px] tracking-widest text-brand-orange uppercase font-bold pt-1">
          — FASHAI UNIVERSAL —
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        items={filteredImages}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
