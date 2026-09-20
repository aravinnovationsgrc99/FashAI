"use client";

import { motion } from "framer-motion";

export default function InstagramSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-orange/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-[94%] max-w-[1800px] mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center border border-hairline-orange/60 bg-brand-void/90 backdrop-blur-md p-8 sm:p-16 shadow-2xl relative"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-orange" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-orange" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-orange" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-orange" />

          {/* Kicker / Tag */}
          <span className="inline-block text-xs font-syne tracking-micro text-brand-orange uppercase font-bold mb-4">
            OFFICIAL SOCIAL INSTAGRAM
          </span>

          {/* Heading */}
          <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white tracking-tight uppercase mb-4">
            FOLLOW THE UNIVERSE
          </h2>

          {/* Handle */}
          <div className="text-xl sm:text-3xl font-serif italic text-brand-yellow-golden mb-8">
            @fashai_universal
          </div>

          <p className="font-sans text-xs sm:text-sm text-brand-platinum max-w-xl mx-auto font-light leading-relaxed mb-10">
            Join our global community for exclusive backstage captures, architectural couture studies, digital spatial lighting, and official event announcements.
          </p>

          {/* Official Button CTA */}
          <div>
            <a
              href="https://www.instagram.com/fashai_universal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-orange px-10 py-5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_30px_rgba(241,94,28,0.5)] hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span>FOLLOW ON INSTAGRAM</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
