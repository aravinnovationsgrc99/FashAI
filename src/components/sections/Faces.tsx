"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FACES_DATA, FacePerson } from "@/data/faces";

type FilterCategory = "ALL" | "VIP GUESTS" | "RUNWAY MODELS";

export default function Faces() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("ALL");

  const filteredFaces = FACES_DATA.filter((person) => {
    if (activeCategory === "ALL") return true;
    return person.category === activeCategory;
  });

  const getCount = (cat: FilterCategory) => {
    if (cat === "ALL") return FACES_DATA.length;
    return FACES_DATA.filter((p) => p.category === cat).length;
  };

  return (
    <section
      id="faces"
      className="py-24 sm:py-32 px-6 sm:px-12 bg-brand-atelier border-b border-hairline overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-hairline pb-8">
          <div>
            <span className="text-xs font-syne tracking-micro text-brand-orange block mb-2">
              03 / THE FACES OF FASHPRISM
            </span>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-off-white">
              DELEGATES & TALENT
            </h2>
          </div>

          {/* Filter Category Tabs */}
          <div className="flex flex-wrap gap-3 mt-6 md:mt-0 font-syne text-xs tracking-caps">
            {(["ALL", "VIP GUESTS", "RUNWAY MODELS"] as FilterCategory[]).map(
              (cat) => {
                const isActive = activeCategory === cat;
                const count = getCount(cat);

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 transition-all duration-300 ${
                      isActive
                        ? "bg-brand-orange text-brand-void font-bold"
                        : "bg-brand-charcoal text-brand-off-white/70 hover:text-brand-gold border border-hairline"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Faces Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredFaces.map((person: FacePerson) => (
              <motion.div
                key={person.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative border border-hairline bg-brand-charcoal overflow-hidden"
                data-cursor="view"
              >
                {/* Image Container with 4:5 aspect ratio */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-void">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top filter grayscale contrast-125 transition-transform duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-transparent to-transparent opacity-90" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 border border-brand-gold/40 bg-brand-void/80 px-2.5 py-1 text-[9px] font-syne tracking-micro text-brand-gold">
                    {person.category}
                  </div>
                </div>

                {/* Card Info Footer */}
                <div className="p-6 border-t border-hairline bg-brand-charcoal">
                  <h3 className="font-serif-display text-xl font-light text-brand-off-white group-hover:text-brand-orange transition-colors">
                    {person.name}
                  </h3>

                  {person.title && (
                    <p className="font-syne text-[10px] tracking-micro text-brand-gold mt-1">
                      {person.title}
                    </p>
                  )}

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-hairline-light text-[10px] font-syne tracking-micro text-brand-platinum">
                    <span>{person.event}</span>
                    <span className="text-brand-orange group-hover:translate-x-1 transition-transform">
                      ↗
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
