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
                INTERNATIONAL FASHION &amp; <br />
                <span className="text-[#F15E1C] dark:text-brand-yellow-golden italic font-normal">EVENTS PLATFORM</span>
              </h2>

              <p className="font-sans text-base sm:text-lg md:text-xl text-[#222222] dark:text-brand-platinum font-normal leading-relaxed mb-4">
                FashAI Universal is an international fashion and events platform focused on fashion experiences, curated events, creative talent, designers, artists, brands, and event participation.
              </p>

              <p className="font-sans text-sm sm:text-base md:text-lg text-[#444444] dark:text-brand-platinum/85 font-normal leading-relaxed">
                Operating across key international markets including the United Arab Emirates (Dubai) and India, FashAI Universal brings together couture presentation, talent recruitment, lifestyle summits, corporate event management, and IT event formats into a unified creative platform.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="p-4.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 shadow-sm">
                <Globe className="w-5 h-5 text-[#F15E1C] dark:text-brand-yellow-golden mb-2" />
                <h3 className="font-syne text-xs sm:text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider mb-1">
                  CROSS-BORDER
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/80 font-normal leading-relaxed">
                  Bridging fashion ecosystems in UAE and India.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#F15E1C] dark:text-brand-orange mb-2" />
                <h3 className="font-syne text-xs sm:text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider mb-1">
                  FACTUAL INTEGRITY
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/80 font-normal leading-relaxed">
                  Transparent event details, verified talent flows.
                </p>
              </div>

              <div className="p-4.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#0B0A09] border border-black/10 dark:border-white/10 shadow-sm">
                <Compass className="w-5 h-5 text-[#F15E1C] dark:text-brand-yellow-golden mb-2" />
                <h3 className="font-syne text-xs sm:text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider mb-1">
                  EVENT EXCELLENCE
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/80 font-normal leading-relaxed">
                  Fashion, product, lifestyle, and IT event formats.
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
                <span className="font-sans text-xs text-white/90 font-light">
                  Dubai, UAE &amp; India Platform
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
