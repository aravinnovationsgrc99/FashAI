"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowUpRight, Sparkles } from "lucide-react";
import { PEOPLE_MASTER_DATA, PeopleCategory } from "@/data/people";

export default function FashionCommunitySection() {
  const [selectedCategory, setSelectedCategory] = useState<PeopleCategory | null>(null);

  return (
    <section id="people" className="relative py-24 sm:py-32 bg-brand-void border-b border-white/10 overflow-hidden">
      {/* Atmosphere Background Glows */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-brand-orange/10 blur-[170px] rounded-full" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-brand-green/10 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-yellow-golden/8 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="editorial-watermark absolute -bottom-10 right-0 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none">
          COMMUNITY
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
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
            Connecting international designers, models, makeup artists, celebrities, influencers, and stylists across the FashAI Universal ecosystem.
          </p>
        </div>

        {/* Asymmetrical Editorial Composition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {PEOPLE_MASTER_DATA.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => setSelectedCategory(category)}
              className={`group relative bg-[#0B0908] border border-brand-orange/30 overflow-hidden cursor-pointer flex flex-col justify-end p-6 sm:p-8 sm:p-10 hover:border-brand-orange transition-all duration-500 shadow-2xl ${category.gridSpan}`}
            >
              {/* Image Frame with Face Preservation Positioning */}
              <div className={`relative ${category.aspectRatioClass} w-full overflow-hidden mb-6 bg-black`}>
                <Image
                  src={category.primaryImage}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                  className={`object-cover ${category.objectPosition} filter contrast-110 grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out opacity-85 group-hover:opacity-100`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0908] via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

                {/* Secondary Image Thumbnails Preview Strip (if available) */}
                {category.secondaryImages.length > 0 && (
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    {category.secondaryImages.slice(0, 3).map((secImg, idx) => (
                      <div
                        key={idx}
                        className="relative w-9 h-12 sm:w-11 sm:h-14 overflow-hidden border border-white/30 shadow-md bg-black"
                      >
                        <Image
                          src={secImg}
                          alt={`${category.title} Preview ${idx + 1}`}
                          fill
                          sizes="44px"
                          className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Editorial Category Metadata & Text */}
              <div className="relative z-10 space-y-3 pt-3 border-t border-white/10 flex flex-col justify-between flex-1">
                <div className="flex justify-between items-center h-8">
                  <span className="text-[10px] sm:text-[11px] font-syne tracking-micro text-brand-orange font-bold uppercase bg-brand-orange/10 border border-brand-orange/30 px-3 py-1 truncate">
                    {category.tagline}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/20 bg-brand-void flex items-center justify-center text-brand-white group-hover:border-brand-orange group-hover:text-brand-orange transition-colors flex-shrink-0 ml-2">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <div className="min-h-[48px] flex items-center">
                  <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-light text-brand-white uppercase tracking-tight group-hover:text-brand-yellow-golden transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                    {category.title}
                  </h3>
                </div>

                <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 font-light flex items-center justify-between pt-1 min-h-[40px]">
                  <span>{category.subtitle}</span>
                  <span className="text-brand-orange font-bold ml-2">→</span>
                </p>
              </div>

              {/* Corner Accent Line */}
              <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-px h-6 bg-brand-orange" />
                <div className="absolute top-0 right-0 h-px w-6 bg-brand-orange" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Detail View Modal / Master Photo Gallery */}
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

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl max-h-[88vh] bg-[#0B0908] border border-brand-orange/40 overflow-y-auto p-6 sm:p-10 z-10 shadow-[0_0_80px_rgba(241,94,28,0.25)] rounded-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-brand-void border border-white/20 text-brand-white hover:text-brand-orange hover:border-brand-orange flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="border-b border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-2">
                  <Sparkles className="w-4 h-4 text-brand-yellow-golden" />
                  <span>MASTER CATALOGUE</span>
                </div>
                <h3 className="font-serif-display text-4xl sm:text-5xl font-light text-brand-white uppercase">
                  {selectedCategory.title}
                </h3>
                <p className="font-sans text-sm text-brand-platinum font-light mt-1">
                  {selectedCategory.subtitle}
                </p>
              </div>

              {/* Master Gallery Grid for Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Primary Image */}
                <div className="bg-brand-void border border-white/10 p-4 space-y-3 group hover:border-brand-orange transition-colors">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                    <Image
                      src={selectedCategory.primaryImage}
                      alt={`${selectedCategory.title} Feature`}
                      fill
                      sizes="400px"
                      className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="pt-2">
                    <span className="text-[10px] font-syne tracking-micro text-brand-orange font-bold uppercase">
                      FEATURED PHOTOGRAPH 01
                    </span>
                    <h4 className="font-serif-display text-lg text-brand-white font-light uppercase mt-1">
                      {selectedCategory.title} EDITORIAL
                    </h4>
                  </div>
                </div>

                {/* Secondary Images */}
                {selectedCategory.secondaryImages.map((secImg, idx) => (
                  <div key={idx} className="bg-brand-void border border-white/10 p-4 space-y-3 group hover:border-brand-orange transition-colors">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                      <Image
                        src={secImg}
                        alt={`${selectedCategory.title} Capture ${idx + 2}`}
                        fill
                        sizes="400px"
                        className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="pt-2">
                      <span className="text-[10px] font-syne tracking-micro text-brand-green font-bold uppercase">
                        PHOTOGRAPH 0{idx + 2}
                      </span>
                      <h4 className="font-serif-display text-lg text-brand-white font-light uppercase mt-1">
                        {selectedCategory.title} STUDY 0{idx + 2}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="mt-10 pt-6 border-t border-white/10 text-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="bg-brand-orange px-8 py-3 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors"
                >
                  CLOSE DISCOVERY
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
