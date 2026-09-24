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
        staggerChildren: 0.06,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="2026"
      className="relative w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 bg-white dark:bg-[#111111] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 overflow-hidden select-none"
    >
      <div className="container-editorial relative z-10 max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:space-y-5"
        >
          {/* 1. HERO EYEBROW */}
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F15E1C] animate-pulse" />
            <span className="font-syne text-[11px] sm:text-xs tracking-[0.2em] text-[#F15E1C] dark:text-[#FAB60A] font-bold uppercase">
              UPCOMING EVENT · DUBAI 2026
            </span>
          </motion.div>

          {/* 2. MAIN TITLE */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h2 className="font-serif-display text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none uppercase">
              LIFESTYLE{" "}
              <span className="font-serif italic font-normal text-[#F15E1C]">
                2026
              </span>
            </h2>

            {/* LOCATION LINE */}
            <p className="font-syne text-[11px] sm:text-xs tracking-[0.2em] text-[#2E936F] font-bold uppercase pt-0.5">
              DUBAI &nbsp;·&nbsp; 2026
            </p>

            {/* SHORT SECONDARY STATEMENT */}
            <p className="font-sans text-xs sm:text-sm text-[#333333] dark:text-white/85 font-normal max-w-lg mx-auto pt-0.5 leading-relaxed">
              An international fashion and lifestyle experience.
            </p>
          </motion.div>

          {/* 3. MINIMAL EDITORIAL QUOTE */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-0.5"
          >
            <span className="hidden sm:block w-6 h-[1px] bg-[#F15E1C]" />
            <span className="font-syne text-[10px] sm:text-xs tracking-wider text-[#111111] dark:text-white/95 font-bold uppercase">
              “BIGGEST INTERNATIONAL FASHION EVENTS, DUBAI | 2026”
            </span>
            <span className="hidden sm:block w-6 h-[1px] bg-[#F15E1C]" />
          </motion.div>

          {/* 4. COMPACT ANNOUNCEMENT BANNER */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-2xl bg-[#F7D7B0]/30 dark:bg-white/5 border border-[#F15E1C]/35 dark:border-white/15 rounded-lg p-3 sm:p-4 text-center shadow-sm"
          >
            <span className="font-syne text-xs tracking-[0.16em] font-bold text-[#F15E1C] dark:text-[#FAB60A] uppercase block mb-0.5">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </span>
            <p className="font-sans text-xs text-[#111111] dark:text-white/90 font-normal max-w-xl mx-auto leading-normal">
              Enquire for delegate registration, international designer participation, and brand sponsorship opportunities for LifeStyle 2026.
            </p>
          </motion.div>

          {/* 5. EVENT INFORMATION (COMPACT EDITORIAL GRID) */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-3xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/15 border-y border-black/10 dark:border-white/15 py-2.5 sm:py-3.5">
              {/* COL 1: EVENT DATE */}
              <div className="flex flex-col items-center justify-center px-2 py-1.5 md:py-0 text-center">
                <span className="text-[10px] sm:text-[11px] font-syne tracking-widest font-bold text-[#111111] dark:text-white/70 uppercase block mb-0.5">
                  EVENT DATE
                </span>
                <span className="font-serif-display text-base sm:text-lg lg:text-xl font-normal text-[#F15E1C] uppercase tracking-wide">
                  TO BE ANNOUNCED
                </span>
              </div>

              {/* COL 2: EVENT VENUE */}
              <div className="flex flex-col items-center justify-center px-2 py-1.5 md:py-0 text-center">
                <span className="text-[10px] sm:text-[11px] font-syne tracking-widest font-bold text-[#111111] dark:text-white/70 uppercase block mb-0.5">
                  EVENT VENUE
                </span>
                <span className="font-serif-display text-base sm:text-lg lg:text-xl font-normal text-[#F15E1C] uppercase tracking-wide">
                  TO BE ANNOUNCED
                </span>
              </div>

              {/* COL 3: DRESS CODE */}
              <div className="flex flex-col items-center justify-center px-2 py-1.5 md:py-0 text-center">
                <span className="text-[10px] sm:text-[11px] font-syne tracking-widest font-bold text-[#111111] dark:text-white/70 uppercase block mb-0.5">
                  DRESS CODE
                </span>
                <span className="font-serif-display text-xs sm:text-base lg:text-lg font-normal text-[#111111] dark:text-white uppercase tracking-wide">
                  FASHIONABLE &amp; HAUTE COUTURE
                </span>
              </div>
            </div>
          </motion.div>

          {/* 6. CALL TO ACTIONS */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-0.5 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <Link
              href="/contact?type=Registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F15E1C] hover:bg-[#ff6f2d] text-white px-6 py-2.5 rounded-md font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm group"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/contact?type=Sponsorship"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#111111] dark:border-white/80 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[#111111] dark:text-white px-6 py-2.5 rounded-md font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 group"
            >
              <span>SPONSORSHIP ENQUIRY</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#111111] dark:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
