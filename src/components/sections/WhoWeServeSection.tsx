"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";

interface DisciplineItem {
  id: string;
  label: string;
  category: string;
  tagline: string;
  image: string;
  objectPosition?: string;
  tags: string[];
}

const DISCIPLINES: DisciplineItem[] = [
  {
    id: "design",
    label: "DESIGN",
    category: "COUTURE & ATELIER",
    tagline: "Couture houses, emerging designers, and luxury apparel creators shaping the future of fashion.",
    image: "/assets/homepage/Design.png",
    objectPosition: "center top",
    tags: ["COUTURE", "ATELIER", "RUNWAY", "CREATION"],
  },
  {
    id: "styling",
    label: "STYLING",
    category: "WARDROBE & DIRECTION",
    tagline: "Wardrobe curators shaping campaign lookbooks, visual aesthetics, and editorial identity.",
    image: "/assets/homepage/Fashion.png",
    objectPosition: "center top",
    tags: ["WARDROBE", "LOOKBOOKS", "EDITORIAL", "DIRECTION"],
  },
  {
    id: "beauty",
    label: "BEAUTY",
    category: "BACKSTAGE ARTISTRY",
    tagline: "Beauty directors, makeup artists, and hair stylists crafting runway-ready looks.",
    image: "/assets/homepage/Beauty.png",
    objectPosition: "center top",
    tags: ["BACKSTAGE", "ARTISTRY", "MAKEUP", "EDITORIAL"],
  },
  {
    id: "movement",
    label: "MOVEMENT",
    category: "MOVEMENT DIRECTION",
    tagline: "Choreography transforms a runway into a performance, shaping pace, movement, formations, and audience engagement.",
    image: "/assets/homepage/Moments.png",
    objectPosition: "center top",
    tags: ["RUNWAY", "CHOREOGRAPHY", "STAGE", "PERFORMANCE"],
  },
  {
    id: "talent",
    label: "TALENT",
    category: "MODELS & CATWALK",
    tagline: "High-fashion catwalk models, editorial talent, and international brand ambassadors.",
    image: "/assets/homepage/Talent.png",
    objectPosition: "center top",
    tags: ["CATWALK", "MODELS", "SHOWCASE", "TALENT"],
  },
  {
    id: "production",
    label: "PRODUCTION",
    category: "STAGING & EXPERIENCES",
    tagline: "High-impact runway productions, lighting design, audio-visual direction, and galas.",
    image: "/assets/homepage/Production.png",
    objectPosition: "center top",
    tags: ["STAGING", "GALAS", "LIGHTING", "PRODUCTIONS"],
  },
  {
    id: "media",
    label: "MEDIA",
    category: "DIGITAL & PRESS",
    tagline: "Digital storytellers, fashion journalists, content creators, and global broadcast voices.",
    image: "/assets/homepage/Media.png",
    objectPosition: "center top",
    tags: ["PRESS", "CONTENT", "CAMPAIGNS", "MEDIA"],
  },
  {
    id: "technology",
    label: "TECHNOLOGY",
    category: "INNOVATION & LUXURY",
    tagline: "Global sponsors, interactive AI installations, digital trade formats, and luxury platforms.",
    image: "/assets/homepage/Technology.png",
    objectPosition: "center top",
    tags: ["AI INNOVATION", "INTERACTIVE", "SPONSORS", "LUXURY"],
  },
];

export default function WhoWeServeSection() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineItem>(DISCIPLINES[0]); // Default to Design
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeIndex = DISCIPLINES.findIndex((d) => d.id === activeDiscipline.id);

  return (
    <section id="people-creativity" className="relative pt-1 sm:pt-2 pb-6 sm:pb-8 bg-white dark:bg-[#050505] border-b border-black/10 dark:border-white/10 text-[#111111] dark:text-brand-white overflow-hidden">
      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/10 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-syne tracking-widest text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase mb-2">
              <span>WHO WE WORK WITH</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#111111] dark:text-brand-white uppercase leading-tight tracking-tight">
              INDUSTRIES WE <span className="font-serif italic font-normal text-[#F15E1C] dark:text-[#D4AF37]">SUPPORT</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#555555] dark:text-brand-platinum/80 max-w-md font-light leading-relaxed">
            Working with brands and businesses across fashion, lifestyle, technology and consumer categories.
          </p>
        </div>

        {/* 5-Category Industry Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {[
            {
              title: "JEWELLERY",
              desc: "Haute joaillerie, fine craftsmanship, and luxury adornments.",
              image: "/assets/industries/Jewellary.png",
              objectPosition: "center center",
            },
            {
              title: "CLOTHING",
              desc: "Couture houses, ready-to-wear lines, and designer apparel.",
              image: "/assets/industries/clothings.png",
              objectPosition: "center top",
            },
            {
              title: "ACCESSORIES",
              desc: "Leather goods, footwear, luxury accents, and timepieces.",
              image: "/assets/industries/accesorries.png",
              objectPosition: "center center",
            },
            {
              title: "ELECTRONICS",
              desc: "Premium consumer tech, AI hardware, and digital devices.",
              image: "/assets/industries/electronics.png",
              objectPosition: "center center",
            },
            {
              title: "PERFUMES",
              desc: "Niche fragrances, luxury cosmetics, and haute perfumery.",
              image: "/assets/industries/perfumes.png",
              objectPosition: "center center",
            },
          ].map((ind, idx) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group relative bg-[#FAF8F5] dark:bg-[#080706] border border-black/10 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between overflow-hidden hover:border-[#F15E1C]/60 dark:hover:border-[#D4AF37]/60 transition-all duration-300 shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl mb-3 bg-black/5 dark:bg-[#030303] border border-black/10 dark:border-white/10">
                <Image
                  src={ind.image}
                  alt={ind.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  style={{ objectPosition: ind.objectPosition }}
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-syne text-sm sm:text-base font-bold uppercase tracking-wider text-[#111111] dark:text-brand-white group-hover:text-[#F15E1C] dark:group-hover:text-[#D4AF37] transition-colors mb-1">
                  {ind.title}
                </h3>
                <p className="font-sans text-sm text-[#555555] dark:text-brand-platinum/80 font-light leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile / Tablet Compact Expandable Selector */}
        <div className="lg:hidden mb-6 relative">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#0A0908] border border-black/10 dark:border-white/10 rounded-lg flex items-center justify-between text-left shadow-sm"
          >
            <div>
              <span className="text-xs font-syne uppercase text-[#F15E1C] dark:text-[#D4AF37] tracking-wider block font-bold">
                DISCIPLINES
              </span>
              <span className="font-serif-display text-xl font-normal text-black dark:text-white uppercase">
                {activeDiscipline.label}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-black/50 dark:text-white/50 transition-transform duration-200 ${
                isMobileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#0C0B0A] border border-black/10 dark:border-white/10 rounded-lg shadow-xl z-30 overflow-hidden py-1">
              {DISCIPLINES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveDiscipline(item);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left flex items-center justify-between text-sm font-syne uppercase tracking-wider transition-colors ${
                    activeDiscipline.id === item.id
                      ? "bg-[#F15E1C]/10 dark:bg-[#D4AF37]/10 text-[#F15E1C] dark:text-[#D4AF37] font-bold"
                      : "text-black dark:text-white/80 hover:text-[#F15E1C] dark:hover:text-[#D4AF37] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs opacity-60">{item.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Editorial Layout: Left (Image + Content Underneath) | Right (Discipline Rail) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT / MAIN: Featured Image + Compact Content Underneath (~58% width ~ 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Featured Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 bg-[#FAF8F5] dark:bg-[#090807] shadow-md group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDiscipline.id}
                  initial={{ opacity: 0, x: 10, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeDiscipline.image}
                    alt={activeDiscipline.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    style={{ objectPosition: activeDiscipline.objectPosition || "center 12%" }}
                    className="object-cover filter contrast-[1.04]"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content Directly Underneath Featured Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDiscipline.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3 pt-1"
              >
                <div>
                  <span className="text-xs sm:text-sm font-syne tracking-widest text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase block mb-1">
                    {activeDiscipline.category}
                  </span>
                  <h3 className="font-serif-display text-3xl sm:text-4xl font-light text-black dark:text-white uppercase leading-tight">
                    {activeDiscipline.label}
                  </h3>
                </div>

                <p className="font-sans text-base sm:text-lg text-[#444444] dark:text-brand-platinum/85 font-normal leading-relaxed max-w-xl">
                  {activeDiscipline.tagline}
                </p>

                {/* Tags / Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeDiscipline.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-syne tracking-wider uppercase font-semibold text-[#555555] dark:text-white/80 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Editorial Discipline Rail (~42% width ~ 5 cols) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col pl-2 self-stretch">
            <span className="text-xs sm:text-sm font-syne tracking-widest text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase mb-3">
              DISCIPLINES
            </span>

            <div className="relative flex-1 flex gap-4 items-stretch">
              {/* Subtle Editorial Vertical Guide Line */}
              <div className="relative w-[2px] bg-black/10 dark:bg-white/10 rounded-full my-1 self-stretch">
                <motion.div
                  className="absolute left-0 w-full bg-[#F15E1C] dark:bg-[#D4AF37] rounded-full shadow-sm"
                  animate={{
                    height: `${100 / DISCIPLINES.length}%`,
                    top: `${(activeIndex * 100) / DISCIPLINES.length}%`,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Discipline Rows */}
              <div className="flex-1 flex flex-col justify-between">
                {DISCIPLINES.map((item) => {
                  const isActive = activeDiscipline.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setActiveDiscipline(item)}
                      onClick={() => setActiveDiscipline(item)}
                      className="group cursor-pointer py-2.5 px-1 border-b border-black/10 dark:border-white/10 transition-colors duration-200 flex items-center justify-between"
                    >
                      <span
                        className={`font-serif-display text-2xl lg:text-3xl font-light tracking-wide uppercase transition-colors duration-200 ${
                          isActive
                            ? "text-[#F15E1C] dark:text-[#D4AF37] font-normal"
                            : "text-black dark:text-white/80 group-hover:text-[#F15E1C] dark:group-hover:text-[#D4AF37]"
                        }`}
                      >
                        {item.label}
                      </span>

                      <ArrowUpRight
                        className={`w-5 h-5 transition-all duration-300 ${
                          isActive
                            ? "text-[#F15E1C] dark:text-[#D4AF37] translate-x-0.5 -translate-y-0.5 opacity-100"
                            : "text-black/30 dark:text-white/30 opacity-0 group-hover:opacity-100 group-hover:text-[#F15E1C] dark:group-hover:text-[#D4AF37]"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
