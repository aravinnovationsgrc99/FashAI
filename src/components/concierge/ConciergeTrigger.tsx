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
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      aria-label={isOpen ? "Close FashAI Assistant" : "Open FashAI Assistant"}
      aria-expanded={isOpen}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[250] flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-2.5 bg-black/90 border rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(250,182,10,0.3)] select-none group min-h-[48px] ${
        isOpen
          ? "border-brand-yellow-golden text-brand-yellow-golden bg-black"
          : "border-brand-yellow-golden/80 text-brand-white hover:border-brand-yellow-golden hover:shadow-[0_0_40px_rgba(250,182,10,0.5)]"
      }`}
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        marginBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Official FashAI Logo Launcher Icon inside pill */}
      <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-full overflow-hidden bg-black border border-brand-yellow-golden/60 p-0.5">
        <Image
          src="/assets/brand/logo_transparent.png"
          alt="FashAI Assistant"
          fill
          priority
          sizes="32px"
          className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Trigger Label Stack matching reference design */}
      <div className="flex flex-col items-start text-left pr-1">
        <span className="font-syne text-[10px] sm:text-xs font-bold uppercase tracking-caps text-brand-white group-hover:text-brand-yellow-golden transition-colors leading-none">
          {isOpen ? "CLOSE" : "FASHAI ASSISTANT"}
        </span>
        <span className="text-[8px] font-syne text-brand-yellow-golden uppercase font-bold tracking-micro mt-0.5">
          {isOpen ? "FashAI Guide" : "FASHION & EVENT GUIDE"}
        </span>
      </div>

      {/* Green Active Status Dot */}
      {!isOpen ? (
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0 ml-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E936F] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2E936F]" />
        </span>
      ) : (
        <X className="w-4 h-4 text-brand-yellow-golden ml-0.5" />
      )}
    </motion.button>
  );
}
