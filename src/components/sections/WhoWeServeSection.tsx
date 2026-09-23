"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface DisciplineItem {
  id: string;
  label: string;
  category: string;
  tagline: string;
  image: string;
}

const DISCIPLINES: DisciplineItem[] = [
  {
    id: "designers",
    label: "DESIGNERS",
    category: "COUTURE & ATELIER",
    tagline: "Couture houses, emerging designers, and luxury apparel creators.",
    image: "/assets/master/designer/designer_01.png",
  },
  {
    id: "models",
    label: "MODELS",
    category: "RUNWAY & CATWALK",
    tagline: "High-fashion catwalk talent, editorial models, and commercial showcases.",
    image: "/assets/master/models/model_01.png",
  },
  {
    id: "styling",
    label: "STYLING",
    category: "WARDROBE & DIRECTION",
    tagline: "Wardrobe curators shaping campaign lookbooks and visual identity.",
    image: "/assets/master/stylist/stylist_01.png",
  },
  {
    id: "beauty",
    label: "BEAUTY",
    category: "BACKSTAGE ARTISTRY",
    tagline: "Beauty directors, makeup artists, and editorial look creators.",
    image: "/assets/master/makeup/makeup_01.png",
  },
  {
    id: "movement",
    label: "MOVEMENT",
    category: "CHOREOGRAPHY & STAGE",
    tagline: "Catwalk choreography, runway movement, and stage direction.",
    image: "/assets/master/choreographer/choreographer.png",
  },
  {
    id: "creative",
    label: "CREATIVE",
    category: "DIGITAL MEDIA & VOICES",
    tagline: "Digital storytellers, content creators, and brand voices.",
    image: "/assets/master/influencers/influencer_01.png",
  },
  {
    id: "brands",
    label: "BRANDS",
    category: "LUXURY & LIFESTYLE",
    tagline: "Global sponsors, luxury entities, and product presentations.",
    image: "/assets/events/lifestyle_events.png",
  },
  {
    id: "events",
    label: "EVENTS",
    category: "PRODUCTIONS & GALAS",
    tagline: "High-impact event management, corporate summits, and galas.",
    image: "/assets/events/fashion_events.png",
  },
];

export default function WhoWeServeSection() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineItem>(DISCIPLINES[0]);

  return (
    <section id="people-creativity" className="relative py-24 sm:py-36 bg-[#050505] border-b border-white/10 text-brand-white overflow-hidden">
      {/* Editorial Atmospheric Background Glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-brand-yellow-golden/5 blur-[220px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 text-brand-yellow-golden text-xs font-syne tracking-micro font-bold uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CREATIVE ECOSYSTEM</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-[0.95]">
              BUILT AROUND <br />
              <span className="font-serif italic font-normal text-brand-yellow-golden capitalize">People, Creativity</span> &amp; Possibility
            </h2>
          </div>

          <div className="space-y-4 max-w-lg">
            <p className="font-sans text-sm sm:text-base text-brand-white/90 font-light leading-relaxed">
              From the first sketch to the final spotlight, FashAI Universal brings together the creative disciplines, talent and organizations that shape an event.
            </p>
            <p className="font-sans text-xs sm:text-sm text-brand-platinum/70 font-light leading-relaxed">
              Designers, models, stylists, makeup artists, choreographers, creators, brands and event teams become part of the same creative ecosystem.
            </p>
          </div>
        </div>

        {/* Asymmetric Full-Width Editorial Layout (No Card Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Flowing Typographic Discipline Navigation */}
          <div className="lg:col-span-6 space-y-2">
            {DISCIPLINES.map((item) => {
              const isActive = activeDiscipline.id === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveDiscipline(item)}
                  onClick={() => setActiveDiscipline(item)}
                  className="group cursor-pointer py-3 border-b border-white/10 transition-all duration-300 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Active Indicator Bar */}
                      <motion.span
                        initial={false}
                        animate={{
                          width: isActive ? "24px" : "0px",
                          opacity: isActive ? 1 : 0,
                        }}
                        className="h-[2px] bg-brand-yellow-golden block rounded-full"
                      />
                      
                      {/* Discipline Title */}
                      <span
                        className={`font-serif-display text-2xl sm:text-4xl font-light tracking-wide uppercase transition-colors duration-300 ${
                          isActive
                            ? "text-brand-yellow-golden font-normal"
                            : "text-white/60 group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block text-[10px] font-syne tracking-wider text-brand-platinum/60 uppercase">
                        {item.category}
                      </span>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isActive
                            ? "text-brand-yellow-golden translate-x-0.5 -translate-y-0.5"
                            : "text-white/30 group-hover:text-white"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Active Descriptor Reveal */}
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-sans text-xs text-brand-platinum/80 font-light mt-1.5 pl-10"
                    >
                      {item.tagline}
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: Dynamic Editorial Image Showcase (100% Existing Website Imagery) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-brand-yellow-golden/40 shadow-2xl bg-[#090807]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDiscipline.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeDiscipline.image}
                    alt={activeDiscipline.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top filter contrast-105"
                    priority
                  />
                  {/* Subtle Gradient & Editorial Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Editorial Caption Box */}
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase">
                    {activeDiscipline.category}
                  </span>
                  <span className="text-[9px] font-syne text-white/50 uppercase">FASHAI CURATION</span>
                </div>
                <h3 className="font-serif-display text-2xl font-light text-white uppercase">
                  {activeDiscipline.label}
                </h3>
                <p className="font-sans text-xs text-brand-platinum/90 font-light mt-1">
                  {activeDiscipline.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
