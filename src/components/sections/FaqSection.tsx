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
    answer: "FashAI Universal is an international fashion and events platform operating across the UAE (Dubai) and India. It bridges luxury fashion experiences, talent recruitment, lifestyle events, corporate gatherings, and IT event formats into a unified creative platform.",
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
    <section id="faq" className="relative py-12 sm:py-16 bg-[#050505] border-b border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-yellow-golden/5 blur-[180px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase mb-4">
            QUESTIONS &amp; <span className="font-serif italic text-brand-yellow-golden">ANSWERS</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light max-w-xl mx-auto leading-relaxed">
            Key information regarding FashAI Universal, event participation, talent applications, and sponsorship enquiries.
          </p>
        </div>

        {/* 3-Question Accordion List */}
        <div className="space-y-4">
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
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-yellow-golden shrink-0" />
                    <div>
                      <span className="text-[10px] font-syne text-brand-orange font-bold uppercase tracking-wider block mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-serif-display text-lg sm:text-xl font-light text-white uppercase">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`p-2 rounded-full bg-white/5 text-brand-platinum transition-transform duration-300 ${isOpen ? "rotate-180 bg-brand-yellow-golden text-black" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
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
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-brand-platinum/80 font-light leading-relaxed border-t border-white/5 pl-14">
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
