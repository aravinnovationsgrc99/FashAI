"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GALLERY_DATA } from "@/data/gallery";
import Lightbox from "../ui/Lightbox";

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length);
  };

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 px-6 sm:px-12 bg-brand-void border-b border-hairline overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-hairline pb-8">
          <div>
            <span className="text-xs font-syne tracking-micro text-brand-orange block mb-2">
              04 / DIGITAL EXHIBITION
            </span>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-off-white">
              COUTURE ARCHIVE
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum max-w-xs mt-4 sm:mt-0">
            Click any artwork to open the high-definition editorial lightbox.
          </p>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {GALLERY_DATA.map((item, index) => {
            // Asymmetric col span layout for editorial feel
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${colSpan} group cursor-pointer`}
                onClick={() => openLightbox(index)}
                data-cursor="view"
              >
                <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[420px] w-full overflow-hidden border border-hairline bg-brand-charcoal">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Caption & Metadata overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-syne tracking-micro text-brand-orange">
                        {item.category} / {item.year}
                      </div>
                      <h3 className="font-serif-display text-xl sm:text-2xl font-light text-brand-off-white group-hover:text-brand-gold transition-colors mt-1">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs text-brand-platinum font-light">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="h-8 w-8 flex items-center justify-center border border-brand-gold/40 text-brand-gold group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-brand-void transition-colors">
                      ↗
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        items={GALLERY_DATA}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
