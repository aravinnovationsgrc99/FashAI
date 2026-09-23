"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export default function WhatWeDoSection() {
  const categories = [
    {
      title: "FASHION EVENTS",
      subtitle: "Haute Couture, Runway Shows & International Fashion Weeks.",
      description: "High-impact runway productions, designer showcases, and high-fashion presentations.",
      image: "/assets/models/model_03.jpeg",
      featured: true,
    },
    {
      title: "LIFESTYLE EVENTS",
      subtitle: "Curated Luxury Experiences & Brand Activations.",
      description: "Bespoke lifestyle experiences, press receptions, and luxury product launches.",
      image: "/assets/models/model_04.jpeg",
      featured: false,
    },
    {
      title: "PRODUCT EVENTS",
      subtitle: "Launches & Experiential Showcases.",
      description: "Strategic product unveilings designed for media, buyers, and high-net-worth guests.",
      image: "/assets/models/model_05.jpeg",
      featured: false,
    },
    {
      title: "CORPORATE EVENTS",
      subtitle: "Executive Gatherings & High-Level Receptions.",
      description: "Sophisticated corporate experiences, gala dinners, and industry conferences.",
      image: "/assets/models/model_06.jpeg",
      featured: false,
    },
    {
      title: "IT EVENTS",
      subtitle: "Technology & Innovation Summits.",
      description: "Curated technology showcases, digital summits, and computational fashion forums.",
      image: "/assets/models/model_07.jpeg",
      featured: false,
    },
  ];

  return (
    <section id="what-we-do" className="relative py-24 sm:py-32 bg-[#060606] border-b border-white/10 text-brand-white overflow-hidden">
      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow-golden/10 border border-brand-yellow-golden/40 text-brand-yellow-golden text-xs font-syne tracking-micro font-bold uppercase mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>WHAT WE DO</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase">
              EVENT FORMATS &amp; <span className="font-serif italic text-brand-yellow-golden">Services</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 max-w-md font-light leading-relaxed">
            FashAI Universal conceives, designs, and executes specialized event formats across fashion, lifestyle, corporate, product, and technology sectors.
          </p>
        </div>

        {/* Asymmetric Non-Box Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Feature: Fashion Events (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 group relative bg-black/80 rounded-3xl border border-brand-yellow-golden/40 p-8 sm:p-10 flex flex-col justify-between overflow-hidden shadow-[0_0_40px_rgba(250,182,10,0.1)] hover:border-brand-yellow-golden transition-all duration-500 min-h-[440px]"
          >
            <div className="relative z-10 space-y-4 max-w-lg">
              <span className="text-[10px] font-syne tracking-widest text-brand-yellow-golden uppercase font-bold px-3 py-1 bg-brand-yellow-golden/10 rounded-full border border-brand-yellow-golden/40">
                FLAGSHIP FORMAT
              </span>
              <h3 className="font-serif-display text-3xl sm:text-5xl font-light uppercase text-brand-white group-hover:text-brand-yellow-golden transition-colors">
                {categories[0].title}
              </h3>
              <p className="font-sans text-sm text-brand-platinum/90 font-light leading-relaxed">
                {categories[0].description}
              </p>
            </div>

            <div className="relative z-10 pt-6 flex items-center justify-between border-t border-white/10">
              <span className="text-xs font-syne text-brand-yellow-golden tracking-widest uppercase font-bold">
                EXPLORE EVENT FORMATS
              </span>
              <Link
                href="/projects"
                className="w-10 h-10 rounded-full bg-brand-yellow-golden text-black flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Background Image Layer */}
            <Image
              src={categories[0].image}
              alt={categories[0].title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-top opacity-35 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
          </motion.div>

          {/* Secondary Features Grid (Span 5) */}
          <div className="md:col-span-5 grid grid-cols-1 gap-6">
            {categories.slice(1, 3).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-black/80 rounded-2xl border border-white/15 p-6 flex flex-col justify-between overflow-hidden hover:border-brand-yellow-golden/60 transition-all duration-300 min-h-[200px]"
              >
                <div className="relative z-10 space-y-2">
                  <h4 className="font-serif-display text-xl sm:text-2xl font-light uppercase text-brand-white group-hover:text-brand-yellow-golden transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-brand-platinum/80 font-light">
                    {item.subtitle}
                  </p>
                </div>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="40vw"
                  className="object-cover opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Bottom Row: Corporate & IT Events (Span 12 split) */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {categories.slice(3).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-black/80 rounded-2xl border border-white/15 p-7 flex flex-col justify-between overflow-hidden hover:border-brand-yellow-golden/60 transition-all duration-300 min-h-[210px]"
              >
                <div className="relative z-10 space-y-2">
                  <h4 className="font-serif-display text-2xl font-light uppercase text-brand-white group-hover:text-brand-yellow-golden transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-brand-platinum/80 font-light">
                    {item.description}
                  </p>
                </div>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="50vw"
                  className="object-cover opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
