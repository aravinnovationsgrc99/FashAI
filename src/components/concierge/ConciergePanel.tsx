"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowUpRight } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { queryKnowledgeBase, QuickChip, ConciergeKnowledgeResponse } from "@/lib/concierge/knowledge";

interface MessageItem {
  id: string;
  sender: "bot" | "user";
  text: string;
  quickChips?: QuickChip[];
  navigationTarget?: string;
  reviewSummary?: {
    title: string;
    details: Array<{ label: string; value: string }>;
    onConfirm: () => void;
  };
  timestamp: string;
}

interface ConciergePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export default function ConciergePanel({ isOpen, onClose }: ConciergePanelProps) {
  const router = useRouter();
  const { config } = useSiteConfig();

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Guided Multi-Step Conversational State
  const [activeFlow, setActiveFlow] = useState<"CREATIVE" | "SPONSORSHIP" | "REGISTRATION" | "CONTACT" | null>(null);
  const [flowRole, setFlowRole] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<number>(0);
  const [flowData, setFlowData] = useState<Record<string, string>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isLoading]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Minimal Opening Greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages([
        {
          id: "msg-init",
          sender: "bot",
          text: "Hi, welcome to FashAI Universal.\nHow can I help?",
          timestamp: time,
          quickChips: [
            { id: "qp-events", label: "Explore events", actionKey: "EXPLORE_EVENTS" },
            { id: "qp-join", label: "Join the network", actionKey: "JOIN_NETWORK" },
            { id: "qp-apply", label: "Apply / nominate", actionKey: "APPLY_NOMINATE" },
            { id: "qp-contact", label: "Contact the team", actionKey: "CONTACT_TEAM" },
          ],
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Helper to append Bot Message directly
  const addBotMessage = (
    text: string,
    chips?: QuickChip[],
    navTarget?: string,
    summary?: MessageItem["reviewSummary"]
  ) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      {
        id: "bot-" + Date.now() + Math.random(),
        sender: "bot",
        text,
        quickChips: chips,
        navigationTarget: navTarget,
        reviewSummary: summary,
        timestamp: time,
      },
    ]);
  };

  // Helper to append User Message
  const addUserMessage = (text: string) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      {
        id: "user-" + Date.now() + Math.random(),
        sender: "user",
        text,
        timestamp: time,
      },
    ]);
  };

  // MANDATORY TYPING DELAY & QUEUE ENGINE
  const queueBotResponse = async (
    generator: () => Promise<{ text: string; chips?: QuickChip[]; navTarget?: string; summary?: MessageItem["reviewSummary"] }> | { text: string; chips?: QuickChip[]; navTarget?: string; summary?: MessageItem["reviewSummary"] },
    onComplete?: () => void
  ) => {
    setIsTyping(true);
    setIsLoading(true);

    const startTime = Date.now();
    let res: { text: string; chips?: QuickChip[]; navTarget?: string; summary?: MessageItem["reviewSummary"] };

    try {
      res = await generator();
    } catch {
      res = {
        text: "Something went wrong. Please try again.",
        chips: [
          { id: "err-events", label: "Explore events", actionKey: "EXPLORE_EVENTS" },
          { id: "err-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
        ],
      };
    }

    const elapsed = Date.now() - startTime;
    const minTypingMs = 650; // Mandatory 650ms typing delay for natural feel
    const remainingMs = Math.max(0, minTypingMs - elapsed);

    if (remainingMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingMs));
    }

    setIsTyping(false);
    setIsLoading(false);

    addBotMessage(res.text, res.chips, res.navTarget, res.summary);
    if (onComplete) onComplete();
  };

  // Reset Flow
  const resetFlow = () => {
    setActiveFlow(null);
    setFlowRole(null);
    setFlowStep(0);
    setFlowData({});
  };

  // Action Chip Click Dispatcher with Mandatory Typing
  const handleChipClick = (chip: QuickChip) => {
    if (isTyping || isLoading) return;

    addUserMessage(chip.label);

    queueBotResponse(() => {
      if (chip.actionKey === "EXPLORE_EVENTS") {
        return {
          text: "LifeStyle 2026 is our upcoming international fashion & lifestyle experience in Dubai. Registrations & sponsorships are open.",
          chips: [
            { id: "nav-upcoming", label: "View upcoming page ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
            { id: "nav-gallery", label: "Visual Archive / Gallery ↗", actionKey: "NAVIGATE", payload: "/gallery" },
            { id: "flow-reg", label: "Register / enquire", actionKey: "START_REGISTRATION" },
          ],
        };
      } else if (chip.actionKey === "JOIN_NETWORK") {
        return {
          text: "Which role would you like to participate as?",
          chips: [
            { id: "r-designer", label: "Designer", actionKey: "START_ROLE_APP", payload: "fashion_designer" },
            { id: "r-model", label: "Model", actionKey: "START_ROLE_APP", payload: "model" },
            { id: "r-makeup", label: "Makeup Artist", actionKey: "START_ROLE_APP", payload: "makeup_artist" },
            { id: "r-stylist", label: "Stylist", actionKey: "START_ROLE_APP", payload: "fashion_stylist" },
            { id: "r-creator", label: "Creator", actionKey: "START_ROLE_APP", payload: "influencer_creator" },
            { id: "r-celeb", label: "Celebrity", actionKey: "START_ROLE_APP", payload: "celebrity_public_figure" },
          ],
        };
      } else if (chip.actionKey === "APPLY_NOMINATE") {
        return {
          text: "Applications and nominations are open for creative talent and industry visionaries. What would you like to submit?",
          chips: [
            { id: "app-creative", label: "Join the network", actionKey: "JOIN_NETWORK" },
            { id: "app-nominate", label: "Submit nomination", actionKey: "START_ROLE_APP", payload: "nomination" },
          ],
        };
      } else if (chip.actionKey === "START_ROLE_APP") {
        const role = chip.payload || "fashion_designer";
        const readableRole = role.replace(/_/g, " ");
        setActiveFlow("CREATIVE");
        setFlowRole(role);
        setFlowStep(1);
        setFlowData({});
        return {
          text: `Awesome. Let's get a few details to start your ${readableRole} application. What is your full name?`,
        };
      } else if (chip.actionKey === "START_SPONSORSHIP") {
        setActiveFlow("SPONSORSHIP");
        setFlowStep(1);
        setFlowData({});
        return {
          text: "We welcome brand & luxury sponsors for LifeStyle 2026. What is your full name?",
        };
      } else if (chip.actionKey === "START_REGISTRATION") {
        setActiveFlow("REGISTRATION");
        setFlowStep(1);
        setFlowData({});
        return {
          text: "We'd love to assist you. What is your full name?",
        };
      } else if (chip.actionKey === "START_CONTACT" || chip.actionKey === "CONTACT_TEAM") {
        setActiveFlow("CONTACT");
        setFlowStep(1);
        setFlowData({});
        return {
          text: "How can we help you today? What is your full name?",
        };
      } else if (chip.actionKey === "NAVIGATE" && chip.payload) {
        router.push(chip.payload);
        return {
          text: `Navigating to ${chip.payload}...`,
        };
      }
      return { text: "How else can I help?" };
    });
  };

  // Submit Talent Application API
  const submitTalentApplication = async (data: Record<string, string>, role: string) => {
    queueBotResponse(async () => {
      try {
        const res = await fetch("/api/talent-application", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            applicationType: role,
            fullName: data.fullName,
            email: data.email,
            whatsapp: data.whatsapp,
            cityCountry: data.cityCountry,
            portfolioUrl: data.portfolioUrl,
            notes: `${data.detail1 || ""} ${data.detail2 || ""}`.trim(),
          }),
        });

        const resData = await res.json();
        if (res.ok && resData.success) {
          return {
            text: `Your application has been received successfully! Our team will review your profile and reach out to ${data.email}.`,
            chips: [
              { id: "done-upcoming", label: "Explore events ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
              { id: "done-gallery", label: "View gallery ↗", actionKey: "NAVIGATE", payload: "/gallery" },
            ],
          };
        } else {
          return {
            text: resData.error || "Something went wrong submitting your application. Please try again.",
            chips: [{ id: "retry-contact", label: "Contact team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
          };
        }
      } catch {
        return {
          text: "Network error occurred. Please try again.",
          chips: [{ id: "err-contact", label: "Contact team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
        };
      } finally {
        resetFlow();
      }
    });
  };

  // Submit Contact / Sponsorship Form API
  const submitContactForm = async (data: Record<string, string>, type: string) => {
    queueBotResponse(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.fullName,
            email: data.email,
            phone: data.whatsapp,
            city: data.cityCountry || data.city,
            organization: data.company || "",
            enquiryType: type,
            eventInterest: config?.events?.[0]?.title || "LifeStyle 2026",
            message: data.sponsorType ? `[${data.sponsorType}] ${data.message || ""}` : data.message || "General Enquiry",
          }),
        });

        const resData = await res.json();
        if (res.ok && resData.success) {
          return {
            text: `Thank you, ${data.fullName}! Your request has been submitted successfully to FashAI Universal. We will contact you at ${data.email}.`,
            chips: [
              { id: "done-events", label: "Explore events ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
              { id: "done-home", label: "Back to home ↗", actionKey: "NAVIGATE", payload: "/" },
            ],
          };
        } else {
          return {
            text: resData.error || "Something went wrong. Please try again.",
            chips: [{ id: "err-fallback", label: "Contact team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
          };
        }
      } catch {
        return {
          text: "Network error occurred. Please try again.",
          chips: [{ id: "err-contact-fall", label: "Contact team ↗", actionKey: "NAVIGATE", payload: "/contact" }],
        };
      } finally {
        resetFlow();
      }
    });
  };

  // Process Typed User Input with Mandatory Typing
  const handleSendInput = () => {
    const text = inputValue.trim();
    if (!text || isTyping || isLoading) return;

    setInputValue("");
    addUserMessage(text);

    queueBotResponse(async () => {
      // 1. Multi-Step Active Flow Input
      if (activeFlow === "CREATIVE" && flowRole) {
        return handleCreativeFlowInput(text);
      }
      if (activeFlow === "SPONSORSHIP") {
        return handleSponsorshipFlowInput(text);
      }
      if (activeFlow === "REGISTRATION" || activeFlow === "CONTACT") {
        return handleContactFlowInput(text);
      }

      // 2. Knowledge Base Query with live siteConfig
      const response: ConciergeKnowledgeResponse = queryKnowledgeBase(text, config);

      if (response.startFlow === "CREATIVE" && response.detectedRole) {
        setActiveFlow("CREATIVE");
        setFlowRole(response.detectedRole);
        setFlowStep(1);
        setFlowData({});
      } else if (response.startFlow === "SPONSORSHIP") {
        setActiveFlow("SPONSORSHIP");
        setFlowStep(1);
        setFlowData({});
      }

      return {
        text: response.message,
        chips: response.quickChips,
        navTarget: response.navigationTarget,
      };
    });
  };

  // Creative Multi-Step Engine Response Formatter
  const handleCreativeFlowInput = (input: string) => {
    const nextData = { ...flowData };

    if (flowStep === 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      return { text: `Thanks, ${input}! What is the best email address to reach you?` };
    } else if (flowStep === 2) {
      if (!isValidEmail(input)) {
        return { text: "Please enter a valid email address (e.g. name@example.com)." };
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(3);
      return { text: "What is your WhatsApp or phone number?" };
    } else if (flowStep === 3) {
      nextData.whatsapp = input;
      setFlowData(nextData);
      setFlowStep(4);
      return { text: "Which city and country are you based in?" };
    } else if (flowStep === 4) {
      nextData.cityCountry = input;
      setFlowData(nextData);
      setFlowStep(5);

      if (flowRole === "model") {
        return { text: "What is your age and height (in cm)?" };
      } else if (flowRole === "fashion_designer") {
        return { text: "What is your brand or label name?" };
      } else if (flowRole === "makeup_artist" || flowRole === "fashion_stylist") {
        return { text: "How many years of fashion/editorial experience do you have?" };
      } else if (flowRole === "influencer_creator") {
        return { text: "What is your primary social platform & handle?" };
      } else {
        return { text: "What is your primary profession or field?" };
      }
    } else if (flowStep === 5) {
      nextData.detail1 = input;
      setFlowData(nextData);
      setFlowStep(6);
      return { text: "What is your Instagram or portfolio website link?" };
    } else if (flowStep === 6) {
      nextData.portfolioUrl = input;
      setFlowData(nextData);
      setFlowStep(7);

      const roleTitle = flowRole?.replace(/_/g, " ").toUpperCase() || "APPLICATION";
      return {
        text: `Thank you, ${nextData.fullName}! Review your summary below:`,
        chips: [
          { id: "sub-app", label: "Submit application ✓", actionKey: "CUSTOM_SUBMIT_APP" },
          { id: "reset-app", label: "Start over", actionKey: "CUSTOM_RESET" },
        ],
        summary: {
          title: `${roleTitle} SUMMARY`,
          details: [
            { label: "Name", value: nextData.fullName },
            { label: "Email", value: nextData.email },
            { label: "Phone", value: nextData.whatsapp },
            { label: "Location", value: nextData.cityCountry },
            { label: "Link", value: nextData.portfolioUrl },
          ],
          onConfirm: () => submitTalentApplication(nextData, flowRole!),
        },
      };
    }
    return { text: "How else can I help?" };
  };

  // Sponsorship Multi-Step Engine Response Formatter
  const handleSponsorshipFlowInput = (input: string) => {
    const nextData = { ...flowData };

    if (flowStep === 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      return { text: `Thanks, ${input}! What is your company or brand name?` };
    } else if (flowStep === 2) {
      nextData.company = input;
      setFlowData(nextData);
      setFlowStep(3);
      return { text: "What is your official business email address?" };
    } else if (flowStep === 3) {
      if (!isValidEmail(input)) {
        return { text: "Please enter a valid email address." };
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(4);
      return { text: "What is your contact phone / WhatsApp number?" };
    } else if (flowStep === 4) {
      nextData.whatsapp = input;
      setFlowData(nextData);
      setFlowStep(5);
      return { text: "What type of sponsorship or partnership are you interested in?" };
    } else if (flowStep === 5) {
      nextData.sponsorType = input;
      setFlowData(nextData);
      setFlowStep(6);

      return {
        text: `Thank you, ${nextData.fullName}! Review your request:`,
        chips: [
          { id: "sub-sp", label: "Submit enquiry ✓", actionKey: "CUSTOM_SUBMIT_SP" },
          { id: "reset-sp", label: "Start over", actionKey: "CUSTOM_RESET" },
        ],
        summary: {
          title: "SPONSORSHIP SUMMARY",
          details: [
            { label: "Name", value: nextData.fullName },
            { label: "Company", value: nextData.company },
            { label: "Email", value: nextData.email },
            { label: "Phone", value: nextData.whatsapp },
            { label: "Type", value: nextData.sponsorType },
          ],
          onConfirm: () => submitContactForm(nextData, "Sponsorship"),
        },
      };
    }
    return { text: "How else can I help?" };
  };

  // Contact Multi-Step Engine Response Formatter
  const handleContactFlowInput = (input: string) => {
    const nextData = { ...flowData };

    if (flowStep === 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      return { text: `Thanks, ${input}! What is your email address?` };
    } else if (flowStep === 2) {
      if (!isValidEmail(input)) {
        return { text: "Please enter a valid email address." };
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(3);
      return { text: "What is your WhatsApp or phone number?" };
    } else if (flowStep === 3) {
      nextData.whatsapp = input;
      setFlowData(nextData);
      setFlowStep(4);
      return { text: "How can we help you today? Please describe your enquiry." };
    } else if (flowStep === 4) {
      nextData.message = input;
      setFlowData(nextData);
      setFlowStep(5);

      return {
        text: `Thank you, ${nextData.fullName}! Ready to submit your message?`,
        chips: [
          { id: "sub-ct", label: "Submit message ✓", actionKey: "CUSTOM_SUBMIT_CT" },
          { id: "reset-ct", label: "Start over", actionKey: "CUSTOM_RESET" },
        ],
        summary: {
          title: "ENQUIRY SUMMARY",
          details: [
            { label: "Name", value: nextData.fullName },
            { label: "Email", value: nextData.email },
            { label: "Phone", value: nextData.whatsapp },
          ],
          onConfirm: () => submitContactForm(nextData, activeFlow === "REGISTRATION" ? "Registration" : "General Contact"),
        },
      };
    }
    return { text: "How else can I help?" };
  };

  // Handle Custom Review Confirm Actions
  const dispatchCustomChipAction = (actionKey: string) => {
    if (isTyping || isLoading) return;

    if (actionKey === "CUSTOM_SUBMIT_APP") {
      submitTalentApplication(flowData, flowRole!);
    } else if (actionKey === "CUSTOM_SUBMIT_SP") {
      submitContactForm(flowData, "Sponsorship");
    } else if (actionKey === "CUSTOM_SUBMIT_CT") {
      submitContactForm(flowData, activeFlow === "REGISTRATION" ? "Registration" : "General Contact");
    } else if (actionKey === "CUSTOM_RESET") {
      addUserMessage("Start over");
      queueBotResponse(() => {
        resetFlow();
        return { text: "Enquiry reset. How can I help?" };
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[240] pointer-events-none flex items-end justify-end p-0 sm:p-6">
        {/* Mobile Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden pointer-events-auto z-[241]"
        />

        {/* Minimal Chatbot Panel Header [ FashAI Concierge × ] */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="relative z-[242] pointer-events-auto w-[calc(100vw-1.5rem)] sm:w-[380px] h-[80vh] sm:h-[520px] max-h-[560px] max-w-[400px] bg-white dark:bg-[#111111] border border-black/10 dark:border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden rounded-2xl text-[#111111] dark:text-white"
          role="dialog"
          aria-label="FashAI Concierge"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#111111] flex-shrink-0">
            <span className="font-serif-display text-sm font-semibold text-[#111111] dark:text-white uppercase tracking-wider">
              FashAI Concierge
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#111111]/70 dark:text-white/70 hover:text-[#F15E1C] dark:hover:text-[#FAB60A] transition-colors"
              aria-label="Close Concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 bg-white dark:bg-[#111111]">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[88%] px-3.5 py-2.5 text-xs leading-relaxed font-sans ${
                    msg.sender === "user"
                      ? "bg-[#F15E1C] text-white rounded-2xl rounded-tr-xs font-medium"
                      : "bg-[#F7D7B0]/25 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#111111] dark:text-white rounded-2xl rounded-tl-xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Review Summary Card */}
                  {msg.reviewSummary && (
                    <div className="mt-2 p-2.5 bg-white/80 dark:bg-black/50 border border-[#F15E1C]/40 dark:border-[#FAB60A]/40 rounded-xl space-y-1 text-[11px]">
                      <span className="font-syne font-bold uppercase text-[#F15E1C] dark:text-[#FAB60A] block">
                        {msg.reviewSummary.title}
                      </span>
                      {msg.reviewSummary.details.map((d, i) => (
                        <div key={i} className="flex justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-0.5">
                          <span className="text-[#111111]/70 dark:text-white/70">{d.label}:</span>
                          <span className="font-medium text-[#111111] dark:text-white truncate max-w-[150px]">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Navigation Target Button */}
                  {msg.navigationTarget && (
                    <button
                      onClick={() => router.push(msg.navigationTarget!)}
                      className="mt-2 inline-flex items-center gap-1 text-[10px] font-syne font-bold text-[#F15E1C] dark:text-[#FAB60A] hover:underline uppercase pt-1 border-t border-black/10 dark:border-white/10 w-full"
                    >
                      <span>GO TO {msg.navigationTarget}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Timestamp */}
                <span className={`text-[8px] font-syne mt-1 px-1 ${
                  msg.sender === "user" ? "text-white/70 text-right" : "text-[#111111]/50 dark:text-white/40"
                }`}>
                  {msg.timestamp}
                </span>

                {/* Dynamic Quick Phrases Chips */}
                {msg.quickChips && msg.quickChips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.quickChips.slice(0, 4).map((chip) => (
                      <button
                        key={chip.id}
                        disabled={isTyping || isLoading}
                        onClick={() => {
                          if (chip.actionKey.startsWith("CUSTOM_")) {
                            dispatchCustomChipAction(chip.actionKey);
                          } else {
                            handleChipClick(chip);
                          }
                        }}
                        className="px-3 py-1.5 rounded-full text-[11px] font-syne font-medium transition-colors border bg-white text-[#111111] border-black/15 hover:border-[#F15E1C] hover:bg-[#F7D7B0]/30 hover:text-[#F15E1C] dark:bg-[#1A1A1A] dark:text-white dark:border-white/15 dark:hover:border-[#FAB60A] dark:hover:bg-white/10 dark:hover:text-[#FAB60A] disabled:opacity-40"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* MANDATORY 3-DOT TYPING ANIMATION BUBBLE */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col items-start"
                role="status"
                aria-live="polite"
                aria-label="FashAI Concierge is typing"
              >
                <div className="bg-[#F7D7B0]/25 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#111111] dark:text-white px-3.5 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-sm">
                  <span className="sr-only">FashAI Concierge is typing...</span>
                  <span className="hidden motion-reduce:inline text-xs font-syne opacity-70">typing...</span>
                  <div className="flex items-center gap-1 motion-reduce:hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-white animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-white animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-white animate-bounce" />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Minimal Input Footer */}
          <div className="p-3 bg-white dark:bg-[#111111] border-t border-black/10 dark:border-white/10 flex-shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendInput();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping || isLoading}
                placeholder={isTyping ? "Concierge is formulating response..." : "Type a message..."}
                className="flex-1 px-3.5 py-2 rounded-full text-xs transition-colors focus:outline-none bg-white dark:bg-[#1A1A1A] border border-black/15 dark:border-white/20 text-[#111111] dark:text-white placeholder:text-[#111111]/45 dark:placeholder:text-white/40 focus:border-[#F15E1C] dark:focus:border-[#FAB60A] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isTyping || isLoading || !inputValue.trim()}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-[#F15E1C] text-white hover:bg-[#FAB60A] hover:text-[#111111] dark:bg-[#FAB60A] dark:text-[#111111] dark:hover:bg-[#FFEC69] disabled:opacity-40 shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
