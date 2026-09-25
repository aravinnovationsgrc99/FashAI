"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Clock, ArrowLeft, Sparkles, Camera, Layers, CheckCircle2 } from "lucide-react";

export interface MagazineArticle {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  readTime: string;
  primaryImage: string;
  primaryImageAlt: string;
  imagePosition?: string;
  introduction?: string;
  experience?: string[];
  visualHighlights?: string[];
  fashionCulture?: string[];
  keyMoments?: string[];
  closing?: string;
  content: string[];
  galleryImages?: { src: string; alt: string }[];
}

interface MagazineArticleModalProps {
  article: MagazineArticle | null;
  onClose: () => void;
}

export default function MagazineArticleModal({ article, onClose }: MagazineArticleModalProps) {
  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-[300]"
        />

        {/* Article Reader Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[310] w-full max-w-4xl bg-white dark:bg-[#080808] border border-black/15 dark:border-brand-yellow-golden/40 rounded-3xl p-5 sm:p-10 shadow-2xl text-[#111111] dark:text-brand-white my-auto max-h-[90vh] flex flex-col justify-between overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-syne tracking-wider text-[#F15E1C] dark:text-brand-yellow-golden font-bold uppercase bg-[#F15E1C]/10 dark:bg-brand-yellow-golden/10 border border-[#F15E1C]/30 dark:border-brand-yellow-golden/30 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-syne text-[#555555] dark:text-brand-platinum/70 uppercase font-medium">
                <Clock className="w-3.5 h-3.5 text-[#F15E1C] dark:text-brand-orange" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* High Contrast Close Button (Section 4 Requirement) */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-[#FAF8F5] dark:bg-white/10 text-[#111111] dark:text-white border border-black/20 dark:border-white/20 hover:bg-[#F15E1C] hover:text-white dark:hover:bg-brand-yellow-golden dark:hover:text-black dark:hover:border-brand-yellow-golden transition-all flex items-center justify-center cursor-pointer shadow-sm group"
              aria-label="Close article"
              title="Close Article"
            >
              <X className="w-5 h-5 text-[#111111] dark:text-white group-hover:text-white dark:group-hover:text-black stroke-[2.5]" />
            </button>
          </div>

          {/* Scrollable Editorial Article Body */}
          <div className="overflow-y-auto space-y-8 pr-2 custom-scrollbar max-w-3xl mx-auto w-full">
            {/* Title & Subtitle / Deck */}
            <div className="space-y-4">
              <span className="text-[10px] font-syne uppercase tracking-[0.25em] text-[#F15E1C] dark:text-brand-yellow-golden font-bold block">
                FASHAI UNIVERSAL FEATURE STORY
              </span>
              <h2 className="font-serif-display text-3xl sm:text-5xl font-light text-[#111111] dark:text-brand-white uppercase leading-tight">
                {article.title}
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#333333] dark:text-brand-platinum/90 font-light leading-relaxed border-l-2 border-[#F15E1C] dark:border-brand-yellow-golden pl-4 my-4 italic">
                {article.subtitle}
              </p>
            </div>

            <div className="h-px w-full bg-black/10 dark:bg-white/10 my-4" />

            {/* Dominant Hero Feature Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 shadow-2xl bg-black">
              <Image
                src={article.primaryImage}
                alt={article.primaryImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className={`object-cover ${article.imagePosition || "object-center"} filter contrast-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-syne text-white/80 uppercase">
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3 text-brand-yellow-golden" />
                  {article.primaryImageAlt}
                </span>
                <span className="font-mono text-white/50 hidden sm:inline">FashAI Editorial Archive</span>
              </div>
            </div>

            {/* 1. EDITORIAL INTRODUCTION */}
            <div className="space-y-4 pt-2">
              <p className="font-sans text-sm sm:text-base text-[#222222] dark:text-brand-platinum/90 leading-relaxed font-light first-letter:text-4xl first-letter:font-serif-display first-letter:text-[#F15E1C] dark:first-letter:text-brand-yellow-golden first-letter:mr-2 first-letter:float-left">
                {article.introduction || article.content[0]}
              </p>
              {article.content.length > 1 && !article.introduction && (
                <p className="font-sans text-sm sm:text-base text-[#222222] dark:text-brand-platinum/90 leading-relaxed font-light">
                  {article.content[1]}
                </p>
              )}
            </div>

            {/* 2. THE EXPERIENCE */}
            {article.experience && article.experience.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F15E1C] dark:text-brand-yellow-golden" />
                  <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#F15E1C] dark:text-brand-yellow-golden">
                    THE EXPERIENCE
                  </h3>
                </div>
                {article.experience.map((para, idx) => (
                  <p key={idx} className="font-sans text-sm sm:text-base text-[#333333] dark:text-brand-platinum/80 leading-relaxed font-light">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* 3. VISUAL HIGHLIGHTS & GALLERY MEDIA */}
            {article.visualHighlights && article.visualHighlights.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#F15E1C] dark:text-brand-yellow-golden" />
                  <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#F15E1C] dark:text-brand-yellow-golden">
                    VISUAL HIGHLIGHTS
                  </h3>
                </div>
                {article.visualHighlights.map((para, idx) => (
                  <p key={idx} className="font-sans text-sm sm:text-base text-[#333333] dark:text-brand-platinum/80 leading-relaxed font-light">
                    {para}
                  </p>
                ))}

                {/* Additional Gallery Grid */}
                {article.galleryImages && article.galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    {article.galleryImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 bg-black shadow-md">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="300px"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. FASHION & CULTURE */}
            {article.fashionCulture && article.fashionCulture.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#F15E1C] dark:text-brand-yellow-golden" />
                  <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#F15E1C] dark:text-brand-yellow-golden">
                    FASHION &amp; CULTURE
                  </h3>
                </div>
                {article.fashionCulture.map((para, idx) => (
                  <p key={idx} className="font-sans text-sm sm:text-base text-[#333333] dark:text-brand-platinum/80 leading-relaxed font-light">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* 5. KEY MOMENTS */}
            {article.keyMoments && article.keyMoments.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E936F]" />
                  <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#2E936F]">
                    KEY MOMENTS
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {article.keyMoments.map((moment, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#121110] border border-black/10 dark:border-white/10 space-y-1"
                    >
                      <span className="text-[10px] font-mono text-[#F15E1C] dark:text-brand-yellow-golden font-bold">
                        0{idx + 1}
                      </span>
                      <p className="font-sans text-xs text-[#222222] dark:text-white/90 leading-normal font-medium">
                        {moment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. CLOSING SUMMARY */}
            <div className="pt-6 border-t border-black/10 dark:border-white/10 space-y-3">
              <span className="text-[10px] font-syne tracking-[0.2em] text-[#F15E1C] dark:text-brand-yellow-golden font-bold uppercase block">
                EDITORIAL CONCLUSION
              </span>
              <p className="font-sans text-sm sm:text-base text-[#222222] dark:text-brand-platinum/90 leading-relaxed font-light italic">
                {article.closing || (article.content.length > 2 ? article.content[2] : article.content[0])}
              </p>
            </div>
          </div>

          {/* Footer Back Action */}
          <div className="pt-6 border-t border-black/10 dark:border-white/10 mt-6 shrink-0 flex items-center justify-between">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#F15E1C] dark:bg-brand-yellow-golden hover:opacity-90 text-white dark:text-black px-6 py-2.5 rounded-full font-syne text-xs font-bold tracking-caps transition-colors shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>EXPLORE MORE ARTICLES</span>
            </button>
            <div className="flex items-center gap-2 text-[10px] font-syne tracking-widest text-[#777777] dark:text-brand-platinum/50 uppercase">
              <span>FASHAI UNIVERSAL EDITORIAL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

