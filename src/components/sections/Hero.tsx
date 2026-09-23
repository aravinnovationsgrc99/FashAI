"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enforce strict 0s -> 9s smooth looping
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 9) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <section className="relative min-h-[100vh] min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-4 sm:px-8 lg:px-12 overflow-hidden bg-black text-brand-white">
      
      {/* LAYER 1: Full-Screen Crisp Background Video (No CSS Blur) */}
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster="/assets/models/model_01.jpeg"
          onTimeUpdate={handleTimeUpdate}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.04] origin-center z-0 pointer-events-none select-none"
        >
          <source src="/videos/homepage-main.mp4" type="video/mp4" />
        </video>
      ) : (
        /* Fallback Background Image */
        <Image
          src="/assets/models/model_01.jpeg"
          alt="FashAI Universal Background"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
        />
      )}

      {/* LAYER 2: Localized Readability Gradients (Video remains 100% clear in center/right) */}
      {/* Left-side gradient for text readability */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] bg-gradient-to-r from-black/85 via-black/35 to-transparent pointer-events-none z-[1]" />
      
      {/* Top vignette for navbar contrast */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/75 via-black/20 to-transparent pointer-events-none z-[1]" />
      
      {/* Bottom gradient for footer status contrast */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-[1]" />
      
      {/* Localized bottom-right gradient mask to cleanly hide Gemini mark */}
      <div className="absolute bottom-0 right-0 w-64 h-36 bg-gradient-to-tl from-black/95 via-black/40 to-transparent pointer-events-none z-[1]" />

      {/* LAYER 4: Main Content Composition Overlay (Z-10) */}
      <div className="relative z-10 my-auto container-editorial py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Hero Typography & Primary Content Zone */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.1 }
              }
            }}
            className="lg:col-span-8 xl:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6 max-w-3xl"
          >
            {/* 1. Eyebrow Tag */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-none bg-brand-yellow-golden" />
              <span className="text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase">
                FASHAI UNIVERSAL
              </span>
            </motion.div>

            {/* 2. Main Headline Typography: FASHAI Universal */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-serif-display leading-[0.88] tracking-tight select-none w-full"
            >
              <span className="block text-6xl sm:text-8xl md:text-9xl xl:text-[10rem] font-serif font-light text-brand-white uppercase">
                FASHAI
              </span>
              <span className="block text-6xl sm:text-8xl md:text-9xl xl:text-[10rem] font-serif italic font-normal text-brand-yellow-golden mt-1">
                Universal
              </span>
            </motion.h1>

            {/* 3. Positioning Statement */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-white/95 font-light italic tracking-wide"
            >
              Fashion × AI × Experience
            </motion.p>

            {/* 4. Event Information Card over Video */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="border border-brand-yellow-golden/40 bg-black/60 p-4 sm:p-5 max-w-lg space-y-2 rounded-none"
            >
              <div className="inline-flex items-center gap-2 bg-brand-yellow-golden/10 border border-brand-yellow-golden/40 px-2.5 py-1 text-[10px] sm:text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase">
                ■ LIFESTYLE 2026 · DUBAI
              </div>
              <p className="font-syne text-xs sm:text-sm tracking-caps text-brand-white font-bold uppercase">
                REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
              </p>
              <p className="font-sans text-xs text-brand-platinum/90 font-light">
                Open for delegates, international designers, press, and brand partners.
              </p>
            </motion.div>

            {/* 5. Primary Action CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
            >
              <Link
                href="/projects"
                className="bg-brand-yellow-golden px-8 py-4 text-xs font-syne tracking-caps font-bold text-black hover:bg-[#FFEC69] transition-all duration-300 text-center min-h-[48px] flex items-center justify-center rounded-none group shadow-[0_0_20px_rgba(250,182,10,0.3)]"
                data-cursor="explore"
              >
                <span>EXPLORE FASHAI →</span>
              </Link>
              <Link
                href="/contact"
                className="border border-brand-yellow-golden/60 bg-black/60 px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 text-center min-h-[48px] flex items-center justify-center rounded-none"
                data-cursor="view"
              >
                GET INVOLVED ↗
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Right-Side Micro-Content Stack (Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 xl:col-span-5 flex-col items-end justify-center space-y-3 text-right pr-2">
            <div className="flex flex-col items-end space-y-2 text-[11px] font-syne tracking-micro text-brand-white/80 font-bold uppercase">
              <span className="hover:text-brand-yellow-golden transition-colors">PEOPLE</span>
              <span className="hover:text-brand-yellow-golden transition-colors">FASHION</span>
              <span className="hover:text-brand-yellow-golden transition-colors">IDEAS</span>
              <span className="hover:text-brand-yellow-golden transition-colors">EXPERIENCES</span>
              <span className="w-12 h-[1px] bg-brand-yellow-golden/60 mt-2" />
            </div>
          </div>

        </div>
      </div>

      {/* LAYER 4: Bottom Editorial Status Details */}
      <div className="relative z-10 container-editorial flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs font-syne tracking-micro text-brand-white/80 pt-4 border-t border-white/10 gap-3">
        {/* Bottom Left: Scroll Indicator */}
        <div className="flex items-center gap-3 font-bold uppercase text-brand-white">
          <span className="h-5 w-[2px] bg-brand-yellow-golden" />
          <span>SCROLL TO EXPLORE ↓</span>
        </div>

        {/* Bottom Right: Campaign Tag */}
        <div className="hidden sm:flex items-center gap-3 font-bold uppercase text-brand-white/90">
          <span>A GLOBAL FASHION MOVEMENT</span>
          <span className="w-8 h-[1px] bg-brand-yellow-golden" />
        </div>
      </div>
    </section>
  );
}
