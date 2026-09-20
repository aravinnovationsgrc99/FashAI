"use client";

import { motion } from "framer-motion";

export default function EditorialIntro() {
  return (
    <section className="relative min-h-[85vh] w-full flex flex-col justify-center py-24 bg-gradient-to-b from-brand-void via-[#0E0C0B] to-brand-atelier border-t border-b border-hairline-orange overflow-hidden">
      {/* Soft Peach Atmosphere Accent Surface */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F7D7B0]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container-editorial relative z-10">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs font-syne tracking-micro text-brand-orange font-bold uppercase">
            01 / BRAND STATEMENT
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
            className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-white font-light leading-[1.05]"
          >
            Fashprism Internationals creates fashion experiences that move{" "}
            <span className="italic font-normal text-brand-orange">
              beyond the runway.
            </span>
          </motion.h2>

          {/* Supporting Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-hairline-green pt-10"
          >
            <div className="md:col-span-8">
              <p className="font-sans text-base sm:text-lg md:text-xl text-brand-platinum font-light leading-relaxed">
                We synthesize classical haute couture artistry with atmospheric spatial production. Uniting global visionaries, luxury patrons, and pioneering designers, Fashprism Internationals transforms traditional runway presentations into immersive cultural landmarks.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end text-xs font-syne tracking-caps text-brand-yellow-golden space-y-2">
              <span>PARIS</span>
              <span>DUBAI</span>
              <span className="text-brand-orange font-bold border-b border-brand-orange pb-1">EST. 2025</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



