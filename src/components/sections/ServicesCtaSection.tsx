"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface ServicesCtaSectionProps {
  onOpenServices?: () => void;
}

export default function ServicesCtaSection({ onOpenServices }: ServicesCtaSectionProps) {
  const handleClick = () => {
    if (onOpenServices) {
      onOpenServices();
    } else {
      // Fallback: trigger click on header services dropdown or scroll to header
      const servicesTrigger = document.getElementById("header-services-trigger");
      if (servicesTrigger) {
        servicesTrigger.click();
        servicesTrigger.focus();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.open("https://aravinnovations.com", "_blank", "noopener,noreferrer");
      }
    }
  };

  return (
    <section className="relative py-16 bg-[#080706] border-y border-white/10 overflow-hidden">
      {/* Atmosphere Glow */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-brand-yellow-golden/5 blur-[140px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Editorial Info */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>BEYOND FASHAI UNIVERSAL — ARAV INNOVATIONS</span>
          </div>

          <h3 className="font-serif-display text-2xl sm:text-4xl font-light text-brand-white uppercase tracking-tight">
            LOOKING FOR ENTERPRISE & DIGITAL SOLUTIONS?
          </h3>

          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed">
            Discover complete IT strategy, digital marketing, risk compliance, application engineering, and AI portfolio solutions powered by Arav Innovation.
          </p>

          {/* Micro-preview Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {["IT STRATEGY", "DIGITAL MARKETING", "WEB DEVELOPMENT", "AI PORTFOLIO"].map((pill) => (
              <span
                key={pill}
                className="text-[9px] sm:text-[10px] font-syne font-bold uppercase tracking-wider text-brand-yellow-golden/90 bg-black/60 border border-brand-yellow-golden/30 px-2.5 py-1"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Right CTA Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-shrink-0"
        >
          <button
            onClick={handleClick}
            className="group relative inline-flex items-center gap-4 bg-[#0F0D0B] hover:bg-[#181512] border border-brand-yellow-golden/40 hover:border-brand-yellow-golden text-brand-white px-8 py-4 text-xs font-syne tracking-caps font-bold transition-all duration-300 shadow-[0_0_25px_rgba(250,182,10,0.15)] hover:shadow-[0_0_35px_rgba(250,182,10,0.3)]"
          >
            <span className="text-brand-yellow-golden group-hover:text-white transition-colors">
              VIEW OUR OTHER SERVICES
            </span>
            <ArrowUpRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

            {/* Fine Gold Underline Indicator */}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-yellow-golden group-hover:w-full transition-all duration-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
