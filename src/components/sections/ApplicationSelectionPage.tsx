"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft, Check } from "lucide-react";
import RoleApplicationForm, { RoleSlug } from "@/components/forms/RoleApplicationForm";

export interface ApplicationCategory {
  id: RoleSlug;
  slug: string;
  label: string;
  badge: string;
  description: string;
  isNomination?: boolean;
}

export const CATEGORIES: ApplicationCategory[] = [
  {
    id: "designer",
    slug: "designer",
    label: "FASHION DESIGNER",
    badge: "COUTURE & ATELIER",
    description: "Present haute couture collections, fashion lines, or apparel designs.",
  },
  {
    id: "model",
    slug: "model",
    label: "MODEL",
    badge: "RUNWAY & EDITORIAL",
    description: "Runway, editorial, and commercial modeling participation.",
  },
  {
    id: "makeup-artist",
    slug: "makeup-artist",
    label: "MAKEUP ARTIST",
    badge: "BEAUTY & BACKSTAGE",
    description: "Beauty direction, backstage artistry, and look styling.",
  },
  {
    id: "fashion-stylist",
    slug: "stylist",
    label: "FASHION STYLIST",
    badge: "WARDROBE & STYLING",
    description: "Wardrobe coordination, campaign lookbook, and editorial styling.",
  },
  {
    id: "choreographer",
    slug: "choreographer",
    label: "CHOREOGRAPHER",
    badge: "STAGE & CATWALK",
    description: "Catwalk choreography, runway movement, and stage direction.",
  },
  {
    id: "influencer",
    slug: "influencer",
    label: "INFLUENCER / CREATOR",
    badge: "DIGITAL MEDIA",
    description: "Digital media storytelling and event content amplification.",
  },
  {
    id: "celebrity",
    slug: "celebrity",
    label: "CELEBRITY / PUBLIC FIGURE",
    badge: "CONFIDENTIAL VIP",
    description: "Special appearances, VIP participation, and campaign roles.",
  },
  {
    id: "cstp",
    slug: "cstp",
    label: "CSTP APPLICATION",
    badge: "COMPUTATIONAL FASHION",
    description: "Computational Style & Talent Program specialization.",
  },
  {
    id: "fashion-commentary",
    slug: "fashion-commentary",
    label: "FASHION COMMENTARY",
    badge: "MEDIA & JOURNALISM",
    description: "Fashion journalism, runway critique, and media coverage.",
  },
  {
    id: "nomination",
    slug: "nomination",
    label: "CREATIVE NOMINATION",
    badge: "NOMINATE TALENT",
    description: "Nominate a designer, model, artist, or stylist for recognition.",
    isNomination: true,
  },
];

interface ApplicationSelectionPageProps {
  initialRole?: RoleSlug | null;
  basePath?: string;
}

export default function ApplicationSelectionPage({
  initialRole = null,
  basePath = "/apply",
}: ApplicationSelectionPageProps) {
  const [selectedRole, setSelectedRole] = useState<RoleSlug | null>(initialRole);

  const activeCategory = CATEGORIES.find(
    (c) => c.id === selectedRole || c.slug === selectedRole
  );

  return (
    <section className="relative py-12 sm:py-20 bg-[#050505] min-h-[85vh] text-brand-white">
      {/* Background Soft Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-yellow-golden/5 blur-[220px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Main Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
            <Sparkles className="w-4 h-4 text-brand-yellow-golden" />
            <span>FASHAI UNIVERSAL TALENT NETWORK</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase leading-tight mb-4">
            OPEN NOMINATIONS &amp; APPLICATIONS
          </h1>

          <div className="h-[2px] w-20 bg-brand-yellow-golden mb-4 shadow-[0_0_10px_rgba(250,182,10,0.6)]" />

          <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed">
            Explore the opportunities currently available across the FashAI Universal ecosystem. Select your domain below to complete your application.
          </p>
        </div>

        {/* If NO role is selected: Show Category Selection Grid */}
        {!selectedRole ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-serif-display text-xl sm:text-2xl font-light uppercase text-brand-yellow-golden tracking-wider">
                CHOOSE AN OPPORTUNITY
              </h2>
              <span className="text-xs font-syne text-brand-platinum/60 font-bold uppercase">
                {CATEGORIES.length} CATEGORIES AVAILABLE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedRole(cat.id)}
                  className="group relative flex flex-col justify-between p-6 bg-[#080706] border border-white/10 rounded-2xl hover:border-brand-yellow-golden/70 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(250,182,10,0.15)]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-brand-yellow-golden">
                        {cat.badge}
                      </span>
                      {cat.isNomination && (
                        <span className="w-2 h-2 rounded-full bg-brand-yellow-golden animate-pulse" />
                      )}
                    </div>

                    <h3 className="font-serif-display text-xl sm:text-2xl font-light text-white uppercase group-hover:text-brand-yellow-golden transition-colors">
                      {cat.label}
                    </h3>

                    <p className="font-sans text-xs text-brand-platinum/75 font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-syne font-bold uppercase tracking-wider text-brand-yellow-golden group-hover:text-white transition-colors">
                    <span>APPLY NOW</span>
                    <ArrowRight className="w-4 h-4 text-brand-yellow-golden group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* If a role IS selected: Show ONLY that single category's form */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <button
                onClick={() => setSelectedRole(null)}
                className="inline-flex items-center gap-2 text-xs font-syne tracking-wider font-bold text-brand-yellow-golden hover:text-white transition-colors uppercase"
              >
                <ArrowLeft className="w-4 h-4" /> ALL CATEGORIES
              </button>
              {activeCategory && (
                <span className="text-xs font-syne text-brand-yellow-golden font-bold uppercase">
                  {activeCategory.label}
                </span>
              )}
            </div>

            {/* Render ONLY the single active role application form */}
            <div className="bg-[#080706] border border-brand-yellow-golden/30 rounded-3xl p-4 sm:p-8 shadow-2xl">
              <RoleApplicationForm key={selectedRole} roleSlug={selectedRole} isModal={false} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
