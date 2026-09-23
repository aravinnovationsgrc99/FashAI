"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Chapter2025() {
  const images2025 = [
    { src: "/assets/models/model_01.jpeg", alt: "LifeStyle 2025 Photo 1" },
    { src: "/assets/models/model_02.jpeg", alt: "LifeStyle 2025 Photo 2" },
    { src: "/assets/models/model_03.jpeg", alt: "LifeStyle 2025 Photo 3" },
    { src: "/assets/models/model_05.jpeg", alt: "LifeStyle 2025 Photo 4" },
  ];

  return (
    <section id="lifestyle-2025" className="relative w-full flex flex-col justify-center py-14 sm:py-20 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Rich Background Atmosphere Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#FAB60A]/10 blur-[160px] rounded-full" />
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-brand-orange/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="editorial-watermark absolute bottom-4 left-1/2 -translate-x-1/2 text-[18vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none">
          2025 ARCHIVE
        </div>
      </div>

      <div className="container-editorial relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-hairline-orange pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-2">
              <span className="h-px w-8 bg-brand-orange" />
              <span>PREVIOUS EDITION</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase">
              LifeStyle <span className="italic text-brand-orange font-normal">2025</span>
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 text-left sm:text-right">
            <span className="text-xs font-syne tracking-micro text-brand-yellow-golden font-bold block uppercase mb-1">
              VISUAL RETROSPECTIVE
            </span>
            <span className="text-[10px] font-syne tracking-caps text-brand-platinum uppercase">
              COMPLETED EDITION
            </span>
          </div>
        </div>

        <p className="font-sans text-base sm:text-lg text-brand-platinum/90 max-w-2xl font-light leading-relaxed mb-10">
          A visual record of the LifeStyle 2025 experience. Bringing together physical garment art with spatial light and luxury fashion identity.
        </p>

        {/* Real 2025 Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {images2025.map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative aspect-[3/4] overflow-hidden rounded-none border border-hairline-orange/40 group bg-black"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-[10px] font-syne tracking-micro text-brand-white uppercase font-semibold">
                LIFESTYLE 2025 • ARCHIVE {index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-hairline-orange">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-brand-charcoal border border-hairline-orange/50 px-8 py-3.5 text-xs font-syne tracking-caps text-brand-white hover:bg-brand-orange hover:text-white transition-all duration-300 font-bold"
          >
            <span>VIEW FULL 2025 VISUAL ARCHIVE</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
