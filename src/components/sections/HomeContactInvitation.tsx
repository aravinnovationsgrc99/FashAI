"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeContactInvitation() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 sm:px-12 bg-brand-atelier border-b border-hairline overflow-hidden">
      <div className="mx-auto max-w-7xl text-center flex flex-col items-center w-full">
        <span className="text-xs font-syne tracking-micro text-brand-gold font-bold block mb-6">
          05 / INVITATION
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-brand-off-white leading-[0.95] tracking-tight mb-8"
        >
          LET’S CREATE <br />
          <span className="italic font-normal text-gold-gradient">
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
          For enquiries, collaborations, partnerships, media and participation in upcoming FashAI Universal presentations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="bg-brand-gold px-10 py-5 text-xs font-syne tracking-caps font-bold text-brand-black hover:bg-brand-gold-pure transition-colors inline-block"
            data-cursor="explore"
          >
            CONTACT US ↗
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

