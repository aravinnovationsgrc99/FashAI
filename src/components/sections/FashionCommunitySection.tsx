"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { PEOPLE_MASTER_DATA, PeopleCategory } from "@/data/people";
import RoleApplicationModal, { RoleType } from "@/components/forms/RoleApplicationModal";

import Link from "next/link";

interface FashionCommunitySectionProps {
  isHomepage?: boolean;
}

export default function FashionCommunitySection({ isHomepage = false }: FashionCommunitySectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleType>("designer");

  const categoryToRoleMap: Record<string, RoleType> = {
    fashion_designer: "designer",
    model: "model",
    makeup_artist: "makeup_artist",
    fashion_stylist: "stylist",
    influencer_creator: "influencer",
    celebrity_public_figure: "celebrity",
    choreographer: "choreographer",
  };

  const handleOpenApplication = (categoryId: string) => {
    const role = categoryToRoleMap[categoryId] || "designer";
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  if (isHomepage) {
    return (
      <section id="community" className="relative py-8 sm:py-12 md:py-14 bg-black border-b border-white/10 overflow-hidden select-none">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="editorial-watermark absolute -bottom-10 right-0 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none opacity-30">
            TALENT
          </div>
        </div>

        <div className="container-editorial relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-syne tracking-micro text-[#D4AF37] font-bold uppercase mb-2">
                <span className="h-px w-8 bg-[#D4AF37]" />
                <span>GLOBAL TALENT ECOSYSTEM</span>
              </div>
              <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase">
                FASHION COMMUNITY &amp; <span className="font-serif italic font-normal text-[#D4AF37]">TALENT NETWORK</span>
              </h2>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-brand-white/90 max-w-2xl font-light leading-relaxed">
              FashAI Universal maintains an international creative network connecting Designers, Models, Makeup Artists, Stylists, Choreographers, Creators, and Public Figures across global fashion hubs.
            </p>

            <Link
              href="/community"
              className="inline-flex items-center justify-center gap-2.5 bg-[#D4AF37] hover:bg-[#FFEC69] text-[#111111] border border-[#D4AF37] px-8 py-3.5 rounded-full font-syne text-sm sm:text-base font-bold tracking-wider uppercase transition-all duration-300 shadow-lg shrink-0 group"
            >
              <span>DISCOVER TALENT NETWORK</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="community" className="relative py-14 sm:py-20 bg-black border-b border-white/10 select-none overflow-hidden text-brand-white">
      {/* Background Editorial Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="editorial-watermark absolute -bottom-10 right-0 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none opacity-30">
          TALENT
        </div>
      </div>

      <div className="container-editorial relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-syne tracking-micro text-brand-orange font-bold uppercase mb-2">
            <span className="h-px w-8 bg-brand-orange" />
            <span>GLOBAL TALENT ECOSYSTEM</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-tight">
            FASHION COMMUNITY &amp; <span className="font-serif italic font-normal text-brand-yellow-golden">TALENT NETWORK</span>
          </h1>

          <p className="font-sans text-base sm:text-lg md:text-xl text-brand-platinum/90 font-light mt-3 max-w-3xl leading-relaxed">
            FashAI Universal maintains an international creative network connecting Designers, Models, Makeup Artists, Stylists, Choreographers, Creators, and Public Figures across global fashion hubs.
          </p>
        </div>

        {/* Category Editorial Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PEOPLE_MASTER_DATA.map((category: PeopleCategory) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative bg-[#0D0B0A] border border-brand-orange/30 rounded-2xl overflow-hidden flex flex-col justify-between p-6 sm:p-8 hover:border-brand-yellow-golden transition-all duration-500 shadow-2xl"
            >
              {/* Card Top Information */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-syne tracking-micro text-brand-orange font-bold uppercase">
                    {category.tagline}
                  </span>
                </div>

                <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-light text-brand-white uppercase tracking-tight group-hover:text-brand-yellow-golden transition-colors pt-1">
                  {category.title}
                </h2>

                <p className="font-sans text-base sm:text-lg text-brand-platinum/80 font-light min-h-[40px] leading-relaxed">
                  {category.subtitle}
                </p>
              </div>

              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 bg-black rounded-xl border border-white/10 group-hover:border-brand-yellow-golden/50 transition-colors">
                <Image
                  src={category.primaryImage}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover ${category.objectPosition} filter contrast-105 grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out opacity-90 group-hover:opacity-100`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Card Bottom CTA Block */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() => handleOpenApplication(category.categoryId)}
                  className="w-full bg-gradient-to-r from-brand-orange to-brand-yellow-golden hover:opacity-95 text-black py-3.5 px-5 text-sm sm:text-base font-syne tracking-caps font-bold transition-all flex items-center justify-between rounded-xl shadow-lg group-hover:scale-[1.01]"
                >
                  <span>{category.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Role-Specific Application Modal */}
      <RoleApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={selectedRole}
      />
    </section>
  );
}
