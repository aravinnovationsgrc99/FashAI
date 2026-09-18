"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MODELS_DATA, ModelImageItem, ModelGroupItem } from "@/data/models";
import Lightbox from "../ui/Lightbox";

type ViewMode = "INDEX" | "COLLECTION";

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("COLLECTION");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Desktop Hover image preview state for Model Index Rows
  const [hoveredModel, setHoveredModel] = useState<ModelGroupItem | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Determine filtered list of images
  let filteredImages: ModelImageItem[] = MODELS_DATA.allImages;

  if (selectedModelId) {
    filteredImages = MODELS_DATA.allImages.filter(
      (img) => img.modelId === selectedModelId
    );
  } else if (activeFilter === "RUNWAY" || activeFilter === "EDITORIAL" || activeFilter === "PORTRAIT") {
    filteredImages = MODELS_DATA.allImages.filter(
      (img) => img.category === activeFilter
    );
  } else if (activeFilter.startsWith("model-")) {
    filteredImages = MODELS_DATA.allImages.filter(
      (img) => img.modelId === activeFilter
    );
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

  const selectModelCollection = (modelId: string) => {
    setSelectedModelId(modelId);
    setActiveFilter(modelId);
    setViewMode("COLLECTION");
  };

  const clearModelSelection = () => {
    setSelectedModelId(null);
    setActiveFilter("ALL");
    setViewMode("INDEX");
  };

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="px-6 sm:px-12 py-16 max-w-7xl mx-auto relative">
      {/* Floating Hover Image Preview for Desktop Model Index */}
      <AnimatePresence>
        {hoveredModel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              left: cursorPos.x + 20,
              top: cursorPos.y - 120,
            }}
            className="pointer-events-none fixed hidden md:block z-50 w-56 h-72 border border-hairline-gold bg-brand-charcoal overflow-hidden shadow-2xl rounded-sm"
          >
            <Image
              src={hoveredModel.thumbImage}
              alt={hoveredModel.name}
              fill
              className="object-cover filter contrast-110"
              sizes="224px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="font-syne text-[10px] tracking-micro text-brand-gold font-bold uppercase">
                {hoveredModel.name} — {hoveredModel.imageCount} IMAGES
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-hairline-gold pb-8">
        {/* Left Typography Navigation */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-syne text-xs tracking-micro">
          <span className="text-brand-gold text-[10px] tracking-micro mr-2 font-semibold">
            EXHIBITION FILTER:
          </span>

          <button
            onClick={clearModelSelection}
            className={`px-5 py-2.5 transition-all duration-300 font-medium ${
              activeFilter === "ALL" && !selectedModelId
                ? "bg-gradient-to-r from-[#F5DFB3] via-[#D4AF37] to-[#A37F2C] text-brand-void font-bold shadow-md"
                : "bg-brand-charcoal/80 text-brand-off-white/80 hover:text-brand-gold border border-hairline hover:border-hairline-gold"
            }`}
          >
            ALL ({MODELS_DATA.totalImages})
          </button>

          {MODELS_DATA.models.map((model) => {
            const isActive = activeFilter === model.id || selectedModelId === model.id;
            return (
              <button
                key={model.id}
                onClick={() => selectModelCollection(model.id)}
                className={`px-5 py-2.5 transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-[#F5DFB3] via-[#D4AF37] to-[#A37F2C] text-brand-void font-bold shadow-md"
                    : "bg-brand-charcoal/80 text-brand-off-white/80 hover:text-brand-gold border border-hairline hover:border-hairline-gold"
                }`}
              >
                {model.number} ({model.imageCount})
              </button>
            );
          })}

          {["RUNWAY", "EDITORIAL", "PORTRAIT"].map((cat) => {
            const isActive = activeFilter === cat && !selectedModelId;
            const count = MODELS_DATA.allImages.filter((img) => img.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedModelId(null);
                  setActiveFilter(cat);
                  setViewMode("COLLECTION");
                }}
                className={`px-4 py-2.5 transition-all duration-300 font-medium uppercase text-[11px] ${
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

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 border border-hairline-gold p-1 bg-brand-charcoal/50 self-start md:self-auto">
          <button
            onClick={() => setViewMode("INDEX")}
            className={`px-4 py-1.5 text-[10px] font-syne tracking-micro transition-all ${
              viewMode === "INDEX"
                ? "bg-brand-gold text-brand-void font-bold"
                : "text-brand-platinum hover:text-brand-gold"
            }`}
          >
            MODEL INDEX
          </button>
          <button
            onClick={() => setViewMode("COLLECTION")}
            className={`px-4 py-1.5 text-[10px] font-syne tracking-micro transition-all ${
              viewMode === "COLLECTION"
                ? "bg-brand-gold text-brand-void font-bold"
                : "text-brand-platinum hover:text-brand-gold"
            }`}
          >
            EDITORIAL GALLERY
          </button>
        </div>
      </div>

      {/* Mode 1: Model Index Editorial Rows */}
      {viewMode === "INDEX" && !selectedModelId && (
        <div className="space-y-6 mb-24">
          <div className="flex items-center justify-between border-b border-hairline pb-4 text-xs font-syne tracking-micro text-brand-gold">
            <span>MODEL COLLECTION</span>
            <span>TOTAL ARCHIVE CAPTURES</span>
            <span>ACTION</span>
          </div>

          {MODELS_DATA.models.map((model) => (
            <motion.div
              key={model.id}
              whileHover={{ x: 6 }}
              onMouseEnter={() => setHoveredModel(model)}
              onMouseLeave={() => setHoveredModel(null)}
              onClick={() => selectModelCollection(model.id)}
              className="group cursor-pointer border-b border-hairline-gold/40 py-8 px-4 sm:px-6 transition-colors hover:bg-brand-charcoal/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-6 sm:gap-10">
                <span className="font-serif-display text-2xl sm:text-4xl text-brand-gold/60 group-hover:text-brand-gold transition-colors font-light">
                  {model.number}
                </span>

                <div>
                  <h3 className="font-serif-display text-3xl sm:text-5xl font-light text-brand-off-white group-hover:text-brand-gold transition-colors">
                    {model.name}
                  </h3>
                  <p className="font-syne text-[10px] sm:text-xs tracking-micro text-brand-platinum mt-1">
                    OFFICIAL FASHION MODEL COLLECTION • HIGH-DEFINITION ARCHIVE
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8 justify-between sm:justify-end">
                <span className="font-syne text-sm text-brand-gold border border-hairline-gold px-3 py-1 font-semibold">
                  {model.imageCount} IMAGES
                </span>

                <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-off-white group-hover:text-brand-gold transition-colors">
                  <span>VIEW COLLECTION</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Active Model Title Banner when viewing a specific collection */}
      {selectedModelId && (
        <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-hairline-gold pb-6 gap-4">
          <div>
            <span className="text-[10px] font-syne tracking-micro text-brand-gold uppercase">
              SELECTED MODEL COLLECTION
            </span>
            <h2 className="font-serif-display text-4xl sm:text-6xl text-brand-off-white mt-1">
              {MODELS_DATA.models.find((m) => m.id === selectedModelId)?.name}
            </h2>
          </div>

          <button
            onClick={clearModelSelection}
            className="text-xs font-syne tracking-micro text-brand-gold hover:text-brand-off-white border border-hairline-gold px-4 py-2 transition-colors"
          >
            ← RETURN TO ALL MODELS ({MODELS_DATA.totalImages})
          </button>
        </div>
      )}

      {/* Mode 2: Editorial Varied Aspect-Ratio Contact Sheet Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-start">
        <AnimatePresence>
          {filteredImages.map((item, index) => {
            // Editorial grid span variation for art-directed rhythm
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
                  className={`relative ${aspectClass} w-full overflow-hidden border border-hairline-gold/70 bg-brand-charcoal transition-all duration-500 hover:border-brand-gold hover:shadow-2xl`}
                >
                  <Image
                    src={item.thumb}
                    alt={`${item.modelName} - ${item.tag}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover filter contrast-110 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-brand-void/90 border border-hairline-gold px-3 py-1 text-[9px] font-syne tracking-micro text-brand-gold font-semibold uppercase">
                      {item.tag}
                    </span>
                    <span className="bg-brand-void/90 border border-hairline-gold px-2.5 py-1 text-[9px] font-syne tracking-micro text-brand-platinum uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Information Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-syne tracking-micro text-brand-gold font-bold uppercase">
                        {item.modelName}
                      </div>
                      <h4 className="font-serif-display text-lg sm:text-2xl font-light text-brand-off-white group-hover:text-brand-gold transition-colors mt-0.5">
                        FASHPRISM ARCHIVE
                      </h4>
                      <p className="font-sans text-[11px] text-brand-platinum/80 font-light">
                        {item.orientation.toUpperCase()} • {item.width}×{item.height}
                      </p>
                    </div>

                    <div className="h-9 w-9 flex items-center justify-center border border-hairline-gold text-brand-gold group-hover:bg-gradient-to-r group-hover:from-[#F5DFB3] group-hover:to-[#D4AF37] group-hover:border-transparent group-hover:text-brand-void transition-all duration-300">
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
        items={filteredImages}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
