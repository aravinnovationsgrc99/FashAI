"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function OurEventsSection() {
  return (
    <section className="relative py-14 sm:py-20 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Rich Background Atmosphere & Graphical Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-brand-orange/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-brand-green/10 blur-[170px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-yellow-golden/8 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="editorial-watermark absolute bottom-0 right-10 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none">
          EVENTS
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 border-b border-hairline-orange pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-3">
              <span className="h-px w-8 bg-brand-orange" />
              <span>EVENT ECOSYSTEM</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase">
              OUR EVENTS
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 max-w-sm font-light leading-relaxed">
            The core event experiences within the FashAI Universal platform.
          </p>
        </div>

        {/* Editorial Event Grid — Large Treatments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* EVENT 01: LIFESTYLE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative bg-[#090807] border border-brand-yellow-golden/30 p-8 sm:p-12 flex flex-col justify-between min-h-[500px] overflow-hidden rounded-3xl"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-700">
              <Image
                src="/assets/events/lifestyle_events.png"
                alt="LifeStyle Event"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden uppercase font-bold">
                  FLAGSHIP EXPERIENCE
                </span>
              </div>

              <h3 className="font-serif-display text-4xl sm:text-6xl text-brand-white font-light uppercase tracking-tight mb-4">
                LIFESTYLE
              </h3>

              <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed mb-6 max-w-md">
                Fashion, culture and lifestyle experiences bringing together computational design, haute couture, and spatial atmosphere.
              </p>

              {/* Edition Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="border border-brand-orange/40 bg-black/90 px-4 py-2 rounded-xl">
                  <span className="block text-[9px] font-syne tracking-micro text-brand-platinum/70 uppercase">
                    2025
                  </span>
                  <span className="font-syne text-xs text-brand-white font-bold uppercase">
                    Previous Edition
                  </span>
                </div>
                <div className="border border-brand-yellow-golden/40 bg-black/90 px-4 py-2 rounded-xl">
                  <span className="block text-[9px] font-syne tracking-micro text-brand-yellow-golden uppercase font-bold">
                    2026 · DUBAI
                  </span>
                  <span className="font-syne text-xs text-brand-yellow-golden font-bold uppercase">
                    Upcoming Edition
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex justify-between items-center">
              <Link
                href="/2026"
                className="inline-flex items-center gap-2 bg-brand-yellow-golden text-black px-6 py-3 text-xs font-syne tracking-caps font-bold hover:bg-yellow-400 transition-all group/btn shadow-lg rounded-full"
              >
                <span>EXPLORE LIFESTYLE</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* EVENT 02: RUNWAY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="group relative bg-[#090807] border border-brand-yellow-golden/30 p-8 sm:p-12 flex flex-col justify-between min-h-[500px] overflow-hidden rounded-3xl"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-700">
              <Image
                src="/assets/events/fashion_events.png"
                alt="Runway Event"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden uppercase font-bold">
                  PRESENTATION EXPERIENCE
                </span>
              </div>

              <h3 className="font-serif-display text-4xl sm:text-6xl text-brand-white font-light uppercase tracking-tight mb-4">
                RUNWAY
              </h3>

              <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed mb-6 max-w-md">
                Fashion presentation and runway experiences within the FashAI Universal ecosystem. Highlighting spatial choreography, lighting art, and designer silhouettes.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="border border-brand-orange/40 bg-black/90 px-4 py-2 rounded-xl">
                  <span className="block text-[9px] font-syne tracking-micro text-brand-orange uppercase font-bold">
                    PRESENTATION
                  </span>
                  <span className="font-syne text-xs text-brand-white font-bold uppercase">
                    Haute Runway Catwalk
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex justify-between items-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 border border-brand-yellow-golden/40 bg-black px-6 py-3 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all group/btn rounded-full"
              >
                <span>EXPLORE RUNWAY</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
