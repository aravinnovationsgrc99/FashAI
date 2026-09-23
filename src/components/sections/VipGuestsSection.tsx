"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award } from "lucide-react";
import { FASHPRISM_VIP_DATA } from "@/data/fashprism";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export default function VipGuestsSection() {
  const prefersReducedMotion = useReducedMotion();

  const featuredGuest = FASHPRISM_VIP_DATA[0];
  const supportingGuests = FASHPRISM_VIP_DATA.slice(1);

  return (
    <section
      id="vip-guests"
      className="relative py-14 sm:py-20 bg-[#050505] border-b border-white/10 text-brand-white overflow-hidden select-none"
    >
      {/* Soft Ambient Radial Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-yellow-golden/5 blur-[250px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
              <Award className="w-4 h-4 text-brand-yellow-golden" />
              <span>EDITORIAL CHAPTER 03</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-none">
              VIP <span className="font-serif italic font-normal text-brand-yellow-golden capitalize">Guests</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-md font-light leading-relaxed">
            Featured personalities and distinguished guests from the FashPrism experience.
          </p>
        </div>

        {/* Prestigious Editorial Composition: 1 Featured VIP Portrait + 3 Refined Supporting Portraits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Featured VIP Portrait (5 Cols) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 group relative flex flex-col justify-end bg-[#0A0908] border border-brand-yellow-golden/30 rounded-2xl overflow-hidden shadow-2xl min-h-[420px] lg:min-h-[520px]"
          >
            <Image
              src={featuredGuest.src}
              alt={featuredGuest.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-top filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />

            <div className="relative z-10 p-6 sm:p-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow-golden/10 border border-brand-yellow-golden/40 rounded-full text-[10px] font-syne text-brand-yellow-golden font-bold uppercase tracking-wider">
                <span>{featuredGuest.tag}</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-brand-white font-light uppercase">
                {featuredGuest.title}
              </h3>
              <p className="font-sans text-xs text-brand-platinum/80 font-light leading-relaxed">
                {featuredGuest.caption}
              </p>
            </div>
          </motion.div>

          {/* 3 Supporting VIP Guest Portraits (7 Cols Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {supportingGuests.map((guest, idx) => (
              <motion.div
                key={guest.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group relative flex flex-col bg-[#080706] border border-white/10 rounded-xl overflow-hidden hover:border-brand-yellow-golden/60 transition-all duration-500"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={guest.src}
                    alt={guest.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Gold Accent Indicator */}
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-yellow-golden shadow-sm" />

                  <div className="absolute bottom-3 left-3 right-3 text-[10px] font-syne tracking-wider text-brand-yellow-golden font-bold uppercase">
                    {guest.tag}
                  </div>
                </div>

                <div className="p-4 bg-[#050505] border-t border-white/5 space-y-1 flex-grow">
                  <h4 className="font-serif-display text-sm font-light text-brand-white uppercase truncate">
                    {guest.title}
                  </h4>
                  <p className="font-sans text-[11px] text-brand-platinum/75 font-light line-clamp-2 leading-tight">
                    {guest.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
