"use client";

import { motion } from "framer-motion";

export default function HomeManifesto() {
  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-brand-atelier border-b border-hairline overflow-hidden relative">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-syne tracking-micro text-brand-orange">
              03 / PHILOSOPHY
            </span>
            <span className="h-[1px] w-20 bg-brand-orange/40" />
          </div>

          {/* Core Philosophy Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-brand-off-white leading-[1.05] tracking-tight mb-8"
          >
            FASHION IS NOT A MOMENT.{" "}
            <span className="block italic text-brand-gold font-normal">
              IT IS AN EXPERIENCE.
            </span>
          </motion.h2>

          {/* Manifesto Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-base sm:text-lg md:text-xl text-brand-platinum font-light leading-relaxed border-l border-brand-orange/60 pl-6 sm:pl-8 py-2"
          >
            Fashion exists beyond garment lines and runway tracks. It is a living dialogue of culture, kinetic movement, and international identity. Fashprism Internationals connects creative visionaries across Paris and Dubai to create transcendent physical and digital fashion experiences.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
