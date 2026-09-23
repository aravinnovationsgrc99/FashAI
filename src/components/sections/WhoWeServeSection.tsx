"use client";

import { motion } from "framer-motion";
import { 
  Shirt, 
  UserCheck, 
  Palette, 
  Scissors, 
  Flame, 
  Sparkles, 
  Crown, 
  Building2, 
  Briefcase 
} from "lucide-react";

interface AudienceGroup {
  title: string;
  description: string;
  icon: any;
  tag: string;
}

const AUDIENCE_GROUPS: AudienceGroup[] = [
  {
    title: "DESIGNERS",
    description: "Couture houses, emerging designers, and luxury apparel fashion labels.",
    icon: Shirt,
    tag: "RUNWAY & ATELIER",
  },
  {
    title: "MODELS",
    description: "Runway, editorial, and commercial fashion catwalk talent.",
    icon: UserCheck,
    tag: "CATWALK & EDITORIAL",
  },
  {
    title: "MAKEUP ARTISTS",
    description: "Beauty directors, backstage artists, and editorial look creators.",
    icon: Palette,
    tag: "BEAUTY & BACKSTAGE",
  },
  {
    title: "FASHION STYLISTS",
    description: "Wardrobe stylists shaping campaign lookbooks and visual direction.",
    icon: Scissors,
    tag: "STYLING & DIRECTION",
  },
  {
    title: "CHOREOGRAPHERS",
    description: "Catwalk choreography, runway movement, and stage direction specialists.",
    icon: Flame,
    tag: "MOVEMENT & RUNWAY",
  },
  {
    title: "INFLUENCERS & CREATORS",
    description: "Digital fashion media voices and campaign content creators.",
    icon: Sparkles,
    tag: "DIGITAL MEDIA",
  },
  {
    title: "CELEBRITIES & PUBLIC FIGURES",
    description: "VIP patrons, galas, brand ambassadors, and high-profile guests.",
    icon: Crown,
    tag: "VIP & APPEARANCES",
  },
  {
    title: "BRANDS & SPONSORS",
    description: "Luxury, lifestyle, and global corporate sponsors.",
    icon: Building2,
    tag: "PARTNERSHIPS",
  },
  {
    title: "CORPORATE TEAMS",
    description: "Enterprise organizations hosting events, launches, and summits.",
    icon: Briefcase,
    tag: "ENTERPRISE",
  },
];

export default function WhoWeServeSection() {
  return (
    <section id="who-we-serve" className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-yellow-golden/5 blur-[190px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 text-brand-yellow-golden text-xs font-syne tracking-micro font-bold uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TARGET AUDIENCES</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase leading-none">
              WHO WE <span className="font-serif italic font-normal text-brand-yellow-golden">SERVE</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 max-w-md font-light leading-relaxed">
            FashAI Universal provides structured participation and event opportunities for creators, brands, professionals, and event guests across the fashion ecosystem.
          </p>
        </div>

        {/* Editorial Horizontal Staggered Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUDIENCE_GROUPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                className="group relative bg-[#0A0908] border border-white/10 hover:border-brand-yellow-golden/50 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-yellow-golden group-hover:bg-brand-yellow-golden group-hover:text-black transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-syne text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-xl font-light text-white uppercase mb-2 group-hover:text-brand-yellow-golden transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-brand-platinum/75 font-light leading-relaxed">
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
