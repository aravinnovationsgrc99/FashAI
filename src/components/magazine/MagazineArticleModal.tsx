"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Sparkles, Clock, ArrowLeft } from "lucide-react";

export interface MagazineArticle {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  readTime: string;
  primaryImage: string;
  primaryImageAlt: string;
  imagePosition?: string;
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
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          className="relative z-[310] w-full max-w-4xl bg-[#080808] border border-brand-yellow-golden/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_90px_rgba(250,182,10,0.2)] text-brand-white my-auto max-h-[90vh] flex flex-col justify-between overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-[10px] font-syne text-brand-platinum/70 uppercase">
                <Clock className="w-3 h-3 text-brand-orange" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 bg-black border border-white/20 text-white/70 hover:text-brand-yellow-golden hover:border-brand-yellow-golden rounded-full transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Article Body */}
          <div className="overflow-y-auto space-y-8 pr-2 custom-scrollbar">
            {/* Title & Subtitle */}
            <div>
              <h2 className="font-serif-display text-3xl sm:text-5xl font-light text-brand-white uppercase leading-tight mb-4">
                {article.title}
              </h2>
              <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed">
                {article.subtitle}
              </p>
            </div>

            {/* Dominant Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 shadow-2xl bg-black">
              <Image
                src={article.primaryImage}
                alt={article.primaryImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className={`object-cover ${article.imagePosition || "object-center"} filter contrast-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-5 font-sans text-xs sm:text-sm text-brand-platinum/80 leading-relaxed font-light">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="first-letter:text-3xl first-letter:font-serif-display first-letter:text-brand-yellow-golden first-letter:mr-1">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Additional Gallery Images if available */}
            {article.galleryImages && article.galleryImages.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase block">
                  VISUAL HIGHLIGHTS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {article.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Back Action */}
          <div className="pt-6 border-t border-white/10 mt-6 shrink-0 flex items-center justify-between">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-brand-yellow-golden hover:bg-yellow-400 text-black px-6 py-2.5 rounded-full font-syne text-xs font-bold tracking-caps transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO MAGAZINE</span>
            </button>
            <div className="flex items-center gap-2 text-[10px] font-syne tracking-widest text-brand-platinum/50 uppercase">
              <span>FASHAI UNIVERSAL EDITORIAL</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
