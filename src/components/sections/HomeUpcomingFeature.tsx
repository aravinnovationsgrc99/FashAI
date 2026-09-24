"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HomeUpcomingFeature() {
  return (
    <section className="relative w-full flex flex-col justify-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white dark:bg-[#111111] border-b border-black/10 dark:border-white/10 text-[#111111] dark:text-white overflow-hidden select-none">
      {/* Background Watermark */}
      <div className="editorial-watermark absolute top-4 right-0 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none text-black/[0.03] dark:text-white/[0.03]">
        DUBAI 2026
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4 sm:space-y-6 md:space-y-8"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#F15E1C] animate-pulse" />
            <span className="font-syne text-[11px] sm:text-xs tracking-[0.22em] text-[#F15E1C] dark:text-[#FAB60A] font-bold uppercase">
              UPCOMING EVENT • DUBAI 2026
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-1 sm:space-y-2">
            <h2 className="font-serif-display text-3xl xs:text-5xl sm:text-7xl md:text-8xl font-light tracking-tight uppercase leading-[0.95] sm:leading-[0.9]">
              LifeStyle <span className="text-[#F15E1C] italic font-normal">2026</span>
            </h2>

            <p className="font-syne text-[11px] sm:text-xs tracking-[0.22em] text-[#2E936F] font-bold uppercase pt-1">
              DUBAI · 2026
            </p>

            <p className="font-sans text-xs sm:text-sm md:text-base text-[#222222] dark:text-white/85 font-normal max-w-xl mx-auto pt-0.5 leading-relaxed">
              An international fashion and lifestyle experience.
            </p>
          </div>

          {/* Minimal Position Statement */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-1">
            <span className="hidden sm:block w-8 h-[1px] bg-[#F15E1C]" />
            <span className="font-syne text-[11px] sm:text-xs tracking-wider text-[#111111] dark:text-white/95 font-bold uppercase">
              “BIGGEST INTERNATIONAL FASHION EVENTS, DUBAI | 2026”
            </span>
            <span className="hidden sm:block w-8 h-[1px] bg-[#F15E1C]" />
          </div>

          {/* Open Registrations & Sponsorships Announcement Banner */}
          <div className="bg-[#F7D7B0]/30 dark:bg-white/5 border border-[#F15E1C]/35 dark:border-white/15 p-3.5 sm:p-5 max-w-3xl w-full rounded-lg text-center shadow-sm">
            <h3 className="font-syne text-xs sm:text-sm tracking-[0.18em] font-bold text-[#F15E1C] dark:text-[#FAB60A] uppercase mb-1">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#111111] dark:text-white/90 font-normal max-w-2xl mx-auto leading-relaxed">
              Enquire now for delegate registration, international designer participation, and brand sponsorship opportunities for LifeStyle 2026.
            </p>
          </div>

          {/* 3 Editorial Specification Columns */}
          <div className="w-full max-w-4xl py-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/15 border-y border-black/10 dark:border-white/15 py-3 sm:py-5">
              {/* Col 1: Event Date */}
              <div className="flex flex-col items-center justify-center px-3 py-2 md:py-0 text-center">
                <span className="text-[11px] font-syne tracking-widest font-bold text-[#111111] dark:text-white/70 uppercase block mb-0.5">
                  EVENT DATE
                </span>
                <span className="font-serif-display text-base sm:text-xl lg:text-2xl font-normal text-[#F15E1C] uppercase tracking-wide">
                  TO BE ANNOUNCED
                </span>
                <span className="font-sans text-[11px] text-[#555555] dark:text-white/60 uppercase mt-0.5">
                  Dubai · 2026
                </span>
              </div>

              {/* Col 2: Event Venue */}
              <div className="flex flex-col items-center justify-center px-3 py-2 md:py-0 text-center">
                <span className="text-[11px] font-syne tracking-widest font-bold text-[#111111] dark:text-white/70 uppercase block mb-0.5">
                  EVENT VENUE
                </span>
                <span className="font-serif-display text-base sm:text-xl lg:text-2xl font-normal text-[#F15E1C] uppercase tracking-wide">
                  TO BE ANNOUNCED
                </span>
                <span className="font-sans text-[11px] text-[#555555] dark:text-white/60 uppercase mt-0.5">
                  Dubai, UAE
                </span>
              </div>

              {/* Col 3: Dress Code */}
              <div className="flex flex-col items-center justify-center px-3 py-2 md:py-0 text-center">
                <span className="text-[11px] font-syne tracking-widest font-bold text-[#111111] dark:text-white/70 uppercase block mb-0.5">
                  DRESS CODE
                </span>
                <span className="font-serif-display text-sm sm:text-lg lg:text-xl font-normal text-[#111111] dark:text-white uppercase tracking-wide">
                  FASHIONABLE &amp; HAUTE COUTURE
                </span>
                <span className="font-sans text-[11px] text-[#555555] dark:text-white/60 uppercase mt-0.5">
                  Luxury Aesthetic
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 w-full sm:w-auto">
            <Link
              href="/contact?type=Registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F15E1C] hover:bg-[#ff6f2d] text-white px-6 py-3 rounded-md font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm group"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>

            <Link
              href="/contact?type=Sponsorship"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#111111] dark:border-white/80 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[#111111] dark:text-white px-6 py-3 rounded-md font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 group"
            >
              <span>SPONSORSHIP ENQUIRY</span>
              <ArrowUpRight className="w-4 h-4 text-[#111111] dark:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
