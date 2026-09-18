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
      <div className="relative z-10 my-auto py-12 container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2.5 bg-brand-gold/10 border border-hairline-gold px-4 py-1.5 mb-8 text-[10px] font-syne tracking-micro text-brand-gold uppercase font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span>FASHPRISM INTERNATIONALS</span>
          </div>

          <h1 className="font-serif-display leading-[0.88] tracking-tight">
            <span className="block text-2xl xs:text-3xl sm:text-5xl md:text-6xl tracking-[0.2em] font-syne font-light text-brand-off-white/90 uppercase mb-3">
              FASHION
            </span>
            <span className="block italic text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[135px] font-serif font-normal text-gold-gradient leading-[0.85] tracking-tight">
              BEYOND BORDERS
            </span>
          </h1>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-12 items-end gap-8 border-t border-hairline-gold pt-8">
            <div className="md:col-span-7">
              <p className="font-serif-display text-xl sm:text-3xl text-brand-gold font-light mb-3">
                Where fashion, culture and digital experience converge.
              </p>
              <p className="font-sans text-xs sm:text-sm font-light text-brand-platinum max-w-xl leading-relaxed">
                Creating international haute runway presentations, bespoke fashion symposiums, and luxury lifestyle experiences across Dubai and Paris.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 w-full">
              <Link
                href="/gallery"
                className="bg-gradient-to-r from-[#F5DFB3] via-[#D4AF37] to-[#A37F2C] px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-void hover:opacity-95 transition-opacity text-center min-h-[46px] flex items-center justify-center shadow-xl"
                data-cursor="explore"
              >
                VIEW VISUAL ARCHIVE ↘
              </Link>
              <Link
                href="/projects"
                className="border border-hairline-gold bg-brand-charcoal/80 px-8 py-4 text-xs font-syne tracking-caps text-brand-off-white hover:bg-brand-gold/10 hover:border-brand-gold transition-colors text-center min-h-[46px] flex items-center justify-center"
                data-cursor="view"
              >
                OUR PROJECTS ↗
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Metadata Indicator */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-syne tracking-micro text-brand-platinum pt-4 border-t border-hairline-gold/50 container-editorial gap-2">
        <span>HAUTE COUTURE PRESENTATIONS</span>
        <span className="text-brand-gold font-bold">DUBAI — PARIS — INTERNATIONAL VISUAL ARCHIVE</span>
      </div>
    </section>
  );
}



