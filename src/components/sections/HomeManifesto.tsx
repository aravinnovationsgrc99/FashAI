"use client";

import { motion } from "framer-motion";

export default function HomeManifesto() {
  return (
    <section className="relative min-h-[85vh] w-full flex flex-col justify-center py-24 bg-gradient-to-b from-brand-atelier via-[#120F0D] to-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Soft Peach Editorial Atmosphere Surface */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F7D7B0]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container-editorial relative z-10">
        <div className="max-w-5xl">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-syne tracking-micro text-brand-orange font-bold uppercase">
              03 / PHILOSOPHY
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1.5px] w-28 bg-brand-green origin-left"
            />
          </div>

          {/* Core Philosophy Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-brand-white leading-[1.05] tracking-tight mb-10"
          >
            FASHION IS NOT A MOMENT.{" "}
            <span className="block italic font-normal text-brand-orange">
              IT IS AN EXPERIENCE.
            </span>
          </motion.h2>

          {/* Manifesto Text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg md:text-xl text-brand-platinum font-light leading-relaxed border-l-2 border-brand-orange pl-6 sm:pl-8 py-2"
          >
            Fashion exists beyond garment lines and runway tracks. It is a living dialogue of culture, kinetic movement, and international identity. Fashprism Internationals connects creative visionaries across Paris and Dubai to create transcendent physical and digital fashion experiences.
          </motion.p>
        </div>
      </div>
    </section>
  );
}


