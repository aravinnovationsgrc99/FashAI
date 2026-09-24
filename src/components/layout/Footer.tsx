"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

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
            sizes="100vw"
            className="block dark:hidden object-cover object-center filter contrast-[1.02] opacity-90"
            priority
          />
          {/* Dark Mode Background Image */}
          <Image
            src="/assets/footer/footer_dark.png"
            alt="FashAI Universal Footer Dark Background"
            fill
            sizes="100vw"
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-10 border-b border-black/10 dark:border-white/10 items-start">
          
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
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 overflow-hidden rounded-lg border border-black/10 dark:border-white/15 bg-black/5 dark:bg-black p-0.5 shadow-sm">
                <Image
                  src="/assets/brand/logo_transparent.png"
                  alt="FashAI Universal Logo"
                  fill
                  sizes="40px"
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-serif-display text-2xl sm:text-3xl font-light text-[#111111] dark:text-white uppercase tracking-tight group-hover:text-[#F15E1C] dark:group-hover:text-[#FAB60A] transition-colors duration-300">
                FashAI Universal
              </span>
            </Link>

            <p className="font-sans text-xs sm:text-sm text-[#333333] dark:text-white/80 font-normal leading-relaxed max-w-xs">
              Fashion, talent and experiences across Dubai, UAE &amp; India.
            </p>

            <div className="pt-1">
              <a
                href="https://www.instagram.com/fashai_universal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-serif italic text-sm sm:text-base text-[#F15E1C] dark:text-[#FAB60A] hover:underline transition-all duration-300 group"
              >
                <span>@fashai_universal</span>
                <ArrowUpRight className="w-4 h-4 text-[#F15E1C] dark:text-[#FAB60A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
            <h4 className="font-syne text-xs tracking-caps text-[#F15E1C] dark:text-[#FAB60A] font-bold uppercase mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Upcoming", href: "/upcoming" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-[#111111] dark:text-white/90 hover:text-[#F15E1C] dark:hover:text-[#FAB60A] transition-colors duration-300"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#F15E1C] dark:text-[#FAB60A] transition-all duration-300" />
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
            <h4 className="font-syne text-xs tracking-caps text-[#F15E1C] dark:text-[#FAB60A] font-bold uppercase mb-4">
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
                    className="group inline-flex items-center gap-1.5 font-sans text-xs sm:text-sm text-[#111111] dark:text-white/90 hover:text-[#F15E1C] dark:hover:text-[#FAB60A] transition-colors duration-300"
                  >
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#F15E1C] dark:text-[#FAB60A] transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* BOTTOM LEGAL BAR */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
          className="pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-syne tracking-wider text-[#333333] dark:text-white/70"
        >
          {/* LEFT: Copyright */}
          <div>
            © 2026 FashAI Universal
          </div>

          {/* CENTER: Privacy & Terms */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs">
            <Link href="/privacy" className="hover:text-[#F15E1C] dark:hover:text-[#FAB60A] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-black/30 dark:text-white/20">•</span>
            <Link href="/terms" className="hover:text-[#F15E1C] dark:hover:text-[#FAB60A] transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>

          {/* RIGHT: Powered by Arav Innovation Branding Lockup */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-medium text-[#444444] dark:text-white/80 uppercase tracking-wider">
              Powered by
            </span>
            <Image
              src="/assets/brand/Final_Powered_by_logo.png"
              alt="Arav Innovation"
              width={140}
              height={36}
              className="h-5 sm:h-6 w-auto object-contain filter contrast-[1.05]"
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
