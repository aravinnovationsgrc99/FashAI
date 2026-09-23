"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, UserPlus, Sparkles } from "lucide-react";
import RoleApplicationModal, { RoleType } from "@/components/forms/RoleApplicationModal";

interface RoleOption {
  role: RoleType;
  title: string;
  subtitle: string;
  isNomination?: boolean;
}

const ROLES: RoleOption[] = [
  {
    role: "designer",
    title: "APPLY AS A DESIGNER",
    subtitle: "Present couture collections, fashion lines, or apparel designs.",
  },
  {
    role: "model",
    title: "APPLY AS A MODEL",
    subtitle: "Runway, editorial, and commercial modeling participation.",
  },
  {
    role: "choreographer",
    title: "APPLY AS A CHOREOGRAPHER",
    subtitle: "Catwalk choreography, runway movement, and stage direction.",
  },
  {
    role: "makeup_artist",
    title: "APPLY AS A MAKEUP ARTIST",
    subtitle: "Beauty direction, backstage artistry, and look styling.",
  },
  {
    role: "stylist",
    title: "APPLY AS A STYLIST",
    subtitle: "Wardrobe coordination, campaign lookbook, and editorial styling.",
  },
  {
    role: "influencer",
    title: "APPLY AS AN INFLUENCER / CREATOR",
    subtitle: "Digital media storytelling and event content amplification.",
  },
  {
    role: "celebrity",
    title: "APPLY AS A CELEBRITY / PUBLIC FIGURE",
    subtitle: "Special appearances, VIP participation, and campaign roles.",
  },
  {
    role: "nomination",
    title: "NOMINATE A CREATIVE TALENT",
    subtitle: "Know a designer, artist, model or stylist who should be featured?",
    isNomination: true,
  },
];

export default function OpenNominationsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<RoleType>("designer");

  const handleOpenRoleForm = (role: RoleType) => {
    setActiveRole(role);
    setIsModalOpen(true);
  };

  return (
    <section id="nominations" className="relative py-24 sm:py-32 bg-[#060606] border-b border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow-golden/5 blur-[200px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              <span>SELECTION & RECRUITMENT</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase">
              OPEN NOMINATIONS
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-md font-light leading-relaxed">
            Applications are open for selected fashion, creative, event, and participation opportunities. Select your specific domain below to access the dedicated role application.
          </p>
        </div>

        {/* Category Cards Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROLES.map((item, idx) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                item.isNomination
                  ? "bg-gradient-to-b from-[#1a150c] to-[#0D0B0A] border-brand-yellow-golden/50 hover:border-brand-yellow-golden"
                  : "bg-[#0B0A09] border-white/10 hover:border-brand-orange/50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-syne uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                      item.isNomination
                        ? "bg-brand-yellow-golden/20 text-brand-yellow-golden border border-brand-yellow-golden/40"
                        : "bg-brand-orange/10 text-brand-orange border border-brand-orange/20"
                    }`}
                  >
                    {item.isNomination ? "NOMINATION FLOW" : "DIRECT APPLICATION"}
                  </span>
                  {item.isNomination ? (
                    <Award className="w-5 h-5 text-brand-yellow-golden" />
                  ) : (
                    <UserPlus className="w-5 h-5 text-brand-platinum/50 group-hover:text-brand-orange transition-colors" />
                  )}
                </div>

                <h3 className="font-serif-display text-lg sm:text-xl font-light text-white uppercase mb-2 group-hover:text-brand-yellow-golden transition-colors">
                  {item.title}
                </h3>

                <p className="font-sans text-xs text-brand-platinum/70 leading-relaxed font-light mb-6">
                  {item.subtitle}
                </p>
              </div>

              <button
                onClick={() => handleOpenRoleForm(item.role)}
                className={`w-full py-3 px-4 rounded-xl font-syne text-xs font-bold tracking-caps flex items-center justify-between transition-all ${
                  item.isNomination
                    ? "bg-brand-yellow-golden text-black hover:bg-yellow-400"
                    : "bg-white/10 text-white hover:bg-brand-orange hover:text-white"
                }`}
              >
                <span>{item.isNomination ? "NOMINATE NOW" : "APPLY NOW"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Role-Specific Application Modal Drawer */}
      <RoleApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={activeRole}
      />
    </section>
  );
}
