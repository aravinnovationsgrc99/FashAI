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
    <section id="lifestyle-2025" className="relative w-full flex flex-col justify-center pt-4 sm:pt-6 pb-2 sm:pb-3 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Rich Background Atmosphere Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="editorial-watermark absolute bottom-4 left-1/2 -translate-x-1/2 text-[18vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none">
          2025 ARCHIVE
        </div>
      </div>

      <div className="container-editorial relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-hairline-orange pb-6">
          <div>
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-2">
              <span className="h-px w-8 bg-brand-orange" />
              <span>PREVIOUS EDITION</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-brand-white uppercase">
              LifeStyle <span className="italic text-brand-orange font-normal">2025</span>
            </h2>
          </div>
          <div className="mt-3 sm:mt-0 text-left sm:text-right flex flex-col items-start sm:items-end gap-2">
            <span className="text-xs font-syne tracking-micro text-brand-yellow-golden font-bold block uppercase mb-1">
              VISUAL RETROSPECTIVE
            </span>
            <a
              href="https://www.facebook.com/profile.php?id=61573489951314"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#FAB60A] text-[#111111] hover:bg-[#FFEC69] px-4 py-2 text-xs font-syne tracking-caps font-bold transition-all duration-300 rounded-full shadow-md"
            >
              <span>VIEW</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-2xl font-light leading-relaxed mb-6">
          A visual record of the LifeStyle 2025 experience. Bringing together physical garment art with spatial light and luxury fashion identity.
        </p>

        {/* Real 2025 Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {images2025.map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="relative aspect-[3/4] overflow-hidden rounded-xl border border-hairline-orange/40 group bg-black shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-[10px] font-syne tracking-micro text-brand-white keep-white uppercase font-semibold drop-shadow">
                LIFESTYLE 2025 • ARCHIVE {index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-hairline-orange">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-[#080706] border border-brand-yellow-golden/50 px-6 py-3 text-xs font-syne tracking-caps text-brand-white keep-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 font-bold rounded-full shadow-md"
          >
            <span>VIEW FULL 2025 VISUAL ARCHIVE</span>
            <span>↗</span>
          </Link>

          <a
            href="https://www.facebook.com/profile.php?id=61573489951314"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FAB60A] text-[#111111] hover:bg-[#FFEC69] px-6 py-3 text-xs font-syne tracking-caps font-bold transition-all duration-300 rounded-full shadow-lg"
          >
            <span>VIEW</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
