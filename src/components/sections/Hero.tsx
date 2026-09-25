"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DistortionCTAButton from "@/components/ui/DistortionCTAButton";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enforce smooth looping boundary at 7.9s
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 7.9) {
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;

    const startVideo = async () => {
      try {
        await video.play();
      } catch {
        // Retry playing on first touch/click interaction if browser autoplay policy delays startup
        const handleUserInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener("touchstart", handleUserInteraction);
          window.removeEventListener("click", handleUserInteraction);
        };
        window.addEventListener("touchstart", handleUserInteraction, { once: true });
        window.addEventListener("click", handleUserInteraction, { once: true });
      }
    };

    startVideo();
  }, []);

  return (
    <section id="hero" className="relative min-h-[100vh] min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-3 sm:pb-4 px-4 sm:px-8 lg:px-12 overflow-hidden bg-black text-brand-white">
      
      {/* LAYER 1: Primary Video & Backup Media Container */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden bg-black">
        {/* Fallback Backup Image (Only rendered if video has a fatal decode/file error) */}
        {videoError && (
          <Image
            src="/assets/hero/fallback.png"
            alt=""
            role="presentation"
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-[1.05]"
          />
        )}

        {/* Primary Hero Background Video - Plays Continuously */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.05] origin-center opacity-100"
        >
          <source src="/videos/homepage-main.mp4" type="video/mp4" />
        </video>
      </div>

      {/* LAYER 2: Readability Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black/85 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/65 via-transparent to-transparent pointer-events-none z-[1]" />

      {/* LAYER 3: Main Centered Editorial Composition */}
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
          {/* 1. TOP EVENT TAG: ────── Fashion Without Boundaries ────── */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="flex items-center justify-center gap-3 w-full max-w-sm sm:max-w-md"
          >
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-yellow-golden/70 to-brand-yellow-golden" />
            <span className="text-[11px] sm:text-xs font-syne tracking-[0.25em] text-brand-yellow-golden font-bold uppercase whitespace-nowrap drop-shadow-[0_0_10px_rgba(250,182,10,0.4)]">
              Fashion Without Boundaries
            </span>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-brand-yellow-golden/70 to-brand-yellow-golden" />
          </motion.div>

          {/* 2. MAIN HEADLINE TYPOGRAPHY: FASHAI Universal (ENLARGED RESPONSIVELY) */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }
            }}
            style={{ willChange: "transform, opacity" }}
            className="font-serif-display leading-[0.85] tracking-tight select-none flex flex-col items-center justify-center w-full my-1"
          >
            <span className="block text-7xl sm:text-9xl md:text-[10rem] xl:text-[12rem] font-serif font-light text-brand-white keep-white uppercase tracking-tight drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
              FASHAI
            </span>
            <span className="block text-6xl sm:text-8xl md:text-[8.5rem] xl:text-[10rem] font-serif italic font-normal text-brand-yellow-golden -mt-3 sm:-mt-6 md:-mt-9 tracking-normal drop-shadow-[0_0_25px_rgba(250,182,10,0.5)]">
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

          {/* 4. ARAV INNOVATION BRANDING (TEXT REMOVED, LOGO ENLARGED) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="flex flex-col items-center justify-center my-2"
          >
            <Image
              src="/assets/brand/Final_Powered_by_logo.png"
              alt="Arav Innovation Logo"
              width={380}
              height={100}
              priority
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain brightness-110 drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
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
            <DistortionCTAButton
              href="/projects"
              label="EXPLORE FASHAI →"
              variant="primary"
              className="w-full sm:w-auto min-w-[210px]"
              dataCursor="explore"
            />
            <DistortionCTAButton
              href="/apply"
              label="GET INVOLVED ↗"
              variant="secondary"
              className="w-full sm:w-auto min-w-[210px]"
              dataCursor="view"
            />
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
        <div className="flex flex-col items-start space-y-3.5 text-[11px] font-syne tracking-[0.22em] text-brand-white/80 keep-white uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
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
        <p className="font-serif italic text-lg sm:text-xl text-brand-white/90 keep-white leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          “More<br />
          Than Fashion.<br />
          A Refinement<br />
          of Tomorrow.”
        </p>
        <span className="w-12 h-[1px] bg-brand-yellow-golden/80 mt-3" />
      </div>

    </section>
  );
}
