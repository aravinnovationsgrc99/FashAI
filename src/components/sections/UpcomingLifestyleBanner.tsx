"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function UpcomingLifestyleBanner() {
  return (
    <section className="relative py-20 sm:py-28 bg-brand-void border-b border-white/10 overflow-hidden">
      {/* Atmosphere Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-brand-green/8 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 pointer-events-none" />

      <div className="container-editorial relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#0B0908]/90 border border-brand-orange/40 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[0_0_50px_rgba(241,94,28,0.15)]"
        >
          {/* Background Editorial Photographic Art */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image
              src="/assets/models/model_01.jpeg"
              alt="LifeStyle 2026 Dubai"
              fill
              priority
              sizes="100vw"
              className="object-cover filter contrast-125 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-void via-brand-void/90 to-brand-void/60" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Event Title & Announcement */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-orange font-bold uppercase bg-brand-orange/10 border border-brand-orange/30 px-3.5 py-1">
                  UPCOMING FLAGSHIP EVENT
                </span>
                <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                  DUBAI · NOVEMBER 2026
                </span>
              </div>

              <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase tracking-tight leading-[0.95]">
                LIFESTYLE <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff8833] to-brand-yellow-golden">2026</span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-brand-platinum/90 font-light max-w-2xl leading-relaxed">
                An international fashion and lifestyle experience bringing together computational design, haute couture, spatial atmosphere, and global delegate salons.
              </p>

              {/* Status Callout Box */}
              <div className="border-l-2 border-brand-orange pl-4 py-2 bg-brand-orange/10 border border-brand-orange/20 max-w-xl">
                <span className="font-syne text-xs tracking-caps text-brand-orange font-bold uppercase block mb-0.5">
                  REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
                </span>
                <span className="font-sans text-xs text-brand-white/90 font-light">
                  Open for international designers, delegate registrations, brand sponsors, and media partners.
                </span>
              </div>
            </div>

            {/* Right Column: Event Quick Facts & CTAs */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
              <div className="space-y-3 font-syne text-xs">
                <div>
                  <span className="text-brand-platinum/70 uppercase tracking-micro text-[10px] block font-bold">
                    EVENT DATE
                  </span>
                  <span className="text-brand-white font-bold text-sm uppercase">
                    NOVEMBER 2026
                  </span>
                </div>
                <div>
                  <span className="text-brand-platinum/70 uppercase tracking-micro text-[10px] block font-bold">
                    LOCATION
                  </span>
                  <span className="text-brand-yellow-golden font-bold text-sm uppercase">
                    DUBAI · UNITED ARAB EMIRATES
                  </span>
                </div>
                <div>
                  <span className="text-brand-platinum/70 uppercase tracking-micro text-[10px] block font-bold">
                    DRESS CODE
                  </span>
                  <span className="text-brand-green font-bold text-xs uppercase">
                    FASHIONABLE &amp; HAUTE COUTURE
                  </span>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-2">
                <Link
                  href="/contact?type=Registration"
                  className="bg-brand-orange px-6 py-3.5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_25px_rgba(241,94,28,0.4)] transition-all duration-300 text-center flex items-center justify-center gap-2 group"
                  data-cursor="explore"
                >
                  <span>REGISTER / ENQUIRE</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact?type=Sponsorship"
                  className="border border-brand-yellow-golden/50 bg-brand-void/80 px-6 py-3.5 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  <span>SPONSORSHIP ENQUIRY ↗</span>
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
