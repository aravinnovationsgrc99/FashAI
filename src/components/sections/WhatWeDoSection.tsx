"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers, Sparkles } from "lucide-react";

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="relative py-14 sm:py-20 bg-[#050505] border-b border-white/10 text-brand-white overflow-hidden">
      {/* Atmosphere Glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-yellow-golden/5 blur-[190px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow-golden/10 border border-brand-yellow-golden/40 text-brand-yellow-golden text-xs font-syne tracking-micro font-bold uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>EVENT FORMATS &amp; SERVICES</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase leading-none">
              WHAT WE <span className="font-serif italic font-normal text-brand-yellow-golden">DO</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 max-w-md font-light leading-relaxed">
            FashAI Universal conceives, designs, and executes specialized event formats across fashion, lifestyle, corporate, product, and technology sectors.
          </p>
        </div>

        {/* Asymmetric Editorial Event Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* EVENT BLOCK 1: FLAGSHIP FASHION EVENTS (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group relative bg-[#090807] border border-brand-yellow-golden/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl hover:border-brand-yellow-golden transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-syne tracking-widest text-brand-yellow-golden uppercase font-bold px-3 py-1 bg-brand-yellow-golden/10 rounded-full border border-brand-yellow-golden/40">
                  FLAGSHIP FORMAT
                </span>
                <Sparkles className="w-4 h-4 text-brand-yellow-golden/70" />
              </div>

              {/* Contained Dual-Layer Image Display (100% Uncropped) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-6 bg-[#030303] border border-white/10 p-2 flex items-center justify-center">
                {/* Background ambient layer */}
                <Image
                  src="/assets/events/fashion_events.png"
                  alt=""
                  fill
                  sizes="100px"
                  className="object-cover blur-xl opacity-25 pointer-events-none"
                />
                {/* Foreground primary image — 100% visible, object-contain */}
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/events/fashion_events.png"
                    alt="Fashion event and runway experience"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-4xl font-light uppercase text-brand-white group-hover:text-brand-yellow-golden transition-colors mb-3">
                FASHION EVENTS
              </h3>

              <p className="font-sans text-xs sm:text-sm text-brand-platinum/85 font-light leading-relaxed mb-6">
                High-impact runway productions, designer showcases, and high-fashion presentations.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/apply"
                className="inline-flex items-center gap-3 bg-brand-yellow-golden hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-syne text-xs font-bold tracking-caps transition-colors shadow-lg"
              >
                <span>EXPLORE EVENT FORMATS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* SUPPORTING EVENTS (Span 5 Stacked) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-8">
            {/* EVENT BLOCK 2: LIFESTYLE EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative bg-[#090807] border border-white/10 rounded-3xl p-6 flex flex-col justify-between overflow-hidden hover:border-brand-yellow-golden/50 transition-all duration-300"
            >
              <div>
                {/* Contained Image Frame */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-4 bg-[#030303] border border-white/10 p-1.5 flex items-center justify-center">
                  <Image
                    src="/assets/events/lifestyle_events.png"
                    alt=""
                    fill
                    sizes="100px"
                    className="object-cover blur-xl opacity-20 pointer-events-none"
                  />
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/events/lifestyle_events.png"
                      alt="FashAI Universal lifestyle event"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>

                <h3 className="font-serif-display text-xl sm:text-2xl font-light uppercase text-brand-white group-hover:text-brand-yellow-golden transition-colors mb-2">
                  LIFESTYLE EVENTS
                </h3>

                <p className="font-sans text-xs text-brand-platinum/80 font-light leading-relaxed">
                  Curated Luxury Experiences &amp; Brand Activations.
                </p>
              </div>
            </motion.div>

            {/* EVENT BLOCK 3: PRODUCT EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-[#090807] border border-white/10 rounded-3xl p-6 flex flex-col justify-between overflow-hidden hover:border-brand-yellow-golden/50 transition-all duration-300"
            >
              <div>
                {/* Contained Image Frame */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-4 bg-[#030303] border border-white/10 p-1.5 flex items-center justify-center">
                  <Image
                    src="/assets/events/product_events.png"
                    alt=""
                    fill
                    sizes="100px"
                    className="object-cover blur-xl opacity-20 pointer-events-none"
                  />
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/events/product_events.png"
                      alt="FashAI Universal product event"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>

                <h3 className="font-serif-display text-xl sm:text-2xl font-light uppercase text-brand-white group-hover:text-brand-yellow-golden transition-colors mb-2">
                  PRODUCT EVENTS
                </h3>

                <p className="font-sans text-xs text-brand-platinum/80 font-light leading-relaxed">
                  Launches &amp; Experiential Showcases.
                </p>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM ROW: CORPORATE & IT EVENTS (Span 12 Split) */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* EVENT BLOCK 4: CORPORATE EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="group relative bg-[#090807] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden hover:border-brand-yellow-golden/50 transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-5 bg-[#030303] border border-white/10 p-2 flex items-center justify-center">
                  <Image
                    src="/assets/events/corporate_events.png"
                    alt=""
                    fill
                    sizes="100px"
                    className="object-cover blur-xl opacity-20 pointer-events-none"
                  />
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/events/corporate_events.png"
                      alt="FashAI Universal corporate event"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>

                <h3 className="font-serif-display text-2xl font-light uppercase text-brand-white group-hover:text-brand-yellow-golden transition-colors mb-2">
                  CORPORATE EVENTS
                </h3>

                <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed">
                  Sophisticated corporate experiences, gala dinners, and industry conferences.
                </p>
              </div>
            </motion.div>

            {/* EVENT BLOCK 5: IT EVENTS */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative bg-[#090807] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden hover:border-brand-yellow-golden/50 transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-5 bg-[#030303] border border-white/10 p-2 flex items-center justify-center">
                  <Image
                    src="/assets/events/it_events.png"
                    alt=""
                    fill
                    sizes="100px"
                    className="object-cover blur-xl opacity-20 pointer-events-none"
                  />
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/events/it_events.png"
                      alt="FashAI Universal technology and IT event"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>

                <h3 className="font-serif-display text-2xl font-light uppercase text-brand-white group-hover:text-brand-yellow-golden transition-colors mb-2">
                  IT EVENTS
                </h3>

                <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed">
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
