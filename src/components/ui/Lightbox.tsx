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
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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
        className="fixed inset-0 z-[200] flex flex-col justify-between bg-brand-void/95 p-4 sm:p-8 backdrop-blur-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Digital Exhibition Lightbox"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div
          className="flex justify-between items-center z-10 border-b border-hairline pb-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="font-serif-display text-xl text-brand-off-white">
              FASHPRISM ARCHIVE
            </span>
            <span className="font-syne text-[10px] tracking-micro text-brand-orange border border-brand-orange/40 px-2 py-0.5">
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-brand-off-white hover:text-brand-orange transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        {/* Central Display Image & Navigation Arrows */}
        <div
          className="relative flex-1 flex items-center justify-center my-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Arrow Button */}
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-6 z-20 p-3 bg-brand-charcoal/80 border border-hairline text-brand-off-white hover:text-brand-orange hover:border-brand-orange transition-all"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Main Image Frame */}
          <motion.div
            key={currentItem.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative h-[65vh] w-[85vw] max-w-5xl border border-hairline bg-brand-charcoal overflow-hidden shadow-2xl"
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
            className="absolute right-2 sm:right-6 z-20 p-3 bg-brand-charcoal/80 border border-hairline text-brand-off-white hover:text-brand-orange hover:border-brand-orange transition-all"
            aria-label="Next Image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Bottom Captions & Details Bar */}
        <div
          className="z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-hairline pt-4 gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <h3 className="font-serif-display text-2xl font-light text-brand-off-white">
              {currentItem.title}
            </h3>
            <p className="font-syne text-xs tracking-micro text-brand-platinum mt-1">
              {currentItem.subtitle} — {currentItem.category} ({currentItem.year})
            </p>
          </div>

          <div className="text-[10px] font-syne tracking-micro text-brand-gold">
            USE ARROW KEYS OR CLICK OUTSIDE TO CLOSE
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
