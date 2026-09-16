"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PrismScene from "../cinematic/PrismScene";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 overflow-hidden bg-brand-void">
      {/* Background Fashion Imagery Layer */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <Image
          src="/assets/models/model_01.jpeg"
          alt="Fashprism Fashion Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/85 to-brand-void/65" />
      </div>

      {/* Three.js Metallic Gold Prism Scene Layer */}
      <PrismScene />

      {/* Minimal Void Background Vignette Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-vignette" />

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 my-auto py-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2.5 bg-brand-gold/10 border border-brand-gold/40 px-3.5 py-1 mb-8 text-[10px] font-syne tracking-micro text-brand-gold">
            <span className="h-1.5 w-1.5 bg-brand-gold animate-pulse" />
            <span>FASHPRISM INTERNATIONALS</span>
          </div>

          <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-[130px] font-light text-brand-off-white leading-[0.88] tracking-tight">
            FASHION
            <span className="block italic font-normal text-gold-gradient">
              BEYOND BORDERS
            </span>
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-hairline pt-8">
            <div>
              <p className="font-serif-display text-xl sm:text-2xl text-brand-gold font-light mb-2">
                Where fashion, culture and experience converge.
              </p>
              <p className="font-sans text-xs sm:text-sm font-light text-brand-platinum max-w-lg leading-relaxed">
                Creating international haute runway presentations, bespoke fashion symposiums, and luxury lifestyle experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0">
              <Link
                href="/projects"
                className="bg-brand-gold px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-black hover:bg-brand-gold-pure transition-colors text-center"
                data-cursor="explore"
              >
                EXPLORE ↘
              </Link>
              <Link
                href="/upcoming"
                className="border border-brand-gold/40 bg-brand-charcoal/60 px-8 py-4 text-xs font-syne tracking-caps text-brand-off-white hover:bg-brand-gold/10 hover:border-brand-gold transition-colors text-center"
                data-cursor="view"
              >
                LIFESTYLE 2026 ↗
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Metadata Indicator */}
      <div className="relative z-10 flex justify-between items-center text-[10px] font-syne tracking-micro text-brand-platinum pt-6 border-t border-hairline max-w-7xl mx-auto w-full">
        <span>HAUTE COUTURE PRESENTATIONS</span>
        <span className="text-brand-gold font-bold">DUBAI — PARIS</span>
      </div>
    </section>
  );
}


