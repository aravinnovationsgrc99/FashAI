"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="relative pt-4 sm:pt-6 pb-10 sm:pb-12 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 text-[#111111] dark:text-brand-white overflow-hidden">
      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-black/10 dark:border-white/10 pb-4 sm:pb-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-syne tracking-widest text-[#F15E1C] dark:text-brand-yellow-golden font-bold uppercase mb-2">
              <Layers className="w-3.5 h-3.5 text-[#F15E1C] dark:text-brand-yellow-golden" />
              <span>EVENT FORMATS &amp; SERVICES</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-light text-[#111111] dark:text-brand-white uppercase leading-none">
              WHAT WE <span className="font-serif italic font-normal text-[#F15E1C] dark:text-brand-yellow-golden">DO</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/80 max-w-md font-light leading-relaxed">
            FashAI Universal conceives, designs, and executes specialized event formats across fashion, lifestyle, corporate, product, and technology sectors.
          </p>
        </div>

        {/* Compact Editorial Event Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* EVENT BLOCK 1: FLAGSHIP FASHION EVENTS (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-syne tracking-widest text-[#F15E1C] dark:text-brand-yellow-golden uppercase font-bold">
                  FLAGSHIP FORMAT
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#F15E1C] dark:text-brand-yellow-golden/80" />
              </div>

              {/* Clean Controlled Image Frame (25-35% Height Reduction) */}
              <div className="relative aspect-[16/8.5] w-full overflow-hidden rounded-xl bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                <Image
                  src="/assets/events/fashion_events.png"
                  alt="Fashion event and runway experience"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  priority
                />
              </div>

              <div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-1">
                  FASHION EVENTS
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/85 font-light leading-relaxed">
                  High-impact runway productions, designer showcases, and high-fashion presentations.
                </p>

                {/* Category Feature Badges */}
                <div className="flex flex-wrap gap-2 pt-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-medium">
                    RUNWAY PRODUCTIONS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-medium">
                    DESIGNER SHOWCASES
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-medium">
                    COUTURE SALONS
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Information Strip & CTA */}
            <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 space-y-3">
              <div className="space-y-0.5">
                <p className="font-syne text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#F15E1C] dark:text-brand-orange">
                  FROM CONCEPT TO CATWALK
                </p>
                <p className="font-sans text-xs text-[#555555] dark:text-brand-platinum/80 font-light">
                  Creative Direction • Production • Talent • Stage • Experience
                </p>
              </div>

              <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-brand-yellow-golden hover:bg-[#FFEC69] text-black px-5 py-2 rounded-full font-syne text-[11px] font-bold tracking-wider transition-all shadow-sm"
                >
                  <span>EXPLORE EVENT FORMATS</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* SUPPORTING EVENTS (Span 5 Stacked) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:gap-5">
            {/* EVENT BLOCK 2: LIFESTYLE EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between overflow-hidden hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="relative aspect-[16/7.5] w-full overflow-hidden rounded-xl mb-2.5 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                  <Image
                    src="/assets/events/lifestyle_events.png"
                    alt="FashAI Universal lifestyle event"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <h3 className="font-serif-display text-lg sm:text-xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-0.5">
                  LIFESTYLE EVENTS
                </h3>

                <p className="font-sans text-xs text-[#555555] dark:text-brand-platinum/80 font-light leading-relaxed">
                  Curated Luxury Experiences &amp; Brand Activations.
                </p>
              </div>
            </motion.div>

            {/* EVENT BLOCK 3: PRODUCT EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between overflow-hidden hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="relative aspect-[16/7.5] w-full overflow-hidden rounded-xl mb-2.5 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                  <Image
                    src="/assets/events/product_events.png"
                    alt="FashAI Universal product event"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <h3 className="font-serif-display text-lg sm:text-xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-0.5">
                  PRODUCT EVENTS
                </h3>

                <p className="font-sans text-xs text-[#555555] dark:text-brand-platinum/80 font-light leading-relaxed">
                  Launches &amp; Experiential Showcases.
                </p>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM ROW: CORPORATE & IT EVENTS (Span 12 Split) */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* EVENT BLOCK 4: CORPORATE EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between overflow-hidden hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="relative aspect-[16/7.5] w-full overflow-hidden rounded-xl mb-2.5 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                  <Image
                    src="/assets/events/corporate_events.png"
                    alt="FashAI Universal corporate event"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <h3 className="font-serif-display text-xl sm:text-2xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-0.5">
                  CORPORATE EVENTS
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/80 font-light leading-relaxed">
                  Sophisticated corporate experiences, gala dinners, and industry conferences.
                </p>
              </div>
            </motion.div>

            {/* EVENT BLOCK 5: IT EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between overflow-hidden hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="relative aspect-[16/7.5] w-full overflow-hidden rounded-xl mb-2.5 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                  <Image
                    src="/assets/events/it_events.png"
                    alt="FashAI Universal technology and IT event"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <h3 className="font-serif-display text-xl sm:text-2xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-0.5">
                  IT EVENTS
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#555555] dark:text-brand-platinum/80 font-light leading-relaxed">
                  Curated technology showcases, digital summits, and computational fashion forums.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
