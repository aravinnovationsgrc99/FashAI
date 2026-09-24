"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";

interface ConsentNoticeProps {
  onAllow: () => void;
  onDecline: () => void;
}

export default function ConsentNotice({ onAllow, onDecline }: ConsentNoticeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="p-3.5 mb-3 bg-brand-orange/10 border border-brand-orange/30 rounded-none text-brand-white text-xs space-y-2.5 shadow-md"
    >
      <div className="flex items-center gap-2 text-[11px] font-syne font-bold text-brand-orange uppercase tracking-micro">
        <span>PERSONALIZE YOUR FASHAI EXPERIENCE</span>
      </div>

      <p className="font-sans text-[11px] text-brand-platinum/90 font-light leading-relaxed">
        Allow FashAI to remember your selected fashion interests for tailored recommendations during this and future visits.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onAllow}
          className="flex-1 bg-brand-orange px-3 py-1.5 text-[10px] font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors rounded-none flex items-center justify-center gap-1.5"
        >
          <ShieldCheck className="w-3 h-3" />
          <span>ALLOW</span>
        </button>
        <button
          onClick={onDecline}
          className="px-3 py-1.5 text-[10px] font-syne tracking-caps text-brand-platinum hover:text-white border border-white/20 transition-colors rounded-none"
        >
          NOT NOW
        </button>
      </div>
    </motion.div>
  );
}
