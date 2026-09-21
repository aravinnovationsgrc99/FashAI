"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "General Enquiry",
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
          interest: "General Enquiry",
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Left Column: Context Info */}
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-gold mb-3">
          <span className="h-px w-6 bg-brand-gold" />
          <span>DIRECT ATELIER ENQUIRIES</span>
        </div>
        <h2 className="font-serif-display text-4xl sm:text-5xl font-light text-brand-off-white leading-tight mb-6 tracking-tight">
          LET'S CREATE <br />
          <span className="italic text-gold-gradient font-normal">THE NEXT MOMENT.</span>
        </h2>
        <p className="font-sans text-sm text-brand-platinum font-light leading-relaxed mb-8">
          FashAI Universal welcomes enquiries from fashion houses, press correspondents, luxury sponsors, visionaries, and prospective participants.
        </p>

        <div className="space-y-6 border-t border-hairline-gold pt-6 text-xs font-syne tracking-caps">
          <div>
            <div className="text-brand-gold/60 mb-1">GLOBAL HUBS</div>
            <div className="text-brand-off-white font-bold">DUBAI — PARIS</div>
          </div>
          <div>
            <div className="text-brand-gold/60 mb-1">RESPONSE DESK</div>
            <div className="text-brand-gold font-bold">EXECUTIVE COMMUNICATIONS</div>
          </div>
        </div>
      </div>

      {/* Right Column: Editorial Form */}
      <div className="lg:col-span-7 bg-brand-charcoal/80 p-8 sm:p-12 border border-hairline-gold relative shadow-2xl">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center flex flex-col items-center"
          >
            <CheckCircle2 className="h-16 w-16 text-brand-gold mb-6" />
            <h3 className="font-serif-display text-3xl text-brand-off-white mb-3">
              ENQUIRY RECEIVED
            </h3>
            <p className="font-sans text-sm text-brand-platinum max-w-md font-light leading-relaxed mb-8">
              Thank you for contacting FashAI Universal. Our executive team will review your message promptly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="bg-brand-orange px-8 py-4 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors shadow-md"
            >
              SEND ANOTHER MESSAGE ↗
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

            {/* NAME Field */}
            <div className="relative">
              <label className="block text-[10px] font-syne tracking-micro text-brand-gold mb-2">
                NAME *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-transparent border-b border-hairline-gold py-3 text-sm text-brand-off-white placeholder:text-brand-platinum/30 focus:border-brand-gold focus:outline-none transition-colors"
              />
            </div>

            {/* EMAIL Field */}
            <div className="relative">
              <label className="block text-[10px] font-syne tracking-micro text-brand-gold mb-2">
                EMAIL *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full bg-transparent border-b border-hairline-gold py-3 text-sm text-brand-off-white placeholder:text-brand-platinum/30 focus:border-brand-gold focus:outline-none transition-colors"
              />
            </div>

            {/* PHONE / WHATSAPP Field */}
            <div className="relative">
              <label className="block text-[10px] font-syne tracking-micro text-brand-gold mb-2">
                PHONE / WHATSAPP
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-transparent border-b border-hairline-gold py-3 text-sm text-brand-off-white placeholder:text-brand-platinum/30 focus:border-brand-gold focus:outline-none transition-colors"
              />
            </div>

            {/* INTEREST Options Dropdown */}
            <div className="relative">
              <label className="block text-[10px] font-syne tracking-micro text-brand-gold mb-2">
                INTEREST *
              </label>
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full bg-brand-void border-b border-hairline-gold py-3 text-sm text-brand-off-white focus:border-brand-gold focus:outline-none transition-colors cursor-pointer"
              >
                <option value="General Enquiry">General Enquiry</option>
                <option value="FashAI Lifestyle 2026">FashAI Lifestyle 2026</option>
                <option value="Partnership">Partnership</option>
                <option value="Sponsorship">Sponsorship</option>
                <option value="Designer / Talent">Designer / Talent</option>
                <option value="Media / Press">Media / Press</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* MESSAGE Field */}
            <div className="relative">
              <label className="block text-[10px] font-syne tracking-micro text-brand-gold mb-2">
                MESSAGE *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Details regarding your enquiry..."
                className="w-full bg-transparent border-b border-hairline-gold py-3 text-sm text-brand-off-white placeholder:text-brand-platinum/30 focus:border-brand-gold focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={status === "loading"}
              className="w-full bg-brand-orange py-4 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg"
                data-cursor="explore"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>SENDING ENQUIRY...</span>
                  </>
                ) : (
                  <span>SEND ENQUIRY ↗</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

