"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PrismScene from "../cinematic/PrismScene";

export default function Hero() {
  return (
    <section className="relative min-h-[92svh] sm:min-h-[100dvh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-4 sm:px-8 lg:px-12 overflow-hidden bg-brand-void">
      {/* Background Atmosphere & Graphical Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-void via-brand-void/80 to-brand-void" />
        
        {/* Glowing Atmospheric Radial Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-brand-orange/15 blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-green/12 blur-[150px]" />
        <div className="absolute top-1/2 right-1/3 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-brand-yellow-golden/10 blur-[130px]" />

        {/* Subtle Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

        {/* Giant Background Editorial Watermark */}
        <div className="absolute -bottom-10 right-0 text-[18vw] font-serif-display font-light text-white/[0.02] uppercase tracking-tighter leading-none pointer-events-none select-none">
          UNIVERSAL
        </div>

        <div className="absolute inset-0 bg-vignette opacity-70" />
      </div>

      {/* Three.js Refractive Prism Background Layer (z-0) */}
      <PrismScene />

      {/* Main Content Layer (z-10) */}
      <div className="relative z-10 my-auto w-full max-w-7xl mx-auto py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start"
        >
          {/* Eyebrow Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-brand-void/90 border border-brand-orange/40 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg">
              <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-orange uppercase font-bold">
                FASHION × AI × EXPERIENCE
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/40 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg">
              <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-green uppercase font-bold">
                LIFESTYLE 2026 • DUBAI
              </span>
            </div>
            <div className="inline-flex items-center">
              <Image
                src="/assets/brand/PoweredByAravInnovation.jpeg"
                alt="Powered by Arav Innovation"
                width={200}
                height={52}
                priority
                className="h-7 sm:h-8 w-auto object-contain hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Primary Platform Title: FashAI Universal */}
          <h1 className="font-serif-display leading-[0.95] tracking-tight mb-4 select-none w-full">
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-light text-brand-white uppercase">
              FashAI
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff8833] to-brand-yellow-golden italic">
              Universal
            </span>
          </h1>

          {/* Event Focus Subtitle */}
          <p className="font-serif text-xl sm:text-3xl lg:text-4xl text-brand-white/95 font-light italic max-w-3xl leading-snug mb-4">
            An international fashion and lifestyle experience.
          </p>

          {/* Open Registration & Sponsorship Banner */}
          <div className="border-l-2 border-brand-orange pl-4 my-4">
            <p className="font-syne text-xs sm:text-sm tracking-caps text-brand-orange font-bold uppercase mb-1">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </p>
            <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light max-w-xl">
              LifeStyle 2026 • Dubai — Open for delegates, international designers, press, and brand sponsors.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-4">
            <Link
              href="/contact?type=Registration"
              className="bg-brand-orange px-8 py-4 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_25px_rgba(241,94,28,0.4)] transition-all duration-300 text-center min-h-[48px] flex items-center justify-center rounded-none group"
              data-cursor="explore"
            >
              <span>REGISTER / ENQUIRE</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/contact?type=Sponsorship"
              className="border border-brand-yellow-golden/50 bg-brand-void/80 backdrop-blur-md px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 text-center min-h-[48px] flex items-center justify-center rounded-none"
              data-cursor="view"
            >
              SPONSORSHIP ENQUIRY ↗
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs font-syne tracking-micro text-brand-platinum/70 pt-4 border-t border-white/10 gap-2">
        <span>LIFESTYLE 2026 — DUBAI • INTERNATIONAL EVENT</span>
        <div className="flex items-center">
          <Image
            src="/assets/brand/PoweredByAravInnovation.jpeg"
            alt="Powered by Arav Innovation"
            width={220}
            height={58}
            className="h-8 sm:h-9 w-auto object-contain hover:scale-105 transition-transform"
          />
        </div>
      </div>
    </section>
  );
}
