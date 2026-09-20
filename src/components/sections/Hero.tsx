"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PrismScene from "../cinematic/PrismScene";
import { MODELS_DATA } from "@/data/models";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] sm:min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12 overflow-hidden bg-brand-void">
      {/* Background Visual Vignette Atmosphere Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/80 to-transparent" />
        <div className="absolute inset-0 bg-vignette opacity-90" />
      </div>

      {/* Three.js Refractive Prism Scene Layer */}
      <PrismScene />

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 my-auto py-12 container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow Ecosystem Tag */}
          <div className="inline-flex items-center gap-2.5 bg-brand-orange/10 border border-brand-orange/30 px-4 py-1.5 mb-8 text-[10px] font-syne tracking-micro text-brand-orange uppercase font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span>A PROJECT WITHIN FESH PRISM</span>
          </div>

          {/* Primary Identity Headline & Powering Lockup */}
          <h1 className="font-serif-display leading-[0.88] tracking-tight mb-4">
            <span className="block text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-serif font-normal text-brand-white uppercase leading-[0.9]">
              FESH AI
            </span>
            <span className="block text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[145px] font-serif font-normal text-brand-orange italic leading-[0.85] tracking-tight">
              UNIVERSE
            </span>
          </h1>

          {/* Explicit Powering Lockup */}
          <div className="text-xs sm:text-sm font-syne tracking-[0.25em] text-brand-lemon uppercase font-bold mb-8">
            Powered by RA Innovation
          </div>

          {/* Supporting Positioning Statement */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-12 items-end gap-8 border-t border-hairline-orange pt-8">
            <div className="md:col-span-7">
              <p className="font-serif-display text-xl sm:text-3xl text-brand-white font-light mb-3">
                Where fashion, technology and experience <span className="text-brand-yellow-golden italic font-normal">converge.</span>
              </p>
              <p className="font-sans text-xs sm:text-sm font-light text-brand-platinum max-w-xl leading-relaxed">
                Fesh AI Universe is a digital project within the broader Fesh Prism ecosystem, bridging spatial innovation, couture artistry, and the 2025/2026 future roadmap.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 w-full">
              <a
                href="#2025"
                className="bg-brand-orange px-8 py-4 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:translate-y-[-2px] transition-all duration-300 text-center min-h-[46px] flex items-center justify-center shadow-xl group"
                data-cursor="explore"
              >
                <span>EXPLORE THE JOURNEY</span>
                <span className="ml-2 group-hover:translate-y-1 transition-transform">↘</span>
              </a>
              <Link
                href="/2026"
                className="border border-brand-yellow-golden/40 bg-brand-charcoal/80 px-8 py-4 text-xs font-syne tracking-caps text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 text-center min-h-[46px] flex items-center justify-center"
                data-cursor="view"
              >
                2026 DUBAI ↗
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Metadata Indicator */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-syne tracking-micro text-brand-platinum pt-4 border-t border-hairline-orange/40 container-editorial gap-2">
        <span>FESH AI UNIVERSE — 2025 / 2026 ROADMAP</span>
        <span className="text-brand-orange font-bold uppercase">POWERED BY RA INNOVATION</span>
      </div>
    </section>
  );
}



