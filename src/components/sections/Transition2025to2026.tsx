"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Transition2025to2026() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll transforms for smooth typography shift from 2025 to 2026
  const scale2025 = useTransform(scrollYProgress, [0.1, 0.45], [1, 0.8]);
  const opacity2025 = useTransform(scrollYProgress, [0.1, 0.45], [1, 0.15]);
  
  const scale2026 = useTransform(scrollYProgress, [0.45, 0.85], [0.8, 1.1]);
  const opacity2026 = useTransform(scrollYProgress, [0.45, 0.85], [0.2, 1]);

  const progressLineWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0.1, 0.6]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] w-full flex flex-col items-center justify-center py-28 bg-gradient-to-b from-brand-void via-[#0C0B0A] to-brand-void overflow-hidden border-b border-hairline-orange"
    >
      {/* Light Refraction Glow Background Shift */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#F15E1C]/10 via-[#FAB60A]/15 to-[#2E936F]/10 blur-[140px] pointer-events-none rounded-full"
      />

      <div className="container-editorial relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Transition Chapter Tag */}
        <div className="inline-flex items-center gap-3 border border-brand-orange/40 px-4 py-1.5 mb-12 bg-brand-void/90">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span className="font-syne text-xs tracking-micro text-brand-orange font-bold uppercase">
            CHAPTER TRANSITION / PAST → FUTURE
          </span>
        </div>

        {/* Dual Year Transformation Stack */}
        <div className="relative w-full py-12 flex flex-col items-center justify-center min-h-[320px]">
          {/* 2025 Fade Out */}
          <motion.div
            style={{ scale: scale2025, opacity: opacity2025 }}
            className="font-serif-display text-6xl xs:text-8xl sm:text-[140px] md:text-[180px] font-light text-brand-platinum/40 tracking-tighter leading-none select-none"
          >
            2025
          </motion.div>

          {/* Animated Connecting Timeline Bar */}
          <div className="w-64 sm:w-96 h-[2px] bg-brand-charcoal-border my-6 relative overflow-hidden">
            <motion.div
              style={{ width: progressLineWidth }}
              className="h-full bg-gradient-to-r from-brand-yellow-golden via-brand-orange to-brand-green"
            />
          </div>

          {/* 2026 Fade In */}
          <motion.div
            style={{ scale: scale2026, opacity: opacity2026 }}
            className="font-serif-display text-7xl xs:text-9xl sm:text-[160px] md:text-[220px] font-light text-brand-orange tracking-tighter leading-none select-none drop-shadow-[0_10px_40px_rgba(241,94,28,0.3)]"
          >
            2026
          </motion.div>
        </div>

        {/* Narrative Indicator */}
        <p className="font-serif-display text-2xl sm:text-4xl text-brand-white font-light max-w-2xl mt-8 leading-snug">
          From the foundation of 2025 into the <span className="italic text-brand-yellow-golden font-normal">future chapter of 2026.</span>
        </p>

        <div className="mt-8 text-xs font-syne tracking-caps text-brand-lemon font-bold uppercase">
          DUBAI INITIATIVE • UPCOMING
        </div>
      </div>
    </section>
  );
}
