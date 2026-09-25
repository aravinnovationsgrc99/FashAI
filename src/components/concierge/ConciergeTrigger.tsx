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
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      aria-label={isOpen ? "Close FashAI Concierge" : "Open FashAI Concierge"}
      aria-expanded={isOpen}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[250] flex items-center justify-center rounded-full bg-[#111111] transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.3)] select-none group w-13 h-13 sm:w-14 sm:h-14 p-0 border ${
        isOpen
          ? "border-[#D4AF37] text-[#D4AF37] shadow-[0_0_25px_rgba(250,182,10,0.4)]"
          : "border-[#D4AF37]/70 text-white hover:border-[#F15E1C] hover:shadow-[0_0_30px_rgba(241,94,28,0.45)]"
      }`}
    >
      {!isOpen ? (
        <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
          <Image
            src="/assets/brand/logo_transparent.png"
            alt="FashAI Concierge"
            fill
            priority
            sizes="32px"
            className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-200"
          />
          {/* Green Online Status Indicator Dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E936F] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2E936F] border-2 border-[#111111]" />
          </span>
        </div>
      ) : (
        <X className="w-5 h-5 text-[#D4AF37] relative z-10" />
      )}
    </motion.button>
  );
}
