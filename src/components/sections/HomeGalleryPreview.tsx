"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GALLERY_DATA } from "@/data/gallery";

export default function HomeGalleryPreview() {
  // Select first 5 strong items for preview
  const previewItems = GALLERY_DATA.slice(0, 5);

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-brand-void border-b border-hairline overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-hairline pb-8">
          <div>
            <span className="text-xs font-syne tracking-micro text-brand-orange block mb-3">
              04 / CURATED PHOTOGRAPHY
            </span>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-off-white">
              A GLIMPSE
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum max-w-xs mt-4 sm:mt-0 font-light">
            Moments. Movement. Light. High-definition exhibition preview.
          </p>
        </div>

        {/* 5-Image Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {previewItems.map((item, index) => {
            const spans = [
              "md:col-span-7",
              "md:col-span-5",
              "md:col-span-4",
              "md:col-span-4",
              "md:col-span-4",
            ];
            const colSpan = spans[index % spans.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${colSpan} group relative overflow-hidden bg-brand-charcoal border border-hairline`}
                data-cursor="view"
              >
                <Link href="/gallery">
                  <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[360px] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div>
                        <div className="text-[10px] font-syne tracking-micro text-brand-orange">
                          {item.category} / {item.year}
                        </div>
                        <h3 className="font-serif-display text-lg sm:text-xl font-light text-brand-off-white group-hover:text-brand-gold transition-colors mt-1">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-xs font-syne text-brand-orange group-hover:translate-x-1 transition-transform">
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
        <div className="mt-16 text-center border-t border-hairline pt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-brand-orange px-10 py-5 text-xs font-syne tracking-caps font-bold text-brand-void hover:bg-brand-gold transition-colors"
            data-cursor="explore"
          >
            <span>ENTER GALLERY ↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
