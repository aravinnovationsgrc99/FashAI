"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Globe, Users, Eye, Award, Compass, ArrowRight } from "lucide-react";

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="relative pt-3 sm:pt-4 md:pt-5 pb-4 sm:pb-6 md:pb-8 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 overflow-hidden text-[#111111] dark:text-brand-white">
      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 sm:space-y-10"
        >
          {/* Main Title Block */}
          <div className="text-center max-w-3xl mx-auto">
            {/* Top Location Eyebrow */}
            <div className="flex items-center justify-center gap-3 w-full max-w-xs sm:max-w-sm mx-auto mb-3">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#FAB60A]/70 to-[#FAB60A]" />
              <span className="text-xs sm:text-sm font-syne tracking-[0.25em] text-[#FAB60A] font-bold uppercase whitespace-nowrap">
                DUBAI · UAE · INDIA
              </span>
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#FAB60A]/70 to-[#FAB60A]" />
            </div>

            {/* Main Editorial Heading */}
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#111111] dark:text-brand-white uppercase leading-[0.92] tracking-tight">
              A GLOBAL FASHION <br />
              <span className="font-serif italic font-normal text-[#F15E1C]">MOVEMENT</span>
            </h2>

            {/* Concise Subheading */}
            <p className="font-syne text-xs sm:text-sm tracking-[0.18em] uppercase text-[#333333] dark:text-brand-platinum/90 font-bold mt-3 max-w-3xl mx-auto leading-relaxed">
              BRIDGING DUBAI, THE UAE &amp; INDIA THROUGH RUNWAY, CULTURE AND CREATIVE TALENT
            </p>

            {/* Divider Line */}
            <div className="w-16 h-[2px] bg-[#F15E1C] dark:bg-brand-orange mx-auto mt-3" />
          </div>

          {/* Editorial 12-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-8 items-stretch">
            {/* Left Vision Card with Image (Smart Cropped & Responsive for Mobile) */}
            <div className="lg:col-span-6 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 relative w-full aspect-[4/3] xs:aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] bg-[#FAF8F5] dark:bg-[#0A0908] group shadow-sm">
              <Image
                src="/assets/home/where_fashion_creates_possibilities.png"
                alt="OUR VISION — Where Fashion Creates Possibilities. DUBAI · UAE · INDIA"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                priority
                className="object-cover object-center opacity-100 dark:opacity-85 dark:brightness-[0.9] transition-all duration-500 group-hover:scale-[1.02]"
              />
              <span className="sr-only">
                OUR VISION: Where Fashion Creates Possibilities. DUBAI · UAE · INDIA
              </span>
            </div>

            {/* Right Supporting Blocks */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              {/* 2 Top Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 sm:p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex flex-col justify-between space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F15E1C]/10 dark:bg-brand-orange/15 flex items-center justify-center text-[#F15E1C] dark:text-brand-orange">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white">
                      INTERNATIONAL PLATFORM
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-brand-platinum/90 font-normal leading-relaxed mt-1">
                      Runway, talent and creative opportunities across Dubai, UAE and India.
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex flex-col justify-between space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F15E1C]/10 dark:bg-brand-orange/15 flex items-center justify-center text-[#F15E1C] dark:text-brand-orange">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white">
                      GLOBAL COMMUNITY
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-brand-platinum/90 font-normal leading-relaxed mt-1">
                      Connecting designers, talent, brands and audiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom EXPLORE FASHAI ECOSYSTEM Strip */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="space-y-0.5 text-center sm:text-left">
                  <p className="font-syne text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#F15E1C] dark:text-brand-orange">
                    EXPLORE FASHAI ECOSYSTEM
                  </p>
                  <p className="font-serif italic text-lg sm:text-xl text-[#111111] dark:text-brand-white font-normal">
                    Upcoming shows, chapters and opportunities.
                  </p>
                </div>
                <Link
                  href="/upcoming"
                  className="px-6 py-3 bg-[#FAB60A] text-black font-syne text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md hover:bg-[#FFEC69] transition-all flex items-center gap-2 whitespace-nowrap shadow-sm group"
                >
                  <span>SEE UPCOMING</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom 3 Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            <Link
              href="/upcoming"
              className="group p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex items-center justify-between hover:border-[#F15E1C]/50 dark:hover:border-brand-orange/50 transition-all shadow-sm"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#F15E1C]/10 dark:bg-brand-orange/15 flex items-center justify-center text-[#F15E1C] dark:text-brand-orange">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white">
                    INTERNATIONAL REACH
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-brand-platinum/90 font-normal mt-0.5">
                    Expanding fashion beyond borders.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#F15E1C] dark:text-brand-orange transition-transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
            </Link>

            <Link
              href="/apply"
              className="group p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex items-center justify-between hover:border-[#F15E1C]/50 dark:hover:border-brand-orange/50 transition-all shadow-sm"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#F15E1C]/10 dark:bg-brand-orange/15 flex items-center justify-center text-[#F15E1C] dark:text-brand-orange">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white">
                    CREATIVE FOCUS
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-brand-platinum/90 font-normal mt-0.5">
                    Designer, model and artistic showcases.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#F15E1C] dark:text-brand-orange transition-transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
            </Link>

            <Link
              href="/gallery"
              className="group p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 flex items-center justify-between hover:border-[#F15E1C]/50 dark:hover:border-brand-orange/50 transition-all shadow-sm"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#F15E1C]/10 dark:bg-brand-orange/15 flex items-center justify-center text-[#F15E1C] dark:text-brand-orange">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-syne text-xs sm:text-sm font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white">
                    CURATED EXPERIENCES
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-brand-platinum/90 font-normal mt-0.5">
                    Runways, salons and global trade formats.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#F15E1C] dark:text-brand-orange transition-transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
