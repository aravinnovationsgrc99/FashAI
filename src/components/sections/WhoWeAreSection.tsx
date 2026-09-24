"use client";

import { motion } from "framer-motion";
import { Sparkles, Globe, Eye, Award } from "lucide-react";

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="relative py-6 sm:py-8 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 overflow-hidden text-[#111111] dark:text-brand-white">
      <div className="container-editorial relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-6 text-center"
        >
          {/* Clean Editorial Kicker */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-syne tracking-micro text-[#F15E1C] dark:text-brand-orange font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#F15E1C] dark:text-brand-orange" />
            <span>WHO WE ARE</span>
          </div>

          {/* Main Title - Crisp & Legible */}
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-light text-[#111111] dark:text-brand-white uppercase leading-tight tracking-tight">
            A GLOBAL FASHION <br />
            <span className="font-serif italic font-normal text-[#F15E1C] dark:text-brand-orange">MOVEMENT</span>
          </h2>

          {/* Clean Hairline Divider */}
          <div className="w-16 h-px bg-[#F15E1C]/40 dark:bg-brand-orange/40 mx-auto" />

          {/* Compact Copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            <p className="font-sans text-xs sm:text-sm text-[#333333] dark:text-brand-platinum/90 font-light leading-relaxed">
              FashAI Universal is an international fashion and events platform focused on fashion experiences, curated productions, creative talent recruitment, designers, and event participation.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#333333] dark:text-brand-platinum/80 font-light leading-relaxed">
              Operating across Dubai, the United Arab Emirates, and India, the platform connects fashion professionals, creative talent, brands, and international audiences through live event formats and creative experiences.
            </p>
          </div>

          {/* Editorial Highlights Bar - Compact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-black/10 dark:border-white/10 max-w-4xl mx-auto">
            <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-white/10 text-left hover:border-[#F15E1C]/50 transition-colors shadow-sm">
              <Globe className="w-4 h-4 text-[#F15E1C] dark:text-brand-orange mb-2" />
              <h3 className="font-syne text-[11px] font-bold uppercase text-[#111111] dark:text-brand-white tracking-wider mb-0.5">
                INTERNATIONAL REACH
              </h3>
              <p className="text-[11px] font-sans text-[#555555] dark:text-brand-platinum/70 font-light">
                Dubai · UAE · India
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-white/10 text-left hover:border-[#F15E1C]/50 transition-colors shadow-sm">
              <Eye className="w-4 h-4 text-[#F15E1C] dark:text-brand-orange mb-2" />
              <h3 className="font-syne text-[11px] font-bold uppercase text-[#111111] dark:text-brand-white tracking-wider mb-0.5">
                CREATIVE FOCUS
              </h3>
              <p className="text-[11px] font-sans text-[#555555] dark:text-brand-platinum/70 font-light">
                Fashion · Events · Talent
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#090807] border border-black/10 dark:border-white/10 text-left hover:border-[#F15E1C]/50 transition-colors shadow-sm">
              <Award className="w-4 h-4 text-[#F15E1C] dark:text-brand-orange mb-2" />
              <h3 className="font-syne text-[11px] font-bold uppercase text-[#111111] dark:text-brand-white tracking-wider mb-0.5">
                CURATED EXPERIENCES
              </h3>
              <p className="text-[11px] font-sans text-[#555555] dark:text-brand-platinum/70 font-light">
                Runway · Salons · Formats
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
