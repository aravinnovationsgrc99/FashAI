"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function OurEventsSection() {
  return (
    <section id="our-events" className="relative pt-3 sm:pt-4 pb-2 sm:pb-3 bg-white dark:bg-[#050505] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 overflow-hidden">
      {/* Rich Background Atmosphere & Graphical Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="editorial-watermark absolute bottom-0 right-10 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none text-black/[0.03] dark:text-white/[0.02]">
          EVENTS
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8 border-b border-black/10 dark:border-white/10 pb-5 sm:pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-[#F15E1C] dark:text-brand-orange font-bold uppercase mb-2">
              <span className="h-px w-8 bg-[#F15E1C] dark:bg-brand-orange" />
              <span>EVENT ECOSYSTEM</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] dark:text-brand-white uppercase">
              OUR EVENTS
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-brand-platinum/80 max-w-sm font-light leading-relaxed">
            The core event experiences within the FashAI Universal platform.
          </p>
        </div>

        {/* Editorial Event Grid — Full Banner Image Treatments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* EVENT 01: LIFESTYLE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative bg-[#090807] border border-[#FAB60A]/40 p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] overflow-hidden rounded-2xl shadow-xl"
          >
            {/* Full-Bleed Crisp Banner Image Layer */}
            <div className="absolute inset-0 z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <Image
                src="/assets/events/lifestyle_banner.png"
                alt="LifeStyle Event Banner"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center filter contrast-[1.05] brightness-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/80 to-black/40" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] sm:text-xs font-syne tracking-[0.2em] text-[#FAB60A] uppercase font-extrabold drop-shadow">
                  FLAGSHIP EXPERIENCE
                </span>
              </div>

              <h3 className="font-serif-display text-3xl sm:text-5xl text-white font-normal uppercase tracking-tight mb-3 drop-shadow-md keep-white">
                LIFESTYLE
              </h3>

              <p className="font-sans text-xs sm:text-sm text-neutral-200 font-normal leading-relaxed mb-5 max-w-md keep-white drop-shadow">
                Fashion, culture and lifestyle experiences bringing together computational design, haute couture, and spatial atmosphere.
              </p>

              {/* Edition Badges — Desktop / Tablet Only */}
              <div className="hidden sm:flex flex-wrap gap-2.5 mb-6">
                <div className="border border-[#F15E1C]/60 bg-black/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md">
                  <span className="block text-[9px] font-syne tracking-wider text-[#F15E1C] uppercase font-bold">
                    2025
                  </span>
                  <span className="font-syne text-xs text-white font-bold uppercase keep-white">
                    Previous Edition
                  </span>
                </div>
                <div className="border border-[#FAB60A]/60 bg-black/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md">
                  <span className="block text-[9px] font-syne tracking-wider text-[#FAB60A] uppercase font-bold">
                    2026 · DUBAI
                  </span>
                  <span className="font-syne text-xs text-[#FAB60A] font-extrabold uppercase">
                    Upcoming Edition
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/20 flex justify-between items-center">
              <Link
                href="/2026"
                className="inline-flex items-center gap-2 bg-[#FAB60A] text-[#111111] px-5 py-2.5 text-xs font-syne tracking-caps font-bold hover:bg-[#FFEC69] transition-all group/btn shadow-lg rounded-full"
              >
                <span className="text-[#111111] font-extrabold">EXPLORE LIFESTYLE</span>
                <ArrowUpRight className="w-4 h-4 text-[#111111] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* EVENT 02: RUNWAY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative bg-[#090807] border border-[#FAB60A]/40 p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] overflow-hidden rounded-2xl shadow-xl"
          >
            {/* Full-Bleed Crisp Banner Image Layer */}
            <div className="absolute inset-0 z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <Image
                src="/assets/events/runway_banner.png"
                alt="Runway Event Banner"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center filter contrast-[1.05] brightness-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/98 via-black/80 to-black/40" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] sm:text-xs font-syne tracking-[0.2em] text-[#FAB60A] uppercase font-extrabold drop-shadow">
                  PRESENTATION EXPERIENCE
                </span>
              </div>

              <h3 className="font-serif-display text-3xl sm:text-5xl text-white font-normal uppercase tracking-tight mb-3 drop-shadow-md keep-white">
                RUNWAY
              </h3>

              <p className="font-sans text-xs sm:text-sm text-neutral-200 font-normal leading-relaxed mb-4 sm:mb-6 max-w-md keep-white drop-shadow">
                Fashion presentation and runway experiences within the FashAI Universal ecosystem. Highlighting spatial choreography, lighting art, and designer silhouettes.
              </p>

              {/* Edition Badges — Desktop / Tablet Only */}
              <div className="hidden sm:flex flex-wrap gap-2.5 mb-6">
                <div className="border border-[#F15E1C]/60 bg-black/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md">
                  <span className="block text-[9px] font-syne tracking-wider text-[#F15E1C] uppercase font-bold">
                    PRESENTATION
                  </span>
                  <span className="font-syne text-xs text-white font-bold uppercase keep-white">
                    Haute Runway Catwalk
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/20 flex justify-between items-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 border border-[#FAB60A] bg-black/80 backdrop-blur-sm px-5 py-2.5 text-xs font-syne tracking-caps font-bold text-white keep-white hover:bg-[#FAB60A] hover:text-[#111111] transition-all group/btn rounded-full shadow-lg"
              >
                <span>EXPLORE RUNWAY</span>
                <ArrowUpRight className="w-4 h-4 text-[#FAB60A] group-hover/btn:text-[#111111] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
