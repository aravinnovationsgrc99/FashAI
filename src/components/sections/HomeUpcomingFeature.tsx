"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeUpcomingFeature() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 sm:px-12 bg-brand-void border-b border-hairline overflow-hidden">
      {/* Background Atmosphere Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Image
          src="/assets/models/model_11.jpeg"
          alt="Fashprism Lifestyle 2026 Dubai"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/90 to-brand-void/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* Tagline */}
          <div className="inline-flex items-center gap-3 border border-brand-gold/40 px-4 py-1.5 mb-8 bg-brand-void/90">
            <span className="h-1.5 w-1.5 bg-brand-gold animate-pulse" />
            <span className="font-syne text-xs tracking-micro text-brand-gold font-bold">
              UPCOMING CHAPTER / DUBAI
            </span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-brand-off-white tracking-tight mb-2">
            FASHPRISM LIFESTYLE
          </h2>

          {/* Oversized Metallic Gold 2026 Typography */}
          <div className="font-serif-display text-7xl sm:text-[140px] md:text-[200px] lg:text-[240px] font-light text-gold-gradient tracking-tighter leading-none select-none my-2 drop-shadow-2xl">
            2026
          </div>

          <p className="font-syne text-xs sm:text-sm tracking-caps text-brand-gold font-bold mb-6">
            DUBAI, UNITED ARAB EMIRATES
          </p>

          <p className="font-sans text-base sm:text-lg text-brand-platinum font-light leading-relaxed max-w-2xl mb-10">
            An extraordinary convergence of international haute couture, luxury installations, and private delegate salons set against Dubai’s iconic landscape.
          </p>

          {/* Factually Verified Status Banner */}
          <div className="inline-flex items-center gap-6 border border-hairline bg-brand-charcoal/90 px-8 py-3.5 mb-10 text-xs font-syne tracking-caps">
            <span className="text-brand-platinum">STATUS:</span>
            <span className="text-brand-gold font-bold">COMING SOON</span>
            <span className="text-brand-platinum">|</span>
            <span className="text-brand-platinum">LOCATION:</span>
            <span className="text-brand-off-white font-bold">DUBAI</span>
          </div>

          {/* Action CTA */}
          <div>
            <Link
              href="/upcoming"
              className="bg-brand-gold px-10 py-5 text-xs font-syne tracking-caps font-bold text-brand-black hover:bg-brand-gold-pure transition-colors inline-block"
              data-cursor="explore"
            >
              DISCOVER 2026 ↗
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

