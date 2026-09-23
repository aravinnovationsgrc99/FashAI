"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enforce strict 0s -> 7.9s smooth looping boundary
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 7.9) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setVideoError(true);
      });
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoLoaded(true);
          })
          .catch(() => {
            // If autoplay or playback fails critically, activate fallback image
            setVideoError(true);
          });
      }
    }
  }, []);

  return (
    <section className="relative min-h-[100vh] min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-4 sm:px-8 lg:px-12 overflow-hidden bg-black text-brand-white">
      
      {/* LAYER 1: Primary Video & Defensive Fallback Media Container */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden">
        {/* Fallback Backup Image (Rendered in exact same container, activates smoothly on video error) */}
        <Image
          src="/assets/hero/fallback.png"
          alt=""
          role="presentation"
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center scale-[1.05] transition-opacity duration-500 ease-in-out ${
            videoError ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Primary Hero Background Video */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            poster="/assets/hero/fallback.png"
            onTimeUpdate={handleTimeUpdate}
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center scale-[1.05] origin-center transition-opacity duration-500 ease-in-out ${
              videoLoaded ? "opacity-100" : "opacity-90"
            }`}
          >
            <source src="/videos/homepage-main.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* LAYER 2: Readability Gradients (Video remains sharp & visible) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black/85 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/65 via-transparent to-transparent pointer-events-none z-[1]" />

      {/* LAYER 3: Main Centered Editorial Composition (Z-10) */}
      <div className="relative z-10 my-auto container-editorial py-4 sm:py-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.1 }
            }
          }}
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-4 sm:space-y-5"
        >
          {/* 1. TOP EVENT TAG: ────── LIFESTYLE 2026 · DUBAI ────── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="flex items-center justify-center gap-3 w-full max-w-sm sm:max-w-md"
          >
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-yellow-golden/70 to-brand-yellow-golden" />
            <span className="text-[11px] sm:text-xs font-syne tracking-[0.25em] text-brand-yellow-golden font-bold uppercase whitespace-nowrap drop-shadow-[0_0_10px_rgba(250,182,10,0.4)]">
              LIFESTYLE 2026 · DUBAI
            </span>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-brand-yellow-golden/70 to-brand-yellow-golden" />
          </motion.div>

          {/* 2. MAIN HEADLINE TYPOGRAPHY: FASHAI Universal */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }
            }}
            style={{ willChange: "transform, opacity" }}
            className="font-serif-display leading-[0.88] tracking-tight select-none flex flex-col items-center justify-center w-full my-1"
          >
            <span className="block text-6xl sm:text-8xl md:text-9xl xl:text-[10rem] font-serif font-light text-brand-white uppercase tracking-tight drop-shadow-[0_12px_35px_rgba(0,0,0,0.9)]">
              FASHAI
            </span>
            <span className="block text-5xl sm:text-7xl md:text-8xl xl:text-[8rem] font-serif italic font-normal text-brand-yellow-golden -mt-2 sm:-mt-5 md:-mt-7 tracking-normal drop-shadow-[0_0_25px_rgba(250,182,10,0.4)]">
              Universal
            </span>
          </motion.h1>

          {/* 3. TITLE DECORATION DIVIDER BELOW UNIVERSAL: ──────── ✦ ──────── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="flex items-center justify-center gap-3 w-full max-w-xs sm:max-w-sm"
          >
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-yellow-golden/80 to-brand-yellow-golden" />
            <span className="text-brand-yellow-golden text-xs sm:text-sm drop-shadow-[0_0_8px_rgba(250,182,10,0.8)]">✦</span>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-brand-yellow-golden/80 to-brand-yellow-golden" />
          </motion.div>

          {/* 4. POWERED BY ARAV INNOVATION BRANDING */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="flex flex-col items-center justify-center gap-1.5 my-1"
          >
            <span className="text-[11px] sm:text-xs font-syne tracking-[0.25em] text-brand-white/80 uppercase font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Powered by
            </span>
            <Image
              src="/assets/brand/Final_Powered_by_logo.png"
              alt="Arav Innovation Logo"
              width={320}
              height={85}
              priority
              className="h-9 sm:h-12 md:h-14 lg:h-15 w-auto object-contain brightness-110 drop-shadow-[0_0_20px_rgba(250,182,10,0.3)]"
            />
          </motion.div>

          {/* 5. CENTERED ACTION CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
            }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto pt-2"
          >
            <Link
              href="/projects"
              className="w-full sm:w-auto min-w-[210px] bg-brand-yellow-golden px-8 py-4 text-xs sm:text-sm font-syne tracking-caps font-bold text-black hover:bg-[#FFEC69] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-center min-h-[50px] flex items-center justify-center rounded-full shadow-[0_0_25px_rgba(250,182,10,0.35)]"
              data-cursor="explore"
            >
              EXPLORE FASHAI →
            </Link>
            <Link
              href="/apply"
              className="w-full sm:w-auto min-w-[210px] border border-brand-yellow-golden/70 bg-black/50 backdrop-blur-sm px-8 py-4 text-xs sm:text-sm font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/15 hover:border-brand-yellow-golden hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-center min-h-[50px] flex items-center justify-center rounded-full"
              data-cursor="view"
            >
              GET INVOLVED ↗
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* LAYER 4: LEFT-SIDE EDITORIAL NAVIGATION RAIL */}
      <div className="hidden lg:flex absolute left-8 xl:left-12 top-1/2 -translate-y-1/2 flex-col items-start space-y-4 text-left z-10 pointer-events-none select-none">
        <div className="flex flex-col items-center gap-1.5 ml-1">
          <span className="w-[1px] h-10 bg-gradient-to-b from-transparent to-brand-yellow-golden" />
          <span className="w-2.5 h-2.5 rounded-full border border-brand-yellow-golden bg-black/80 shadow-[0_0_8px_rgba(250,182,10,0.6)]" />
          <span className="w-[1px] h-6 bg-brand-yellow-golden/60" />
        </div>
        <div className="flex flex-col items-start space-y-3.5 text-[11px] font-syne tracking-[0.22em] text-brand-white/80 uppercase font-semibold">
          <span className="hover:text-brand-yellow-golden transition-colors">PEOPLE</span>
          <span className="hover:text-brand-yellow-golden transition-colors">IDEAS</span>
          <span className="hover:text-brand-yellow-golden transition-colors">CULTURE</span>
          <div className="flex flex-col items-start">
            <span className="hover:text-brand-yellow-golden transition-colors">BEYOND</span>
            <span className="hover:text-brand-yellow-golden transition-colors">FASHION</span>
            <span className="w-8 h-[1px] bg-brand-white/40 mt-1.5" />
          </div>
        </div>
      </div>

      {/* LAYER 5: RIGHT-SIDE EDITORIAL QUOTE */}
      <div className="hidden lg:flex absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 flex-col items-end text-right z-10 pointer-events-none select-none max-w-[210px]">
        <p className="font-serif italic text-lg sm:text-xl text-brand-white/90 leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
          “More<br />
          Than Fashion.<br />
          A Refinement<br />
          of Tomorrow.”
        </p>
        <span className="w-12 h-[1px] bg-brand-yellow-golden/80 mt-3" />
      </div>

      {/* LAYER 6: BOTTOM DETAILS */}
      <div className="relative z-10 container-editorial flex flex-row justify-between items-center text-[10px] sm:text-xs font-syne tracking-micro text-brand-white/80 pt-4 border-t border-white/10">
        {/* Bottom Left: DUBAI 2026 / A NEW ERA AWAITS */}
        <div className="flex items-center gap-3">
          <span className="h-6 w-[2px] bg-brand-yellow-golden shadow-[0_0_8px_rgba(250,182,10,0.8)]" />
          <div className="flex flex-col items-start leading-tight">
            <span className="font-bold text-brand-white tracking-widest uppercase">DUBAI 2026</span>
            <span className="text-[9px] text-brand-white/70 tracking-widest uppercase font-medium">A NEW ERA AWAITS</span>
          </div>
        </div>

        {/* Bottom Center: Scroll Indicator */}
        <div className="flex flex-col items-center justify-center gap-1.5 font-syne text-[10px] tracking-widest text-brand-white/80 uppercase">
          <div className="w-4 h-6 rounded-full border border-brand-white/80 flex justify-center pt-1">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-brand-yellow-golden"
            />
          </div>
          <span className="hover:text-brand-yellow-golden transition-colors">SCROLL TO EXPLORE</span>
          <span className="w-6 h-[1px] bg-brand-yellow-golden/60" />
        </div>

        {/* Spacer on bottom-right */}
        <div className="w-12 hidden sm:block" />
      </div>
    </section>
  );
}
