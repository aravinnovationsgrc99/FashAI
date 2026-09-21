"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, MessageSquare } from "lucide-react";

export default function Footer() {
  const aravWebsiteUrl = "https://aravinnovations.com/";

  return (
    <footer className="border-t border-white/10 bg-brand-void pt-16 pb-10 text-brand-off-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Multi-Column Global Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Primary Brand Lockup (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
                <div className="relative w-9 h-9 flex-shrink-0 overflow-hidden rounded-md border border-brand-orange/40 bg-black shadow-md">
                  <Image
                    src="/assets/brand/logo_transparent.png"
                    alt="FashAI Universal Logo"
                    fill
                    sizes="36px"
                    className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="font-syne text-xl tracking-[0.16em] font-extrabold text-brand-white group-hover:text-brand-orange transition-colors">
                  FashAI Universal
                </span>
              </Link>
              <div className="mt-2 mb-4">
                <Image
                  src="/assets/brand/PoweredByAravInnovation.jpeg"
                  alt="Powered by Arav Innovation"
                  width={200}
                  height={52}
                  className="h-7 w-auto object-contain"
                />
              </div>
              <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed max-w-sm">
                Where fashion, technology and imagination converge. An international luxury fashion and lifestyle experience platform.
              </p>
            </div>
          </div>

          {/* Col 2: EVENTS (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              EVENTS
            </h4>
            <ul className="space-y-2.5 font-syne text-xs tracking-wider text-brand-platinum/90">
              <li>
                <Link href="/2025" className="hover:text-brand-orange transition-colors">
                  LifeStyle 2025
                </Link>
              </li>
              <li>
                <Link href="/2026" className="hover:text-brand-orange transition-colors">
                  LifeStyle 2026 · Dubai
                </Link>
              </li>
              <li>
                <Link href="/upcoming" className="hover:text-brand-orange transition-colors">
                  Runway
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: NAVIGATION (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-4 font-bold uppercase">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-syne text-xs tracking-wider text-brand-platinum/90">
              <li>
                <Link href="/" className="hover:text-brand-orange transition-colors">
                  Landing
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
            </ul>
          </div>

          {/* Col 4: CONNECT (lg:col-span-2) */}
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
                <MessageSquare className="w-3.5 h-3.5 text-brand-green" />
                <a
                  href="https://wa.me/919891276713"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-green transition-colors font-syne text-xs"
                >
                  +91 9891276713
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: ARAV INNOVATION (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-syne text-xs tracking-caps text-brand-orange mb-3 font-bold uppercase">
              ARAV INNOVATION
            </h4>
            <p className="font-sans text-[11px] text-brand-platinum/80 leading-relaxed mb-3">
              Official supporting entity and digital innovation enterprise.
            </p>
            <a
              href={aravWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-brand-orange/40 bg-brand-void px-3 py-2 text-[10px] font-syne tracking-caps font-bold text-brand-white hover:bg-brand-orange hover:border-brand-orange transition-all group"
            >
              <span>VISIT WEBSITE →</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Registration & Sponsorship Action Callout Banner */}
        <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-syne text-xs tracking-caps text-brand-orange font-bold uppercase block mb-1">
              REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
            </span>
            <p className="font-sans text-xs text-brand-platinum/80 font-light">
              Registrations and sponsorships are open for LifeStyle 2026 · Dubai.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?type=Registration"
              className="bg-brand-orange px-5 py-2.5 text-[11px] font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors"
            >
              REGISTER / ENQUIRE →
            </Link>
            <Link
              href="/contact?type=Sponsorship"
              className="border border-brand-yellow-golden/40 bg-brand-void px-5 py-2.5 text-[11px] font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-colors"
            >
              SPONSORSHIP ENQUIRY →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] font-syne tracking-micro text-brand-platinum/70 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 FASHAI UNIVERSAL. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex gap-6 text-[10px] uppercase font-bold text-brand-orange/90">
            <span>LIFESTYLE 2026 · DUBAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
