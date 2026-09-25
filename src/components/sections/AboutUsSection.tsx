"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, ShieldCheck, Compass } from "lucide-react";

export default function AboutUsSection() {
  return (
    <section id="about" className="relative pt-3 sm:pt-4 pb-4 sm:pb-6 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 text-[#111111] dark:text-white overflow-hidden">
      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column — Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-syne tracking-micro text-[#F15E1C] dark:text-brand-orange font-bold uppercase mb-3">
                <span>ABOUT FASHAI UNIVERSAL</span>
              </div>

              <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#111111] dark:text-brand-white uppercase leading-none mb-6">
                GLOBAL FASHION &amp; <br />
                <span className="text-[#F15E1C] dark:text-brand-yellow-golden italic font-normal">EVENTS PLATFORM</span>
              </h2>

              <p className="font-sans text-base sm:text-lg md:text-xl text-[#222222] dark:text-brand-platinum font-normal leading-relaxed mb-4">
                FashAI Universal is a global fashion and events platform connecting fashion experiences, curated events, creative talent, designers, artists, brands, and event participation across international markets.
              </p>

              <p className="font-sans text-sm sm:text-base md:text-lg text-[#444444] dark:text-brand-platinum/85 font-normal leading-relaxed">
                Built to connect creative communities, talent, brands, and event ecosystems across borders, FashAI Universal brings together couture presentation, talent recruitment, lifestyle experiences, corporate event management, and IT event formats within one global creative platform.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 pt-6 border-t border-black/10 dark:border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-black/10 dark:divide-white/10">
              <div className="pb-5 sm:pb-0 sm:pr-5 lg:pr-6">
                <Globe className="w-5 h-5 text-[#F15E1C] dark:text-brand-yellow-golden mb-2" />
                <h3 className="font-syne text-xs sm:text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider mb-1">
                  GLOBAL REACH
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/80 font-normal leading-relaxed">
                  Connecting fashion, talent, brands and event ecosystems across international markets.
                </p>
              </div>

              <div className="py-5 sm:py-0 sm:px-5 lg:px-6">
                <ShieldCheck className="w-5 h-5 text-[#F15E1C] dark:text-brand-orange mb-2" />
                <h3 className="font-syne text-xs sm:text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider mb-1">
                  CROSS-BORDER
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/80 font-normal leading-relaxed">
                  Bridging creative and fashion ecosystems across the UAE, India and international markets.
                </p>
              </div>

              <div className="pt-5 sm:pt-0 sm:pl-5 lg:pl-6">
                <Compass className="w-5 h-5 text-[#F15E1C] dark:text-brand-yellow-golden mb-2" />
                <h3 className="font-syne text-xs sm:text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider mb-1">
                  EVENT EXCELLENCE
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/80 font-normal leading-relaxed">
                  Fashion, product, lifestyle, corporate, and IT event formats within one global platform.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Visual Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-[#FAF8F5] dark:bg-[#080706]">
              <Image
                src="/assets/master/models/model_01.png"
                alt="FashAI Universal About"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter contrast-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl">
                <span className="font-syne text-xs font-bold text-brand-yellow-golden tracking-widest uppercase block mb-1">
                  FASHAI UNIVERSAL
                </span>
                <span className="font-syne text-xs font-bold text-white uppercase tracking-wider block mb-1">
                  Global Fashion &amp; Events Platform
                </span>
                <span className="font-sans text-xs text-white/90 font-light block">
                  UAE · India · International Markets
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
