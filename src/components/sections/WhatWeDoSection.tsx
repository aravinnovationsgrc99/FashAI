"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";

import { useSiteConfig } from "@/context/SiteConfigContext";
import { AlertCircle } from "lucide-react";

export default function WhatWeDoSection() {
  const { config } = useSiteConfig();
  const services = config?.servicesSettings || [];

  const getServiceStatus = (id: string) => {
    const found = services.find((s) => s.id === id);
    return {
      isAvailable: found ? found.status === "ACTIVE" : true,
      message: found?.disabledMessage || "Currently unavailable",
    };
  };
  return (
    <section id="what-we-do" className="relative pt-8 pb-14 sm:pt-16 sm:pb-24 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 text-[#111111] dark:text-brand-white overflow-hidden">
      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 border-b border-black/10 dark:border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm md:text-base font-syne tracking-widest text-[#F15E1C] dark:text-brand-yellow-golden font-bold uppercase mb-2.5">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#F15E1C] dark:text-brand-yellow-golden" />
              <span>EVENT FORMATS &amp; SERVICES</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#111111] dark:text-brand-white uppercase leading-none tracking-tight">
              WHAT WE <span className="font-serif italic font-normal text-[#F15E1C] dark:text-brand-yellow-golden">DO</span>
            </h2>
          </div>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#555555] dark:text-brand-platinum/85 max-w-lg font-light leading-relaxed">
            FashAI Universal conceives, designs, and executes specialized event formats across fashion, lifestyle, corporate, product, and technology sectors.
          </p>
        </div>

        {/* Compact Editorial Event Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* EVENT BLOCK 1: FLAGSHIP FASHION EVENTS (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-syne tracking-widest text-[#F15E1C] dark:text-brand-yellow-golden uppercase font-bold">
                  FLAGSHIP FORMAT
                </span>
                {!getServiceStatus("fashion_events").isAvailable && (
                  <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-syne font-bold uppercase tracking-wider bg-[#F15E1C]/15 border border-[#F15E1C]/40 text-[#F15E1C] dark:text-[#FFEC69]">
                    ● {getServiceStatus("fashion_events").message}
                  </span>
                )}
              </div>

              {/* Clean Controlled Image Frame */}
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
                <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-2">
                  FASHION EVENTS
                </h3>

                <p className="font-sans text-base sm:text-lg md:text-xl text-[#555555] dark:text-brand-platinum/90 font-light leading-relaxed">
                  High-impact runway productions, designer showcases, and high-fashion presentations.
                </p>

                {/* Category Feature Badges */}
                <div className="flex flex-wrap gap-2.5 pt-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-semibold">
                    RUNWAY PRODUCTIONS
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-semibold">
                    DESIGNER SHOWCASES
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-syne uppercase tracking-wider bg-black/5 dark:bg-white/5 text-[#333333] dark:text-brand-platinum border border-black/10 dark:border-white/10 font-semibold">
                    COUTURE SALONS
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Information Strip & CTA */}
            <div className="mt-6 pt-5 border-t border-black/10 dark:border-white/10 space-y-4">
              <div className="space-y-1.5">
                <p className="font-syne text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.18em] text-[#F15E1C] dark:text-brand-orange">
                  FROM CONCEPT TO CATWALK
                </p>
                <p className="font-sans text-base sm:text-lg text-[#555555] dark:text-brand-platinum/85 font-light">
                  Creative Direction • Production • Talent • Stage • Experience
                </p>
              </div>

              <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                {getServiceStatus("fashion_events").isAvailable ? (
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2.5 bg-brand-yellow-golden hover:bg-[#FFEC69] text-black px-7 py-3 rounded-full font-syne text-xs sm:text-sm md:text-base font-bold tracking-wider transition-all shadow-sm"
                  >
                    <span>EXPLORE EVENT FORMATS</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2.5 bg-black/10 dark:bg-white/10 text-[#555555] dark:text-white/60 px-7 py-3 rounded-full font-syne text-xs sm:text-sm md:text-base font-bold tracking-wider border border-black/10 dark:border-white/10">
                    <span>{getServiceStatus("fashion_events").message.toUpperCase()}</span>
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* SUPPORTING EVENTS (Span 5 Stacked) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6 sm:gap-8">
            {/* EVENT BLOCK 2: LIFESTYLE EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="relative aspect-[16/7.5] w-full overflow-hidden rounded-xl mb-4 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                  <Image
                    src="/assets/events/lifestyle_events.png"
                    alt="FashAI Universal lifestyle event"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-2">
                  LIFESTYLE EVENTS
                </h3>

                <p className="font-sans text-base sm:text-lg text-[#555555] dark:text-brand-platinum/85 font-light leading-relaxed">
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
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="relative aspect-[16/7.5] w-full overflow-hidden rounded-xl mb-4 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                  <Image
                    src="/assets/events/product_events.png"
                    alt="FashAI Universal product event"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-2">
                  PRODUCT EVENTS
                </h3>

                <p className="font-sans text-base sm:text-lg text-[#555555] dark:text-brand-platinum/85 font-light leading-relaxed">
                  Launches &amp; Experiential Showcases.
                </p>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM ROW: BRAND SHOOTS, CORPORATE & IT EVENTS (Span 12 Split 3-Cols) */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* EVENT SERVICE BLOCK 1: BRAND SHOOTS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="relative aspect-[16/7.5] w-full overflow-hidden rounded-xl mb-4 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                  <Image
                    src="/assets/events/designer/Designer.png"
                    alt="FashAI Universal Brand Shoots Service"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-2">
                  BRAND SHOOTS
                </h3>

                <p className="font-sans text-base sm:text-lg text-[#555555] dark:text-brand-platinum/85 font-light leading-relaxed">
                  Digital PR, promotional campaigns, advertising shoots and commercial brand content.
                </p>
              </div>
            </motion.div>

            {/* EVENT SERVICE BLOCK 2: CORPORATE EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="relative aspect-[16/7.5] w-full overflow-hidden rounded-xl mb-4 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                  <Image
                    src="/assets/events/corporate_events.png"
                    alt="FashAI Universal corporate event"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-2">
                  CORPORATE EVENTS
                </h3>

                <p className="font-sans text-base sm:text-lg text-[#555555] dark:text-brand-platinum/85 font-light leading-relaxed">
                  Sophisticated corporate experiences, gala dinners, and industry conferences.
                </p>
              </div>
            </motion.div>

            {/* EVENT SERVICE BLOCK 3: IT EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden hover:border-[#F15E1C]/60 dark:hover:border-brand-yellow-golden/60 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="relative aspect-[16/7.5] w-full overflow-hidden rounded-xl mb-4 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                  <Image
                    src="/assets/events/it_events.png"
                    alt="FashAI Universal technology and IT event"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light uppercase text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-brand-yellow-golden transition-colors mb-2">
                  IT EVENTS
                </h3>

                <p className="font-sans text-base sm:text-lg text-[#555555] dark:text-brand-platinum/85 font-light leading-relaxed">
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
