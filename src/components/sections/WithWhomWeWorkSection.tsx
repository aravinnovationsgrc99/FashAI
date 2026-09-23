"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Building, 
  Laptop, 
  Newspaper, 
  Palette, 
  Users, 
  Award, 
  Compass 
} from "lucide-react";

interface EcosystemCategory {
  title: string;
  category: string;
  description: string;
  icon: any;
}

const COLLABORATION_CATEGORIES: EcosystemCategory[] = [
  {
    title: "DESIGNERS & COUTURE HOUSES",
    category: "CREATIVE DIRECTION",
    description: "Independent fashion designers, luxury ateliers, and creative directors exploring runway presentations and brand experiences.",
    icon: Palette,
  },
  {
    title: "LIFESTYLE & FASHION BRANDS",
    category: "BRAND EXPERIENCES",
    description: "Apparel, accessory, and lifestyle brands seeking integrated event showcases and audience engagement.",
    icon: Award,
  },
  {
    title: "CREATIVE PROFESSIONALS",
    category: "PRODUCTION TALENT",
    description: "Models, makeup artists, fashion stylists, choreographers, and creative producers driving event excellence.",
    icon: Sparkles,
  },
  {
    title: "EVENT PARTICIPANTS & GUESTS",
    category: "COMMUNITY",
    description: "Fashion enthusiasts, industry attendees, delegates, and guests participating in live showcases.",
    icon: Users,
  },
  {
    title: "MEDIA & PUBLICATION OUTLETS",
    category: "PRESS COVERAGE",
    description: "Journalists, fashion editors, digital creators, and press representatives covering event developments.",
    icon: Newspaper,
  },
  {
    title: "CORPORATE ORGANIZATIONS",
    category: "ENTERPRISE",
    description: "Business organizations collaborating on high-profile corporate events, summits, and executive gatherings.",
    icon: Building,
  },
  {
    title: "TECH & IT ORGANIZATIONS",
    category: "TECHNOLOGY",
    description: "Technology platforms and IT organizations engaging in tech event formats and digital experience showcases.",
    icon: Laptop,
  },
  {
    title: "LIFESTYLE & HOSPITALITY BUSINESSES",
    category: "VENUE & EXPERIENCE",
    description: "Hospitality groups, venues, and luxury service providers partnering for premium event execution.",
    icon: Compass,
  },
];

export default function WithWhomWeWorkSection() {
  return (
    <section id="with-whom-we-work" className="relative py-24 sm:py-32 bg-black border-b border-white/10 overflow-hidden">
      {/* Glow & Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-orange/5 blur-[160px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-3">
              04 — COLLABORATION ECOSYSTEM
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase">
              WITH WHOM WE WORK
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 max-w-md font-light leading-relaxed">
            FashAI Universal operates within a collaborative ecosystem connecting creative practitioners, business organizations, tech entities, and media across international markets.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLABORATION_CATEGORIES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative bg-[#090807] border border-white/10 hover:border-brand-orange/50 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-syne text-brand-orange uppercase font-bold tracking-wider bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                    <Icon className="w-5 h-5 text-brand-yellow-golden/60 group-hover:text-brand-yellow-golden transition-colors" />
                  </div>

                  <h3 className="font-serif-display text-lg sm:text-xl font-light text-white uppercase mb-2 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-brand-platinum/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
