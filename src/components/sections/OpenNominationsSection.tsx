"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function OpenNominationsSection() {
  return (
    <section
      id="nominations"
      className="relative py-6 sm:py-8 bg-[#050505] border-b border-white/10 select-none overflow-hidden"
    >
      <div className="container-editorial relative z-10">
        <Link
          href="/apply"
          className="group relative block bg-[#080706] border border-brand-yellow-golden/40 hover:border-brand-yellow-golden rounded-2xl p-5 sm:p-7 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(250,182,10,0.15)] overflow-hidden"
        >
          {/* Subtle Ambient Glow on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow-golden/5 via-transparent to-brand-yellow-golden/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow-golden" />
                <span>TALENT SELECTION &amp; RECRUITMENT</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light text-brand-white uppercase leading-tight group-hover:text-brand-yellow-golden transition-colors">
                OPEN NOMINATIONS &amp; APPLICATIONS
              </h2>
              <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light max-w-xl">
                Explore current opportunities and apply to the category that fits your profile.
              </p>
            </div>

            {/* Right Action CTA Button — High-Contrast Gold Button with Bold Black Text */}
            <div className="inline-flex items-center gap-3 px-6 py-3.5 bg-brand-yellow-golden hover:bg-[#FFEC69] border border-brand-yellow-golden rounded-full text-black transition-all duration-300 text-xs font-syne font-bold uppercase tracking-wider shrink-0 self-start md:self-auto shadow-md">
              <span className="text-black font-extrabold tracking-wider">EXPLORE &amp; APPLY</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform duration-300" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
