"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "General Enquiry",
    message: "",
  });

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
          inquiryType: "General Enquiry",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <section
      id="accreditation"
      className="py-24 sm:py-32 px-6 sm:px-12 bg-brand-atelier border-b border-hairline overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Section Details */}
          <div className="lg:col-span-5">
            <span className="text-xs font-syne tracking-micro text-brand-orange block mb-3">
              05 / ACCREDITATION & CONTACT
            </span>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-off-white leading-tight mb-6">
              JOIN THE <span className="italic text-brand-gold">ATELIER</span>
            </h2>
            <p className="font-sans text-base text-brand-platinum font-light leading-relaxed mb-8">
              Fashprism Internationals invites couture designers, press correspondents, patrons, and strategic partners to request official accreditation for upcoming runway presentations and lifestyle symposiums.
            </p>

            <div className="space-y-6 border-t border-hairline pt-6 text-xs font-syne tracking-caps">
              <div>
                <div className="text-brand-platinum mb-1">GLOBAL PRESENCE</div>
                <div className="text-brand-off-white font-bold">PARIS — DUBAI</div>
              </div>
              <div>
                <div className="text-brand-platinum mb-1">INQUIRY RESPONSE</div>
                <div className="text-brand-orange font-bold">DIRECT ATELIER DESK</div>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Bottom-Border Form */}
          <div className="lg:col-span-7 bg-brand-charcoal p-8 sm:p-12 border border-hairline relative">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center flex flex-col items-center"
              >
                <CheckCircle className="h-16 w-16 text-brand-orange mb-6" />
                <h3 className="font-serif-display text-3xl text-brand-off-white mb-3">
                  ACCREDITATION REQUEST RECEIVED
                </h3>
                <p className="font-sans text-sm text-brand-platinum max-w-md font-light leading-relaxed mb-8">
                  Thank you for contacting Fashprism Internationals. Our delegate desk will review your submission promptly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-brand-orange px-8 py-3 text-xs font-syne tracking-caps text-brand-void font-bold hover:bg-brand-gold transition-colors"
                >
                  SUBMIT ANOTHER INQUIRY ↗
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {status === "error" && (
                  <div className="flex items-center gap-3 border border-red-500/50 bg-red-500/10 p-4 text-xs font-syne text-red-400">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name Input */}
                <div className="relative">
                  <label className="block text-[10px] font-syne tracking-micro text-brand-gold mb-2">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-transparent border-b border-hairline py-3 text-sm text-brand-off-white placeholder:text-brand-platinum/50 focus:border-brand-orange focus:outline-none transition-colors"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label className="block text-[10px] font-syne tracking-micro text-brand-gold mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@organization.com"
                    className="w-full bg-transparent border-b border-hairline py-3 text-sm text-brand-off-white placeholder:text-brand-platinum/50 focus:border-brand-orange focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone / WhatsApp Input */}
                <div className="relative">
                  <label className="block text-[10px] font-syne tracking-micro text-brand-gold mb-2">
                    PHONE / WHATSAPP (OPTIONAL)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-transparent border-b border-hairline py-3 text-sm text-brand-off-white placeholder:text-brand-platinum/50 focus:border-brand-orange focus:outline-none transition-colors"
                  />
                </div>

                {/* Inquiry Type Selector */}
                <div className="relative">
                  <label className="block text-[10px] font-syne tracking-micro text-brand-gold mb-2">
                    INQUIRY CATEGORY *
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full bg-brand-void border-b border-hairline py-3 text-sm text-brand-off-white focus:border-brand-orange focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Fashprism Lifestyle 2026">Fashprism Lifestyle 2026</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Sponsorship">Sponsorship</option>
                    <option value="Designer / Talent">Designer / Talent</option>
                    <option value="Media / Press">Media / Press</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <label className="block text-[10px] font-syne tracking-micro text-brand-gold mb-2">
                    MESSAGE / INQUIRY DETAILS *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details regarding your accreditation or partnership inquiry..."
                    className="w-full bg-transparent border-b border-hairline py-3 text-sm text-brand-off-white placeholder:text-brand-platinum/50 focus:border-brand-orange focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-brand-orange py-4 text-xs font-syne tracking-caps font-bold text-brand-void hover:bg-brand-gold transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                    data-cursor="explore"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>PROCESSING ACCREDITATION...</span>
                      </>
                    ) : (
                      <span>SUBMIT ACCREDITATION INQUIRY ↗</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
