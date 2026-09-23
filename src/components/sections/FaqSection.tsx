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
    question: "What is FashAI Universal?",
    answer: "FashAI Universal is an international fashion and events platform operating across the UAE (Dubai) and India. It bridges fashion experiences, talent recruitment, lifestyle events, corporate gatherings, and IT event formats.",
    category: "ABOUT PLATFORM",
  },
  {
    question: "What types of events does FashAI Universal offer?",
    answer: "FashAI Universal curates and manages five core event categories: Fashion Events (runway & couture showcases), Lifestyle Events (such as LifeStyle 2026 Dubai), Product Launch Events, Corporate Events, and IT Events.",
    category: "EVENT FORMATS",
  },
  {
    question: "Who can apply to the FashAI Universal fashion community?",
    answer: "Applications are open for Designers, Models, Makeup Artists, Fashion Stylists, Choreographers, Influencers/Content Creators, and Celebrities or Public Figures seeking participation in curated shows and campaigns.",
    category: "COMMUNITY & TALENT",
  },
  {
    question: "How can I apply as a designer?",
    answer: "Designers can apply directly through our website by selecting 'Apply as a Designer' in the Open Nominations or Designers section. Complete the 3-step application form with your brand name, portfolio link, and work samples.",
    category: "APPLICATIONS",
  },
  {
    question: "How can I apply as a model?",
    answer: "Models can select 'Apply as a Model' to submit their details including measurements/stats, portfolio, Instagram profile, and experience. Our recruitment team reviews submissions for upcoming show castings.",
    category: "APPLICATIONS",
  },
  {
    question: "How can I apply as a choreographer?",
    answer: "Choreographers can apply via the dedicated Choreographer application form under Open Nominations. Share your specialization (Runway, Contemporary, Stage), showreel video URL, and experience details.",
    category: "APPLICATIONS",
  },
  {
    question: "How can I nominate a creative professional?",
    answer: "Use our dedicated 'Nominate Someone' flow in the Open Nominations section. You can submit the name, role, contact info, and portfolio of any designer, model, or artist you believe should be considered.",
    category: "NOMINATIONS",
  },
  {
    question: "Are LifeStyle 2026 Dubai registrations open?",
    answer: "Yes, enquiries and delegate/designer registrations for LifeStyle 2026 Dubai are active. You can register your interest or enquire about participation directly through our Contact section.",
    category: "LIFESTYLE 2026",
  },
  {
    question: "How can I enquire about event sponsorship?",
    answer: "Navigate to the Contact Us section at the bottom of the page and select 'Sponsorship Enquiry' from the intelligent enquiry selector to submit your organization's sponsorship details directly to our team.",
    category: "SPONSORSHIP",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-[#050505] border-b border-white/10 overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-yellow-golden/5 blur-[180px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3 bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>13 — FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white uppercase mb-4">
            QUESTIONS & ANSWERS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 font-light max-w-xl mx-auto leading-relaxed">
            Essential information regarding FashAI Universal, event participation, talent applications, and sponsorship enquiries.
          </p>
        </div>

        {/* FAQ Accordion List */}
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
