"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Chapter2026() {
  return (
    <section id="2026" className="relative w-full flex flex-col justify-center py-10 sm:py-14 px-4 sm:px-8 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Light Yellow & Orange Radial Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FFEC69]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative z-10 container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* Unboxed Clean Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-syne text-xs tracking-micro text-brand-orange font-bold uppercase">
              UPCOMING CHAPTER
            </span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-light text-brand-white tracking-tight mb-1 uppercase">
            FashAI Universal
          </h2>

          {/* Golden Yellow 2026 Typography */}
          <div className="font-serif-display text-6xl sm:text-[110px] md:text-[160px] lg:text-[180px] font-light text-brand-yellow-golden tracking-tighter leading-none select-none my-1 drop-shadow-[0_10px_35px_rgba(250,182,10,0.25)]">
            2026
          </div>

          <p className="font-syne text-xs sm:text-sm tracking-caps text-brand-orange font-bold mb-4 uppercase">
            DUBAI, UNITED ARAB EMIRATES
          </p>

          <p className="font-sans text-xs sm:text-base text-brand-platinum/90 font-light leading-relaxed max-w-2xl mb-8">
            The next evolution of the FashAI Universal initiative. Bringing together computational fashion, spatial design, and exclusive delegate salons set against Dubai’s monumental landscape.
          </p>

          {/* Factual Specifications Banner — Refined Theme Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
            <div className="border border-brand-yellow-golden/30 bg-[#090807] p-5 text-center rounded-2xl shadow-md">
              <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold block mb-1 uppercase">
                DESTINATION
              </span>
              <span className="font-serif-display text-xl sm:text-2xl text-brand-white font-light block uppercase">
                DUBAI
              </span>
              <span className="text-[9px] font-syne text-brand-orange font-bold uppercase mt-1 block">
                CONFIRMED
              </span>
            </div>

            <div className="border border-brand-yellow-golden/30 bg-[#090807] p-5 text-center rounded-2xl shadow-md">
              <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold block mb-1 uppercase">
                EVENT DETAILS
              </span>
              <span className="font-serif-display text-lg sm:text-xl text-brand-yellow-golden font-light block uppercase">
                COMING SOON
              </span>
              <span className="text-[9px] font-syne text-brand-orange font-bold uppercase mt-1 block">
                ANNOUNCEMENT PENDING
              </span>
            </div>

            <div className="border border-brand-yellow-golden/30 bg-[#090807] p-5 text-center rounded-2xl shadow-md">
              <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold block mb-1 uppercase">
                LOCATION DETAILS
              </span>
              <span className="font-serif-display text-lg sm:text-xl text-brand-white font-light block uppercase">
                TO BE ANNOUNCED
              </span>
              <span className="text-[9px] font-syne text-brand-green font-bold uppercase mt-1 block">
                SELECTION IN PROGRESS
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/2026"
              className="bg-brand-orange px-8 py-3.5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:scale-105 transition-all duration-300 shadow-xl inline-block rounded-full"
              data-cursor="explore"
            >
              DISCOVER 2026 DETAILS ↗
            </Link>
            <Link
              href="/contact"
              className="border border-brand-yellow-golden/60 bg-[#080706] px-8 py-3.5 text-xs font-syne tracking-caps font-bold text-brand-white keep-white hover:bg-brand-yellow-golden/15 hover:border-brand-yellow-golden transition-all duration-300 inline-block rounded-full"
            >
              REGISTER FOR UPDATES ↗
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
