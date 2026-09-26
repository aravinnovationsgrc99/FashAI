"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Chapter2025() {
  return (
    <section id="lifestyle-2025" className="relative w-full flex flex-col justify-center py-10 sm:py-14 md:py-16 bg-brand-void border-b border-hairline-orange overflow-hidden select-none">
      {/* Rich Background Atmosphere Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="editorial-watermark absolute bottom-2 left-1/2 -translate-x-1/2 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none opacity-40">
          2025 PROJECTS
        </div>
      </div>

      <div className="container-editorial relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-hairline-orange/60">
          <div>
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-2">
              <span className="h-px w-8 bg-brand-orange" />
              <span>PAST &amp; DELIVERED EDITIONS</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-brand-white uppercase">
              OUR <span className="italic text-brand-orange font-normal">PROJECTS 2025</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.facebook.com/profile.php?id=61573489951314"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#D4AF37] text-[#111111] hover:bg-[#FFEC69] px-4 py-2 text-xs font-syne tracking-caps font-bold transition-all duration-300 rounded-full shadow-md"
            >
              <span>FACEBOOK PAGE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="font-sans text-base sm:text-lg md:text-xl text-brand-white/90 max-w-2xl font-light leading-relaxed">
            Selected fashion experiences, events, campaigns and creative work delivered through the FashAI ecosystem.
          </p>

          <Link
            href="/projects"
            className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] px-7 py-3.5 text-xs sm:text-sm font-syne tracking-caps font-bold transition-all duration-300 rounded-full shadow-lg hover:scale-105 shrink-0"
          >
            <span>VIEW OUR PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
