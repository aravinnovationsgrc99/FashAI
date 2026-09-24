"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import RoleApplicationModal from "@/components/forms/RoleApplicationModal";

export default function DesignersSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="designers" className="relative pt-3 sm:pt-4 pb-10 sm:pb-14 bg-[#040404] border-b border-white/10 overflow-hidden">
      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column — Editorial Showcase Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-brand-yellow-golden/30 shadow-2xl">
              <Image
                src="/assets/master/designer/designer_01.png"
                alt="FashAI Universal Designer Showcase"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              {/* Editorial Tag overlay (Hidden on mobile, visible on sm and larger) */}
              <div className="hidden sm:block absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl">
                <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase block mb-1">
                  COUTURE & RUNWAY PRESENTATION
                </span>
                <p className="font-serif-display text-xl font-light text-white uppercase">
                  ATELIER & DESIGN DIRECTION
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Content & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
                <span>DESIGNER PARTICIPATION &amp; SHOWCASE</span>
              </div>
              <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase leading-none mb-6">
                DESIGNERS & <br />
                <span className="text-brand-yellow-golden italic font-normal">COUTURE ATELIERS</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed">
                Present your creative work, participate in international fashion experiences, and explore relevant runway and brand showcase opportunities. FashAI Universal connects established and emerging designers with global audience formats across UAE and India.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-yellow-golden shrink-0 mt-0.5" />
                <span className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light">
                  Dedicated runway presentation formats for couture and ready-to-wear lines.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-yellow-golden shrink-0 mt-0.5" />
                <span className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light">
                  Targeted press, buyer, and high-net-worth audience exposure.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-yellow-golden shrink-0 mt-0.5" />
                <span className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light">
                  Seamless application & curation process tailored for designers.
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-between gap-6 bg-gradient-to-r from-brand-yellow-golden to-amber-500 hover:opacity-95 text-black py-4 px-8 rounded-2xl font-syne text-xs font-bold tracking-caps shadow-xl transition-all group hover:scale-[1.02]"
              >
                <span>APPLY AS A DESIGNER</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Role-Specific Designer Application Modal Drawer */}
      <RoleApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role="designer"
      />
    </section>
  );
}
