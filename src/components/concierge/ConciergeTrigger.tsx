"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

interface ConciergeTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ConciergeTrigger({ isOpen, onToggle }: ConciergeTriggerProps) {
  return (
    <motion.button
      onClick={onToggle}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      aria-label={isOpen ? "Close FashAI Assistant" : "Open FashAI Assistant"}
      aria-expanded={isOpen}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[250] flex items-center justify-center rounded-full bg-black/95 border transition-all duration-300 shadow-[0_0_25px_rgba(250,182,10,0.35)] select-none group w-14 h-14 sm:w-16 sm:h-16 aspect-square p-0 ${
        isOpen
          ? "border-brand-yellow-golden text-brand-yellow-golden shadow-[0_0_35px_rgba(250,182,10,0.5)]"
          : "border-brand-yellow-golden/75 text-brand-white hover:border-brand-yellow-golden hover:shadow-[0_0_40px_rgba(250,182,10,0.6)]"
      }`}
    >
      {/* 1. Continuous Rotating Outer Gold Ring (Pauses when open or hovered) */}
      {!isOpen && (
        <span
          className="absolute inset-1 rounded-full border border-dashed border-brand-yellow-golden/85 animate-[spin_10s_linear_infinite] group-hover:[animation-play-state:paused] pointer-events-none"
        />
      )}

      {/* 2. Central Icon / Logo (Remains Upright & Perfectly Centered) */}
      {!isOpen ? (
        <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
          <Image
            src="/assets/brand/logo_transparent.png"
            alt="FashAI Assistant"
            fill
            priority
            sizes="36px"
            className="object-contain p-0.5 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(250,182,10,0.4)]"
          />
          {/* Green Online Status Dot */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E936F] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2E936F] border-2 border-black" />
          </span>
        </div>
      ) : (
        <X className="w-6 h-6 text-brand-yellow-golden relative z-10" />
      )}
    </motion.button>
  );
}
