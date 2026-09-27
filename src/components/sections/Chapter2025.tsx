"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";

export default function Chapter2025() {
  const homepageProjects = [
    {
      id: "fashprism-india",
      title: "FASHPRISM INDIA",
      subtitle: "Haute Couture & Runway Archive",
      category: "FASHPRISM",
      timing: "2025 DELIVERED",
      description: "High-couture textile draping, catwalk choreography, and creative talent showcases delivered for the India chapter.",
      image: "/assets/final/WhatsApp Image 2026-09-18 at 15.03.32.jpeg",
      instagramUrl: "https://www.instagram.com/fashai_universal",
      projectSocialUrl: "https://www.facebook.com/profile.php?id=61573489951314",
    },
    {
      id: "fashprism-international",
      title: "FASHPRISM INTERNATIONAL",
      subtitle: "Global Catwalk & Stage Presentation",
      category: "INTERNATIONAL",
      timing: "2025 DELIVERED",
      description: "Cinematic catwalk presentations, avant-garde tailoring, and architectural lighting design for global fashion showcases.",
      image: "/assets/final/WhatsApp Image 2026-09-18 at 15.02.37.jpeg",
      instagramUrl: "https://www.instagram.com/fashai_universal",
      projectSocialUrl: "https://www.facebook.com/profile.php?id=61573489951314",
    },
  ];

  return (
    <section id="our-projects-2025" className="relative w-full py-10 sm:py-16 md:py-20 bg-brand-void text-brand-white border-b border-hairline-orange overflow-hidden select-none">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="editorial-watermark absolute bottom-2 left-1/2 -translate-x-1/2 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none opacity-20 text-white">
          2025 PROJECTS
        </div>
      </div>

      <div className="container-editorial relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-hairline-orange/60 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-syne tracking-widest text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase mb-2">
              <span className="h-px w-8 bg-[#F15E1C] dark:bg-[#D4AF37]" />
              <span>DELIVERED WORK &amp; EDITIONS</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-tight">
              OUR <span className="font-serif italic font-normal text-[#F15E1C] dark:text-[#D4AF37]">PROJECTS 2025</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-sans text-sm sm:text-base text-brand-platinum/85 max-w-md font-light leading-relaxed">
              Selected fashion showcases, FashPrism editions, VIP salons, and creative work delivered across our ecosystem.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-[#F15E1C] dark:bg-[#D4AF37] text-white dark:text-black px-6 py-2.5 rounded-full font-syne text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-[#e04f10] dark:hover:bg-[#FFEC69] transition-all shadow-md group"
            >
              <span>EXPLORE MORE</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Homepage Prioritized Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {homepageProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-[#090807] border border-[#D4AF37]/40 rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-[#D4AF37] transition-all duration-300"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-[16/9.5] w-full rounded-xl overflow-hidden mb-6 bg-black border border-white/10">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md text-[10px] font-syne font-bold uppercase tracking-wider bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 backdrop-blur-md">
                      {proj.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-syne font-bold uppercase tracking-wider bg-[#F15E1C] text-white">
                      {proj.timing}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-serif-display text-3xl sm:text-4xl font-light text-white uppercase leading-tight mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {proj.title}
                </h3>
                <p className="font-syne text-xs sm:text-sm font-bold uppercase text-[#D4AF37] mb-3">
                  {proj.subtitle}
                </p>
                <p className="font-sans text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              {/* Action Buttons Footer — Always visible & clickable */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 relative z-10">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-[#F15E1C] dark:bg-[#D4AF37] text-white dark:text-black px-5 py-2.5 text-xs font-syne tracking-caps font-bold hover:bg-[#e04f10] dark:hover:bg-[#FFEC69] transition-all rounded-full shadow-md group/btn"
                >
                  <span>EXPLORE MORE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>

                <div className="flex items-center gap-2">
                  <a
                    href={proj.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-black/60 border border-white/20 px-3 py-1.5 text-[11px] font-syne font-bold text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors rounded-lg"
                    title="FashPrism Instagram"
                  >
                    <span>INSTAGRAM</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href={proj.projectSocialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-black/60 border border-white/20 px-3 py-1.5 text-[11px] font-syne font-bold text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors rounded-lg"
                    title="Project Facebook Social"
                  >
                    <span>FACEBOOK</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 text-center border-t border-hairline-orange/40">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 bg-[#F15E1C] dark:bg-[#D4AF37] text-white dark:text-black px-8 py-4 text-sm font-syne tracking-caps font-bold hover:bg-[#e04f10] dark:hover:bg-[#FFEC69] transition-all rounded-full shadow-lg hover:scale-105"
          >
            <span>EXPLORE MORE PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
