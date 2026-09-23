"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Sparkles } from "lucide-react";

export default function HomeUpcomingFeature() {
  return (
    <section className="relative min-h-[85vh] w-full flex flex-col justify-center py-20 px-4 sm:px-8 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Background Atmosphere Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Image
          src="/assets/models/model_11.jpeg"
          alt="LifeStyle 2026 Dubai"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/90 to-brand-void/80" />
      </div>

      {/* Subtle Radial Backdrop Glow & Graphic Elements */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-brand-orange/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-green/12 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-brand-yellow-golden/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="editorial-watermark absolute top-10 right-0 text-[16vw] font-serif-display font-light uppercase tracking-tighter leading-none pointer-events-none select-none">
        DUBAI 2026
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-syne text-xs tracking-micro text-brand-orange font-bold uppercase">
              UPCOMING EVENT • DUBAI 2026
            </span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-8xl font-light text-brand-white tracking-tight uppercase mb-2">
            LifeStyle <span className="text-brand-orange italic font-normal">2026</span>
          </h2>

          <p className="font-syne text-sm sm:text-base tracking-[0.25em] text-brand-green font-bold uppercase mb-4">
            DUBAI · 2026
          </p>

          <p className="font-sans text-base sm:text-xl text-brand-platinum/90 max-w-2xl font-light leading-relaxed mb-6">
            An international fashion and lifestyle experience.
          </p>

          {/* Positioning Statement */}
          <div className="bg-brand-charcoal/80 border border-brand-orange/30 px-6 py-3 mb-10 text-xs font-syne tracking-widest text-brand-yellow-golden uppercase font-bold">
            &ldquo;Biggest International Fashion Events, Dubai | 2026&rdquo;
          </div>

          {/* Open Registrations & Sponsorships Announcement Banner */}
          <div className="bg-gradient-to-r from-brand-orange/20 via-brand-orange/10 to-brand-orange/20 border border-brand-orange/50 p-6 sm:p-8 max-w-3xl w-full mb-10 shadow-2xl">
            <h3 className="font-syne text-base sm:text-lg tracking-caps text-brand-white font-extrabold uppercase mb-2">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </h3>
            <p className="font-sans text-xs sm:text-sm text-brand-platinum font-light leading-relaxed">
              Enquire now for delegate registration, international designer participation, and brand sponsorship opportunities for LifeStyle 2026.
            </p>
          </div>

          {/* 3 Status Cards (Date TO BE ANNOUNCED / Venue TO BE ANNOUNCED / Dress Code) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
            {/* Card 1: Event Date */}
            <div className="bg-brand-charcoal/80 border border-brand-orange/30 p-6 flex flex-col items-center text-center">
              <Calendar className="w-6 h-6 text-brand-orange mb-3" />
              <h4 className="font-syne text-xs tracking-caps text-brand-platinum font-bold uppercase mb-2">
                Event Date
              </h4>
              <p className="font-syne text-sm text-brand-yellow-golden font-bold uppercase">
                TO BE ANNOUNCED
              </p>
              <p className="font-sans text-[11px] text-brand-platinum/70 uppercase mt-1">
                Dubai · 2026
              </p>
            </div>

            {/* Card 2: Event Venue */}
            <div className="bg-brand-charcoal/80 border border-brand-orange/30 p-6 flex flex-col items-center text-center">
              <MapPin className="w-6 h-6 text-brand-orange mb-3" />
              <h4 className="font-syne text-xs tracking-caps text-brand-platinum font-bold uppercase mb-2">
                Event Venue
              </h4>
              <p className="font-syne text-sm text-brand-yellow-golden font-bold uppercase">
                TO BE ANNOUNCED
              </p>
              <p className="font-sans text-[11px] text-brand-platinum/70 uppercase mt-1">
                Dubai, UAE
              </p>
            </div>

            {/* Card 3: Dress Code */}
            <div className="bg-brand-charcoal/80 border border-brand-orange/30 p-6 flex flex-col items-center text-center">
              <Sparkles className="w-6 h-6 text-brand-orange mb-3" />
              <h4 className="font-syne text-xs tracking-caps text-brand-platinum font-bold uppercase mb-2">
                Dress Code
              </h4>
              <p className="font-syne text-sm text-brand-orange font-bold uppercase">
                FASHIONABLE &amp; HAUTE COUTURE
              </p>
              <p className="font-sans text-[11px] text-brand-platinum/70 uppercase mt-1">
                Luxury Aesthetic
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/contact?type=Registration"
              className="bg-brand-orange px-10 py-4 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_25px_rgba(241,94,28,0.4)] transition-all duration-300 min-h-[48px] flex items-center justify-center"
              data-cursor="explore"
            >
              REGISTER NOW ↗
            </Link>
            <Link
              href="/contact?type=Sponsorship"
              className="border border-brand-yellow-golden/40 bg-brand-void/80 px-10 py-4 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 min-h-[48px] flex items-center justify-center"
            >
              SPONSORSHIP ENQUIRY ↗
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
