"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface HomepageEvent {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  timing?: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}

const HOMEPAGE_EVENTS: HomepageEvent[] = [
  {
    id: "lifestyle",
    badge: "FLAGSHIP EXPERIENCE",
    title: "LIFESTYLE",
    subtitle: "FashPrism Lifestyle Week",
    description:
      "Fashion, culture and lifestyle experiences bringing together computational design, haute couture, and spatial atmosphere.",
    timing: "NOVEMBER 2026",
    image: "/assets/events/lifestyle_banner.png",
    ctaText: "EXPLORE EVENT",
    ctaHref: "/events",
  },
  {
    id: "runway",
    badge: "PRESENTATION EXPERIENCE",
    title: "RUNWAY",
    subtitle: "Haute Catwalk Showcase",
    description:
      "Fashion presentation and runway experiences within the FashAI Universal ecosystem. Highlighting spatial choreography, lighting art, and designer silhouettes.",
    image: "/assets/events/runway_banner.png",
    ctaText: "EXPLORE EVENT",
    ctaHref: "/events",
  },
];

export default function OurEventsSection() {
  return (
    <section
      id="our-events"
      className="relative py-12 sm:py-16 md:py-20 bg-white dark:bg-[#050505] text-[#111111] dark:text-white border-b border-black/10 dark:border-white/10 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="editorial-watermark absolute bottom-0 right-6 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none text-black/[0.03] dark:text-white/[0.02]">
          EVENTS
        </div>
      </div>

      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-syne tracking-widest text-[#F15E1C] dark:text-brand-orange font-bold uppercase mb-3">
            <span className="h-px w-8 bg-[#F15E1C] dark:bg-brand-orange" />
            <span>EVENT ECOSYSTEM</span>
            <span className="h-px w-8 bg-[#F15E1C] dark:bg-brand-orange" />
          </div>

          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#111111] dark:text-brand-white uppercase leading-tight">
            OUR EVENTS
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#555555] dark:text-brand-platinum/85 font-light mt-3 max-w-xl mx-auto leading-relaxed">
            FashPrism &amp; premier global event formats produced across haute couture runways and luxury lifestyle showcases.
          </p>

          <div className="w-16 h-[2px] bg-[#F15E1C] dark:bg-[#D4AF37] mx-auto mt-5" />
        </div>

        {/* Homepage Event Grid — Exactly 2 Primary Cards: LIFESTYLE & RUNWAY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {HOMEPAGE_EVENTS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-neutral-50 dark:bg-[#090807] border border-black/10 dark:border-[#D4AF37]/30 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl hover:border-[#F15E1C] dark:hover:border-[#D4AF37] transition-all duration-300"
            >
              <div>
                {/* Clean Editorial Event Image Container — NO text overlays */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10 dark:bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={idx === 0}
                  />
                </div>

                {/* Event Card Content Below Image */}
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] sm:text-xs font-syne tracking-[0.2em] text-[#F15E1C] dark:text-[#D4AF37] uppercase font-extrabold">
                      {item.badge}
                    </span>
                    {item.timing && (
                      <>
                        <span className="text-black/30 dark:text-white/30">•</span>
                        <span className="text-[10px] sm:text-xs font-syne text-[#F15E1C] dark:text-[#D4AF37] uppercase font-extrabold">
                          {item.timing}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="font-serif-display text-3xl sm:text-3xl lg:text-[26px] font-normal text-[#111111] dark:text-white uppercase tracking-tight">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-[15px] lg:text-[16px] text-[#444444] dark:text-brand-platinum/85 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Action Area */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 mt-2">
                <Link
                  href={item.ctaHref}
                  className="inline-flex items-center gap-2 bg-[#F15E1C] dark:bg-[#D4AF37] text-white dark:text-black px-6 py-3 rounded-full text-xs sm:text-[14px] font-syne tracking-caps font-bold hover:bg-[#e04f10] dark:hover:bg-[#FFEC69] transition-all shadow-md group/btn"
                >
                  <span>{item.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>

                <Link
                  href="/contact?type=EventManagement"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-syne font-bold uppercase text-[#111111] dark:text-white/80 hover:text-[#F15E1C] dark:hover:text-[#D4AF37] transition-colors"
                >
                  <span>BOOK NOW</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Bottom CTA — EXPLORE ALL EVENTS → */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-3 bg-[#F15E1C] dark:bg-[#D4AF37] text-white dark:text-black px-8 py-4 rounded-full font-syne text-xs sm:text-sm lg:text-[15px] font-bold tracking-widest uppercase hover:bg-[#e04f10] dark:hover:bg-[#FFEC69] transition-all shadow-xl group hover:scale-[1.02]"
          >
            <span>EXPLORE ALL EVENTS</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
