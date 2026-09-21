"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle, MessageSquare, ExternalLink } from "lucide-react";

function ContactContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams?.get("type") || "Registration";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: initialType,
    message: "",
  });

  useEffect(() => {
    if (searchParams?.get("type")) {
      setFormData((prev) => ({ ...prev, subject: searchParams.get("type")! }));
    }
  }, [searchParams]);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Registration",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const aravWebsiteUrl = "https://aravinnovations.com/";

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-brand-void border-b border-hairline-orange overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-brand-orange/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange font-bold uppercase mb-3">
            <span className="h-px w-8 bg-brand-orange" />
            <span>CONTACT &amp; ENQUIRIES</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase mb-4">
            LET&apos;S CREATE THE <span className="italic text-brand-orange font-normal">NEXT CHAPTER.</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-brand-platinum/90 font-light leading-relaxed">
            For registrations, sponsorships, partnerships, press and general enquiries, connect with the FashAI Universal team.
          </p>
        </div>

        {/* Split Layout: Contact Info Left, Enquiry Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-brand-charcoal/80 border border-brand-orange/30 p-8 sm:p-10 space-y-8"
          >
            {/* Announcement Box */}
            <div className="border-l-2 border-brand-orange pl-4 bg-brand-orange/10 p-4 border border-brand-orange/20">
              <span className="font-syne text-xs tracking-caps text-brand-orange font-bold uppercase block mb-1">
                REGISTRATIONS &amp; SPONSORSHIPS
              </span>
              <span className="font-sans text-xs text-brand-white font-medium">
                Open for LifeStyle 2026 • Dubai
              </span>
            </div>

            {/* Supporting Entity: ARAV INNOVATION WEBSITE */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="mb-2">
                <Image
                  src="/assets/brand/PoweredByAravInnovation.jpeg"
                  alt="Powered by Arav Innovation"
                  width={240}
                  height={63}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <p className="font-sans text-xs text-brand-platinum/80 leading-relaxed">
                Official digital innovation entity supporting FashAI Universal initiatives.
              </p>
              <div>
                <a
                  href={aravWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-brand-orange/40 bg-brand-void px-5 py-3 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-orange hover:border-brand-orange transition-all group shadow-md"
                >
                  <span>VISIT ARAV INNOVATION</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-syne tracking-caps text-brand-platinum/70 uppercase">
                <MessageSquare className="w-4 h-4 text-brand-green" />
                <span>WHATSAPP DIRECT ENQUIRIES</span>
              </div>
              <a
                href="https://wa.me/919891276713"
                target="_blank"
                rel="noopener noreferrer"
                className="font-syne text-lg sm:text-xl text-brand-white font-bold hover:text-brand-green transition-colors block"
              >
                +91 9891276713
              </a>
              <div>
                <a
                  href="https://wa.me/919891276713"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/40 px-4 py-2 text-xs font-syne tracking-caps font-bold text-brand-green hover:bg-brand-green hover:text-black transition-all mt-1"
                >
                  <span>CHAT ON WHATSAPP</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Professional Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-brand-charcoal/80 border border-brand-orange/30 p-8 sm:p-10"
          >
            <h3 className="font-syne text-lg tracking-caps font-bold text-brand-white uppercase mb-6 border-b border-white/10 pb-4">
              SUBMIT AN ENQUIRY
            </h3>

            {status === "success" ? (
              <div className="bg-brand-green/10 border border-brand-green/40 p-8 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-brand-green mx-auto" />
                <h4 className="font-syne text-xl text-brand-white font-bold uppercase">
                  Enquiry Received
                </h4>
                <p className="font-sans text-sm text-brand-platinum">
                  Thank you for reaching out to FashAI Universal. Powered by Arav Innovation. Our team will review your message promptly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-brand-green text-black px-6 py-2.5 text-xs font-syne tracking-caps font-bold uppercase hover:bg-brand-green/80 transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                  <div className="bg-red-500/10 border border-red-500/40 p-4 text-xs font-sans text-red-200 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-brand-orange focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-brand-orange focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone / WhatsApp */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-xs font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      PHONE / WHATSAPP
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-brand-orange focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Enquiry Type Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-xs font-syne tracking-caps text-brand-platinum uppercase font-bold">
                      ENQUIRY TYPE *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white focus:border-brand-orange focus:outline-none transition-colors"
                    >
                      <option value="Registration">Registration</option>
                      <option value="Sponsorship">Sponsorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Press / Media">Press / Media</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-syne tracking-caps text-brand-platinum uppercase font-bold">
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your interest or enquiry..."
                    className="w-full bg-brand-void border border-white/20 px-4 py-3 text-sm text-brand-white placeholder-brand-platinum/40 focus:border-brand-orange focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-brand-orange py-4 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SENDING ENQUIRY...</span>
                    </>
                  ) : (
                    <span>SEND ENQUIRY ↗</span>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ContactSection() {
  return (
    <Suspense fallback={<div className="py-24 bg-brand-void text-center text-brand-platinum">Loading Contact Form...</div>}>
      <ContactContent />
    </Suspense>
  );
}
