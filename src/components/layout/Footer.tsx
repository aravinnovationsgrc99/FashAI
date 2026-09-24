"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black pt-16 pb-12 text-brand-off-white">
      <div className="container-editorial">
        {/* Global 5-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* COLUMN 1: BRAND LOCKUP (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
                <div className="relative w-9 h-9 flex-shrink-0 overflow-hidden rounded-xl border border-brand-orange/40 bg-black shadow-md">
                  <Image
                    src="/assets/brand/logo_transparent.png"
                    alt="FashAI Universal Logo"
                    fill
                    sizes="36px"
                    className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="font-serif-display text-2xl tracking-tight font-light text-brand-white group-hover:text-brand-yellow-golden transition-colors">
                  FashAI Universal
                </span>
              </Link>

              <div className="mt-2 mb-4">
                <Image
                  src="/assets/brand/Final_Powered_by_logo.png"
                  alt="Powered by Arav Innovation"
                  width={220}
                  height={58}
                  className="h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(241,94,28,0.2)]"
                />
              </div>

              <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed max-w-sm">
                FashAI Universal is an international fashion and events platform focused on couture showcases, creative talent recruitment, lifestyle events, corporate gatherings, and IT event formats across Dubai, UAE and India.
              </p>
            </div>
          </div>

          {/* COLUMN 2: NAVIGATION (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-yellow-golden mb-4 font-bold uppercase">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-syne text-xs tracking-wider text-brand-platinum/90">
              <li>
                <Link href="/" className="hover:text-brand-yellow-golden transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upcoming" className="hover:text-brand-yellow-golden transition-colors">
                  Upcoming
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-yellow-golden transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-yellow-golden transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-yellow-golden transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-yellow-golden transition-colors">
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
                <Link href="/events" className="hover:text-brand-orange transition-colors">
                  Fashion Events
                </Link>
              </li>
              <li>
                <Link href="/event-formats" className="hover:text-brand-orange transition-colors">
                  Lifestyle Events
                </Link>
              </li>
              <li>
                <Link href="/event-formats" className="hover:text-brand-orange transition-colors">
                  Product Events
                </Link>
              </li>
              <li>
                <Link href="/event-formats" className="hover:text-brand-orange transition-colors">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link href="/event-formats" className="hover:text-brand-orange transition-colors">
                  IT Events
                </Link>
              </li>
              <li>
                <Link href="/upcoming" className="hover:text-brand-yellow-golden transition-colors font-bold">
                  LifeStyle 2026 · Dubai
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: COMMUNITY (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-yellow-golden mb-4 font-bold uppercase">
              COMMUNITY
            </h4>
            <ul className="space-y-2.5 font-syne text-xs tracking-wider text-brand-platinum/90">
              <li>
                <Link href="/apply/designer" className="hover:text-brand-yellow-golden transition-colors">
                  Designer
                </Link>
              </li>
              <li>
                <Link href="/apply/model" className="hover:text-brand-yellow-golden transition-colors">
                  Model
                </Link>
              </li>
              <li>
                <Link href="/apply/makeup-artist" className="hover:text-brand-yellow-golden transition-colors">
                  Makeup Artist
                </Link>
              </li>
              <li>
                <Link href="/apply/fashion-stylist" className="hover:text-brand-yellow-golden transition-colors">
                  Fashion Stylist
                </Link>
              </li>
              <li>
                <Link href="/apply/choreographer" className="hover:text-brand-yellow-golden transition-colors">
                  Choreographer
                </Link>
              </li>
              <li>
                <Link href="/apply/influencer" className="hover:text-brand-yellow-golden transition-colors">
                  Influencer / Creator
                </Link>
              </li>
              <li>
                <Link href="/apply/celebrity" className="hover:text-brand-yellow-golden transition-colors">
                  Celebrity / Public Figure
                </Link>
              </li>
              <li>
                <Link href="/apply/cstp" className="hover:text-brand-yellow-golden transition-colors">
                  CSTP Application
                </Link>
              </li>
              <li>
                <Link href="/apply/fashion-commentary" className="hover:text-brand-yellow-golden transition-colors">
                  Fashion Commentary
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 5: INFORMATION & CONNECT (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              INFORMATION
            </h4>
            <ul className="space-y-2.5 font-syne text-xs tracking-wider text-brand-platinum/90 mb-6">
              <li>
                <Link href="/fashion-magazine" className="hover:text-brand-orange transition-colors font-bold text-brand-yellow-golden">
                  Fashion Magazine
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-brand-orange transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-brand-orange transition-colors">
                  Open Nominations
                </Link>
              </li>
            </ul>

            <h4 className="font-syne text-xs tracking-caps text-brand-yellow-golden mb-2 font-bold uppercase">
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
            </ul>
          </div>
        </div>

        {/* Action Callout Banner */}
        <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-syne text-xs tracking-caps text-brand-yellow-golden font-bold uppercase block mb-0.5">
              REGISTRATIONS &amp; SPONSORSHIPS OPEN
            </span>
            <p className="font-sans text-xs text-brand-platinum/80 font-light">
              Delegate registrations, artist nominations, and sponsorship enquiries open for LifeStyle 2026 · Dubai.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-brand-orange to-brand-yellow-golden px-6 py-2.5 text-[11px] font-syne tracking-caps font-bold text-black rounded-xl hover:opacity-90 transition-opacity"
            >
              REGISTER / ENQUIRE →
            </Link>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] font-syne tracking-micro text-brand-platinum/70 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© 2024–2026 FashAI Universal. All Rights Reserved.</span>
            <span className="text-white/20">|</span>
            <Link href="/privacy" className="hover:text-brand-orange transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="hover:text-brand-orange transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
          <div className="flex items-center gap-6 text-[10px] uppercase font-bold text-brand-yellow-golden">
            <span>LIFESTYLE 2026 · DUBAI</span>
            <span>DUBAI, UAE &amp; INDIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
