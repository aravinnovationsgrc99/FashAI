"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Sparkles, Check, ArrowRight } from "lucide-react";
import RoleApplicationForm, { RoleSlug } from "@/components/forms/RoleApplicationForm";

export interface RoleCategory {
  id: RoleSlug;
  label: string;
  badge: string;
  description: string;
  isNomination?: boolean;
}

export const WORK_TYPES: RoleCategory[] = [
  {
    id: "designer",
    label: "DESIGNER",
    badge: "COUTURE & ATELIER",
    description: "Present couture collections, fashion lines, or apparel designs.",
  },
  {
    id: "model",
    label: "MODEL",
    badge: "RUNWAY & EDITORIAL",
    description: "Runway, editorial, and commercial modeling participation.",
  },
  {
    id: "makeup-artist",
    label: "MAKEUP ARTIST",
    badge: "BEAUTY & BACKSTAGE",
    description: "Beauty direction, backstage artistry, and look styling.",
  },
  {
    id: "fashion-stylist",
    label: "FASHION STYLIST",
    badge: "WARDROBE & STYLING",
    description: "Wardrobe coordination, campaign lookbook, and editorial styling.",
  },
  {
    id: "choreographer",
    label: "CHOREOGRAPHER",
    badge: "STAGE & CATWALK",
    description: "Catwalk choreography, runway movement, and stage direction.",
  },
  {
    id: "influencer",
    label: "INFLUENCER / CREATOR",
    badge: "DIGITAL MEDIA",
    description: "Digital media storytelling and event content amplification.",
  },
  {
    id: "celebrity",
    label: "CELEBRITY / PUBLIC FIGURE",
    badge: "CONFIDENTIAL VIP",
    description: "Special appearances, VIP participation, and campaign roles.",
  },
  {
    id: "cstp",
    label: "CSTP APPLICATION",
    badge: "COMPUTATIONAL FASHION",
    description: "Computational Style & Talent Program specialization.",
  },
  {
    id: "fashion-commentary",
    label: "FASHION COMMENTARY",
    badge: "MEDIA & JOURNALISM",
    description: "Fashion journalism, runway critique, and media coverage.",
  },
  {
    id: "nomination",
    label: "CREATIVE NOMINATION",
    badge: "NOMINATE TALENT",
    description: "Know a designer, artist, model or stylist who should be featured?",
    isNomination: true,
  },
];

interface OpenNominationsSectionProps {
  initialRole?: RoleSlug;
}

export default function OpenNominationsSection({ initialRole = "designer" }: OpenNominationsSectionProps) {
  const [activeRole, setActiveRole] = useState<RoleSlug>(initialRole);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile dropdown on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  const selectedCategory = WORK_TYPES.find((w) => w.id === activeRole) || WORK_TYPES[0];

  const handleSelectRole = (roleId: RoleSlug) => {
    setActiveRole(roleId);
    setIsDropdownOpen(false);
  };

  return (
    <section id="nominations" className="relative py-14 sm:py-20 bg-[#060606] border-b border-white/10 overflow-hidden">
      {/* Background Soft Ambience Glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow-golden/5 blur-[200px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* 1. EDITORIAL HEADER & ACCENT DIVIDER */}
        <div className="max-w-4xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
            <Sparkles className="w-4 h-4 text-brand-yellow-golden" />
            <span>TALENT SELECTION & RECRUITMENT</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-brand-white uppercase leading-tight mb-3">
            OPEN NOMINATIONS &amp; APPLICATIONS
          </h2>

          {/* Subtle Gold Accent Divider Line */}
          <div className="flex items-center gap-3 w-full max-w-md my-4">
            <span className="h-[2px] w-12 bg-brand-yellow-golden shadow-[0_0_10px_rgba(250,182,10,0.6)]" />
            <span className="h-[1px] flex-1 bg-gradient-to-r from-brand-yellow-golden/60 via-brand-yellow-golden/20 to-transparent" />
          </div>

          <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed max-w-2xl">
            Talent, creatives, professionals, and industry participants can submit their profiles for relevant FashAI Universal opportunities, collaborations, events, and productions.
          </p>
        </div>

        {/* 2. WORK TYPE SELECTOR */}
        <div className="mb-8 sm:mb-12">
          {/* MOBILE DROPDOWN (Shown on small screens: < md) */}
          <div className="md:hidden relative" ref={dropdownRef}>
            <label className="block text-[11px] font-syne tracking-wider text-brand-yellow-golden font-bold uppercase mb-2">
              SELECT A WORK TYPE
            </label>

            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select a work type for application"
              className="w-full flex items-center justify-between px-5 py-4 bg-[#0E0D0B] border border-brand-yellow-golden/50 rounded-2xl text-brand-white font-syne text-xs tracking-caps font-bold transition-all min-h-[52px] shadow-[0_0_20px_rgba(250,182,10,0.1)] focus:outline-none focus:ring-2 focus:ring-brand-yellow-golden"
            >
              <div className="flex items-center gap-3 truncate">
                <span className="text-[9px] text-brand-yellow-golden uppercase font-bold px-2 py-0.5 bg-brand-yellow-golden/15 border border-brand-yellow-golden/40 rounded-md shrink-0">
                  {selectedCategory.badge}
                </span>
                <span className="truncate text-brand-white">{selectedCategory.label}</span>
              </div>
              {isDropdownOpen ? (
                <ChevronUp className="w-5 h-5 text-brand-yellow-golden shrink-0 ml-2" />
              ) : (
                <ChevronDown className="w-5 h-5 text-brand-yellow-golden shrink-0 ml-2" />
              )}
            </button>

            {/* Expanded Dropdown Accordion List */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#0A0908] border border-brand-yellow-golden/40 rounded-2xl shadow-2xl overflow-hidden py-2 max-h-[70vh] overflow-y-auto divide-y divide-white/5"
                  role="listbox"
                >
                  {WORK_TYPES.map((type) => {
                    const isSelected = activeRole === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectRole(type.id)}
                        className={`w-full text-left px-5 py-3.5 flex items-center justify-between transition-all min-h-[48px] ${
                          isSelected
                            ? "bg-brand-yellow-golden/15 text-brand-yellow-golden font-bold"
                            : "text-brand-white/90 hover:bg-white/5 hover:text-brand-yellow-golden"
                        }`}
                      >
                        <div className="flex flex-col gap-0.5 pr-2">
                          <span className="font-syne text-xs tracking-caps font-bold uppercase flex items-center gap-2">
                            {type.label}
                            {type.isNomination && (
                              <span className="text-[9px] bg-brand-yellow-golden/20 text-brand-yellow-golden px-1.5 py-0.5 rounded font-mono">
                                NOMINATION
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] font-sans text-brand-platinum/60 font-light truncate">
                            {type.description}
                          </span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-brand-yellow-golden shrink-0" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DESKTOP WORK TYPE SELECTOR (Shown on md+ screens) */}
          <div className="hidden md:block">
            <label className="block text-[11px] font-syne tracking-wider text-brand-yellow-golden font-bold uppercase mb-3">
              SELECT WORK TYPE / CATEGORY
            </label>
            <div className="flex flex-wrap gap-2.5">
              {WORK_TYPES.map((type) => {
                const isActive = activeRole === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleSelectRole(type.id)}
                    className={`px-4 py-2.5 rounded-xl font-syne text-[11px] tracking-caps font-bold uppercase transition-all duration-300 border flex items-center gap-2 ${
                      isActive
                        ? "border-brand-yellow-golden bg-brand-yellow-golden/15 text-brand-yellow-golden shadow-[0_0_20px_rgba(250,182,10,0.25)]"
                        : "border-white/10 bg-[#0B0A09] text-brand-platinum/80 hover:text-brand-white hover:border-brand-yellow-golden/40"
                    }`}
                  >
                    <span>{type.label}</span>
                    {type.isNomination && (
                      <span className="w-2 h-2 rounded-full bg-brand-yellow-golden animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. DYNAMIC SINGLE ACTIVE APPLICATION FORM */}
        <div className="max-w-4xl mx-auto bg-[#090807] border border-brand-yellow-golden/30 rounded-3xl p-4 sm:p-8 shadow-2xl">
          <RoleApplicationForm key={activeRole} roleSlug={activeRole} isModal={false} />
        </div>
      </div>
    </section>
  );
}
