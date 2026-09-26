"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    question: "WHAT IS FASHAI UNIVERSAL?",
    answer: "FashAI Universal is a global fashion and events platform connecting fashion experiences, creative talent, designers, artists, brands, and event opportunities across international markets. The platform brings together luxury fashion experiences, talent recruitment, lifestyle events, corporate gatherings, and IT event formats within a unified global creative ecosystem, with the UAE and India serving as key markets.",
    category: "ABOUT PLATFORM",
  },
  {
    question: "WHO CAN APPLY OR BE NOMINATED?",
    answer: "Applications and nominations are open for Designers, Models, Makeup Artists, Fashion Stylists, Choreographers, Influencers/Creators, and Celebrities or Public Figures seeking participation in curated showcases and campaigns.",
    category: "COMMUNITY & TALENT",
  },
  {
    question: "HOW CAN I ENQUIRE ABOUT AN EVENT, SPONSORSHIP OR PARTICIPATION?",
    answer: "You can submit an enquiry directly through the Contact section on our website by selecting your specific enquiry type (Registration, Sponsorship, Designer Participation, Talent, or Media). Our team will review your submission promptly.",
    category: "ENQUIRIES & SPONSORSHIP",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-8 sm:py-12 bg-[#050505] border-b border-white/10 overflow-hidden">
      <div className="container-editorial relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-light text-brand-white uppercase mb-4">
            QUESTIONS &amp; <span className="font-serif italic text-brand-yellow-golden">ANSWERS</span>
          </h2>
          <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-brand-platinum/90 font-light max-w-3xl mx-auto leading-relaxed">
            Key information regarding FashAI Universal, event participation, talent applications, and sponsorship enquiries.
          </p>
        </div>

        {/* 3-Question Accordion List */}
        <div className="space-y-5">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="bg-[#0B0A09] border border-white/10 rounded-2xl overflow-hidden transition-colors hover:border-brand-yellow-golden/40"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-brand-yellow-golden/50"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className="w-5 h-5 sm:w-7 sm:h-7 text-brand-yellow-golden shrink-0" />
                    <div>
                      <h3 className="font-serif-display text-[#111111] dark:text-white uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`p-2.5 rounded-full bg-white/5 text-brand-platinum transition-transform duration-300 ${isOpen ? "rotate-180 bg-brand-yellow-golden text-black" : ""}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-3 text-base sm:text-lg md:text-xl lg:text-2xl text-brand-platinum/90 font-light leading-relaxed border-t border-white/5 pl-6 sm:pl-14">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
