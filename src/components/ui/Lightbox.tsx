"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/data/gallery";

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  items: GalleryItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex flex-col justify-between bg-brand-void/98 p-4 sm:p-8 pt-safe pb-safe backdrop-blur-2xl min-h-[100dvh]"
        role="dialog"
        aria-modal="true"
        aria-label="Digital Exhibition Lightbox"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div
          className="flex justify-between items-center z-10 border-b border-hairline-gold pb-3 pt-1"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="font-serif-display text-base sm:text-xl text-brand-off-white">
              FASHPRISM ARCHIVE
            </span>
            <span className="font-syne text-[9px] sm:text-[10px] tracking-micro text-brand-gold border border-hairline-gold px-2 py-0.5">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-off-white hover:text-brand-gold transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Central Display Image & Navigation Arrows */}
        <div
          className="relative flex-1 flex items-center justify-center my-2 sm:my-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Arrow Button */}
          <button
            onClick={onPrev}
            className="absolute left-1 sm:left-6 z-20 p-3.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-brand-charcoal/90 border border-hairline-gold text-brand-off-white hover:text-brand-gold hover:border-brand-gold transition-all shadow-xl"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Main Image Frame */}
          <motion.div
            key={currentItem.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative h-[55vh] sm:h-[65vh] w-[88vw] max-w-5xl border border-hairline-gold bg-brand-charcoal overflow-hidden shadow-2xl"
          >
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              priority
              sizes="90vw"
              className="object-contain"
            />
          </motion.div>

          {/* Next Arrow Button */}
          <button
            onClick={onNext}
            className="absolute right-1 sm:right-6 z-20 p-3.5 min-w-[44px] min-h-[44px] flex items-center justify-center bg-brand-charcoal/90 border border-hairline-gold text-brand-off-white hover:text-brand-gold hover:border-brand-gold transition-all shadow-xl"
            aria-label="Next Image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Bottom Captions & Details Bar */}
        <div
          className="z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-hairline-gold pt-3 gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <h3 className="font-serif-display text-lg sm:text-2xl font-light text-brand-off-white">
              {currentItem.title}
            </h3>
            <p className="font-syne text-[10px] sm:text-xs tracking-micro text-brand-platinum mt-0.5">
              {currentItem.subtitle} — {currentItem.category} ({currentItem.year})
            </p>
          </div>

          <div className="text-[9px] sm:text-[10px] font-syne tracking-micro text-brand-gold">
            SWIPE / ARROWS TO NAVIGATE • ESC TO CLOSE
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
