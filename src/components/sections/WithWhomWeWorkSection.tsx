"use client";

import { motion } from "framer-motion";
import { 
  Building, 
  Laptop, 
  Newspaper, 
  Palette, 
  Sparkles, 
  Award, 
  Compass,
  Calendar
} from "lucide-react";

interface EcosystemCategory {
  title: string;
  category: string;
  description: string;
  icon: any;
}

const ECOSYSTEM_CATEGORIES: EcosystemCategory[] = [
  {
    title: "BRANDS & SPONSORS",
    category: "PARTNERSHIPS",
    description: "Luxury apparel, beauty, and global brand partners.",
    icon: Award,
  },
  {
    title: "EVENT ORGANIZATIONS",
    category: "PRODUCTION",
    description: "International production agencies and event organizers.",
    icon: Calendar,
  },
  {
    title: "CORPORATE TEAMS",
    category: "ENTERPRISE",
    description: "Corporate entities collaborating on galas and summits.",
    icon: Building,
  },
  {
    title: "CREATIVE PROFESSIONALS",
    category: "TALENT NETWORK",
    description: "Models, makeup artists, stylists, and choreographers.",
    icon: Sparkles,
  },
  {
    title: "MEDIA & PRESS",
    category: "PUBLICATIONS",
    description: "Fashion editors, journalists, and media outlets.",
    icon: Newspaper,
  },
  {
    title: "DESIGN HOUSES & ATELIERS",
    category: "COUTURE",
    description: "Independent fashion designers and couture ateliers.",
    icon: Palette,
  },
  {
    title: "LIFESTYLE BUSINESSES",
    category: "EXPERIENCE",
    description: "Hospitality groups, venues, and luxury partners.",
    icon: Compass,
  },
  {
    title: "TECH & IT ORGANIZATIONS",
    category: "INNOVATION",
    description: "Technology platforms and IT event formats.",
    icon: Laptop,
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-syne tracking-micro font-bold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow-golden" />
              <span>COLLABORATION ECOSYSTEM</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase leading-none">
              WITH WHOM <span className="font-serif italic font-normal text-brand-yellow-golden">WE WORK</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 max-w-md font-light leading-relaxed">
            FashAI Universal operates within a collaborative ecosystem connecting creative talent, business organizations, tech entities, and media across international markets.
          </p>
        </div>

        {/* Staggered Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_CATEGORIES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="group relative bg-[#090807] border border-white/10 hover:border-brand-orange/50 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-syne text-brand-orange uppercase font-bold tracking-wider bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                    <Icon className="w-4 h-4 text-brand-yellow-golden/70 group-hover:text-brand-yellow-golden transition-colors" />
                  </div>

                  <h3 className="font-serif-display text-lg font-light text-white uppercase mb-2 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-brand-platinum/75 leading-relaxed font-light">
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
