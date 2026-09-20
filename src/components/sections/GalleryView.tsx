"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MODELS_DATA, ModelImageItem } from "@/data/models";
import Lightbox from "../ui/Lightbox";

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Categorize images into fashion-event topics
  const getCategoryTitle = (category: string, tag: string) => {
    if (category === "RUNWAY") return "RUNWAY PRESENTATION";
    if (tag.includes("PORTRAIT")) return "COUTURE SILHOUETTE";
    if (category === "EDITORIAL") return "SPATIAL LIGHTING & ARCHITECTURE";
    return "FASHION × AI EXHIBITION";
  };

  // Determine filtered list of images
  let filteredImages: ModelImageItem[] = MODELS_DATA.allImages;

  if (activeFilter === "RUNWAY") {
    filteredImages = MODELS_DATA.allImages.filter((img) => img.category === "RUNWAY");
  } else if (activeFilter === "COUTURE") {
    filteredImages = MODELS_DATA.allImages.filter((img) => img.tag.includes("PORTRAIT") || img.category === "PORTRAIT");
  } else if (activeFilter === "SPATIAL") {
    filteredImages = MODELS_DATA.allImages.filter((img) => img.category === "EDITORIAL");
  }

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

  return (
    <section ref={containerRef} className="px-4 sm:px-8 lg:px-12 py-16 w-[94%] max-w-[1800px] mx-auto relative bg-brand-void">
      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-hairline-orange/50 pb-8">
        <div>
          <span className="text-xs font-syne tracking-micro text-brand-orange block mb-3 font-bold uppercase">
            EDITORIAL VISUAL ARCHIVE / FASHAI UNIVERSE
          </span>
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase">
            THE GALLERY
          </h1>
        </div>

        {/* Navigation Filter Buttons */}
        <div className="flex flex-wrap items-center gap-3 font-syne text-xs tracking-micro">
          {[
            { id: "ALL", label: `ALL CAPTURES (${MODELS_DATA.totalImages})` },
            { id: "RUNWAY", label: "RUNWAY & STAGE" },
            { id: "COUTURE", label: "COUTURE DETAILS" },
            { id: "SPATIAL", label: "ARCHITECTURE & LIGHTING" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-5 py-3 transition-all duration-300 font-bold uppercase text-[11px] rounded-none ${
                activeFilter === btn.id
                  ? "bg-brand-orange text-white shadow-lg"
                  : "bg-brand-void border border-hairline-orange/60 text-brand-platinum hover:text-brand-orange hover:border-brand-orange"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Varied Aspect-Ratio Asymmetric Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
        <AnimatePresence>
          {filteredImages.map((item, index) => {
            const spans = [
              "md:col-span-7",
              "md:col-span-5",
              "md:col-span-4",
              "md:col-span-8",
              "md:col-span-6",
              "md:col-span-6",
              "md:col-span-5",
              "md:col-span-7",
              "md:col-span-12",
              "md:col-span-4",
              "md:col-span-4",
              "md:col-span-4",
            ];
            const colSpan = spans[index % spans.length];

            const aspectClass =
              item.orientation === "landscape"
                ? "aspect-[16/9]"
                : item.orientation === "square"
                ? "aspect-square"
                : item.aspectRatio < 0.75
                ? "aspect-[3/4]"
                : "aspect-[4/5]";

            const titleText = getCategoryTitle(item.category, item.tag);

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                className={`${colSpan} group cursor-pointer`}
                onClick={() => openLightbox(item)}
              >
                <div
                  className={`relative ${aspectClass} w-full overflow-hidden border border-hairline-orange/50 bg-brand-charcoal transition-all duration-500 hover:border-brand-orange hover:shadow-[0_0_30px_rgba(241,94,28,0.3)]`}
                >
                  <Image
                    src={item.thumb}
                    alt={`FashAI Universe Capture ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover filter contrast-110 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-brand-void/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-brand-void/90 border border-brand-orange/40 px-3 py-1 text-[9px] font-syne tracking-micro text-brand-orange font-bold uppercase">
                      {item.tag}
                    </span>
                  </div>

                  {/* Hover Bottom Accent Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Bottom Metadata Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase">
                        FASHAI UNIVERSE EXHIBITION
                      </div>
                      <h4 className="font-serif-display text-lg sm:text-2xl font-light text-brand-white group-hover:text-brand-orange transition-colors mt-0.5">
                        {titleText}
                      </h4>
                      <p className="font-sans text-[11px] text-brand-platinum/80 font-light">
                        {item.orientation.toUpperCase()} • HIGH-DEFINITION CAPTURE
                      </p>
                    </div>

                    <div className="h-9 w-9 flex items-center justify-center border border-hairline-orange text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                      ↗
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

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

