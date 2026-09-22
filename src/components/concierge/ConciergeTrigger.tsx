"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare } from "lucide-react";

interface ConciergeTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
  badgeCount?: number;
}

export default function ConciergeTrigger({ isOpen, onToggle }: ConciergeTriggerProps) {
  return (
    <motion.button
      onClick={onToggle}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      aria-label={isOpen ? "Close FashAI Concierge" : "Open FashAI Concierge Assistant"}
      aria-expanded={isOpen}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[250] flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 bg-[#0B0908]/90 border transition-all duration-300 shadow-[0_0_30px_rgba(241,94,28,0.25)] select-none group min-h-[44px] min-w-[44px] ${
        isOpen
          ? "border-brand-orange text-brand-orange bg-brand-void"
          : "border-brand-orange/40 text-brand-white hover:border-brand-orange hover:shadow-[0_0_40px_rgba(241,94,28,0.4)]"
      }`}
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        marginBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Subtle Brand Ambient Glow Pulse */}
      <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange" />
      </span>

      {/* Trigger Label */}
      <span className="font-syne text-xs font-bold uppercase tracking-caps flex items-center gap-1.5 text-brand-white group-hover:text-brand-yellow-golden transition-colors">
        <Sparkles className="w-3.5 h-3.5 text-brand-yellow-golden" />
        <span className="hidden xs:inline">ASK FASHAI</span>
        <span className="xs:hidden">FASHAI</span>
      </span>

      <MessageSquare className="w-4 h-4 text-brand-orange ml-0.5 group-hover:translate-x-0.5 transition-transform" />
    </motion.button>
  );
}
