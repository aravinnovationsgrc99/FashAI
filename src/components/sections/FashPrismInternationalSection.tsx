"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe } from "lucide-react";
import { FASHPRISM_INTERNATIONAL_DATA } from "@/data/fashprism";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export default function FashPrismInternationalSection() {
  const prefersReducedMotion = useReducedMotion();

  const heroImage = FASHPRISM_INTERNATIONAL_DATA[0];
  const supportingImages = FASHPRISM_INTERNATIONAL_DATA.slice(1);

  return (
    <section
      id="fashprism-international"
      className="relative py-14 sm:py-20 bg-[#030303] border-b border-white/10 text-brand-white overflow-hidden select-none"
    >
      {/* Subtle Gold Ambient Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-brand-yellow-golden/5 blur-[220px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
              <Globe className="w-4 h-4 text-brand-yellow-golden" />
              <span>EDITORIAL CHAPTER 02</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-none">
              FASHPRISM <span className="font-serif italic font-normal text-brand-yellow-golden capitalize">International</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-md font-light leading-relaxed">
            A global visual story showcasing international couture direction, dynamic catwalk movement, and spatial stage architecture.
          </p>
        </div>

        {/* Cinematic Main Featured Image */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group relative overflow-hidden bg-[#080707] border border-brand-yellow-golden/30 rounded-2xl shadow-2xl mb-8 sm:mb-10"
        >
          <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:h-[480px] w-full overflow-hidden">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Gold Rule Overlay Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-yellow-golden to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-block text-[10px] font-syne tracking-widest text-brand-yellow-golden uppercase font-bold mb-1">
                  {heroImage.tag}
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-white font-light uppercase">
                  {heroImage.title}
                </h3>
              </div>
              <p className="font-sans text-xs text-brand-platinum/80 max-w-xs font-light">
                {heroImage.caption}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Editorial Image Strip (3 Supporting Images with Gold Accent & Overlapping Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {supportingImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative flex flex-col bg-[#080707] border border-white/10 rounded-xl overflow-hidden hover:border-brand-yellow-golden/60 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                {/* Animated Gold Bottom Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-yellow-golden group-hover:w-full transition-all duration-500 ease-out" />
              </div>

              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow bg-[#050505] space-y-2 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] font-syne tracking-wider text-brand-yellow-golden uppercase font-bold">
                  <span>{img.tag}</span>
                  <span className="text-white/40">CHAPTER 02 · 0{idx + 2}</span>
                </div>
                <h4 className="font-serif-display text-lg font-light text-brand-white uppercase leading-snug">
                  {img.title}
                </h4>
                <p className="font-sans text-xs text-brand-platinum/75 font-light leading-relaxed">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
