"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MODELS_DATA } from "@/data/models";

export default function HomeGalleryPreview() {
  const previewItems = MODELS_DATA.allImages.slice(0, 6);

  const getPreviewCategoryLabel = (index: number) => {
    const tags = [
      "RUNWAY & STAGE",
      "COUTURE DETAILS",
      "PEOPLE & MOMENTS",
      "ARCHITECTURE & LIGHTING",
      "EXPERIENCE",
      "RUNWAY & STAGE",
    ];
    return tags[index % tags.length];
  };

  return (
    <section className="relative py-24 bg-brand-void border-b border-white/10 overflow-hidden">
      <div className="w-[92vw] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-orange font-bold uppercase">
                VISUAL ARCHIVE
              </span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase tracking-tight">
              THE <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff8833] to-brand-yellow-golden">GALLERY</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-xs mt-4 sm:mt-0 font-light">
            Moments from LifeStyle, Runway and the FashAI Universal experience.
          </p>
        </div>

        {/* 6-Image Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
          {previewItems.map((item, index) => {
            const spans = [
              "md:col-span-4 lg:col-span-4",
              "md:col-span-5 lg:col-span-5",
              "md:col-span-3 lg:col-span-3",
              "md:col-span-5 lg:col-span-5",
              "md:col-span-3 lg:col-span-3",
              "md:col-span-4 lg:col-span-4",
            ];
            const colSpan = spans[index % spans.length];

            const aspectClass =
              index % 3 === 0
                ? "aspect-[3/4]"
                : index % 3 === 1
                ? "aspect-[16/10]"
                : "aspect-[4/5]";

            const categoryTag = getPreviewCategoryLabel(index);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`${colSpan} group relative overflow-hidden bg-brand-charcoal border border-white/10 hover:border-brand-orange transition-all duration-500 hover:shadow-[0_0_30px_rgba(241,94,28,0.3)]`}
              >
                <Link href="/gallery">
                  <div className={`relative ${aspectClass} w-full overflow-hidden`}>
                    <Image
                      src={item.thumb}
                      alt={`FashAI Universal Visual Archive ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover filter contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-void/85 via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Category Tag Overlay (Bottom-Left Corner) */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="font-syne text-[10px] tracking-micro text-brand-white font-bold uppercase px-3 py-1 bg-black/75 backdrop-blur-sm border border-white/15 drop-shadow-md">
                        {categoryTag}
                      </span>
                    </div>

                    {/* Hover Line Reveal */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    {/* Arrow Indicator */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 flex items-center justify-center bg-brand-orange text-white text-xs font-syne font-bold">
                      ↗
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t border-white/10 pt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-brand-orange px-10 py-5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_25px_rgba(241,94,28,0.4)] hover:-translate-y-0.5 transition-all duration-300 shadow-xl"
            data-cursor="explore"
          >
            <span>EXPLORE FULL GALLERY ↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
