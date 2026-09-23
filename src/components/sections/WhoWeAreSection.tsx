"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Globe, Eye } from "lucide-react";

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="relative py-24 sm:py-32 bg-black border-b border-white/10 overflow-hidden text-brand-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow-golden/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Split Editorial Image Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-brand-yellow-golden/40 shadow-[0_0_50px_rgba(250,182,10,0.15)] group">
              <Image
                src="/assets/models/model_02.jpeg"
                alt="FashAI Universal Identity"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-brand-yellow-golden/30">
                <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase block mb-1">
                  INTERNATIONAL PLATFORM
                </span>
                <p className="font-serif italic text-sm text-brand-white/90">
                  Connecting high fashion, creative talent, and brand experiences across UAE &amp; India.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow-golden/10 border border-brand-yellow-golden/40 text-brand-yellow-golden text-xs font-syne tracking-micro font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>01 — WHO WE ARE</span>
            </div>

            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase leading-tight">
              A GLOBAL FASHION <br />
              <span className="font-serif italic font-normal text-brand-yellow-golden">Movement</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed">
              FashAI Universal is an international fashion and events platform focused on luxury fashion experiences, curated runway productions, creative talent recruitment, designer showcases, and strategic brand partnerships.
            </p>

            <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed">
              Operating across Dubai, the United Arab Emirates, and India, FashAI Universal bridges the gap between emerging creative minds, established designers, fashion choreographers, stylists, makeup artists, and global industry audiences.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-brand-yellow-golden flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-syne text-xs font-bold uppercase text-brand-white tracking-wider">INTERNATIONAL REACH</h4>
                  <p className="text-[11px] font-sans text-brand-platinum/70 font-light mt-0.5">Dubai · UAE · India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-brand-yellow-golden flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-syne text-xs font-bold uppercase text-brand-white tracking-wider">CREATIVE IDENTITY</h4>
                  <p className="text-[11px] font-sans text-brand-platinum/70 font-light mt-0.5">Haute Couture &amp; Events</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
