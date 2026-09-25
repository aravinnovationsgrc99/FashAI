"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Sparkles } from "lucide-react";

interface ConciergeTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ConciergeTrigger({ isOpen, onToggle }: ConciergeTriggerProps) {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check session storage so message is not forced repeatedly if already dismissed/opened
    if (typeof window !== "undefined") {
      const isDismissed = sessionStorage.getItem("fashai_chat_prompt_dismissed") === "true";
      if (isDismissed || isOpen) return;
    }

    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOpenChat = () => {
    setShowPrompt(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fashai_chat_prompt_dismissed", "true");
    }
    onToggle();
  };

  const handleDismissPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrompt(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fashai_chat_prompt_dismissed", "true");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[250] flex items-center gap-3 select-none pointer-events-none">
      {/* 3-SECOND AUTOMATIC INTRODUCTORY PROMPT MESSAGE */}
      <AnimatePresence>
        {showPrompt && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={handleOpenChat}
            className="pointer-events-auto cursor-pointer max-w-[240px] sm:max-w-[280px] bg-[#FAF8F5] dark:bg-[#11100F] text-[#111111] dark:text-white border border-black/10 dark:border-[#D4AF37]/40 px-3.5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-between gap-2.5 relative group hover:border-[#F15E1C] dark:hover:border-[#D4AF37] transition-all"
          >
            {/* SPEECH BUBBLE TAIL */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FAF8F5] dark:bg-[#11100F] border-r border-t border-black/10 dark:border-[#D4AF37]/40 rotate-45 group-hover:border-[#F15E1C] dark:group-hover:border-[#D4AF37] transition-all" />

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#F15E1C]/10 dark:bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[#F15E1C] dark:text-[#D4AF37]" />
              </div>
              <p className="font-sans text-xs font-medium leading-snug tracking-tight text-[#111111] dark:text-white/90 truncate">
                Need help? <span className="font-semibold text-[#F15E1C] dark:text-[#D4AF37]">Ask FashAI.</span>
              </p>
            </div>

            <button
              onClick={handleDismissPrompt}
              aria-label="Dismiss message"
              className="p-1 rounded-full text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING LAUNCHER BUTTON WITH CONTINUOUS ROTATING LOGO (NO BLACK BOX) */}
      <motion.button
        onClick={handleOpenChat}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        aria-label={isOpen ? "Close FashAI assistant" : "Open FashAI assistant"}
        aria-expanded={isOpen}
        className={`pointer-events-auto flex items-center justify-center rounded-full transition-all duration-300 select-none group shrink-0 ${
          isOpen
            ? "w-12 h-12 sm:w-13 sm:h-13 bg-[#111111] border border-[#D4AF37] text-[#D4AF37] shadow-[0_0_25px_rgba(250,182,10,0.4)]"
            : "w-13 h-13 sm:w-16 sm:h-16 bg-transparent border-none shadow-none p-0 drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)]"
        }`}
      >
        {!isOpen ? (
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {/* CONTINUOUS CLOCKWISE ROTATION LOGO */}
            <div className="relative w-full h-full animate-chatbot-spin">
              <Image
                src="/assets/brand/chatbot_logo.png"
                alt="FashAI Concierge Assistant"
                fill
                priority
                sizes="(max-width: 640px) 52px, 64px"
                className="object-contain"
              />
            </div>

            {/* GREEN ONLINE STATUS INDICATOR DOT */}
            <span className="absolute top-1 right-1 flex h-3 w-3 z-20">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E936F] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2E936F] border-2 border-black" />
            </span>
          </div>
        ) : (
          <X className="w-6 h-6 text-[#D4AF37] relative z-10" />
        )}
      </motion.button>
    </div>
  );
}
