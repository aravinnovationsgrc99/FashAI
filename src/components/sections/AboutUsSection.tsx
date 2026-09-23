"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Globe, ShieldCheck, Compass } from "lucide-react";

export default function AboutUsSection() {
  return (
    <section id="about" className="relative py-14 sm:py-20 bg-black border-b border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-orange/5 blur-[180px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-3">
                <Sparkles className="w-4 h-4 text-brand-yellow-golden" />
                <span>ABOUT FASHAI UNIVERSAL</span>
              </div>
              <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase leading-tight mb-6">
                INTERNATIONAL FASHION & <br />
                <span className="text-brand-yellow-golden italic font-normal">EVENTS PLATFORM</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed mb-4">
                FashAI Universal is an international fashion and events platform focused on fashion experiences, curated events, creative talent, designers, artists, brands, and event participation.
              </p>
              <p className="font-sans text-xs sm:text-sm text-brand-platinum/70 font-light leading-relaxed">
                Operating across key international markets including the United Arab Emirates (Dubai) and India, FashAI Universal brings together couture presentation, talent recruitment, lifestyle summits, corporate event management, and IT event formats into a unified creative platform.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-[#0B0A09] border border-white/10">
                <Globe className="w-5 h-5 text-brand-yellow-golden mb-2" />
                <h3 className="font-syne text-xs font-bold text-white uppercase tracking-wider mb-1">
                  CROSS-BORDER
                </h3>
                <p className="font-sans text-[11px] text-brand-platinum/70 font-light">
                  Bridging fashion ecosystems in UAE and India.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B0A09] border border-white/10">
                <ShieldCheck className="w-5 h-5 text-brand-orange mb-2" />
                <h3 className="font-syne text-xs font-bold text-white uppercase tracking-wider mb-1">
                  FACTUAL INTEGRITY
                </h3>
                <p className="font-sans text-[11px] text-brand-platinum/70 font-light">
                  Transparent event details, verified talent flows.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B0A09] border border-white/10">
                <Compass className="w-5 h-5 text-brand-yellow-golden mb-2" />
                <h3 className="font-syne text-xs font-bold text-white uppercase tracking-wider mb-1">
                  EVENT EXCELLENCE
                </h3>
                <p className="font-sans text-[11px] text-brand-platinum/70 font-light">
                  Fashion, product, lifestyle, and IT event formats.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Visual Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/assets/master/models/model_01.png"
                alt="FashAI Universal About"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl">
                <span className="font-syne text-xs font-bold text-brand-yellow-golden tracking-widest uppercase block mb-1">
                  FASHAI UNIVERSAL
                </span>
                <span className="font-sans text-xs text-brand-platinum/80 font-light">
                  Dubai, UAE & India Platform
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
