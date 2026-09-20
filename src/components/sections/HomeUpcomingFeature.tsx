"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeUpcomingFeature() {
  return (
    <section className="relative min-h-[90vh] w-full flex flex-col justify-center py-24 px-4 sm:px-8 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Background Atmosphere Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <Image
          src="/assets/models/model_11.jpeg"
          alt="FashAI Universe 2026 Dubai"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/85 to-brand-void/70" />
      </div>

      {/* Subtle Light Yellow & Green Radial Backdrop Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-green/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-[94%] max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-3 border border-brand-orange/40 px-4 py-2 mb-8 bg-brand-void/90 rounded-full backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-syne text-xs tracking-micro text-brand-orange font-bold uppercase">
              UPCOMING CHAPTER / 2026
            </span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-8xl font-light text-brand-white tracking-tight uppercase mb-2">
            FashAI Universe
          </h2>

          {/* Oversized Golden Yellow 2026 & Dubai Typography */}
          <div className="font-serif-display text-7xl sm:text-[140px] md:text-[200px] lg:text-[230px] font-light text-transparent bg-clip-text bg-gradient-to-b from-brand-yellow-golden to-brand-orange tracking-tighter leading-none select-none my-2 drop-shadow-[0_10px_35px_rgba(250,182,10,0.25)]">
            2026
          </div>

          <p className="font-syne text-sm sm:text-base tracking-[0.3em] text-brand-green font-bold mb-6 uppercase">
            DUBAI, UNITED ARAB EMIRATES
          </p>

          <p className="font-sans text-base sm:text-xl text-brand-platinum font-light leading-relaxed max-w-2xl mb-10">
            An architectural convergence of haute fashion, spatial light design, and computational artistry set against Dubai’s iconic futuristic landscape.
          </p>

          {/* Status Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 border border-brand-yellow-golden/40 bg-brand-charcoal/90 px-6 sm:px-8 py-3.5 mb-10 text-xs font-syne tracking-caps">
            <span className="text-brand-platinum">STATUS:</span>
            <span className="text-brand-orange font-bold">EVENT DETAILS COMING SOON</span>
            <span className="hidden sm:inline text-brand-platinum">|</span>
            <span className="text-brand-platinum">LOCATION:</span>
            <span className="text-brand-white font-bold">DUBAI</span>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.instagram.com/fashai_universal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange px-10 py-5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_25px_rgba(241,94,28,0.4)] hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-3"
              data-cursor="explore"
            >
              <span>FOLLOW THE JOURNEY</span>
              <span>↗</span>
            </a>
            <Link
              href="/upcoming"
              className="border border-brand-yellow-golden/40 bg-brand-void/80 px-10 py-5 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 inline-flex items-center justify-center"
            >
              EXPLORE 2026 CHAPTER ↗
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


