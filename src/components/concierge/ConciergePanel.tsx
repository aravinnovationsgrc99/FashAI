"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, RefreshCw, ArrowUpRight } from "lucide-react";
import {
  getOrCreateVisitorProfile,
  updateConsent,
  setVisitorIntent,
  trackEngagementEvent,
  VisitorPreferences,
} from "@/lib/concierge/preferences";
import { FASHAI_KNOWLEDGE, QuickAction } from "@/lib/concierge/knowledge";
import ConsentNotice from "./ConsentNotice";
import ConversationalEnquiry from "./ConversationalEnquiry";

interface MessageItem {
  id: string;
  sender: "bot" | "user";
  text: string;
  quickActions?: QuickAction[];
  navigationTarget?: string;
  galleryCategory?: string;
  timestamp: string;
}

interface ConciergePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConciergePanel({ isOpen, onClose }: ConciergePanelProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<VisitorPreferences | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeEnquiryType, setActiveEnquiryType] = useState<string | null>(null);
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Profile & Greeting
  useEffect(() => {
    if (isOpen) {
      const p = getOrCreateVisitorProfile();
      setProfile(p);
      trackEngagementEvent("chat_opened");

      // Show consent prompt if not previously answered
      if (!p.consent.personalization) {
        setShowConsentPrompt(true);
      }

      // Lock body scroll on mobile
      if (window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      }

      // Initial Greeting setup if chat is empty
      if (messages.length === 0) {
        const greetingText = FASHAI_KNOWLEDGE.initialGreeting;
        const actions = FASHAI_KNOWLEDGE.initialQuickActions;

        setMessages([
          {
            id: "msg-init",
            sender: "bot",
            text: greetingText,
            quickActions: actions,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, messages.length]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    if (!textToSend) {
      setInputValue("");
    }

    const userMsg: MessageItem = {
      id: "user-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          intent: profile?.intent,
        }),
      });

      const data = await res.json();

      const botMsg: MessageItem = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: data.message || "FashAI Universal is here to guide your discovery.",
        quickActions: data.quickActions,
        navigationTarget: data.navigationTarget,
        galleryCategory: data.galleryCategory,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);

      if (data.enquiryPrompt) {
        setActiveEnquiryType(text.toLowerCase().includes("sponsor") ? "Sponsorship" : "Registration");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-err-" + Date.now(),
          sender: "bot",
          text: "FashAI Assistant is temporarily offline. You can explore our pages directly or reach out via our contact portal.",
          quickActions: [
            { id: "explore-site", label: "Explore LifeStyle 2026", actionType: "navigate", target: "/upcoming" },
            { id: "contact-us", label: "Contact FashAI", actionType: "navigate", target: "/contact" },
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickActionClick = (qa: QuickAction) => {
    trackEngagementEvent(`topic_${qa.id}`);

    if (qa.actionType === "navigate" && qa.target) {
      router.push(qa.target);
      if (window.innerWidth < 768) {
        onClose();
      }
    } else if (qa.actionType === "enquiry") {
      setActiveEnquiryType(qa.target || "Registration");
    } else if (qa.actionType === "query" && qa.target) {
      handleSendMessage(qa.target);
    }
  };

  const handleIntentSelection = (intentObj: typeof FASHAI_KNOWLEDGE.intentOptions[0]) => {
    const updated = setVisitorIntent(intentObj.intent as VisitorPreferences["intent"]);
    setProfile(updated);

    handleSendMessage(`I'm visiting as: ${intentObj.label}`);
  };

  const handleConsentDecision = (allow: boolean) => {
    const updated = updateConsent(allow);
    setProfile(updated);
    setShowConsentPrompt(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[240] pointer-events-none flex items-end sm:items-end sm:justify-end p-0 sm:p-6">
        {/* Mobile Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md sm:hidden pointer-events-auto z-[241]"
        />

        {/* Chat Panel Box - Black + Gold Visual Identity with Ultra-Smooth Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity" }}
          className="relative z-[242] pointer-events-auto w-full sm:w-[420px] h-[85vh] sm:h-[620px] max-h-[100dvh] bg-[#080808] sm:bg-[#080808]/95 border border-brand-yellow-golden/50 shadow-[0_0_60px_rgba(250,182,10,0.25)] flex flex-col justify-between overflow-hidden rounded-none text-brand-white"
          role="dialog"
          aria-label="FashAI Assistant"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-white/10 bg-black flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 overflow-hidden bg-black border border-brand-yellow-golden/60 p-0.5">
                <Image
                  src="/assets/brand/logo_transparent.png"
                  alt="FashAI Assistant Logo"
                  fill
                  priority
                  sizes="32px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif-display text-sm font-light text-brand-white uppercase leading-none tracking-wide flex items-center gap-1.5">
                  <span>FashAI Assistant</span>
                  <Sparkles className="w-3 h-3 text-brand-yellow-golden" />
                </span>
                <span className="text-[9px] font-syne tracking-micro text-brand-yellow-golden/80 uppercase font-bold mt-0.5">
                  Your Fashion &amp; Event Guide
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-brand-white/80 hover:text-brand-yellow-golden transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close Chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 no-scrollbar">
            {/* Optional Consent Banner */}
            {showConsentPrompt && (
              <ConsentNotice
                onAllow={() => handleConsentDecision(true)}
                onDecline={() => handleConsentDecision(false)}
              />
            )}

            {/* Messages Loop */}
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] p-3 text-xs font-sans leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-brand-yellow-golden text-black font-semibold shadow-md"
                      : "bg-[#12100E] border border-white/10 text-brand-white/95"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Navigation Target Link Indicator */}
                  {msg.navigationTarget && (
                    <button
                      onClick={() => router.push(msg.navigationTarget!)}
                      className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-syne font-bold text-brand-yellow-golden hover:text-white uppercase tracking-micro pt-1 border-t border-white/10 w-full"
                    >
                      <span>GO TO SECTION ({msg.navigationTarget})</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <span className="text-[8px] font-syne text-brand-platinum/50 uppercase tracking-micro mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Inline Quick Action Chips */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.quickActions.map((qa) => (
                      <button
                        key={qa.id}
                        onClick={() => handleQuickActionClick(qa)}
                        className="px-2.5 py-1.5 bg-black border border-brand-yellow-golden/50 hover:border-brand-yellow-golden hover:bg-brand-yellow-golden/15 text-[10px] font-syne font-bold tracking-micro text-brand-white hover:text-brand-yellow-golden transition-all duration-200"
                      >
                        [{qa.label}]
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Initial Intent Question Options */}
            {messages.length === 1 && !profile?.intent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-3 bg-[#110F0D] border border-brand-yellow-golden/30 space-y-2 my-2"
              >
                <span className="text-[10px] font-syne font-bold text-brand-yellow-golden uppercase tracking-micro block">
                  WHAT BRINGS YOU TO FASHAI UNIVERSAL?
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {FASHAI_KNOWLEDGE.intentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleIntentSelection(opt)}
                      className="text-left px-2.5 py-1.5 bg-black border border-white/10 hover:border-brand-yellow-golden hover:bg-brand-yellow-golden/10 text-[10px] sm:text-[11px] font-syne font-bold text-brand-white transition-colors duration-200 truncate"
                    >
                      • {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Conversational Guided Enquiry Modal */}
            {activeEnquiryType && (
              <ConversationalEnquiry
                initialType={activeEnquiryType}
                onComplete={(summary) => {
                  setActiveEnquiryType(null);
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: "msg-done-" + Date.now(),
                      sender: "bot",
                      text: summary,
                      quickActions: [
                        { id: "explore-more", label: "LifeStyle 2026", actionType: "navigate", target: "/upcoming" },
                      ],
                      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    },
                  ]);
                }}
                onCancel={() => setActiveEnquiryType(null)}
              />
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-brand-yellow-golden text-xs p-2 font-syne">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span className="tracking-micro uppercase text-[10px]">FashAI Assistant is formulating guidance...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-3 bg-black border-t border-white/10 flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask FashAI Assistant..."
                className="flex-1 bg-[#141210] border border-white/15 px-3 py-2.5 text-xs text-brand-white placeholder:text-brand-platinum/50 focus:border-brand-yellow-golden focus:outline-none transition-colors duration-200"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2.5 bg-brand-yellow-golden text-black font-bold hover:bg-[#ffec69] disabled:opacity-50 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex justify-between items-center text-[8px] font-syne tracking-micro text-brand-platinum/60 pt-2 px-1">
              <span>POWERED BY ARAV INNOVATION</span>
              <span>DUBAI · 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
