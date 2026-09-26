"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Chapter2026() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="2026"
      className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-white dark:bg-[#080706] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 overflow-hidden select-none"
    >
      {/* Background Watermark */}
      <div className="editorial-watermark absolute top-6 right-0 text-[15vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none text-black/[0.03] dark:text-white/[0.03]">
        DUBAI 2026
      </div>

      <div className="container-editorial relative z-10 max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* 1. EVENT LABEL */}
          <motion.div variants={itemVariants} className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-pulse" />
            <span className="font-syne text-xs sm:text-sm tracking-[0.25em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase">
              UPCOMING EVENT · DUBAI 2026
            </span>
          </motion.div>

          {/* 2. LIFESTYLE 2026 TITLE & SUB-TITLE */}
          <motion.div variants={itemVariants} className="space-y-2 text-center max-w-3xl">
            <h2 className="font-serif-display text-4xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.9] uppercase">
              LIFESTYLE{" "}
              <span className="font-serif italic font-normal text-[#F15E1C] dark:text-[#D4AF37]">
                2026
              </span>
            </h2>

            {/* DUBAI · 2026 LOCATION LABEL */}
            <p className="font-syne text-xs sm:text-sm tracking-[0.25em] text-[#2E936F] dark:text-[#2E936F] font-bold uppercase pt-1">
              DUBAI &nbsp;·&nbsp; 2026
            </p>

            {/* ENLARGED READABLE SUPPORTING DESCRIPTION */}
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#333333] dark:text-white/90 font-light max-w-2xl mx-auto pt-2 leading-relaxed">
              An international fashion and lifestyle experience bringing together global designers, runway talent, luxury brands, and delegates.
            </p>
          </motion.div>

          {/* 3. EVENT STATEMENT / HIGHLIGHT */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 w-full max-w-xl py-1"
          >
            <span className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#F15E1C]/60 to-[#F15E1C]" />
            <span className="font-syne text-xs sm:text-sm tracking-wider text-[#111111] dark:text-white/95 font-bold uppercase px-2 text-center">
              “BIGGEST INTERNATIONAL FASHION EVENTS, DUBAI | 2026”
            </span>
            <span className="hidden sm:block flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#F15E1C]/60 to-[#F15E1C]" />
          </motion.div>

          {/* 4. REGISTRATION & SPONSORSHIP ANNOUNCEMENT CARD */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-2xl bg-[#FAF8F5] dark:bg-white/5 border border-[#F15E1C]/40 dark:border-white/15 rounded-2xl p-5 sm:p-6 text-center shadow-md space-y-2"
          >
            <span className="font-syne text-xs sm:text-sm tracking-[0.2em] font-bold text-[#F15E1C] dark:text-[#D4AF37] uppercase block">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </span>
            <p className="font-sans text-sm sm:text-base text-[#444444] dark:text-white/90 font-light max-w-xl mx-auto leading-relaxed">
              Enquire now for delegate registration, international designer participation, and brand sponsorship opportunities for LifeStyle 2026.
            </p>
          </motion.div>

          {/* 5. EVENT DETAILS GRID */}
          <motion.div variants={itemVariants} className="w-full max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/15 border-y border-black/10 dark:border-white/15 py-4 sm:py-6">
              {/* COL 1: EVENT DATE */}
              <div className="flex flex-col items-center justify-center p-3 text-center space-y-1">
                <span className="text-xs font-syne tracking-widest font-bold text-[#666666] dark:text-white/70 uppercase">
                  EVENT DATE
                </span>
                <span className="font-serif-display text-lg sm:text-xl lg:text-2xl font-light text-[#F15E1C] dark:text-[#D4AF37] uppercase tracking-wide">
                  TO BE ANNOUNCED
                </span>
                <span className="font-sans text-xs text-[#555555] dark:text-white/60 uppercase">
                  Dubai · 2026
                </span>
              </div>

              {/* COL 2: EVENT VENUE */}
              <div className="flex flex-col items-center justify-center p-3 text-center space-y-1">
                <span className="text-xs font-syne tracking-widest font-bold text-[#666666] dark:text-white/70 uppercase">
                  EVENT VENUE
                </span>
                <span className="font-serif-display text-lg sm:text-xl lg:text-2xl font-light text-[#F15E1C] dark:text-[#D4AF37] uppercase tracking-wide">
                  TO BE ANNOUNCED
                </span>
                <span className="font-sans text-xs text-[#555555] dark:text-white/60 uppercase">
                  Dubai, UAE
                </span>
              </div>

              {/* COL 3: DRESS CODE */}
              <div className="flex flex-col items-center justify-center p-3 text-center space-y-1">
                <span className="text-xs font-syne tracking-widest font-bold text-[#666666] dark:text-white/70 uppercase">
                  DRESS CODE
                </span>
                <span className="font-serif-display text-base sm:text-lg lg:text-xl font-light text-[#111111] dark:text-white uppercase tracking-wide">
                  HAUTE COUTURE
                </span>
                <span className="font-sans text-xs text-[#555555] dark:text-white/60 uppercase">
                  Fashionable &amp; Luxury
                </span>
              </div>
            </div>
          </motion.div>

          {/* 6. CALL TO ACTIONS */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
          >
            <Link
              href="/contact?type=Registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F15E1C] hover:bg-[#ff6f2d] dark:bg-[#D4AF37] dark:hover:bg-[#FFEC69] text-white dark:text-black px-8 py-4 rounded-full font-syne text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-md group"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>

            <Link
              href="/contact?type=Sponsorship"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-black/20 dark:border-white/30 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[#111111] dark:text-white px-8 py-4 rounded-full font-syne text-sm font-bold tracking-wider uppercase transition-all duration-300 group"
            >
              <span>SPONSORSHIP ENQUIRY</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
