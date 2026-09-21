"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowUpRight, Sparkles, UserCheck } from "lucide-react";
import { FACES_DATA, FacePerson } from "@/data/faces";

interface CategoryMeta {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  gridSpan: string; // Tailwind grid span for asymmetrical editorial composition
  filterCategory?: "RUNWAY MODELS" | "VIP GUESTS";
}

const PEOPLE_CATEGORIES: CategoryMeta[] = [
  {
    id: "designers",
    title: "DESIGNERS",
    subtitle: "Discover designers and their work",
    tagline: "Couture Atelier & Computational Fashion",
    image: "/assets/models/model_01.jpeg",
    gridSpan: "lg:col-span-8 lg:row-span-2", // Large feature tile
  },
  {
    id: "models",
    title: "MODELS",
    subtitle: "Explore featured models",
    tagline: "Runway & High Fashion Talent",
    image: "/assets/models/model_04.jpeg",
    gridSpan: "lg:col-span-4 lg:row-span-1", // Medium tile
    filterCategory: "RUNWAY MODELS",
  },
  {
    id: "makeup-artists",
    title: "MAKEUP ARTISTS",
    subtitle: "Beauty, artistry and creative direction",
    tagline: "Backstage Beauty & Spatial Aesthetics",
    image: "/assets/models/model_06.jpeg",
    gridSpan: "lg:col-span-4 lg:row-span-1", // Medium tile
  },
  {
    id: "celebrities",
    title: "CELEBRITIES",
    subtitle: "Featured personalities and appearances",
    tagline: "Global Patrons & VIP Salons",
    image: "/assets/models/model_02.jpeg",
    gridSpan: "lg:col-span-4 lg:row-span-1", // Smaller tile
    filterCategory: "VIP GUESTS",
  },
  {
    id: "influencers",
    title: "INFLUENCERS",
    subtitle: "Creators and digital voices",
    tagline: "Digital Atelier & Lifestyle Voices",
    image: "/assets/models/model_08.jpeg",
    gridSpan: "lg:col-span-4 lg:row-span-1", // Smaller tile
  },
  {
    id: "stylists",
    title: "STYLISTS",
    subtitle: "Styling and fashion direction",
    tagline: "Couture Wardrobe & Visual Direction",
    image: "/assets/models/model_10.jpeg",
    gridSpan: "lg:col-span-4 lg:row-span-1", // Smaller tile
  },
];

export default function FashionCommunitySection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryMeta | null>(null);

  const getProfilesForCategory = (cat: CategoryMeta): FacePerson[] => {
    if (cat.filterCategory) {
      return FACES_DATA.filter((person) => person.category === cat.filterCategory);
    }
    return [];
  };

  return (
    <section id="people" className="relative py-24 sm:py-32 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Background Atmosphere & Radial Glows */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-brand-orange/10 blur-[170px] rounded-full" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-brand-green/10 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-yellow-golden/8 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute -bottom-10 right-0 text-[14vw] font-serif-display font-light text-white/[0.015] uppercase tracking-tighter leading-none pointer-events-none">
          COMMUNITY
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-hairline-orange pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-3">
              <span className="h-px w-8 bg-brand-orange" />
              <span>THE PEOPLE BEHIND THE EXPERIENCE</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase">
              FASHION COMMUNITY
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 max-w-md font-light leading-relaxed">
            Connecting international designers, models, creative directors, stylists, and global patrons of the FashAI Universal experience.
          </p>
        </div>

        {/* Asymmetrical Editorial Composition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {PEOPLE_CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => setSelectedCategory(category)}
              className={`group relative bg-[#0B0908] border border-brand-orange/20 overflow-hidden cursor-pointer min-h-[320px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-8 hover:border-brand-orange transition-all duration-500 shadow-xl ${category.gridSpan}`}
            >
              {/* Image Background with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover filter contrast-125 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 opacity-30 group-hover:opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />
              </div>

              {/* Editorial Category Metadata & Text */}
              <div className="relative z-10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-syne tracking-micro text-brand-orange font-bold uppercase bg-brand-orange/10 border border-brand-orange/30 px-3 py-1">
                    {category.tagline}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/20 bg-brand-void/80 flex items-center justify-center text-brand-white group-hover:border-brand-orange group-hover:text-brand-orange transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-brand-white uppercase tracking-tight pt-2 group-hover:text-brand-yellow-golden transition-colors">
                  {category.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 font-light flex items-center gap-2 pt-1">
                  <span>{category.subtitle}</span>
                  <span className="text-brand-orange font-bold">→</span>
                </p>
              </div>

              {/* Top Corner Subtle Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-px h-8 bg-brand-orange" />
                <div className="absolute top-0 right-0 h-px w-8 bg-brand-orange" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Detail View Modal / Drawer */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 sm:p-6 lg:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[85vh] bg-[#0A0A09] border border-brand-orange/40 overflow-y-auto p-6 sm:p-10 z-10 shadow-[0_0_80px_rgba(241,94,28,0.2)] scrollbar-thin scrollbar-thumb-brand-orange"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-brand-void border border-white/20 text-brand-white hover:text-brand-orange hover:border-brand-orange flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="border-b border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-2">
                  <Sparkles className="w-4 h-4 text-brand-yellow-golden" />
                  <span>COMMUNITY DISCOVERY</span>
                </div>
                <h3 className="font-serif-display text-4xl sm:text-5xl font-light text-brand-white uppercase">
                  {selectedCategory.title}
                </h3>
                <p className="font-sans text-sm text-brand-platinum font-light mt-1">
                  {selectedCategory.subtitle}
                </p>
              </div>

              {/* Profiles Content or Polished Empty State */}
              {getProfilesForCategory(selectedCategory).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getProfilesForCategory(selectedCategory).map((person) => (
                    <div
                      key={person.id}
                      className="bg-brand-void border border-white/10 p-4 space-y-4 group hover:border-brand-orange transition-colors"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          sizes="300px"
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div>
                        <div className="text-[10px] font-syne tracking-micro text-brand-orange font-bold uppercase">
                          {person.category}
                        </div>
                        <h4 className="font-serif-display text-xl text-brand-white font-light group-hover:text-brand-yellow-golden transition-colors">
                          {person.name}
                        </h4>
                        {person.title && (
                          <p className="font-sans text-xs text-brand-platinum/80 font-light mt-0.5">
                            {person.title}
                          </p>
                        )}
                        <div className="text-[10px] font-syne text-brand-green mt-2 uppercase font-bold">
                          {person.event}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Polished Empty State for Categories without current roster */
                <div className="py-16 px-6 text-center bg-brand-void/80 border border-white/5 space-y-4">
                  <UserCheck className="w-12 h-12 text-brand-orange mx-auto opacity-80" />
                  <h4 className="font-serif-display text-2xl sm:text-3xl text-brand-white uppercase font-light">
                    PROFILES COMING SOON
                  </h4>
                  <p className="font-sans text-sm text-brand-platinum max-w-md mx-auto font-light leading-relaxed">
                    Official participant and talent rosters for {selectedCategory.title} during LifeStyle 2026 Dubai are currently being curated and will be announced soon.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="bg-brand-orange px-6 py-2.5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors"
                    >
                      CLOSE CATEGORY DISCOVERY
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
