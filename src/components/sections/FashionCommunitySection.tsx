"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { PEOPLE_MASTER_DATA, PeopleCategory } from "@/data/people";
import RoleApplicationModal, { RoleType } from "@/components/forms/RoleApplicationModal";

export default function FashionCommunitySection() {
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

  return (
    <section id="community" className="relative py-24 sm:py-32 bg-black border-b border-white/10 overflow-hidden">
      {/* Atmosphere Background Glows */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-brand-orange/10 blur-[170px] rounded-full" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-brand-green/10 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-yellow-golden/8 blur-[160px] rounded-full" />
        <div className="editorial-watermark absolute -bottom-10 right-0 text-[14vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none">
          TALENT
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-3">
              <Sparkles className="w-4 h-4 text-brand-yellow-golden" />
              <span>OFFICIAL TALENT NETWORK & RECRUITMENT</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase">
              FASHION COMMUNITY & TALENT
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-md font-light leading-relaxed">
            Join the creative network behind fashion, beauty, runway and lifestyle experiences. Explore opportunities across couture, modeling, makeup, styling, choreography, digital media, and public appearances.
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
                  <span className="text-[10px] font-syne tracking-micro text-brand-orange font-bold uppercase bg-brand-orange/10 border border-brand-orange/30 px-3 py-1 rounded-full">
                    {category.tagline}
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-light text-brand-white uppercase tracking-tight group-hover:text-brand-yellow-golden transition-colors pt-1">
                  {category.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light min-h-[40px] leading-relaxed">
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
                  className="w-full bg-gradient-to-r from-brand-orange to-brand-yellow-golden hover:opacity-95 text-black py-3 px-5 text-xs font-syne tracking-caps font-bold transition-all flex items-center justify-between rounded-xl shadow-lg group-hover:scale-[1.01]"
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
