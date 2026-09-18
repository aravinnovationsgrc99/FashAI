"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PrismScene from "../cinematic/PrismScene";
import { MODELS_DATA } from "@/data/models";

export default function Hero() {
  const heroCover = MODELS_DATA.models[0]?.coverImage || "/assets/models/model-01/image-01.webp";

  return (
    <section className="relative min-h-[100svh] sm:min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12 overflow-hidden bg-brand-void">
      {/* Background Visual Anchor Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroCover}
          alt="Fashprism Fashion Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-20 filter contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/80 to-transparent" />
        <div className="absolute inset-0 bg-vignette opacity-90" />
      </div>

      {/* Three.js Metallic Gold Prism Scene Layer */}
      <PrismScene />

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 my-auto py-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/40 px-3.5 py-1 mb-8 text-[10px] font-syne tracking-micro text-brand-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span>FASHPRISM INTERNATIONALS</span>
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
                Where fashion, culture and digital experience converge.
              </p>
              <p className="font-sans text-xs sm:text-sm font-light text-brand-platinum max-w-lg leading-relaxed">
                Creating international haute runway presentations, bespoke fashion symposiums, and luxury lifestyle experiences across Dubai and Paris.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-shrink-0 w-full sm:w-auto">
              <Link
                href="/gallery"
                className="bg-gradient-to-r from-[#F5DFB3] via-[#D4AF37] to-[#A37F2C] px-8 py-3.5 sm:py-4 text-xs font-syne tracking-caps font-bold text-brand-void hover:opacity-90 transition-opacity text-center min-h-[44px] flex items-center justify-center shadow-lg"
                data-cursor="explore"
              >
                VIEW VISUAL ARCHIVE ↘
              </Link>
              <Link
                href="/projects"
                className="border border-hairline-gold bg-brand-charcoal/80 px-8 py-3.5 sm:py-4 text-xs font-syne tracking-caps text-brand-off-white hover:bg-brand-gold/10 hover:border-brand-gold transition-colors text-center min-h-[44px] flex items-center justify-center"
                data-cursor="view"
              >
                OUR PROJECTS ↗
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Metadata Indicator */}
      <div className="relative z-10 flex justify-between items-center text-[9px] sm:text-[10px] font-syne tracking-micro text-brand-platinum pt-4 border-t border-hairline max-w-7xl mx-auto w-full">
        <span>HAUTE COUTURE PRESENTATIONS</span>
        <span className="text-brand-gold font-bold">DUBAI — PARIS — INTERNATIONAL ARCHIVE</span>
      </div>
    </section>
  );
}



