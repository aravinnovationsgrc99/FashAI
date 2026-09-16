"use client";

import { motion } from "framer-motion";

export default function EditorialIntro() {
  return (
    <section
      id="manifesto"
      className="relative py-24 sm:py-32 px-6 sm:px-12 bg-brand-atelier border-t border-b border-hairline overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs font-syne tracking-micro text-brand-orange">
            01 / MANIFESTO
          </span>
          <span className="h-[1px] w-24 bg-brand-orange/40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Main Editorial Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl text-brand-off-white font-light leading-tight">
              WE BRING HAUTE COUTURE INTO THE{" "}
              <span className="italic text-brand-orange">DIGITAL AGE</span> — REDEFINING HIGH FASHION PRESENTATIONS ACROSS INTERNATIONAL BORDERS.
            </h2>
            <p className="mt-8 font-sans text-base sm:text-lg text-brand-platinum font-light leading-relaxed max-w-2xl">
              Fashprism Internationals is curated for global couturiers, patrons, models, and visionaries. By pairing classical garment sculpture with digital spatial identity, we create transcendent physical and virtual fashion moments.
            </p>
          </motion.div>

          {/* Right Micro Specifications Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 border border-hairline p-8 bg-brand-charcoal"
          >
            <h3 className="font-syne text-xs tracking-micro text-brand-gold mb-6 border-b border-hairline pb-3">
              ATELIER PARAMETERS
            </h3>

            <div className="space-y-6 font-syne text-xs tracking-caps">
              <div className="flex justify-between border-b border-hairline-light pb-3">
                <span className="text-brand-platinum">FORMAT</span>
                <span className="text-brand-off-white">HYBRID RUNWAY</span>
              </div>
              <div className="flex justify-between border-b border-hairline-light pb-3">
                <span className="text-brand-platinum">SPECTRUM</span>
                <span className="text-brand-orange">ORANGE & COUTURE</span>
              </div>
              <div className="flex justify-between border-b border-hairline-light pb-3">
                <span className="text-brand-platinum">HUB 01</span>
                <span className="text-brand-off-white">PARIS, FRANCE</span>
              </div>
              <div className="flex justify-between border-b border-hairline-light pb-3">
                <span className="text-brand-platinum">HUB 02</span>
                <span className="text-brand-off-white">DUBAI, UAE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-platinum">ARCHIVE</span>
                <span className="text-brand-gold">DIGITAL MONOGRAPH</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
