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
            FashAI Universe is an international digital experience{" "}
            <span className="text-brand-orange italic font-normal">
              where fashion, technology and imagination converge.
            </span>
          </motion.h2>

          {/* Supporting Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14"
          >
            <p className="font-sans text-base sm:text-lg text-brand-platinum font-light leading-relaxed mb-8">
              FashAI Universe connects fashion, technology and imagination within a global digital framework.
            </p>

            <div className="pt-8 border-t border-hairline-orange grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <span className="font-syne text-[10px] tracking-micro text-brand-orange uppercase font-bold block mb-1">
                  FASHION × AI × EXPERIENCE
                </span>
                <p className="font-sans text-xs text-brand-platinum font-light">
                  Bridging physical garment art with spatial lighting and high-couture identity.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end text-xs font-syne tracking-caps text-brand-yellow-golden space-y-2">
                <span className="text-brand-orange font-bold uppercase">FASHAI UNIVERSE</span>
                <span className="text-brand-lemon font-semibold">POWERED BY ARAV INNOVATION</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
