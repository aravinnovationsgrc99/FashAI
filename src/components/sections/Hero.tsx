"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PrismScene from "../cinematic/PrismScene";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 overflow-hidden bg-brand-void"
    >
      {/* Three.js Lightweight Prism 3D Visual Layer */}
      <PrismScene />

      {/* Minimal Void Background Vignette Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-vignette" />

      {/* Main Editorial Hero Typography */}
      <div className="relative z-10 my-auto py-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block bg-brand-orange/10 border border-brand-orange px-3 py-1 mb-6 text-[10px] font-syne tracking-micro text-brand-orange">
            HAUTE COUTURE DIGITAL ATELIER
          </div>

          <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-brand-off-white leading-[0.9] tracking-tight">
            FASHPRISM
            <span className="block italic text-brand-gold font-normal">
              INTERNATIONALS
            </span>
          </h1>

          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-hairline pt-8">
            <p className="font-sans text-base sm:text-lg md:text-xl font-light text-brand-off-white/90 max-w-xl leading-relaxed">
              FASHION BEYOND BORDERS. Synthesizing international runway presentations, haute couture craft, and immersive digital art installations.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#projects"
                className="bg-brand-orange px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-void hover:bg-brand-gold transition-colors text-center"
                data-cursor="explore"
              >
                DISCOVER PROJECTS ↘
              </a>
              <a
                href="#lifestyle-2026"
                className="border border-brand-gold/40 px-8 py-4 text-xs font-syne tracking-caps text-brand-off-white hover:bg-brand-gold/10 transition-colors text-center"
                data-cursor="view"
              >
                DUBAI 2026 ↗
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex justify-center items-center text-[10px] font-syne tracking-micro text-brand-platinum pt-6 border-t border-hairline">
        <div className="hidden md:block text-brand-orange animate-bounce">
          SCROLL TO EXPLORE ↓
        </div>
      </div>
    </section>
  );
}
