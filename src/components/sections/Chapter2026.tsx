"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Chapter2026() {
  return (
    <section id="2026" className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 sm:px-12 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Light Yellow & Orange Radial Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FFEC69]/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative z-10 container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-3 border border-brand-orange/40 px-4 py-1.5 mb-8 bg-brand-void/90">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-syne text-xs tracking-micro text-brand-orange font-bold uppercase">
              03 / UPCOMING CHAPTER
            </span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-brand-white tracking-tight mb-2 uppercase">
            FashAI Universal
          </h2>

          {/* Oversized Golden Yellow 2026 Typography */}
          <div className="font-serif-display text-7xl sm:text-[140px] md:text-[200px] lg:text-[240px] font-light text-brand-yellow-golden tracking-tighter leading-none select-none my-2 drop-shadow-[0_10px_35px_rgba(250,182,10,0.25)]">
            2026
          </div>

          <p className="font-syne text-xs sm:text-sm tracking-caps text-brand-lemon font-bold mb-6 uppercase">
            DUBAI, UNITED ARAB EMIRATES
          </p>

          <p className="font-sans text-base sm:text-lg text-brand-platinum font-light leading-relaxed max-w-2xl mb-10">
            The next evolution of the FashAI Universal initiative. Bringing together computational fashion, spatial design, and exclusive delegate salons set against Dubai’s monumental landscape.
          </p>

          {/* Factual Specifications Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-12">
            <div className="border border-brand-yellow-golden/30 bg-brand-charcoal/80 p-6 text-center">
              <span className="text-[10px] font-syne tracking-micro text-brand-platinum block mb-1">
                DESTINATION
              </span>
              <span className="font-serif-display text-2xl text-brand-white font-light block">
                DUBAI
              </span>
              <span className="text-[9px] font-syne text-brand-orange font-bold uppercase mt-1 block">
                CONFIRMED
              </span>
            </div>

            <div className="border border-brand-yellow-golden/30 bg-brand-charcoal/80 p-6 text-center">
              <span className="text-[10px] font-syne tracking-micro text-brand-platinum block mb-1">
                EVENT DETAILS
              </span>
              <span className="font-serif-display text-xl text-brand-yellow-golden font-light block">
                COMING SOON
              </span>
              <span className="text-[9px] font-syne text-brand-lemon font-bold uppercase mt-1 block">
                ANNOUNCEMENT PENDING
              </span>
            </div>

            <div className="border border-brand-yellow-golden/30 bg-brand-charcoal/80 p-6 text-center">
              <span className="text-[10px] font-syne tracking-micro text-brand-platinum block mb-1">
                LOCATION DETAILS
              </span>
              <span className="font-serif-display text-xl text-brand-white font-light block">
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
              className="bg-brand-orange px-10 py-5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:translate-y-[-2px] transition-all duration-300 shadow-xl inline-block"
              data-cursor="explore"
            >
              DISCOVER 2026 DETAILS ↗
            </Link>
            <Link
              href="/contact"
              className="border border-brand-yellow-golden/40 bg-brand-charcoal/80 px-8 py-5 text-xs font-syne tracking-caps text-brand-white hover:bg-brand-yellow-golden/10 transition-all duration-300 inline-block"
            >
              REGISTER FOR UPDATES ↗
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
