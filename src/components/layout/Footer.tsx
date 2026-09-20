"use client";

import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "./Header";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-brand-void pt-20 pb-12 text-brand-off-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-hairline">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-flex flex-col mb-6">
                <span className="font-syne text-xl tracking-[0.18em] font-extrabold text-brand-white">
                  FashAI Universe
                </span>
                <span className="font-syne text-xs tracking-micro text-brand-orange font-bold uppercase mt-1">
                  Powered by Arav Innovation
                </span>
              </Link>
              <p className="font-sans text-sm text-brand-platinum max-w-md font-light leading-relaxed">
                Where fashion, technology and imagination converge. An international fashion-meets-technology digital experience.
              </p>
            </div>
            <div className="mt-8 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase">
              POWERED BY ARAV INNOVATION
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="font-syne text-xs tracking-micro text-brand-orange mb-6 font-bold">
              NAVIGATION
            </h4>
            <ul className="space-y-3 font-syne text-xs tracking-caps text-brand-off-white/70">
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
              <h4 className="font-syne text-xs tracking-micro text-brand-orange mb-6 font-bold uppercase">
                SOCIAL & ENQUIRIES
              </h4>
              <p className="font-sans text-xs text-brand-platinum mb-4 leading-relaxed">
                Follow the journey and explore upcoming initiatives across Dubai and international fashion platforms.
              </p>
              <a
                href="https://www.instagram.com/fashai_universal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-orange px-6 py-3 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors shadow-md mb-6"
              >
                <span>INSTAGRAM @FASHAI_UNIVERSAL</span>
                <span>↗</span>
              </a>
            </div>

            <div className="mt-4 pt-6 border-t border-hairline-orange flex items-center justify-between text-xs font-syne text-brand-platinum">
              <span>DESTINATION</span>
              <span className="text-brand-yellow-golden font-bold uppercase">DUBAI — 2026</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[10px] font-syne tracking-micro text-brand-platinum gap-4">
          <div>
            © {new Date().getFullYear()} FASHAI UNIVERSE. POWERED BY ARAV INNOVATION. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/fashai_universal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-orange transition-colors"
            >
              @fashai_universal ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}



