"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeUpcomingFeature() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 sm:px-12 bg-brand-void border-b border-hairline-orange overflow-hidden">
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

      {/* Subtle Light Yellow Radial Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFEC69]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-3 border border-brand-orange/40 px-4 py-1.5 mb-8 bg-brand-void/90">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-syne text-xs tracking-micro text-brand-orange font-bold uppercase">
              UPCOMING CHAPTER / DUBAI
            </span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-brand-white tracking-tight mb-2">
            FASHPRISM LIFESTYLE
          </h2>

          {/* Oversized Golden Yellow 2026 Typography */}
          <div className="font-serif-display text-7xl sm:text-[140px] md:text-[200px] lg:text-[240px] font-light text-brand-yellow-golden tracking-tighter leading-none select-none my-2 drop-shadow-[0_10px_35px_rgba(250,182,10,0.25)]">
            2026
          </div>

          <p className="font-syne text-xs sm:text-sm tracking-caps text-brand-lemon font-bold mb-6 uppercase">
            DUBAI, UNITED ARAB EMIRATES
          </p>

          <p className="font-sans text-base sm:text-lg text-brand-platinum font-light leading-relaxed max-w-2xl mb-10">
            An extraordinary convergence of international haute couture, luxury installations, and private delegate salons set against Dubai’s iconic landscape.
          </p>

          {/* Status Banner */}
          <div className="inline-flex items-center gap-6 border border-brand-yellow-golden/40 bg-brand-charcoal/90 px-8 py-3.5 mb-10 text-xs font-syne tracking-caps">
            <span className="text-brand-platinum">STATUS:</span>
            <span className="text-brand-orange font-bold">COMING SOON</span>
            <span className="text-brand-platinum">|</span>
            <span className="text-brand-platinum">LOCATION:</span>
            <span className="text-brand-white font-bold">DUBAI</span>
          </div>

          {/* Action CTA */}
          <div>
            <Link
              href="/upcoming"
              className="bg-brand-orange px-10 py-5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:translate-y-[-2px] transition-all duration-300 shadow-xl inline-block"
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

