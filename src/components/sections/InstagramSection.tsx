"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function InstagramSection() {
  return (
    <section className="relative py-8 sm:py-12 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Rich Background Atmosphere Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="editorial-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none whitespace-nowrap pointer-events-none select-none">
          INSTAGRAM
        </div>
      </div>

      <div className="container-editorial relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center border border-brand-orange/40 bg-brand-void/90 backdrop-blur-md p-8 sm:p-16 shadow-2xl relative"
        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-orange" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-orange" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-orange" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-orange" />

          {/* Kicker / Tag */}
          <span className="inline-block text-xs font-syne tracking-micro text-brand-orange uppercase font-bold mb-3">
            OFFICIAL SOCIAL INSTAGRAM
          </span>

          {/* Heading */}
          <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white tracking-tight uppercase mb-2">
            FOLLOW THE JOURNEY
          </h2>

          {/* Handle */}
          <div className="text-xl sm:text-3xl font-serif italic text-brand-yellow-golden mb-4">
            @fashai_universal
          </div>

          <p className="font-syne text-xs sm:text-sm tracking-caps text-brand-green font-bold uppercase mb-4">
            LIFESTYLE 2026 • DUBAI · 2026
          </p>

          <p className="font-sans text-xs sm:text-sm text-brand-platinum max-w-xl mx-auto font-light leading-relaxed mb-6">
            Join our global community for exclusive backstage captures, luxury fashion experience updates, and official event announcements.
          </p>

          {/* Announcement Banner */}
          <div className="inline-block bg-brand-orange/10 border border-brand-orange/30 px-6 py-2.5 mb-8 text-xs font-syne tracking-caps text-brand-orange font-bold uppercase">
            REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
          </div>

          {/* Official Button CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.instagram.com/fashai_universal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-orange px-10 py-4 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_30px_rgba(241,94,28,0.5)] transition-all duration-300 group"
            >
              <span>FOLLOW ON INSTAGRAM</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <Link
              href="/contact?type=Registration"
              className="inline-flex items-center gap-2 border border-brand-yellow-golden/40 bg-brand-void px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all"
            >
              REGISTER / ENQUIRE ↗
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
