"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowUpRight, RefreshCw, CheckCircle2 } from "lucide-react";

interface QuickChip {
  id: string;
  label: string;
  action: () => void;
}

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
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Guided Multi-Step Flow State
  const [activeFlow, setActiveFlow] = useState<"CREATIVE" | "SPONSORSHIP" | "REGISTRATION" | "CONTACT" | null>(null);
  const [flowRole, setFlowRole] = useState<string | null>(null);
  const [flowStep, setFlowStep] = useState<number>(0);
  const [flowData, setFlowData] = useState<Record<string, string>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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

  // Initialize Greeting on Open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages([
        {
          id: "msg-1",
          sender: "bot",
          text: "Hi, welcome to FashAI Universal.",
          timestamp: now,
        },
        {
          id: "msg-2",
          sender: "bot",
          text: "How can we help you today?",
          timestamp: now,
          quickChips: [
            { id: "opt-events", label: "• Explore Events", action: () => handleSelectOption("EXPLORE_EVENTS") },
            { id: "opt-creative", label: "• Join the Creative Network", action: () => handleSelectOption("JOIN_CREATIVE") },
            { id: "opt-enquire", label: "• Register / Enquire", action: () => handleSelectOption("REGISTER_ENQUIRE") },
            { id: "opt-sponsor", label: "• Sponsorship", action: () => handleSelectOption("SPONSORSHIP") },
            { id: "opt-contact", label: "• Contact the Team", action: () => handleSelectOption("CONTACT_TEAM") },
          ],
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Add Bot Message Helper
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

  // Add User Message Helper
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

  // Reset Conversational Flow
  const resetFlow = () => {
    setActiveFlow(null);
    setFlowRole(null);
    setFlowStep(0);
    setFlowData({});
  };

  // 1. Initial Option Handler
  const handleSelectOption = (optionKey: string) => {
    if (optionKey === "EXPLORE_EVENTS") {
      addUserMessage("Explore Events");
      addBotMessage(
        "LifeStyle 2026 is our upcoming international fashion & lifestyle experience in Dubai. Registrations & sponsorships are open.",
        [
          { id: "nav-upcoming", label: "View Upcoming Events ↗", action: () => handleNavigate("/upcoming") },
          { id: "nav-gallery", label: "Visual Archive / Gallery ↗", action: () => handleNavigate("/gallery") },
          { id: "flow-reg", label: "Register / Enquire", action: () => handleSelectOption("REGISTER_ENQUIRE") },
        ]
      );
    } else if (optionKey === "JOIN_CREATIVE") {
      addUserMessage("Join the Creative Network");
      setActiveFlow("CREATIVE");
      setFlowStep(0);
      setFlowData({});
      addBotMessage("Great. What would you like to join as?", [
        { id: "role-designer", label: "Fashion Designer", action: () => handleSelectRole("fashion_designer", "Fashion Designer") },
        { id: "role-model", label: "Model", action: () => handleSelectRole("model", "Model") },
        { id: "role-makeup", label: "Makeup Artist", action: () => handleSelectRole("makeup_artist", "Makeup Artist") },
        { id: "role-stylist", label: "Fashion Stylist", action: () => handleSelectRole("fashion_stylist", "Fashion Stylist") },
        { id: "role-creator", label: "Influencer / Creator", action: () => handleSelectRole("influencer_creator", "Influencer / Creator") },
        { id: "role-celeb", label: "Celebrity / Public Figure", action: () => handleSelectRole("celebrity_public_figure", "Celebrity / Public Figure") },
      ]);
    } else if (optionKey === "SPONSORSHIP") {
      addUserMessage("Sponsorship");
      setActiveFlow("SPONSORSHIP");
      setFlowStep(1);
      setFlowData({});
      addBotMessage("We welcome brand & luxury sponsors for LifeStyle 2026. What is your full name?");
    } else if (optionKey === "REGISTER_ENQUIRE") {
      addUserMessage("Register / Enquire");
      setActiveFlow("REGISTRATION");
      setFlowStep(1);
      setFlowData({});
      addBotMessage("We'd love to assist you. What is your full name?");
    } else if (optionKey === "CONTACT_TEAM") {
      addUserMessage("Contact the Team");
      setActiveFlow("CONTACT");
      setFlowStep(1);
      setFlowData({});
      addBotMessage("How can we help you today? What is your full name?");
    }
  };

  // 2. Creative Role Selection Handler
  const handleSelectRole = (roleKey: string, roleLabel: string) => {
    addUserMessage(roleLabel);
    setFlowRole(roleKey);
    setFlowStep(1);
    addBotMessage(`Awesome. Let's get a few details to start your ${roleLabel} application. What is your full name?`);
  };

  // Navigation Helper
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  // Submit Application Payload
  const submitTalentApplication = async (data: Record<string, string>, role: string) => {
    setIsLoading(true);
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
          portfolioUrl: data.portfolioUrl || data.instagramUrl,
          brandName: data.brandName,
          age: data.age,
          gender: data.gender,
          heightCm: data.heightCm,
          measurements: data.measurements,
          experience: data.experience,
          specializations: data.specializations,
          socialHandle: data.socialHandle,
          followerCount: data.followerCount,
          profession: data.profession,
          notes: `${data.detail1 || ""} ${data.detail2 || ""}`.trim(),
        }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        addBotMessage(
          `Your application has been received successfully! Our talent team will review your profile and contact you at ${data.email}.`,
          [
            { id: "done-events", label: "Explore Events ↗", action: () => handleNavigate("/upcoming") },
            { id: "done-gallery", label: "Visual Archive ↗", action: () => handleNavigate("/gallery") },
          ]
        );
      } else {
        addBotMessage(resData.error || "Something went wrong submitting your application. Please try again.", [
          { id: "retry-contact", label: "Contact Support ↗", action: () => handleNavigate("/contact") },
        ]);
      }
    } catch {
      addBotMessage("Network error occurred. Please check your connection and try again.", [
        { id: "err-contact", label: "Contact Us ↗", action: () => handleNavigate("/contact") },
      ]);
    } finally {
      setIsLoading(false);
      resetFlow();
    }
  };

  // Submit Contact / Sponsorship Payload
  const submitContactForm = async (data: Record<string, string>, type: string) => {
    setIsLoading(true);
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
          eventInterest: "LifeStyle 2026",
          message: data.sponsorType ? `[${data.sponsorType}] ${data.message || ""}` : data.message || "General Enquiry",
        }),
      });

      const resData = await res.json();
      if (res.ok && resData.success) {
        addBotMessage(
          `Thank you, ${data.fullName}! Your ${type.toLowerCase()} request has been submitted successfully to FashAI Universal. We will reach out to ${data.email} shortly.`,
          [
            { id: "done-events", label: "Explore Events ↗", action: () => handleNavigate("/upcoming") },
            { id: "done-home", label: "Back to Home ↗", action: () => handleNavigate("/") },
          ]
        );
      } else {
        addBotMessage(resData.error || "Something went wrong processing your request. Please try again.", [
          { id: "contact-fallback", label: "Contact Team ↗", action: () => handleNavigate("/contact") },
        ]);
      }
    } catch {
      addBotMessage("Something went wrong. Please try again.", [
        { id: "contact-fallback-err", label: "Contact Us ↗", action: () => handleNavigate("/contact") },
      ]);
    } finally {
      setIsLoading(false);
      resetFlow();
    }
  };

  // Handle Form Submission / User Answer Input
  const handleSendInput = (textOverride?: string) => {
    const text = (textOverride || inputValue).trim();
    if (!text || isLoading) return;

    if (!textOverride) setInputValue("");
    addUserMessage(text);

    // --- ACTIVE FLOW STEP MACHINE ---
    if (activeFlow === "CREATIVE" && flowRole) {
      handleCreativeFlowInput(text);
      return;
    }

    if (activeFlow === "SPONSORSHIP") {
      handleSponsorshipFlowInput(text);
      return;
    }

    if (activeFlow === "REGISTRATION" || activeFlow === "CONTACT") {
      handleContactFlowInput(text);
      return;
    }

    // --- FREEFORM NATURAL INTENT MATCHING ---
    handleFreeformInput(text);
  };

  // 3A. Creative Guided Questions Engine
  const handleCreativeFlowInput = (input: string) => {
    const nextData = { ...flowData };

    if (flowStep === 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      addBotMessage(`Thanks, ${input}! What is the best email address to reach you?`);
    } else if (flowStep === 2) {
      if (!isValidEmail(input)) {
        addBotMessage("Please enter a valid email address (e.g. name@example.com).");
        return;
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(3);
      addBotMessage("Got it! What is your WhatsApp or phone number?");
    } else if (flowStep === 3) {
      nextData.whatsapp = input;
      setFlowData(nextData);
      setFlowStep(4);
      addBotMessage("Which city and country are you based in?");
    } else if (flowStep === 4) {
      nextData.cityCountry = input;
      setFlowData(nextData);
      setFlowStep(5);

      if (flowRole === "model") {
        addBotMessage("What is your age and gender?");
      } else if (flowRole === "fashion_designer") {
        addBotMessage("What is your brand or label name?");
      } else if (flowRole === "makeup_artist" || flowRole === "fashion_stylist") {
        addBotMessage("How many years of experience do you have in fashion/editorial?");
      } else if (flowRole === "influencer_creator") {
        addBotMessage("What is your primary platform and social handle?");
      } else {
        addBotMessage("What is your primary profession or field?");
      }
    } else if (flowStep === 5) {
      nextData.detail1 = input;
      setFlowData(nextData);
      setFlowStep(6);

      if (flowRole === "model") {
        addBotMessage("What is your height (in cm) and modeling categories?");
      } else if (flowRole === "fashion_designer") {
        addBotMessage("What are your main design specializations (e.g., Couture, Eveningwear)?");
      } else if (flowRole === "makeup_artist" || flowRole === "fashion_stylist") {
        addBotMessage("What is your primary aesthetic or style expertise?");
      } else if (flowRole === "influencer_creator") {
        addBotMessage("What is your approximate follower count or audience reach?");
      } else {
        addBotMessage("Do you have a management contact or media kit link?");
      }
    } else if (flowStep === 6) {
      nextData.detail2 = input;
      setFlowData(nextData);
      setFlowStep(7);
      addBotMessage("What is your Instagram or portfolio website link?");
    } else if (flowStep === 7) {
      nextData.portfolioUrl = input;
      setFlowData(nextData);
      setFlowStep(8);

      const roleTitle = flowRole?.replace(/_/g, " ").toUpperCase() || "CREATIVE NETWORK";
      const summaryDetails = [
        { label: "Name", value: nextData.fullName },
        { label: "Email", value: nextData.email },
        { label: "WhatsApp", value: nextData.whatsapp },
        { label: "Location", value: nextData.cityCountry },
        { label: "Portfolio", value: nextData.portfolioUrl },
      ];

      addBotMessage(
        `Thank you, ${nextData.fullName}! Please review your application details below:`,
        [
          {
            id: "submit-app-chip",
            label: "Submit Application ✓",
            action: () => submitTalentApplication(nextData, flowRole!),
          },
          {
            id: "reset-app-chip",
            label: "Start Over",
            action: () => {
              resetFlow();
              addBotMessage("Application reset. How else can we help you today?");
            },
          },
        ],
        undefined,
        {
          title: `${roleTitle} APPLICATION`,
          details: summaryDetails,
          onConfirm: () => submitTalentApplication(nextData, flowRole!),
        }
      );
    }
  };

  // 3B. Sponsorship Guided Questions Engine
  const handleSponsorshipFlowInput = (input: string) => {
    const nextData = { ...flowData };

    if (flowStep === 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      addBotMessage(`Thanks, ${input}! What is your company or brand name?`);
    } else if (flowStep === 2) {
      nextData.company = input;
      setFlowData(nextData);
      setFlowStep(3);
      addBotMessage("What is your official business email address?");
    } else if (flowStep === 3) {
      if (!isValidEmail(input)) {
        addBotMessage("Please enter a valid email address.");
        return;
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(4);
      addBotMessage("What is your contact phone / WhatsApp number?");
    } else if (flowStep === 4) {
      nextData.whatsapp = input;
      setFlowData(nextData);
      setFlowStep(5);
      addBotMessage("What type of sponsorship or partnership are you interested in?", [
        { id: "sp-title", label: "Title Sponsor", action: () => handleSelectSponsorType("Title Sponsor", nextData) },
        { id: "sp-showcase", label: "Fashion Showcase", action: () => handleSelectSponsorType("Fashion Showcase", nextData) },
        { id: "sp-tech", label: "Tech / IT Partner", action: () => handleSelectSponsorType("Tech / IT Partner", nextData) },
        { id: "sp-media", label: "Media Partner", action: () => handleSelectSponsorType("Media Partner", nextData) },
        { id: "sp-gen", label: "General Sponsorship", action: () => handleSelectSponsorType("General Sponsorship", nextData) },
      ]);
    } else if (flowStep === 5 || flowStep === 6) {
      nextData.message = input;
      setFlowData(nextData);
      setFlowStep(7);

      addBotMessage(
        `Thank you, ${nextData.fullName}! Review your sponsorship request summary:`,
        [
          {
            id: "submit-sp-chip",
            label: "Submit Sponsorship Enquiry ✓",
            action: () => submitContactForm(nextData, "Sponsorship"),
          },
          {
            id: "reset-sp-chip",
            label: "Start Over",
            action: () => {
              resetFlow();
              addBotMessage("Enquiry reset. How else can we help?");
            },
          },
        ],
        undefined,
        {
          title: "SPONSORSHIP ENQUIRY",
          details: [
            { label: "Name", value: nextData.fullName },
            { label: "Company", value: nextData.company || "N/A" },
            { label: "Email", value: nextData.email },
            { label: "Phone", value: nextData.whatsapp },
            { label: "Type", value: nextData.sponsorType || "General" },
          ],
          onConfirm: () => submitContactForm(nextData, "Sponsorship"),
        }
      );
    }
  };

  const handleSelectSponsorType = (typeLabel: string, currentData: Record<string, string>) => {
    addUserMessage(typeLabel);
    const updated = { ...currentData, sponsorType: typeLabel };
    setFlowData(updated);
    setFlowStep(6);
    addBotMessage("Please share any specific requirement or brief message for our team.");
  };

  // 3C. Contact / Enquiry Guided Questions Engine
  const handleContactFlowInput = (input: string) => {
    const nextData = { ...flowData };

    if (flowStep === 1) {
      nextData.fullName = input;
      setFlowData(nextData);
      setFlowStep(2);
      addBotMessage(`Thanks, ${input}! What is your email address?`);
    } else if (flowStep === 2) {
      if (!isValidEmail(input)) {
        addBotMessage("Please enter a valid email address.");
        return;
      }
      nextData.email = input;
      setFlowData(nextData);
      setFlowStep(3);
      addBotMessage("What is your WhatsApp or phone number?");
    } else if (flowStep === 3) {
      nextData.whatsapp = input;
      setFlowData(nextData);
      setFlowStep(4);
      addBotMessage("Which city or country are you located in?");
    } else if (flowStep === 4) {
      nextData.cityCountry = input;
      setFlowData(nextData);
      setFlowStep(5);
      addBotMessage("How can we help you? Please describe your enquiry or requirement.");
    } else if (flowStep === 5) {
      nextData.message = input;
      setFlowData(nextData);
      setFlowStep(6);

      const enquiryTitle = activeFlow === "REGISTRATION" ? "REGISTRATION ENQUIRY" : "CONTACT ENQUIRY";

      addBotMessage(
        `Thank you, ${nextData.fullName}! Ready to submit your message?`,
        [
          {
            id: "submit-contact-chip",
            label: "Submit Enquiry ✓",
            action: () => submitContactForm(nextData, activeFlow === "REGISTRATION" ? "Registration" : "General Contact"),
          },
          {
            id: "reset-contact-chip",
            label: "Start Over",
            action: () => {
              resetFlow();
              addBotMessage("Enquiry reset. How else can we help?");
            },
          },
        ],
        undefined,
        {
          title: enquiryTitle,
          details: [
            { label: "Name", value: nextData.fullName },
            { label: "Email", value: nextData.email },
            { label: "Phone", value: nextData.whatsapp },
            { label: "Location", value: nextData.cityCountry },
          ],
          onConfirm: () => submitContactForm(nextData, activeFlow === "REGISTRATION" ? "Registration" : "General Contact"),
        }
      );
    }
  };

  // 3D. Natural Keyword Intent Router & Fallback
  const handleFreeformInput = async (queryText: string) => {
    const q = queryText.toLowerCase();

    // Greetings
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("good morning")) {
      addBotMessage("Hi! Welcome to FashAI Universal. How can we help you today?", [
        { id: "opt-events", label: "• Explore Events", action: () => handleSelectOption("EXPLORE_EVENTS") },
        { id: "opt-creative", label: "• Join the Creative Network", action: () => handleSelectOption("JOIN_CREATIVE") },
        { id: "opt-enquire", label: "• Register / Enquire", action: () => handleSelectOption("REGISTER_ENQUIRE") },
        { id: "opt-sponsor", label: "• Sponsorship", action: () => handleSelectOption("SPONSORSHIP") },
        { id: "opt-contact", label: "• Contact the Team", action: () => handleSelectOption("CONTACT_TEAM") },
      ]);
      return;
    }

    // Model specific
    if (q.includes("model")) {
      handleSelectOption("JOIN_CREATIVE");
      setTimeout(() => handleSelectRole("model", "Model"), 100);
      return;
    }

    // Designer specific
    if (q.includes("designer")) {
      handleSelectOption("JOIN_CREATIVE");
      setTimeout(() => handleSelectRole("fashion_designer", "Fashion Designer"), 100);
      return;
    }

    // General Application / Join
    if (q.includes("apply") || q.includes("join") || q.includes("audition")) {
      handleSelectOption("JOIN_CREATIVE");
      return;
    }

    // Sponsorship
    if (q.includes("sponsor") || q.includes("partnership")) {
      handleSelectOption("SPONSORSHIP");
      return;
    }

    // Contact
    if (q.includes("contact") || q.includes("reach") || q.includes("email")) {
      handleSelectOption("CONTACT_TEAM");
      return;
    }

    // Events / LifeStyle
    if (q.includes("event") || q.includes("upcoming") || q.includes("lifestyle") || q.includes("dubai")) {
      addBotMessage(
        "LifeStyle 2026 is FashAI Universal's upcoming international fashion and lifestyle experience in Dubai. Registrations and sponsorship enquiries are open.",
        [
          { id: "ev-upcoming", label: "Explore LifeStyle 2026 ↗", action: () => handleNavigate("/upcoming") },
          { id: "ev-reg", label: "Register / Enquire", action: () => handleSelectOption("REGISTER_ENQUIRE") },
          { id: "ev-sp", label: "Sponsorship", action: () => handleSelectOption("SPONSORSHIP") },
        ],
        "/upcoming"
      );
      return;
    }

    // Gallery
    if (q.includes("gallery") || q.includes("photo") || q.includes("picture") || q.includes("archive")) {
      addBotMessage(
        "The FashAI Universal Visual Archive showcases moments across Runway & Stage, Couture Details, People & Moments, and Experience.",
        [
          { id: "gal-nav", label: "View Gallery Archive ↗", action: () => handleNavigate("/gallery") },
          { id: "gal-events", label: "Explore Events ↗", action: () => handleNavigate("/upcoming") },
        ],
        "/gallery"
      );
      return;
    }

    // API Backend Fallback Query
    setIsLoading(true);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: queryText }),
      });
      const resData = await res.json();

      if (res.ok && resData.message) {
        addBotMessage(resData.message, [
          { id: "fallback-events", label: "Explore Events ↗", action: () => handleNavigate("/upcoming") },
          { id: "fallback-contact", label: "Contact Us ↗", action: () => handleNavigate("/contact") },
        ]);
      } else {
        addBotMessage("Something went wrong. Please try again.", [
          { id: "err-fallback-contact", label: "Contact Us ↗", action: () => handleNavigate("/contact") },
        ]);
      }
    } catch {
      addBotMessage("Something went wrong. Please try again.", [
        { id: "err-network-contact", label: "Contact Us ↗", action: () => handleNavigate("/contact") },
      ]);
    } finally {
      setIsLoading(false);
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
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm sm:hidden pointer-events-auto z-[241]"
        />

        {/* Chatbot Window Box */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="relative z-[242] pointer-events-auto w-[calc(100vw-1.5rem)] sm:w-[380px] h-[80vh] sm:h-[540px] max-h-[580px] max-w-[400px] bg-white dark:bg-[#111111] border border-black/10 dark:border-white/15 shadow-[0_16px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden rounded-2xl text-[#111111] dark:text-white"
          role="dialog"
          aria-label="FashAI Universal Concierge"
        >
          {/* 1. Header Bar */}
          <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#111111] flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 overflow-hidden bg-[#111111] border border-[#FAB60A]/60 rounded-full p-0.5">
                <Image
                  src="/assets/brand/logo_transparent.png"
                  alt="FashAI Logo"
                  fill
                  priority
                  sizes="32px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif-display text-xs sm:text-sm font-semibold text-[#111111] dark:text-white uppercase leading-none tracking-wider">
                  FashAI Universal
                </span>
                <span className="text-[10px] font-syne font-bold text-[#F15E1C] dark:text-[#FAB60A] uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
                  <span>Concierge</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2E936F]" />
                  <span className="text-[9px] text-[#111111]/60 dark:text-white/60 lowercase font-normal">online</span>
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#111111]/70 dark:text-white/70 hover:text-[#F15E1C] dark:hover:text-[#FAB60A] hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
              aria-label="Close Concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Messages Body */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-white dark:bg-[#111111]">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[86%] p-3 text-xs leading-relaxed font-sans ${
                    msg.sender === "user"
                      ? "bg-[#F15E1C] text-white rounded-2xl rounded-tr-sm font-medium shadow-sm"
                      : "bg-[#F7D7B0]/25 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#111111] dark:text-white rounded-2xl rounded-tl-sm shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Optional Review Summary Card */}
                  {msg.reviewSummary && (
                    <div className="mt-2.5 p-2.5 bg-white/70 dark:bg-black/40 border border-[#F15E1C]/40 dark:border-[#FAB60A]/40 rounded-xl space-y-1.5 text-[11px]">
                      <span className="font-syne font-bold uppercase text-[#F15E1C] dark:text-[#FAB60A] block tracking-wide">
                        {msg.reviewSummary.title}
                      </span>
                      {msg.reviewSummary.details.map((d, i) => (
                        <div key={i} className="flex justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-1">
                          <span className="font-medium text-[#111111]/70 dark:text-white/70">{d.label}:</span>
                          <span className="font-semibold text-[#111111] dark:text-white text-right truncate max-w-[160px]">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Navigation Link Indicator */}
                  {msg.navigationTarget && (
                    <button
                      onClick={() => handleNavigate(msg.navigationTarget!)}
                      className="mt-2 inline-flex items-center gap-1 text-[10px] font-syne font-bold text-[#F15E1C] dark:text-[#FAB60A] hover:underline uppercase pt-1 border-t border-black/10 dark:border-white/10 w-full"
                    >
                      <span>GO TO {msg.navigationTarget}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Timestamp */}
                <span className={`text-[9px] font-syne uppercase mt-1 px-1 ${
                  msg.sender === "user" ? "text-white/70 text-right" : "text-[#111111]/50 dark:text-white/40"
                }`}>
                  {msg.timestamp}
                </span>

                {/* Quick Action Chips */}
                {msg.quickChips && msg.quickChips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.quickChips.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={chip.action}
                        className="px-3 py-1.5 rounded-full text-[11px] font-syne font-semibold transition-all duration-200 border bg-white text-[#111111] border-black/15 hover:border-[#F15E1C] hover:bg-[#F7D7B0]/40 hover:text-[#F15E1C] dark:bg-[#1A1A1A] dark:text-white dark:border-white/15 dark:hover:border-[#FAB60A] dark:hover:bg-white/10 dark:hover:text-[#FAB60A]"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Loading Spinner Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-[#F15E1C] dark:text-[#FAB60A] text-xs p-2 font-syne">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span className="tracking-wide uppercase text-[10px] font-semibold">Processing request...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. Input Footer Bar */}
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
                placeholder="Type a message..."
                className="flex-1 px-3.5 py-2.5 rounded-full text-xs transition-colors duration-200 focus:outline-none focus:ring-0 bg-white dark:bg-[#1A1A1A] border border-black/15 dark:border-white/20 text-[#111111] dark:text-white placeholder:text-[#111111]/45 dark:placeholder:text-white/40 focus:border-[#F15E1C] dark:focus:border-[#FAB60A]"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 bg-[#F15E1C] text-white hover:bg-[#FAB60A] hover:text-[#111111] dark:bg-[#FAB60A] dark:text-[#111111] dark:hover:bg-[#FFEC69] disabled:opacity-40 shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
