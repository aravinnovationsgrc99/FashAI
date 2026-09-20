"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PrismScene from "../cinematic/PrismScene";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] min-h-[100dvh] w-full flex flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden bg-brand-void">
      {/* Background Visual Atmosphere Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-void via-brand-void/70 to-brand-void" />
        <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[40vw] h-[40vw] rounded-full bg-brand-green/10 blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-vignette opacity-80" />
      </div>

      {/* Three.js Refractive Prism & Particle Background Scene Layer */}
      <PrismScene />

      {/* Main 12-Column Full-Width Editorial Grid Hero Content */}
      <div className="relative z-10 my-auto w-[94%] max-w-[1800px] mx-auto py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end"
        >
          {/* Main Typography Column */}
          <div className="md:col-span-12 lg:col-span-10">
            {/* Tagline / Kicker */}
            <div className="inline-flex items-center gap-3 bg-brand-void/80 border border-brand-orange/40 backdrop-blur-md px-4 py-2 mb-6 sm:mb-8 rounded-full shadow-lg">
              <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-orange uppercase font-bold">
                FASHION × AI × EXPERIENCE
              </span>
            </div>

            {/* Primary Heading: FashAI Universe */}
            <h1 className="font-serif-display leading-[0.88] tracking-tight mb-4 select-none">
              <span className="block text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[135px] font-serif font-light text-brand-white uppercase leading-[0.9]">
                FashAI
              </span>
              <span className="block text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[165px] font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff8833] to-brand-yellow-golden italic leading-[0.85] tracking-tight">
                Universe
              </span>
            </h1>

            {/* Powering Lockup & Statement */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-6 mb-8 text-brand-platinum">
              <span className="text-xs sm:text-sm font-syne tracking-[0.2em] text-brand-[#FFEC69] font-bold uppercase text-brand-yellow-golden">
                Powered by Arav Innovation
              </span>
              <span className="hidden sm:inline text-brand-orange/50">•</span>
              <p className="font-serif text-lg sm:text-2xl text-brand-white/90 font-light italic">
                Where fashion, technology and imagination converge.
              </p>
            </div>
          </div>

          {/* Action CTAs & Secondary Info */}
          <div className="md:col-span-12 pt-6 border-t border-hairline-orange/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
            <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 max-w-xl font-light leading-relaxed">
              An architectural integration of computational fashion, spatial lighting, generative art and high-couture identity.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/projects"
                className="bg-brand-orange px-8 py-4 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_25px_rgba(241,94,28,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-center min-h-[48px] flex items-center justify-center rounded-none group"
                data-cursor="explore"
              >
                <span>EXPLORE THE UNIVERSE</span>
                <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/upcoming"
                className="border border-brand-yellow-golden/50 bg-brand-void/80 backdrop-blur-md px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 text-center min-h-[48px] flex items-center justify-center rounded-none"
                data-cursor="view"
              >
                UPCOMING ↗
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Metadata Indicator */}
      <div className="relative z-10 w-[94%] max-w-[1800px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-syne tracking-micro text-brand-platinum/70 pt-4 border-t border-white/10 gap-2">
        <span>FASHAI UNIVERSE — FASHION × AI × EXPERIENCE</span>
        <span className="text-brand-orange font-bold uppercase tracking-widest">
          POWERED BY ARAV INNOVATION
        </span>
      </div>
    </section>
  );
}




