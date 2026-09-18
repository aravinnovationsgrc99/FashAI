"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MODELS_DATA } from "@/data/models";

export default function HomeGalleryPreview() {
  // Select top model covers for homepage preview
  const previewItems = MODELS_DATA.allImages.slice(0, 6);

  return (
    <section className="relative py-24 bg-brand-void border-b border-hairline-gold overflow-hidden">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-hairline-gold pb-8">
          <div>
            <span className="text-xs font-syne tracking-micro text-brand-gold block mb-3 font-bold uppercase">
              04 / THE FACES OF FASHPRISM
            </span>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-off-white">
              THE VISUAL ARCHIVE
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum max-w-xs mt-4 sm:mt-0 font-light">
            Moments. Movement. Light. High-definition digital fashion exhibition showcasing {MODELS_DATA.totalImages} official captures.
          </p>
        </div>

        {/* 6-Image Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {previewItems.map((item, index) => {
            const spans = [
              "md:col-span-7",
              "md:col-span-5",
              "md:col-span-4",
              "md:col-span-8",
              "md:col-span-6",
              "md:col-span-6",
            ];
            const colSpan = spans[index % spans.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`${colSpan} group relative overflow-hidden bg-brand-charcoal border border-hairline-gold/60 hover:border-brand-gold transition-colors`}
              >
                <Link href="/gallery">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={item.thumb}
                      alt={item.modelName}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover filter contrast-110 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-void/90 border border-hairline-gold px-2.5 py-1 text-[9px] font-syne tracking-micro text-brand-gold font-bold">
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div>
                        <div className="text-[10px] font-syne tracking-micro text-brand-gold font-bold uppercase">
                          {item.modelName} • {item.category}
                        </div>
                        <h3 className="font-serif-display text-lg sm:text-xl font-light text-brand-off-white group-hover:text-brand-gold transition-colors mt-0.5">
                          FASHPRISM EXHIBITION
                        </h3>
                      </div>
                      <span className="text-xs font-syne text-brand-gold group-hover:translate-x-1 transition-transform">
                        ↗
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t border-hairline-gold pt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F5DFB3] via-[#D4AF37] to-[#A37F2C] px-10 py-5 text-xs font-syne tracking-caps font-bold text-brand-void hover:opacity-90 transition-opacity shadow-lg"
            data-cursor="explore"
          >
            <span>EXPLORE COMPLETE VISUAL ARCHIVE ({MODELS_DATA.totalImages} IMAGES) ↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}


