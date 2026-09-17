"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PrismScene from "../cinematic/PrismScene";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] sm:min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-12 overflow-hidden bg-brand-void">
      {/* Three.js Metallic Gold Prism Scene Layer */}
      <PrismScene />

      {/* Minimal Void Background Vignette Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-vignette" />

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 my-auto py-8 sm:py-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/40 px-3 py-1 mb-6 sm:mb-8 text-[9px] sm:text-[10px] font-syne tracking-micro text-brand-gold">
            <span className="h-1.5 w-1.5 bg-brand-gold animate-pulse" />
            <span>FASHAI UNIVERSAL</span>
          </div>

          <h1 className="font-serif-display text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[130px] font-light text-brand-off-white leading-[0.92] sm:leading-[0.88] tracking-tight">
            FASHION
            <span className="block italic font-normal text-gold-gradient mt-1 sm:mt-0">
              BEYOND BORDERS
            </span>
          </h1>

          <div className="mt-8 sm:mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 border-t border-hairline-gold pt-6 sm:pt-8">
            <div>
              <p className="font-serif-display text-lg sm:text-2xl text-brand-gold font-light mb-2">
                Where fashion, culture and experience converge.
              </p>
              <p className="font-sans text-xs sm:text-sm font-light text-brand-platinum max-w-lg leading-relaxed">
                Creating international haute runway presentations, bespoke fashion symposiums, and luxury lifestyle experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-shrink-0 w-full sm:w-auto">
              <Link
                href="/projects"
                className="bg-gradient-to-r from-[#F5DFB3] via-[#D4AF37] to-[#A37F2C] px-8 py-3.5 sm:py-4 text-xs font-syne tracking-caps font-bold text-brand-void hover:opacity-90 transition-opacity text-center min-h-[44px] flex items-center justify-center shadow-lg"
                data-cursor="explore"
              >
                EXPLORE ↘
              </Link>
              <Link
                href="/upcoming"
                className="border border-hairline-gold bg-brand-charcoal/80 px-8 py-3.5 sm:py-4 text-xs font-syne tracking-caps text-brand-off-white hover:bg-brand-gold/10 hover:border-brand-gold transition-colors text-center min-h-[44px] flex items-center justify-center"
                data-cursor="view"
              >
                LIFESTYLE 2026 ↗
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Metadata Indicator */}
      <div className="relative z-10 flex justify-between items-center text-[9px] sm:text-[10px] font-syne tracking-micro text-brand-platinum pt-4 sm:pt-6 border-t border-hairline max-w-7xl mx-auto w-full">
        <span>HAUTE COUTURE PRESENTATIONS</span>
        <span className="text-brand-gold font-bold">DUBAI — PARIS</span>
      </div>
    </section>
  );
}


