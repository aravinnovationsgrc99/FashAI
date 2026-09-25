"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const columnVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <footer className="relative w-full border-t border-black/10 dark:border-white/10 bg-white dark:bg-[#050505] text-[#111111] dark:text-white overflow-hidden select-none">
      {/* Edge-to-Edge Supplied Footer Background Images (Light & Dark Mode) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Slow subtle ambient background motion */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          {/* Light Mode Background Image */}
          <Image
            src="/assets/footer/footer_light.png"
            alt="FashAI Universal Footer Light Background"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="block dark:hidden object-cover object-center filter contrast-[1.02] opacity-90"
            priority
          />
          {/* Dark Mode Background Image */}
          <Image
            src="/assets/footer/footer_dark.png"
            alt="FashAI Universal Footer Dark Background"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="hidden dark:block object-cover object-center filter contrast-[1.02] opacity-90"
            priority
          />
        </motion.div>
        {/* Subtle Theme-Aware Readability Overlay */}
        <div className="absolute inset-0 bg-white/75 via-white/60 to-white/80 dark:bg-black/80 dark:via-black/70 dark:to-black/85" />
      </div>

      {/* Main Editorial Content Container */}
      <div className="container-editorial relative z-10 py-10 sm:py-14 max-w-6xl mx-auto px-4 sm:px-6">
        {/* 3-Column Editorial Grid (Desktop) / Vertical Stack (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-8 border-b border-black/10 dark:border-white/10 items-start">
          
          {/* COLUMN 1: LEFT — BRAND (md:col-span-5) */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariants}
            className="md:col-span-5 flex flex-col space-y-3.5"
          >
            {/* Logo Lockup: Official Logo + FashAI Universal Brand Text */}
            <Link href="/" className="inline-flex items-center gap-3 group w-fit">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 overflow-hidden">
                <Image
                  src="/assets/brand/logo_transparent.png"
                  alt="FashAI Universal Logo"
                  fill
                  sizes="44px"
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-serif-display text-2xl sm:text-3xl font-light text-[#111111] dark:text-white uppercase tracking-tight group-hover:text-[#F15E1C] dark:group-hover:text-[#D4AF37] transition-colors duration-300">
                FashAI Universal
              </span>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-[#333333] dark:text-white/80 font-normal leading-relaxed max-w-xs">
              Global fashion, talent and event platform connecting ecosystems across the UAE, India and international markets.
            </p>

            {/* Social Links Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href="https://www.instagram.com/fashai_universal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/10 text-xs font-syne font-semibold text-[#111111] dark:text-white hover:text-[#E4405F] dark:hover:text-[#D4AF37] hover:border-[#E4405F]/40 dark:hover:border-[#D4AF37] transition-all duration-300 shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
                <span>@fashai_universal</span>
                <ArrowUpRight className="w-3 h-3 text-[#E4405F]" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61573489951314"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/10 text-xs font-syne font-semibold text-[#111111] dark:text-white hover:text-[#1877F2] dark:hover:text-[#D4AF37] hover:border-[#1877F2]/40 dark:hover:border-[#D4AF37] transition-all duration-300 shadow-sm"
              >
                <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                <span>Facebook Page</span>
                <ArrowUpRight className="w-3 h-3 text-[#1877F2]" />
              </a>
            </div>
          </motion.div>

          {/* COLUMN 2: CENTER — EXPLORE (md:col-span-3) */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariants}
            className="md:col-span-3"
          >
            <h4 className="font-syne text-xs tracking-caps text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Upcoming", href: "/upcoming" },
                { label: "Services", href: "/services" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-[#111111] dark:text-white/90 hover:text-[#F15E1C] dark:hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#F15E1C] dark:text-[#D4AF37] transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COLUMN 3: RIGHT — GET INVOLVED (md:col-span-4) */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={columnVariants}
            className="md:col-span-4"
          >
            <h4 className="font-syne text-xs tracking-caps text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase mb-4">
              GET INVOLVED
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Designer", href: "/apply/designer" },
                { label: "Model", href: "/apply/model" },
                { label: "Makeup Artist", href: "/apply/makeup-artist" },
                { label: "Fashion Stylist", href: "/apply/fashion-stylist" },
                { label: "Open Nominations", href: "/apply" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-[#111111] dark:text-white/90 hover:text-[#F15E1C] dark:hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#F15E1C] dark:text-[#D4AF37] transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* FEATURED VIEW SOCIALS CARD */}
        <motion.div
          custom={2.5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
          className="my-6 p-4 sm:p-5 rounded-xl border border-black/15 dark:border-white/15 bg-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-none"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1877F2]/10 dark:bg-[#D4AF37]/15 border border-[#1877F2]/30 dark:border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <Facebook className="w-5 h-5 text-[#1877F2] dark:text-[#D4AF37]" />
            </div>
            <div>
              <h5 className="font-syne text-xs sm:text-sm font-bold text-[#111111] dark:text-white uppercase tracking-wider">
                FashAI Universal Socials
              </h5>
              <p className="font-sans text-xs text-[#555555] dark:text-white/70 leading-relaxed">
                Connect with our official Facebook page for event highlights, runway news &amp; announcements.
              </p>
            </div>
          </div>

          <a
            href="https://www.facebook.com/profile.php?id=61573489951314"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#111111] hover:bg-[#FFEC69] font-syne font-bold text-xs tracking-caps px-5 py-3 rounded-xl transition-all duration-300 shadow-md shrink-0 whitespace-nowrap w-full sm:w-auto"
          >
            <span>VIEW SOCIALS</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* BOTTOM LEGAL BAR */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
          className="pt-4 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-syne tracking-wider text-[#333333] dark:text-white/70"
        >
          {/* LEFT: Copyright */}
          <div>
            © 2026 FashAI Universal
          </div>

          {/* CENTER: Privacy & Terms */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs">
            <Link href="/privacy" className="hover:text-[#F15E1C] dark:hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-black/30 dark:text-white/20">•</span>
            <Link href="/terms" className="hover:text-[#F15E1C] dark:hover:text-[#D4AF37] transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>

          {/* RIGHT: Powered by Arav Innovation Branding Lockup */}
          <div className="flex items-center">
            <Image
              src="/assets/brand/Final_Powered_by_logo.png"
              alt="Powered by Arav Innovation"
              width={240}
              height={60}
              className="h-8 sm:h-10 md:h-12 w-auto object-contain filter contrast-[1.05]"
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
