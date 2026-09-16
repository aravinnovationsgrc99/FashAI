"use client";

import Image from "next/image";

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
                Fashprism Internationals is a digital couture atelier and global fashion ecosystem bridging haute couture traditions with visionary digital identity.
              </p>
            </div>
            <div className="mt-8 text-xs font-syne tracking-micro text-brand-orange">
              PARIS — DUBAI
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="font-syne text-xs tracking-micro text-brand-gold mb-6">
              NAVIGATION
            </h4>
            <ul className="space-y-3 font-syne text-xs tracking-caps text-brand-off-white/80">
              <li>
                <a href="#hero" className="hover:text-brand-orange transition-colors">
                  HOME
                </a>
              </li>
              <li>
                <a href="#manifesto" className="hover:text-brand-orange transition-colors">
                  MANIFESTO
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-brand-orange transition-colors">
                  PROJECTS
                </a>
              </li>
              <li>
                <a href="#lifestyle-2026" className="hover:text-brand-orange transition-colors">
                  LIFESTYLE 2026
                </a>
              </li>
              <li>
                <a href="#faces" className="hover:text-brand-orange transition-colors">
                  THE FACES
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-brand-orange transition-colors">
                  ARCHIVE GALLERY
                </a>
              </li>
              <li>
                <a href="#accreditation" className="hover:text-brand-orange transition-colors">
                  ACCREDITATION
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Accreditation */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-syne text-xs tracking-micro text-brand-gold mb-6">
                ACCREDITATION & PRESS
              </h4>
              <p className="font-sans text-xs text-brand-platinum mb-6 leading-relaxed">
                Direct inquiries for designer participations, VIP press passes, or strategic partnerships.
              </p>
              <a
                href="#accreditation"
                className="inline-block bg-brand-orange px-6 py-3 text-xs font-syne tracking-caps font-bold text-brand-void hover:bg-brand-gold transition-colors"
              >
                REQUEST ACCREDITATION ↗
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-hairline flex items-center justify-between text-xs font-syne text-brand-platinum">
              <span>SOCIAL</span>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[10px] font-syne tracking-micro text-brand-platinum gap-4">
          <div>
            © {new Date().getFullYear()} FASHPRISM INTERNATIONALS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <span>TERMS OF ACCREDITATION</span>
            <span>PRIVACY POLICY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
