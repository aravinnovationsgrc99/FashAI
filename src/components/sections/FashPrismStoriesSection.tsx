"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import {
  FashPrismItem,
  FASHPRISM_INDIA_DATA,
  FASHPRISM_INTERNATIONAL_DATA,
  FASHPRISM_VIP_DATA,
} from "@/data/fashprism";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface CardConfig {
  id: "INDIA" | "INTERNATIONAL" | "VIP";
  title: string;
  subtitle: string;
  badge: string;
  representative: FashPrismItem;
  data: FashPrismItem[];
}

export default function FashPrismStoriesSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<"INDIA" | "INTERNATIONAL" | "VIP" | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const cards: CardConfig[] = [
    {
      id: "INDIA",
      title: "FASHPRISM INDIA",
      subtitle: "Selected moments from FashPrism India.",
      badge: "8 PHOTOGRAPHS",
      representative: FASHPRISM_INDIA_DATA[0],
      data: FASHPRISM_INDIA_DATA,
    },
    {
      id: "INTERNATIONAL",
      title: "FASHPRISM INTERNATIONAL",
      subtitle: "Selected moments from FashPrism's international experiences.",
      badge: "4 PHOTOGRAPHS",
      representative: FASHPRISM_INTERNATIONAL_DATA[0],
      data: FASHPRISM_INTERNATIONAL_DATA,
    },
    {
      id: "VIP",
      title: "VIP GUESTS",
      subtitle: "Selected moments featuring distinguished guests.",
      badge: "4 PORTRAITS",
      representative: FASHPRISM_VIP_DATA[0],
      data: FASHPRISM_VIP_DATA,
    },
  ];

  const currentCategoryObj = cards.find((c) => c.id === activeCategory);
  const currentImages = currentCategoryObj ? currentCategoryObj.data : [];
  const currentImage = currentImages[activeImageIndex];

  const openCategoryModal = (catId: "INDIA" | "INTERNATIONAL" | "VIP") => {
    setActiveCategory(catId);
    setActiveImageIndex(0);
  };

  const closeModal = useCallback(() => {
    setActiveCategory(null);
    setActiveImageIndex(0);
  }, []);

  const handleNext = useCallback(() => {
    if (!currentImages.length) return;
    setActiveImageIndex((prev) => (prev + 1) % currentImages.length);
  }, [currentImages.length]);

  const handlePrev = useCallback(() => {
    if (!currentImages.length) return;
    setActiveImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  }, [currentImages.length]);

  // Lock body scroll when lightbox is active & attach keyboard shortcuts
  useEffect(() => {
    if (!activeCategory) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCategory, closeModal, handleNext, handlePrev]);

  return (
    <section
      id="fashprism-stories"
      className="relative py-10 sm:py-14 bg-[#050505] border-b border-white/10 text-brand-white overflow-hidden select-none"
    >
      {/* Background Soft Gold Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-yellow-golden/5 blur-[220px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
              <Sparkles className="w-4 h-4 text-brand-yellow-golden" />
              <span>EXCLUSIVE FEATURE ARCHIVE</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-none">
              FASHPRISM <span className="font-serif italic font-normal text-brand-yellow-golden capitalize">Stories</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-md font-light leading-relaxed">
            Explore selected moments, people, and experiences from the FashPrism journey.
          </p>
        </div>

        {/* 3 Clickable Feature Cards Grid (Desktop 3 Cols / Mobile Vertical Stack) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onClick={() => openCategoryModal(card.id)}
              className="group relative flex flex-col justify-between bg-[#080706] border border-white/10 rounded-2xl overflow-hidden hover:border-brand-yellow-golden/70 transition-all duration-500 cursor-pointer shadow-xl"
            >
              {/* Top Image Thumbnail Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#030303]">
                <Image
                  src={card.representative.src}
                  alt={card.representative.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-black/40 opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 text-[10px] font-syne text-brand-yellow-golden font-bold uppercase tracking-wider">
                  <span>{card.badge}</span>
                </div>
              </div>

              {/* Bottom Card Copy & CTA */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow bg-[#080706] space-y-4 border-t border-white/5 relative">
                <div className="space-y-2">
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-light text-brand-white uppercase group-hover:translate-x-1 transition-transform duration-300">
                    {card.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-platinum/80 font-light leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-syne font-bold uppercase tracking-wider text-brand-yellow-golden group-hover:text-white transition-colors">
                  <span>VIEW STORY</span>
                  <ArrowRight className="w-4 h-4 text-brand-yellow-golden group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>

                {/* Animated Bottom Gold Accent Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-yellow-golden group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ==================================================== */}
      {/* CATEGORY IMAGE VIEWER / LIGHTBOX MODAL */}
      {/* ==================================================== */}
      <AnimatePresence>
        {activeCategory && currentCategoryObj && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl text-white select-none overflow-hidden"
          >
            {/* Modal Top Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/80 z-20">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-yellow-golden" />
                <h4 className="font-serif-display text-lg sm:text-xl font-light uppercase tracking-wider text-brand-white">
                  {currentCategoryObj.title}
                </h4>
                <span className="text-xs font-syne text-brand-yellow-golden font-bold uppercase tracking-widest ml-2">
                  {activeImageIndex + 1} / {currentImages.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-brand-yellow-golden hover:text-black transition-all text-xs font-syne font-bold uppercase tracking-wider"
                aria-label="Close Viewer"
              >
                <span>CLOSE</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Central Image View Area */}
            <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
              {/* Previous Image Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 z-30 p-3 sm:p-4 rounded-full bg-black/60 border border-white/20 text-white hover:border-brand-yellow-golden hover:text-brand-yellow-golden hover:scale-110 transition-all shadow-2xl"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Main Display Image (Contain Mode to Prevent Cropping) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full max-w-5xl max-h-[72vh] flex items-center justify-center"
                >
                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    sizes="100vw"
                    priority
                    className="object-contain filter contrast-105 select-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Image Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-4 sm:right-8 z-30 p-3 sm:p-4 rounded-full bg-black/60 border border-white/20 text-white hover:border-brand-yellow-golden hover:text-brand-yellow-golden hover:scale-110 transition-all shadow-2xl"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>

            {/* Modal Bottom Information & Thumbnail Strip */}
            <div className="border-t border-white/10 bg-black/90 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-syne text-brand-yellow-golden uppercase font-bold tracking-widest">
                  {currentImage.tag}
                </span>
                <h5 className="font-serif-display text-lg text-white font-light uppercase">
                  {currentImage.title}
                </h5>
                <p className="font-sans text-xs text-brand-platinum/75 font-light max-w-md">
                  {currentImage.caption}
                </p>
              </div>

              {/* Thumbnails Navigation Strip */}
              <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 scrollbar-none">
                {currentImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      idx === activeImageIndex
                        ? "border-brand-yellow-golden scale-105 opacity-100"
                        : "border-transparent opacity-40 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
