"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GALLERY_DATA, GalleryItem } from "@/data/gallery";
import Lightbox from "../ui/Lightbox";

type CategoryFilter = "ALL" | "RUNWAY 2025" | "LIFESTYLE 2025" | "LIFESTYLE 2026";

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = GALLERY_DATA.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.category === activeCategory;
  });

  const openLightbox = (item: GalleryItem) => {
    const indexInAll = GALLERY_DATA.findIndex((g) => g.id === item.id);
    setCurrentIndex(indexInAll >= 0 ? indexInAll : 0);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length);
  };

  const getCategoryCount = (cat: CategoryFilter) => {
    if (cat === "ALL") return GALLERY_DATA.length;
    return GALLERY_DATA.filter((i) => i.category === cat).length;
  };

  return (
    <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-20 font-syne text-xs tracking-caps border-b border-hairline pb-8">
        <span className="text-brand-gold text-[10px] tracking-micro mr-4">
          FILTER EXHIBITION:
        </span>
        {(
          ["ALL", "RUNWAY 2025", "LIFESTYLE 2025", "LIFESTYLE 2026"] as CategoryFilter[]
        ).map((cat) => {
          const count = getCategoryCount(cat);
          if (count === 0) return null;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-[#F5DFB3] via-[#D4AF37] to-[#A37F2C] text-brand-void font-bold shadow-md"
                  : "bg-brand-charcoal/80 text-brand-off-white/70 hover:text-brand-gold border border-hairline hover:border-hairline-gold"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Asymmetric Varied Aspect-Ratio Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            // Editorial grid span variation for visual rhythm
            const spans = [
              "md:col-span-7",
              "md:col-span-5",
              "md:col-span-4",
              "md:col-span-8",
              "md:col-span-6",
              "md:col-span-6",
              "md:col-span-5",
              "md:col-span-7",
            ];
            const colSpan = spans[index % spans.length];

            const aspectClass =
              item.aspectRatio === "16/9"
                ? "aspect-[16/9]"
                : item.aspectRatio === "1/1"
                ? "aspect-square"
                : item.aspectRatio === "3/4"
                ? "aspect-[3/4]"
                : "aspect-[4/5]";

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className={`${colSpan} group cursor-pointer`}
                onClick={() => openLightbox(item)}
                data-cursor="view"
              >
                <div className={`relative ${aspectClass} w-full overflow-hidden border border-hairline-gold bg-brand-charcoal transition-colors duration-500 hover:border-brand-gold`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 bg-brand-void/90 border border-hairline-gold px-3 py-1 text-[9px] font-syne tracking-micro text-brand-gold">
                    {item.tag}
                  </div>

                  {/* Bottom Information Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-syne tracking-micro text-brand-gold font-bold uppercase">
                        {item.category} / {item.year}
                      </div>
                      <h3 className="font-serif-display text-xl sm:text-2xl font-light text-brand-off-white group-hover:text-brand-gold transition-colors mt-1">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-brand-platinum font-light">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="h-10 w-10 flex items-center justify-center border border-hairline-gold text-brand-gold group-hover:bg-gradient-to-r group-hover:from-[#F5DFB3] group-hover:to-[#D4AF37] group-hover:border-transparent group-hover:text-brand-void transition-all duration-300">
                      ↗
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen HD Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        items={GALLERY_DATA}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}

