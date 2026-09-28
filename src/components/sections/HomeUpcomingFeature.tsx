"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HomeUpcomingFeature() {
  return (
    <section className="relative w-full flex flex-col justify-center py-8 sm:py-12 md:py-14 px-4 sm:px-6 md:px-8 bg-white dark:bg-[#080706] border-b border-black/10 dark:border-white/10 text-[#111111] dark:text-white overflow-hidden select-none">
      {/* Background Watermark */}
      <div className="editorial-watermark absolute top-6 right-0 text-[15vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none text-black/[0.03] dark:text-white/[0.03]">
        DUBAI 2026
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-syne text-sm sm:text-base md:text-lg tracking-[0.25em] text-[#D4AF37] font-bold uppercase">
              UPCOMING EVENT · DUBAI 2026
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-3 text-center max-w-4xl">
            <h2 className="font-serif-display text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light tracking-tight leading-[0.9] uppercase">
              LifeStyle <span className="text-[#D4AF37] italic font-normal">2026</span>
            </h2>

            <p className="font-syne text-sm sm:text-base md:text-lg tracking-[0.25em] text-[#2E936F] font-bold uppercase pt-1">
              DUBAI &nbsp;·&nbsp; 2026
            </p>

            <p className="font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#333333] dark:text-white/90 font-light max-w-3xl mx-auto pt-2 leading-relaxed">
              An international fashion and lifestyle experience bringing together global designers, runway talent, luxury brands, and delegates.
            </p>
          </div>

          {/* Minimal Position Statement */}
          <div className="flex items-center justify-center gap-3 w-full max-w-2xl py-1">
            <span className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
            <span className="font-syne text-sm sm:text-base md:text-lg lg:text-xl tracking-wider text-[#111111] dark:text-white/95 font-bold uppercase px-2 text-center leading-normal">
              “BIGGEST INTERNATIONAL FASHION EVENTS, DUBAI | 2026”
            </span>
            <span className="hidden sm:block flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
          </div>

          {/* Open Registrations & Sponsorships Announcement Banner */}
          <div className="w-full max-w-3xl bg-[#FAF8F5] dark:bg-white/5 border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 text-center shadow-md space-y-3">
            <h3 className="font-syne text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.2em] font-bold text-[#D4AF37] uppercase block">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </h3>
            <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-[#444444] dark:text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              Enquire now for delegate registration, international designer participation, and brand sponsorship opportunities for LifeStyle 2026.
            </p>
          </div>

          {/* 3 Editorial Specification Columns */}
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/15 border-y border-black/10 dark:border-white/15 py-6 sm:py-8">
              {/* Col 1: Event Date */}
              <div className="flex flex-col items-center justify-center p-4 text-center space-y-1.5">
                <span className="text-xs sm:text-sm md:text-base font-syne tracking-widest font-bold text-[#666666] dark:text-white/70 uppercase">
                  EVENT DATE
                </span>
                <span className="font-serif-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[#D4AF37] uppercase tracking-wide">
                  TO BE ANNOUNCED
                </span>
                <span className="font-sans text-sm sm:text-base md:text-lg text-[#555555] dark:text-white/60 uppercase">
                  Dubai · 2026
                </span>
              </div>

              {/* Col 2: Event Venue */}
              <div className="flex flex-col items-center justify-center p-4 text-center space-y-1.5">
                <span className="text-xs sm:text-sm md:text-base font-syne tracking-widest font-bold text-[#666666] dark:text-white/70 uppercase">
                  EVENT VENUE
                </span>
                <span className="font-serif-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[#D4AF37] uppercase tracking-wide">
                  TO BE ANNOUNCED
                </span>
                <span className="font-sans text-sm sm:text-base md:text-lg text-[#555555] dark:text-white/60 uppercase">
                  Dubai, UAE
                </span>
              </div>

              {/* Col 3: Dress Code */}
              <div className="flex flex-col items-center justify-center p-4 text-center space-y-1.5">
                <span className="text-xs sm:text-sm md:text-base font-syne tracking-widest font-bold text-[#666666] dark:text-white/70 uppercase">
                  DRESS CODE
                </span>
                <span className="font-serif-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[#111111] dark:text-white uppercase tracking-wide">
                  HAUTE COUTURE
                </span>
                <span className="font-sans text-sm sm:text-base md:text-lg text-[#555555] dark:text-white/60 uppercase">
                  Fashionable &amp; Luxury
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 w-full sm:w-auto">
            <Link
              href="/contact?type=Registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-8 py-3.5 rounded-full font-syne text-base font-bold tracking-wider uppercase transition-all duration-300 shadow-md group"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>

            <Link
              href="/contact?type=Sponsorship"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-[#D4AF37]/60 text-[#111111] dark:text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-3.5 rounded-full font-syne text-base font-bold tracking-wider uppercase transition-all duration-300 group"
            >
              <span>SPONSORSHIP ENQUIRY</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
