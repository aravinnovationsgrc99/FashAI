"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, MessageSquare } from "lucide-react";

export default function Footer() {
  const aravWebsiteUrl = "https://aravinnovations.com/";

  return (
    <footer className="w-full border-t border-white/10 bg-brand-void pt-16 pb-12 text-brand-off-white">
      <div className="container-editorial">
        {/* Global 5-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* COLUMN 1: BRAND LOCKUP (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
                <div className="relative w-9 h-9 flex-shrink-0 overflow-hidden rounded-none border border-brand-orange/40 bg-black shadow-md">
                  <Image
                    src="/assets/brand/logo_transparent.png"
                    alt="FashAI Universal Logo"
                    fill
                    sizes="36px"
                    className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="font-serif-display text-2xl tracking-tight font-light text-brand-white group-hover:text-brand-orange transition-colors">
                  FashAI Universal
                </span>
              </Link>

              <div className="mt-2 mb-4">
                <Image
                  src="/assets/brand/PoweredByAravInnovation.jpeg"
                  alt="Powered by Arav Innovation"
                  width={220}
                  height={58}
                  className="h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(241,94,28,0.2)]"
                />
              </div>

              <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed max-w-sm">
                Where fashion, technology and imagination converge. An international luxury fashion, lifestyle and event platform.
              </p>
            </div>
          </div>

          {/* COLUMN 2: EXPLORE (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 font-syne text-xs tracking-wider text-brand-platinum/90">
              <li>
                <Link href="/" className="hover:text-brand-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-orange transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/upcoming" className="hover:text-brand-orange transition-colors">
                  Upcoming
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-orange transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-orange transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-orange transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: EVENTS (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              EVENTS
            </h4>
            <ul className="space-y-2.5 font-syne text-xs tracking-wider text-brand-platinum/90">
              <li>
                <Link href="/gallery" className="hover:text-brand-orange transition-colors">
                  Runway — 2025
                </Link>
              </li>
              <li>
                <Link href="/2025" className="hover:text-brand-orange transition-colors">
                  LifeStyle — 2025
                </Link>
              </li>
              <li>
                <Link href="/2026" className="hover:text-brand-orange transition-colors text-brand-yellow-golden font-bold">
                  LifeStyle 2026 · Dubai
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: PEOPLE (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              PEOPLE
            </h4>
            <ul className="space-y-2.5 font-syne text-xs tracking-wider text-brand-platinum/90">
              <li>
                <Link href="/#people" className="hover:text-brand-orange transition-colors">
                  Designers
                </Link>
              </li>
              <li>
                <Link href="/#people" className="hover:text-brand-orange transition-colors">
                  Models
                </Link>
              </li>
              <li>
                <Link href="/#people" className="hover:text-brand-orange transition-colors">
                  Makeup Artists
                </Link>
              </li>
              <li>
                <Link href="/#people" className="hover:text-brand-orange transition-colors">
                  Celebrities
                </Link>
              </li>
              <li>
                <Link href="/#people" className="hover:text-brand-orange transition-colors">
                  Influencers
                </Link>
              </li>
              <li>
                <Link href="/#people" className="hover:text-brand-orange transition-colors">
                  Stylists
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 5: CONNECT (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              CONNECT
            </h4>
            <ul className="space-y-3 font-sans text-xs text-brand-platinum/90">
              <li>
                <a
                  href="https://www.instagram.com/fashai_universal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-syne font-bold text-brand-yellow-golden hover:text-brand-orange transition-colors flex items-center gap-1.5"
                >
                  <span>@fashai_universal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li className="flex items-center gap-1.5 pt-1">
                <MessageSquare className="w-3.5 h-3.5 text-brand-green" />
                <a
                  href="https://wa.me/919891276713"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-green transition-colors font-syne text-xs font-bold"
                >
                  +91 9891276713
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="block text-[10px] font-syne tracking-micro text-brand-platinum/60 uppercase mb-1">
                Arav Innovation
              </span>
              <a
                href={aravWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-brand-orange/40 bg-brand-void/90 px-3.5 py-2 text-[10px] font-syne tracking-caps font-bold text-brand-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-300 group"
              >
                <span>VISIT WEBSITE →</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Action Callout Banner */}
        <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-syne text-xs tracking-caps text-brand-orange font-bold uppercase block mb-0.5">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </span>
            <p className="font-sans text-xs text-brand-platinum/80 font-light">
              Official delegate registrations and sponsorship enquiries open for LifeStyle 2026 · Dubai.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?type=Registration"
              className="bg-brand-orange px-6 py-2.5 text-[11px] font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors"
            >
              REGISTER / ENQUIRE →
            </Link>
            <Link
              href="/contact?type=Sponsorship"
              className="border border-brand-yellow-golden/50 bg-brand-void px-6 py-2.5 text-[11px] font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-colors"
            >
              SPONSORSHIP ENQUIRY →
            </Link>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] font-syne tracking-micro text-brand-platinum/70 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span>2024–2026 FashAI Universal. All Rights Reserved.</span>
            <span className="text-white/20">|</span>
            <Link href="/privacy" className="hover:text-brand-orange transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="hover:text-brand-orange transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
          <div className="flex items-center gap-6 text-[10px] uppercase font-bold text-brand-orange">
            <span>LIFESTYLE 2026 · DUBAI</span>
            <span>POWERED BY ARAV INNOVATION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
