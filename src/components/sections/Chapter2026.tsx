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
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="2026"
      className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white dark:bg-[#111111] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 overflow-hidden select-none"
    >
      <div className="container-editorial relative z-10 max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* 1. HERO EYEBROW */}
          <motion.div variants={itemVariants} className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#F15E1C] animate-pulse" />
            <span className="font-syne text-xs sm:text-sm tracking-[0.25em] text-[#F15E1C] dark:text-[#FAB60A] font-bold uppercase">
              UPCOMING EVENT · DUBAI 2026
            </span>
          </motion.div>

          {/* 2. MAIN TITLE */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="font-serif-display text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.9] uppercase">
              LIFESTYLE{" "}
              <span className="font-serif italic font-normal text-[#F15E1C]">
                2026
              </span>
            </h2>

            {/* LOCATION LINE (#2E936F Teal Accent) */}
            <p className="font-syne text-xs sm:text-sm tracking-[0.25em] text-[#2E936F] font-bold uppercase pt-1">
              DUBAI &nbsp;·&nbsp; 2026
            </p>

            {/* SHORT SECONDARY STATEMENT */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#444444] dark:text-white/80 font-normal max-w-xl mx-auto pt-1 leading-relaxed">
              An international fashion and lifestyle experience.
            </p>
          </motion.div>

          {/* 3. MINIMAL EDITORIAL QUOTE / STATEMENT */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 pb-1"
          >
            <span className="hidden sm:block w-8 h-[1px] bg-[#F15E1C]" />
            <span className="font-syne text-xs sm:text-sm tracking-widest text-[#111111] dark:text-white/90 font-bold uppercase">
              “BIGGEST INTERNATIONAL FASHION EVENTS, DUBAI | 2026”
            </span>
            <span className="hidden sm:block w-8 h-[1px] bg-[#F15E1C]" />
          </motion.div>

          {/* 4. COMPACT ANNOUNCEMENT BANNER */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-3xl bg-[#F7D7B0]/25 dark:bg-white/5 border border-[#F15E1C]/30 dark:border-white/10 rounded-lg p-5 sm:p-6 text-center shadow-sm"
          >
            <span className="font-syne text-xs sm:text-sm tracking-[0.2em] font-bold text-[#F15E1C] dark:text-[#FAB60A] uppercase block mb-1.5">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#333333] dark:text-white/85 font-normal max-w-2xl mx-auto leading-relaxed">
              Enquire for delegate registration, international designer participation, and brand sponsorship opportunities for LifeStyle 2026.
            </p>
          </motion.div>

          {/* 5. EVENT INFORMATION (3-COLUMN CLEAN EDITORIAL GRID) */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-4xl pt-2 pb-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10 py-6">
              {/* COL 1: EVENT DATE */}
              <div className="flex flex-col items-center justify-center px-4 py-3 md:py-0 text-center">
                <span className="text-[11px] font-syne tracking-widest font-bold text-[#555555] dark:text-white/60 uppercase block mb-1">
                  EVENT DATE
                </span>
                <span className="font-serif-display text-lg sm:text-xl lg:text-2xl font-light text-[#F15E1C] uppercase tracking-wide">
                  TO BE ANNOUNCED
                </span>
              </div>

              {/* COL 2: EVENT VENUE */}
              <div className="flex flex-col items-center justify-center px-4 py-3 md:py-0 text-center">
                <span className="text-[11px] font-syne tracking-widest font-bold text-[#555555] dark:text-white/60 uppercase block mb-1">
                  EVENT VENUE
                </span>
                <span className="font-serif-display text-lg sm:text-xl lg:text-2xl font-light text-[#F15E1C] uppercase tracking-wide">
                  TO BE ANNOUNCED
                </span>
              </div>

              {/* COL 3: DRESS CODE */}
              <div className="flex flex-col items-center justify-center px-4 py-3 md:py-0 text-center">
                <span className="text-[11px] font-syne tracking-widest font-bold text-[#555555] dark:text-white/60 uppercase block mb-1">
                  DRESS CODE
                </span>
                <span className="font-serif-display text-base sm:text-lg lg:text-xl font-light text-[#111111] dark:text-white uppercase tracking-wide">
                  FASHIONABLE &amp; HAUTE COUTURE
                </span>
              </div>
            </div>
          </motion.div>

          {/* 6. CALL TO ACTIONS */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <Link
              href="/contact?type=Registration"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F15E1C] hover:bg-[#ff6f2d] text-white px-7 py-3.5 rounded-md font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md group"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/contact?type=Sponsorship"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-[#111111] dark:border-white/80 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-[#111111] dark:text-white px-7 py-3.5 rounded-md font-syne text-xs font-bold tracking-wider uppercase transition-all duration-300 group"
            >
              <span>SPONSORSHIP ENQUIRY</span>
              <ArrowUpRight className="w-4 h-4 text-[#111111] dark:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
