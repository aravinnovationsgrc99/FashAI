"use client";

import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "./Header";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-brand-void pt-16 pb-12 text-brand-off-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-hairline">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/assets/brand/logo.jpeg"
                  alt="Fashprism Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="font-serif-display text-3xl font-light tracking-tight">
                  FASHPRISM
                </span>
              </div>
              <p className="font-sans text-sm text-brand-platinum max-w-md font-light leading-relaxed">
                Fashprism Internationals creates fashion experiences that move beyond the runway. Where fashion, culture, and experience converge.
              </p>
            </div>
            <div className="mt-8 text-xs font-syne tracking-micro text-brand-orange">
              FASHION BEYOND BORDERS
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="font-syne text-xs tracking-micro text-brand-gold mb-6">
              NAVIGATION
            </h4>
            <ul className="space-y-3 font-syne text-xs tracking-caps text-brand-off-white/80">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-orange transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Enquiries */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-syne text-xs tracking-micro text-brand-gold mb-6">
                ENQUIRIES & PARTICIPATION
              </h4>
              <p className="font-sans text-xs text-brand-platinum mb-6 leading-relaxed">
                For collaborations, press, sponsorships, and designer participation for upcoming events.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-brand-orange px-6 py-3 text-xs font-syne tracking-caps font-bold text-brand-void hover:bg-brand-gold transition-colors"
              >
                CONTACT US ↗
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-hairline flex items-center justify-between text-xs font-syne text-brand-platinum">
              <span>LOCATIONS</span>
              <span className="text-brand-off-white">DUBAI — PARIS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[10px] font-syne tracking-micro text-brand-platinum gap-4">
          <div>
            © {new Date().getFullYear()} FASHPRISM INTERNATIONALS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-brand-orange transition-colors">
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

