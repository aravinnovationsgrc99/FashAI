"use client";

import { motion } from "framer-motion";

export default function FeshAiIntro() {
  return (
    <section className="relative min-h-[75vh] w-full flex flex-col justify-center py-24 bg-gradient-to-b from-brand-void via-[#0E0C0B] to-brand-atelier border-t border-b border-hairline-orange overflow-hidden">
      {/* Soft Atmosphere Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F15E1C]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container-editorial relative z-10">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-xs font-syne tracking-micro text-brand-orange font-bold uppercase">
            01 / PROJECT IDENTITY
          </span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1.5px] w-32 bg-brand-green origin-left"
          />
        </div>

        <div className="max-w-6xl">
          {/* Main Statement */}
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-white font-light leading-[1.1]"
          >
            Fesh AI Universe is a digital project within{" "}
            <span className="italic font-normal text-brand-orange">
              Fesh Prism,
            </span>{" "}
            bringing technology and haute fashion into one continuous experience.
          </motion.h2>

          {/* Supporting Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-hairline-orange pt-10"
          >
            <div className="md:col-span-8">
              <p className="font-sans text-base sm:text-lg text-brand-platinum font-light leading-relaxed">
                Developing spatial fashion environments, computational silhouettes, and international cultural milestones. Fash AI Universe represents the intersection of creative vision and technology engineering across the 2025 and 2026 roadmap.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end text-xs font-syne tracking-caps text-brand-yellow-golden space-y-2">
              <span className="text-brand-orange font-bold uppercase">FESH AI UNIVERSE</span>
              <span className="text-brand-lemon font-semibold">POWERED BY RA INNOVATION</span>
              <span className="text-brand-platinum text-[10px]">A PROJECT WITHIN FESH PRISM</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
