"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { FASHPRISM_INDIA_DATA } from "@/data/fashprism";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export default function FashPrismIndiaSection() {
  const prefersReducedMotion = useReducedMotion();

  const featuredImage = FASHPRISM_INDIA_DATA[0];
  const sideImages = FASHPRISM_INDIA_DATA.slice(1, 4);
  const bottomImages = FASHPRISM_INDIA_DATA.slice(4);

  return (
    <section
      id="fashprism-india"
      className="relative py-10 sm:py-14 bg-[#050505] border-b border-white/10 text-brand-white overflow-hidden select-none"
    >
      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
              <span>COUTURE &amp; ARCHIVE</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-none">
              FASHPRISM <span className="font-serif italic font-normal text-brand-yellow-golden capitalize">India</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-md font-light leading-relaxed">
            A curated visual chapter from the FashPrism India experience. Bringing together physical garment art with spatial light and luxury fashion identity.
          </p>
        </div>

        {/* Asymmetrical Editorial Composition (Desktop: 60% Featured / 40% Supporting) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-8 sm:mb-12">
          
          {/* Left Column: Large Featured Main Image */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group relative overflow-hidden bg-[#0A0908] border border-brand-yellow-golden/30 rounded-2xl shadow-2xl"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:h-[580px] w-full overflow-hidden">
              <Image
                src={featuredImage.src}
                alt={featuredImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Magazine Overlay Caption */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[11px] sm:text-xs font-syne tracking-wider text-brand-yellow-golden uppercase font-bold drop-shadow">
                <span>{featuredImage.tag}</span>
                <span className="text-white/80">FASHPRISM INDIA</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-[#080706] border-t border-white/10 space-y-1">
              <h3 className="font-serif-display text-xl sm:text-2xl font-light text-brand-white uppercase">
                {featuredImage.title}
              </h3>
              <p className="font-sans text-xs text-brand-platinum/80 font-light">
                {featuredImage.caption}
              </p>
            </div>
          </motion.div>

          {/* Right Column: 3 Supporting Asymmetrical Images Stack */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {sideImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden bg-[#0A0908] border border-white/10 rounded-xl hover:border-brand-yellow-golden/60 transition-all duration-500"
              >
                <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    className="object-cover object-center filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute bottom-3 left-4 right-4 text-[10px] font-syne text-brand-yellow-golden uppercase font-bold tracking-wider">
                    <span>{img.tag}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Editorial Image Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/10">
          {bottomImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative overflow-hidden bg-[#0A0908] border border-white/10 rounded-xl hover:border-brand-yellow-golden/50 transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-[10px] font-syne tracking-wider text-brand-yellow-golden font-bold uppercase truncate">
                  {img.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
