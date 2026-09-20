"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Chapter2025() {
  return (
    <section id="2025" className="relative min-h-[90vh] w-full flex flex-col justify-center py-24 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FAB60A]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container-editorial relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-hairline-orange pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-3">
              <span className="h-px w-8 bg-brand-orange" />
              <span>02 / COMPLETED CHAPTER</span>
            </div>
            <h2 className="font-serif-display text-5xl sm:text-7xl lg:text-8xl font-light text-brand-white">
              2025
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 text-left sm:text-right">
            <span className="text-xs font-syne tracking-micro text-brand-yellow-golden font-bold block uppercase mb-1">
              PAST EXPERIENCE & FOUNDATION
            </span>
            <span className="text-[10px] font-syne tracking-caps text-brand-platinum uppercase">
              STATUS: COMPLETED CHAPTER
            </span>
          </div>
        </div>

        {/* Editorial Content Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-brand-charcoal/80 border border-hairline-orange/50 p-8 sm:p-14"
          >
            <span className="text-[10px] font-syne tracking-micro text-brand-orange bg-brand-orange/10 border border-brand-orange/30 px-3 py-1 font-bold uppercase mb-6 inline-block">
              2025 FOUNDATION
            </span>

            <h3 className="font-serif-display text-3xl sm:text-5xl font-light text-brand-white mb-6 leading-tight">
              EVENT NAME — <br />
              <span className="italic text-brand-orange font-normal">TO BE ANNOUNCED</span>
            </h3>

            <p className="font-sans text-sm sm:text-base text-brand-platinum font-light leading-relaxed mb-8">
              The inaugural 2025 chapter laid the structural foundation of the Fesh AI Universe, demonstrating initial spatial runway concepts and digital couture identity.
            </p>

            <div className="grid grid-cols-2 gap-6 border-t border-hairline-orange pt-6 text-xs font-syne tracking-caps">
              <div>
                <span className="text-brand-platinum block text-[10px] mb-1">CHAPTER STATUS</span>
                <span className="text-brand-yellow-golden font-bold">COMPLETED</span>
              </div>
              <div>
                <span className="text-brand-platinum block text-[10px] mb-1">OFFICIAL DETAILS</span>
                <span className="text-brand-white font-bold">TO BE PROVIDED</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div className="border-l-2 border-brand-orange pl-6 py-2 space-y-3">
              <h4 className="font-syne text-xs tracking-caps text-brand-orange font-bold uppercase">
                FIRST CHAPTER ARCHITECTURE
              </h4>
              <p className="font-sans text-sm text-brand-platinum font-light leading-relaxed">
                A milestone establishing the convergence of physical garment art with atmospheric digital production under the Fesh Prism umbrella.
              </p>
            </div>

            <div className="bg-brand-atelier p-6 border border-hairline-orange/30 space-y-3">
              <span className="text-[10px] font-syne tracking-micro text-brand-lemon font-bold uppercase">
                FESH AI UNIVERSE — ROADMAP
              </span>
              <p className="font-sans text-xs text-brand-platinum font-light leading-relaxed">
                Official archive summaries, retrospective footage, and event documentation will be updated as confirmed records are published.
              </p>
            </div>

            <div>
              <Link
                href="/2025"
                className="inline-flex items-center gap-3 bg-brand-charcoal border border-hairline-orange/50 px-8 py-4 text-xs font-syne tracking-caps text-brand-white hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-md font-bold"
                data-cursor="explore"
              >
                <span>EXPLORE 2025 DETAILS</span>
                <span>↗</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
