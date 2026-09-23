"use client";

import { motion } from "framer-motion";
import { Sparkles, Globe, Eye, Award } from "lucide-react";

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="relative py-24 sm:py-32 bg-black border-b border-white/10 overflow-hidden text-brand-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-yellow-golden/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="container-editorial relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10 text-center"
        >
          {/* Label Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 text-brand-yellow-golden text-xs font-syne tracking-micro font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHO WE ARE</span>
          </div>

          {/* Main Title */}
          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-brand-white uppercase leading-tight tracking-tight">
            A GLOBAL FASHION <br />
            <span className="font-serif italic font-normal text-brand-yellow-golden">MOVEMENT</span>
          </h2>

          {/* Hairline Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-yellow-golden to-transparent mx-auto" />

          {/* Compact Copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed">
              FashAI Universal is an international fashion and events platform focused on fashion experiences, curated productions, creative talent recruitment, designers, and event participation.
            </p>
            <p className="font-sans text-sm sm:text-base text-brand-platinum/80 font-light leading-relaxed">
              Operating across Dubai, the United Arab Emirates, and India, the platform connects fashion professionals, creative talent, brands, and international audiences through live event formats and creative experiences.
            </p>
          </div>

          {/* Editorial Highlights Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-[#090807] border border-white/10 text-left hover:border-brand-yellow-golden/40 transition-colors">
              <Globe className="w-5 h-5 text-brand-yellow-golden mb-3" />
              <h3 className="font-syne text-xs font-bold uppercase text-brand-white tracking-wider mb-1">
                INTERNATIONAL REACH
              </h3>
              <p className="text-xs font-sans text-brand-platinum/70 font-light">
                Dubai · UAE · India
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090807] border border-white/10 text-left hover:border-brand-yellow-golden/40 transition-colors">
              <Eye className="w-5 h-5 text-brand-yellow-golden mb-3" />
              <h3 className="font-syne text-xs font-bold uppercase text-brand-white tracking-wider mb-1">
                CREATIVE FOCUS
              </h3>
              <p className="text-xs font-sans text-brand-platinum/70 font-light">
                Fashion · Events · Talent
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090807] border border-white/10 text-left hover:border-brand-yellow-golden/40 transition-colors">
              <Award className="w-5 h-5 text-brand-yellow-golden mb-3" />
              <h3 className="font-syne text-xs font-bold uppercase text-brand-white tracking-wider mb-1">
                CURATED EXPERIENCES
              </h3>
              <p className="text-xs font-sans text-brand-platinum/70 font-light">
                Runway · Salons · Formats
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
