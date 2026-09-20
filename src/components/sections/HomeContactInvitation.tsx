"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeContactInvitation() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 sm:px-12 bg-gradient-to-b from-brand-void via-[#0C0A09] to-brand-atelier border-b border-hairline-orange overflow-hidden">
      {/* Atmosphere Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F15E1C]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl text-center flex flex-col items-center w-full relative z-10">
        <span className="text-xs font-syne tracking-micro text-brand-orange font-bold block mb-6 uppercase">
          05 / INVITATION
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-brand-white leading-[0.95] tracking-tight mb-8"
        >
          LET’S CREATE <br />
          <span className="italic font-normal text-brand-orange">
            THE NEXT MOMENT.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-sans text-base sm:text-lg text-brand-platinum font-light max-w-xl leading-relaxed mb-12"
        >
          For enquiries, collaborations, partnerships, media and participation in upcoming Fashprism Internationals presentations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="bg-brand-orange px-10 py-5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:translate-y-[-2px] transition-all duration-300 shadow-xl inline-block"
            data-cursor="explore"
          >
            CONTACT US ↗
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

