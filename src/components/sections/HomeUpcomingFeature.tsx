"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Sparkles } from "lucide-react";

export default function HomeUpcomingFeature() {
  return (
    <section className="relative min-h-[85vh] w-full flex flex-col justify-center py-20 px-4 sm:px-8 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Background Atmosphere Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Image
          src="/assets/models/model_11.jpeg"
          alt="FashAI Universe 2026 Dubai"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/90 to-brand-void/80" />
      </div>

      {/* Subtle Radial Backdrop Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-brand-orange/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-green/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          {/* Invitation Eyebrow */}
          <div className="inline-flex items-center gap-2.5 border border-brand-orange/40 px-4 py-1.5 mb-6 bg-brand-void/90 rounded-full backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="font-syne text-xs tracking-micro text-brand-orange font-bold uppercase">
              UPCOMING EDITION / DUBAI 2026
            </span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-brand-white tracking-tight uppercase mb-3">
            You&apos;re <span className="text-brand-orange italic font-normal">Invited</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-brand-platinum/90 max-w-2xl font-light leading-relaxed mb-12">
            We look forward to welcoming you to <strong className="font-semibold text-brand-white">FashAI Universe 2026</strong> — an international convergence of computational fashion, spatial light design, and haute couture identity.
          </p>

          {/* 3 Event Cards (Inspired by Reference Visual) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            {/* Card 1: Event Date */}
            <div className="bg-brand-charcoal/80 border border-brand-orange/30 p-8 flex flex-col items-center text-center rounded-none shadow-xl hover:border-brand-orange/60 transition-all">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-6">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-syne text-xs tracking-caps text-brand-platinum font-bold uppercase mb-3">
                Event Edition
              </h3>
              <p className="font-serif text-3xl sm:text-4xl text-brand-orange font-normal italic mb-2">
                2026
              </p>
              <p className="font-sans text-xs text-brand-platinum/70 uppercase tracking-wider">
                Dubai, United Arab Emirates
              </p>
            </div>

            {/* Card 2: Event Schedule */}
            <div className="bg-brand-charcoal/80 border border-brand-orange/30 p-8 flex flex-col items-center text-center rounded-none shadow-xl hover:border-brand-orange/60 transition-all">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-6">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-syne text-xs tracking-caps text-brand-platinum font-bold uppercase mb-3">
                Event Schedule
              </h3>
              <div className="w-full space-y-2 text-xs font-sans text-brand-platinum/90 mb-3">
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span>Doors Open</span>
                  <span className="text-brand-yellow-golden font-semibold">TBA</span>
                </div>
                <div className="flex justify-between">
                  <span>Show Starts</span>
                  <span className="text-brand-yellow-golden font-semibold">TBA</span>
                </div>
              </div>
              <p className="font-syne text-[10px] text-brand-orange/90 italic uppercase tracking-wider">
                The Experience Lounge • Dubai
              </p>
            </div>

            {/* Card 3: Dress Code */}
            <div className="bg-brand-charcoal/80 border border-brand-orange/30 p-8 flex flex-col items-center text-center rounded-none shadow-xl hover:border-brand-orange/60 transition-all">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-syne text-xs tracking-caps text-brand-platinum font-bold uppercase mb-3">
                Dress Code
              </h3>
              <p className="font-syne text-sm text-brand-orange font-bold uppercase tracking-wider mb-2">
                FASHIONABLE & HAUTE COUTURE
              </p>
              <p className="font-sans text-xs text-brand-platinum/70 uppercase tracking-wider">
                International Luxury Aesthetic
              </p>
            </div>
          </div>

          <p className="font-sans text-xs text-brand-platinum/80 italic mb-6">
            Kindly RSVP to confirm your attendance or delegate interest.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className="bg-brand-orange px-10 py-4 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_25px_rgba(241,94,28,0.4)] transition-all duration-300 min-h-[48px] flex items-center justify-center rounded-none"
              data-cursor="explore"
            >
              RSVP NOW ↗
            </Link>
            <a
              href="https://www.instagram.com/fashai_universal"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-brand-yellow-golden/40 bg-brand-void/80 px-10 py-4 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 min-h-[48px] flex items-center justify-center rounded-none"
            >
              FOLLOW THE JOURNEY ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
