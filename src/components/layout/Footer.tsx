"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Phone, MessageSquare, MapPin } from "lucide-react";
import { NAV_ITEMS } from "./Header";

export default function Footer() {
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=2,+Humayun+Rd,+Sujan+Sing+ParkNorth,+Sujan+Singh+Park,+New+Delhi,+Delhi+110003,+India";

  return (
    <footer className="border-t border-brand-orange/30 bg-brand-void pt-16 pb-10 text-brand-off-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Multi-Column Global Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-brand-orange/20">
          {/* Col 1: Official Brand Lockup (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-3.5 mb-4 group">
                <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-md border border-brand-orange/40 bg-black shadow-md">
                  <Image
                    src="/assets/logo/main-logo.jpeg"
                    alt="FashAI Universe Official Logo"
                    fill
                    sizes="40px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-syne text-xl tracking-[0.18em] font-extrabold text-brand-white group-hover:text-brand-orange transition-colors">
                    FashAI Universe
                  </span>
                  <span className="font-syne text-[10px] tracking-micro text-brand-orange font-bold uppercase mt-0.5">
                    Powered by Arav Innovation
                  </span>
                </div>
              </Link>
              <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed max-w-sm">
                Where fashion, technology and imagination converge. An international luxury fashion and lifestyle experience platform.
              </p>
            </div>
            <div className="text-[10px] font-syne tracking-micro text-brand-orange font-bold uppercase">
              POWERED BY ARAV INNOVATION
            </div>
          </div>

          {/* Col 2: Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-syne text-xs tracking-wider text-brand-platinum/90">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-orange transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: LifeStyle Event Editions (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              LIFESTYLE
            </h4>
            <ul className="space-y-2.5 font-syne text-xs tracking-wider text-brand-platinum/90">
              <li>
                <Link href="/2025" className="hover:text-brand-orange transition-colors">
                  LifeStyle 2025
                </Link>
              </li>
              <li>
                <Link href="/2026" className="hover:text-brand-orange transition-colors">
                  LifeStyle 2026 — Dubai
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect Details (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              CONNECT
            </h4>
            <ul className="space-y-3 font-sans text-xs text-brand-platinum/90">
              <li>
                <a
                  href="https://www.instagram.com/fashai_universal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-syne font-semibold text-brand-yellow-golden hover:text-brand-orange transition-colors flex items-center gap-1.5"
                >
                  <span>@fashai_universal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-orange" />
                <a href="tel:+917521555792" className="hover:text-brand-orange transition-colors">
                  +91 7521555792
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-brand-green" />
                <a
                  href="https://wa.me/919891276713"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-green transition-colors"
                >
                  +91 9891276713
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Visit & Address (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              VISIT
            </h4>
            <address className="font-sans text-[11px] text-brand-platinum/80 leading-relaxed not-italic mb-3">
              2, Humayun Rd,<br />
              Sujan Sing Park North,<br />
              Sujan Singh Park,<br />
              New Delhi, Delhi 110003,<br />
              India
            </address>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-brand-orange/40 bg-brand-void px-3 py-1.5 text-[10px] font-syne tracking-caps font-bold text-brand-white hover:bg-brand-orange transition-all"
            >
              <span>VIEW ON MAPS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Registration & Sponsorship Action Callout Banner */}
        <div className="py-6 border-b border-brand-orange/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-syne text-xs tracking-caps text-brand-orange font-bold uppercase block mb-1">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </span>
            <p className="font-sans text-xs text-brand-platinum/80 font-light">
              Registrations and sponsorships are open for LifeStyle 2026 Dubai.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?type=Registration"
              className="bg-brand-orange px-5 py-2.5 text-[11px] font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors"
            >
              REGISTER NOW
            </Link>
            <Link
              href="/contact?type=Sponsorship"
              className="border border-brand-yellow-golden/40 bg-brand-void px-5 py-2.5 text-[11px] font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-colors"
            >
              SPONSORSHIP
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] font-syne tracking-micro text-brand-platinum/70 gap-4">
          <div>
            © {new Date().getFullYear()} FASHAI UNIVERSE. POWERED BY ARAV INNOVATION. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 text-[10px] uppercase font-bold text-brand-orange/90">
            <span>LIFESTYLE 2026 • DUBAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
