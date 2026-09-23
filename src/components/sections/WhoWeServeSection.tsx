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
  Briefcase, 
  Ticket, 
  Camera 
} from "lucide-react";

interface AudienceItem {
  number: string;
  title: string;
  description: string;
  icon: any;
  tag: string;
}

const AUDIENCES: AudienceItem[] = [
  {
    number: "01",
    title: "DESIGNERS",
    description: "Couture houses, emerging fashion designers, and apparel brands seeking high-visibility runway and event showcases.",
    icon: Shirt,
    tag: "RUNWAY & SHOWCASE",
  },
  {
    number: "02",
    title: "MODELS",
    description: "Editorial, commercial, and runway models participating in curated fashion productions and campaign shoots.",
    icon: UserCheck,
    tag: "CATWALK & EDITORIAL",
  },
  {
    number: "03",
    title: "MAKEUP ARTISTS",
    description: "Beauty directors and professional makeup artists providing backstage look creation and editorial beauty direction.",
    icon: Palette,
    tag: "BEAUTY & BACKSTAGE",
  },
  {
    number: "04",
    title: "FASHION STYLISTS",
    description: "Wardrobe stylists shaping campaign visual aesthetics, lookbook direction, and runway presentation.",
    icon: Scissors,
    tag: "STYLING & WARDROBE",
  },
  {
    number: "05",
    title: "CHOREOGRAPHERS",
    description: "Movement specialists and runway choreographers orchestrating catwalk flow, stage presence, and show rhythm.",
    icon: Flame,
    tag: "MOVEMENT & RUNWAY",
  },
  {
    number: "06",
    title: "INFLUENCERS & CREATORS",
    description: "Digital media voices and lifestyle creators generating event coverage, campaign amplification, and brand stories.",
    icon: Sparkles,
    tag: "DIGITAL AMPLIFICATION",
  },
  {
    number: "07",
    title: "CELEBRITIES & PUBLIC FIGURES",
    description: "VIP guests, brand ambassadors, and high-profile personalities engaging with fashion galas and launches.",
    icon: Crown,
    tag: "VIP & ENGAGEMENT",
  },
  {
    number: "08",
    title: "BRANDS & SPONSORS",
    description: "Luxury, lifestyle, and corporate sponsors partnering with international event formats and experience platforms.",
    icon: Building2,
    tag: "PARTNERSHIPS",
  },
  {
    number: "09",
    title: "CORPORATE TEAMS",
    description: "Enterprise organizations hosting high-impact corporate, celebratory, or product experience events.",
    icon: Briefcase,
    tag: "ENTERPRISE FORMATS",
  },
  {
    number: "10",
    title: "EVENT PARTICIPANTS",
    description: "Guests, attendees, and participants engaging in curated fashion showcases, galas, and lifestyle summits.",
    icon: Ticket,
    tag: "EXPERIENCES",
  },
  {
    number: "11",
    title: "MEDIA & PRESS",
    description: "International press, publication editors, and media outlets covering fashion developments and event highlights.",
    icon: Camera,
    tag: "COVERAGE",
  },
];

export default function WhoWeServeSection() {
  return (
    <section id="who-we-serve" className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-yellow-golden/5 blur-[180px] rounded-full" />
        <div className="editorial-watermark absolute top-10 left-5 text-[15vw] font-serif-display font-light uppercase text-white/[0.02] leading-none pointer-events-none">
          SERVE
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
              03 — TARGET AUDIENCES & TALENT ECOSYSTEM
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase">
              WHO WE SERVE
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 max-w-md font-light leading-relaxed">
            FashAI Universal provides structured participation and event opportunities for creators, brands, professionals, and event guests across the fashion and lifestyle ecosystem.
          </p>
        </div>

        {/* Staggered Editorial List Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUDIENCES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="group relative bg-[#0D0B0A] border border-white/10 hover:border-brand-yellow-golden/50 p-6 sm:p-8 rounded-2xl transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-syne text-xs font-bold text-brand-yellow-golden tracking-widest">
                      {item.number}
                    </span>
                    <span className="text-[10px] font-syne text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-full uppercase">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-yellow-golden group-hover:bg-brand-yellow-golden group-hover:text-black transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif-display text-xl sm:text-2xl font-light text-white uppercase group-hover:text-brand-yellow-golden transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-brand-platinum/70 leading-relaxed font-light">
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
