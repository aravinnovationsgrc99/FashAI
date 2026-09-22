"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PrismScene from "../cinematic/PrismScene";

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[92vh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-4 sm:px-6 lg:px-10 overflow-hidden bg-brand-void">
      {/* Background Atmosphere & Graphical Layer (z-0) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-void via-brand-void/90 to-brand-void" />
        
        {/* Soft Ambient Radial Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-brand-orange/10 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] rounded-full bg-brand-green/10 blur-[160px]" />
        <div className="absolute top-1/2 right-1/3 w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] rounded-full bg-brand-yellow-golden/8 blur-[140px]" />

        {/* Fine Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

        {/* Editorial Watermark */}
        <div className="editorial-watermark absolute -bottom-10 right-0 text-[16vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none">
          UNIVERSAL
        </div>

        <div className="absolute inset-0 bg-vignette opacity-60" />
      </div>

      {/* Three.js Refractive Prism Background Layer (Z-1) */}
      <PrismScene />

      {/* Main Content Composition Layer (Z-10: 88-92vw Editorial Grid Container) */}
      <div className="relative z-10 my-auto container-editorial py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN (Primary Content — 52% Width on Desktop) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.1 }
              }
            }}
            className="lg:col-span-7 xl:col-span-6 flex flex-col items-start space-y-5 sm:space-y-6 max-w-3xl"
          >
            {/* 1. Small Editorial Label */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex items-center gap-3"
            >
              <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs font-syne tracking-micro text-brand-orange font-bold uppercase">
                FASHAI UNIVERSAL
              </span>
            </motion.div>

            {/* 2. Large Editorial Headline: FashAI Universal */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-serif-display leading-[0.92] tracking-tight select-none w-full"
            >
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-serif font-light text-brand-white uppercase">
                FashAI
              </span>
              <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff8833] to-brand-yellow-golden italic mt-1">
                Universal
              </span>
            </motion.h1>

            {/* 3. Official Arav Innovation Brand Lockup */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="pt-1 flex items-center gap-4"
            >
              <Image
                src="/assets/brand/Final_Powered_by_logo.png"
                alt="Powered by Arav Innovation"
                width={320}
                height={84}
                priority
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px"
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_20px_rgba(241,94,28,0.25)]"
              />
            </motion.div>

            {/* 4. Short Positioning Statement */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="font-serif text-xl sm:text-2xl lg:text-3xl text-brand-white/95 font-light italic max-w-xl leading-snug pt-1"
            >
              Fashion × AI × Experience
            </motion.p>

            {/* 5. Event Metadata & Registration Status Banner */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="border-l-2 border-brand-orange pl-4 py-1.5 space-y-1 my-2"
            >
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 px-3 py-1 rounded-full mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-orange uppercase font-bold">
                  LIFESTYLE 2026 · DUBAI
                </span>
              </div>
              <p className="font-syne text-xs sm:text-sm tracking-caps text-brand-white font-bold uppercase">
                REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
              </p>
              <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light max-w-md">
                Open for delegates, international designers, press, and brand partners.
              </p>
            </motion.div>

            {/* 6. Primary Action CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              <Link
                href="/projects"
                className="bg-brand-orange px-8 py-4 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_25px_rgba(241,94,28,0.4)] transition-all duration-300 text-center min-h-[48px] flex items-center justify-center rounded-none group"
                data-cursor="explore"
              >
                <span>EXPLORE FASHAI</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/contact"
                className="border border-brand-yellow-golden/50 bg-brand-void/80 backdrop-blur-md px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 text-center min-h-[48px] flex items-center justify-center rounded-none"
                data-cursor="view"
              >
                GET INVOLVED ↗
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN (3D Visual Framing Space on Desktop — 48–52% Width) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 h-full pointer-events-none" />

        </div>
      </div>

      {/* Clean Bottom Bar (Fluid Container) */}
      <div className="relative z-10 container-editorial flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs font-syne tracking-micro text-brand-platinum/70 pt-4 border-t border-white/10 gap-2">
        <span>LIFESTYLE 2026 — DUBAI • INTERNATIONAL EVENT PLATFORM</span>
        <span className="text-brand-orange font-semibold uppercase">FASHAI UNIVERSAL</span>
      </div>
    </section>
  );
}
