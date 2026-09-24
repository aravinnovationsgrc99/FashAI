"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";

export default function InstagramSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] text-[#111111] dark:text-white overflow-hidden select-none">
      {/* Edge-to-Edge Full Bleed Background Image (Light & Dark Mode Images) */}
      <div className="absolute inset-0 z-0">
        {/* Light Mode Background Image */}
        <Image
          src="/assets/events/instagram_background_light.png"
          alt="FashAI Universal Instagram Campaign Light"
          fill
          sizes="100vw"
          className="block dark:hidden object-cover object-center filter contrast-[1.03] brightness-[1.02]"
          priority
        />
        {/* Dark Mode Background Image */}
        <Image
          src="/assets/events/instagram_background_dark.png"
          alt="FashAI Universal Instagram Campaign Dark"
          fill
          sizes="100vw"
          className="hidden dark:block object-cover object-center filter contrast-[1.04] brightness-90"
          priority
        />
        {/* Soft Ambient Overlay for Maximum Image Visibility & Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-white/20 dark:from-black/90 dark:via-black/75 dark:to-black/50" />
      </div>

      {/* Content Container (Center Aligned) */}
      <div className="container-editorial relative z-10 py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center space-y-7 sm:space-y-8"
        >
          {/* Eyebrow with Thin Editorial Rules */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-[#F15E1C] dark:bg-[#FAB60A]" />
            <span className="text-xs sm:text-sm font-syne tracking-[0.28em] text-[#F15E1C] dark:text-[#FAB60A] font-bold uppercase">
              OFFICIAL SOCIAL INSTAGRAM
            </span>
            <span className="w-12 h-[1px] bg-[#F15E1C] dark:bg-[#FAB60A]" />
          </div>

          {/* Main Heading (Significantly Larger & Center Aligned) */}
          <h2 className="font-serif-display text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[110px] xl:text-[128px] font-light text-[#111111] dark:text-white uppercase leading-[0.86] tracking-tight drop-shadow-sm">
            FOLLOW THE <br />
            <span className="font-serif italic font-normal text-[#F15E1C] dark:text-[#FAB60A]">
              JOURNEY
            </span>
          </h2>

          {/* Instagram Handle */}
          <div className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#111111] dark:text-white tracking-tight">
            @fashai_universal
          </div>

          {/* Event Details Line */}
          <p className="font-syne text-xs sm:text-sm tracking-[0.2em] font-bold text-[#F15E1C] dark:text-[#FAB60A] uppercase">
            LIFESTYLE 2026 &nbsp;·&nbsp; DUBAI &nbsp;·&nbsp; 2026
          </p>

          {/* Short Description */}
          <p className="font-sans text-xs sm:text-sm text-[#222222] dark:text-white/85 font-normal max-w-xl mx-auto leading-relaxed">
            Join our global community for exclusive backstage captures, fashion experiences, updates and official event announcements.
          </p>

          {/* CTAs (Center Aligned) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://www.instagram.com/fashai_universal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#F15E1C] hover:bg-[#ff6f2d] text-white px-8 py-4 rounded-md font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg group"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>FOLLOW ON INSTAGRAM</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <Link
              href="/contact?type=Registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-black/80 dark:border-[#FAB60A] bg-white/80 dark:bg-transparent hover:bg-black/5 dark:hover:bg-[#FAB60A]/10 text-black dark:text-white px-8 py-4 rounded-md font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm"
            >
              <span>REGISTER / ENQUIRE</span>
              <ArrowUpRight className="w-4 h-4 text-black dark:text-[#FAB60A]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
