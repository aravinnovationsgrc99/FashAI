"use client";

import { motion } from "framer-motion";

export default function EditorialIntro() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 sm:px-12 bg-brand-atelier border-t border-b border-hairline overflow-hidden">
      <div className="mx-auto max-w-7xl w-full">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs font-syne tracking-micro text-brand-gold font-bold">
            01 / BRAND STATEMENT
          </span>
          <span className="h-[1px] w-24 bg-brand-gold/40" />
        </div>

        <div className="max-w-5xl">
          {/* Main Statement */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-off-white font-light leading-[1.05]"
          >
            Fashprism Internationals creates fashion experiences that move{" "}
            <span className="italic font-normal text-gold-gradient">
              beyond the runway.
            </span>
          </motion.h2>

          {/* Supporting Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-hairline pt-10"
          >
            <div className="md:col-span-8">
              <p className="font-sans text-base sm:text-lg md:text-xl text-brand-platinum font-light leading-relaxed">
                We synthesize classical haute couture artistry with atmospheric spatial production. Uniting global visionaries, luxury patrons, and pioneering designers, Fashprism Internationals transforms traditional runway presentations into immersive cultural landmarks.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end text-xs font-syne tracking-caps text-brand-gold space-y-2">
              <span>PARIS</span>
              <span>DUBAI</span>
              <span className="text-brand-gold font-bold border-b border-brand-gold/40 pb-1">EST. 2025</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


