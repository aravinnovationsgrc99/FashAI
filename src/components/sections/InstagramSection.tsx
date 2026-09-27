"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Facebook } from "lucide-react";

export default function InstagramSection() {
  const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61573489951314";
  const INSTAGRAM_URL = "https://www.instagram.com/fashai_universal";

  return (
    <section id="socials" className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] text-[#111111] dark:text-white overflow-hidden select-none">
      {/* Edge-to-Edge Full Bleed Background Image (Light & Dark Mode Images) */}
      <div className="absolute inset-0 z-0">
        {/* Light Mode Background Image */}
        <Image
          src="/assets/events/instagram_background_light.png"
          alt="FashAI Universal Social Campaign Light"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          className="block dark:hidden object-cover object-center filter contrast-[1.03] brightness-[1.02]"
          priority
        />
        {/* Dark Mode Background Image */}
        <Image
          src="/assets/events/instagram_background_dark.png"
          alt="FashAI Universal Social Campaign Dark"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          className="hidden dark:block object-cover object-center filter contrast-[1.04] brightness-90"
          priority
        />
        {/* Soft Ambient Overlay for Maximum Image Visibility & Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-white/20 dark:from-black/90 dark:via-black/75 dark:to-black/50" />
      </div>

      {/* Content Container (Center Aligned) */}
      <div className="container-editorial relative z-10 py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8"
        >
          {/* Eyebrow with Thin Editorial Rules */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-[#F15E1C] dark:bg-[#D4AF37]" />
            <span className="text-sm sm:text-base md:text-lg font-syne tracking-[0.28em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase">
              OFFICIAL SOCIAL CHANNELS
            </span>
            <span className="w-12 h-[1px] bg-[#F15E1C] dark:bg-[#D4AF37]" />
          </div>

          {/* Main Heading */}
          <h2 className="font-serif-display text-5xl xs:text-6xl sm:text-8xl md:text-9xl lg:text-[100px] xl:text-[115px] font-light text-[#111111] dark:text-white uppercase leading-[0.88] tracking-tight drop-shadow-sm">
            FOLLOW OUR <br />
            <span className="font-serif italic font-normal text-[#F15E1C] dark:text-[#D4AF37]">
              JOURNEY
            </span>
          </h2>

          {/* Social Handles */}
          <div className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#111111] dark:text-white tracking-tight">
            @fashai_universal
          </div>

          {/* Short Description */}
          <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-[#222222] dark:text-white/85 font-normal max-w-2xl mx-auto leading-relaxed">
            Connect with our official channels for runway highlights, backstage captures, event updates, and announcements across Instagram &amp; Facebook.
          </p>

          {/* CTAs (Instagram & Facebook Social Destinations) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E4405F] hover:bg-[#d63350] text-white px-8 py-4 rounded-full font-syne text-sm sm:text-base font-bold tracking-wider uppercase transition-all duration-300 shadow-lg group"
            >
              <Instagram className="w-5 h-5 text-white" />
              <span>INSTAGRAM</span>
              <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1565d8] text-white px-8 py-4 rounded-full font-syne text-sm sm:text-base font-bold tracking-wider uppercase transition-all duration-300 shadow-lg group"
            >
              <Facebook className="w-5 h-5 text-white" />
              <span>FACEBOOK</span>
              <ArrowUpRight className="w-5 h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
