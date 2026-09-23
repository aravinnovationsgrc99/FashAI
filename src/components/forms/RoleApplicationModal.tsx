"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, ArrowLeft, Send } from "lucide-react";

export type ApplicationRole =
  | "Choreographer"
  | "Designer"
  | "Model"
  | "Makeup Artist"
  | "Stylist"
  | "Influencer"
  | "Celebrity"
  | "Nomination";

export type RoleType = ApplicationRole | "choreographer" | "designer" | "model" | "makeup_artist" | "stylist" | "influencer" | "celebrity" | "nomination";

interface RoleApplicationModalProps {
  role: RoleType | null;
  isOpen?: boolean;
  onClose: () => void;
}

const roleMap: Record<string, ApplicationRole> = {
  choreographer: "Choreographer",
  designer: "Designer",
  model: "Model",
  makeup_artist: "Makeup Artist",
  stylist: "Stylist",
  influencer: "Influencer",
  celebrity: "Celebrity",
  nomination: "Nomination",
  Choreographer: "Choreographer",
  Designer: "Designer",
  Model: "Model",
  "Makeup Artist": "Makeup Artist",
  Stylist: "Stylist",
  Influencer: "Influencer",
  Celebrity: "Celebrity",
  Nomination: "Nomination",
};

export default function RoleApplicationModal({ role: rawRole, isOpen = true, onClose }: RoleApplicationModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (isOpen === false || !rawRole) return null;
  const role: ApplicationRole = roleMap[rawRole] || "Designer";

  // Generic form state
  const [formData, setFormData] = useState({
    fullName: "",
    stageName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    yearsExperience: "",
    specialization: "",
    portfolioUrl: "",
    instagramUrl: "",
    pastEvents: "",
    showreelUrl: "",
    availableForTravel: "Yes",
    additionalInfo: "",
    // Nomination specific
    nomineeName: "",
    nomineeRole: "",
    nomineeContact: "",
  });

  if (!role) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (role === "Nomination") {
        if (!formData.fullName || !formData.email || !formData.nomineeName) {
          setErrorMessage("Please complete all required fields (*).");
          return;
        }
      } else {
        if (!formData.fullName || !formData.email || !formData.phone || !formData.city) {
          setErrorMessage("Please complete all required fields (*).");
          return;
        }
      }
    }
    setErrorMessage("");
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setErrorMessage("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/talent-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleApplied: role,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleTitle = (r: ApplicationRole) => {
    switch (r) {
      case "Choreographer":
        return "Choreographer Application";
      case "Designer":
        return "Designer Application";
      case "Model":
        return "Model Application";
      case "Makeup Artist":
        return "Makeup Artist Application";
      case "Stylist":
        return "Fashion Stylist Application";
      case "Influencer":
        return "Influencer / Creator Application";
      case "Celebrity":
        return "Celebrity / Public Figure Registration";
      case "Nomination":
        return "Nominate a Creative Professional";
      default:
        return "Talent Application";
    }
  };

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[310] w-full max-w-2xl bg-[#090909] border border-brand-yellow-golden/50 p-6 sm:p-8 rounded-2xl shadow-[0_0_80px_rgba(250,182,10,0.25)] text-brand-white my-auto max-h-[90vh] flex flex-col justify-between overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div>
              <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase">
                {role === "Nomination" ? "NOMINATION FLOW" : "OFFICIAL TALENT NETWORK"}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-brand-white">
                {getRoleTitle(role)}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-black border border-white/20 text-white/70 hover:text-brand-yellow-golden hover:border-brand-yellow-golden rounded-full transition-colors"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content / Confirmation */}
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle className="w-14 h-14 text-brand-yellow-golden mx-auto animate-bounce" />
              <h4 className="font-serif text-2xl font-light text-brand-white">APPLICATION RECEIVED</h4>
              <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-md mx-auto leading-relaxed">
                Thank you for applying to the FashAI Universal Talent Network. Our creative review team will evaluate your profile and reach out if a suitable opportunity becomes available.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-brand-yellow-golden px-8 py-3 text-xs font-syne font-bold tracking-caps text-black rounded-full hover:bg-[#FFEC69] transition-colors"
              >
                DONE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="overflow-y-auto space-y-4 pr-1">
              {errorMessage && (
                <div className="p-3 bg-red-950/80 border border-red-500/50 text-red-200 text-xs rounded-lg">
                  {errorMessage}
                </div>
              )}

              {/* STEP 1: Personal & Contact */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Elena Rostova"
                        className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                      />
                    </div>
                    {role !== "Nomination" && (
                      <div>
                        <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                          Stage / Brand Name
                        </label>
                        <input
                          type="text"
                          name="stageName"
                          value={formData.stageName}
                          onChange={handleChange}
                          placeholder="Professional Alias (Optional)"
                          className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                        WhatsApp / Contact No. *
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567 / +91 98765 43210"
                        className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                        City / Country *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Dubai, UAE / Mumbai, India"
                        className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                      />
                    </div>
                    {role === "Nomination" && (
                      <div>
                        <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                          Nominee Full Name *
                        </label>
                        <input
                          type="text"
                          name="nomineeName"
                          value={formData.nomineeName}
                          onChange={handleChange}
                          placeholder="Person you are nominating"
                          className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: Role-Specific Professional Details */}
              {step === 2 && (
                <div className="space-y-4">
                  {role === "Choreographer" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                            Years of Experience
                          </label>
                          <select
                            name="yearsExperience"
                            value={formData.yearsExperience}
                            onChange={handleChange}
                            className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                          >
                            <option value="">Select Experience</option>
                            <option value="1-3 years">1–3 years</option>
                            <option value="3-5 years">3–5 years</option>
                            <option value="5-10 years">5–10 years</option>
                            <option value="10+ years">10+ years</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                            Specialization
                          </label>
                          <select
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                          >
                            <option value="">Select Category</option>
                            <option value="Runway Show">Runway / Fashion Show</option>
                            <option value="Commercial & Brand">Commercial & Brand Events</option>
                            <option value="Editorial & Stage">Editorial & Stage Performance</option>
                            <option value="Contemporary & Dance">Contemporary & Dance</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                          Past Major Shows / Events
                        </label>
                        <textarea
                          name="pastEvents"
                          value={formData.pastEvents}
                          onChange={handleChange}
                          rows={2}
                          placeholder="List key runway shows, fashion weeks, or brand productions you choreographed..."
                          className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none resize-none"
                        />
                      </div>
                    </>
                  )}

                  {role === "Designer" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                            Design Specialization
                          </label>
                          <select
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                          >
                            <option value="">Select Specialty</option>
                            <option value="Haute Couture">Haute Couture</option>
                            <option value="Ready-to-Wear">Ready-to-Wear</option>
                            <option value="Avant-Garde">Avant-Garde & Digital</option>
                            <option value="Resort & Resortwear">Resort & Luxury Wear</option>
                            <option value="Sustainable Fashion">Sustainable Fashion</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                            Available for Travel?
                          </label>
                          <select
                            name="availableForTravel"
                            value={formData.availableForTravel}
                            onChange={handleChange}
                            className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                          >
                            <option value="Yes">Yes — Available for International Travel</option>
                            <option value="UAE Only">UAE Region Only</option>
                            <option value="India Only">India Region Only</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {role !== "Choreographer" && role !== "Designer" && (
                    <div>
                      <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                        Professional Background / Specialty
                      </label>
                      <textarea
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Briefly describe your experience, agency representation, or notable achievements..."
                        className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none resize-none"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Portfolio & Links */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                        Portfolio / Website URL
                      </label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                        placeholder="https://yourportfolio.com"
                        className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                        Instagram / Social Handle
                      </label>
                      <input
                        type="text"
                        name="instagramUrl"
                        value={formData.instagramUrl}
                        onChange={handleChange}
                        placeholder="@username or profile link"
                        className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                      />
                    </div>
                  </div>

                  {role === "Choreographer" && (
                    <div>
                      <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                        Showreel / Video Link URL
                      </label>
                      <input
                        type="url"
                        name="showreelUrl"
                        value={formData.showreelUrl}
                        onChange={handleChange}
                        placeholder="YouTube, Vimeo, or Google Drive link"
                        className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-syne tracking-wider text-brand-white/80 uppercase font-bold mb-1">
                      Additional Details (Optional)
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Any specific collaboration interest, dates, or notes..."
                      className="w-full bg-black/80 border border-white/15 px-3.5 py-2.5 text-xs text-white rounded-lg focus:border-brand-yellow-golden outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-syne font-bold text-white/70 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 bg-brand-yellow-golden px-6 py-2.5 text-xs font-syne font-bold tracking-caps text-black rounded-full hover:bg-[#FFEC69] transition-colors"
                  >
                    Next Step <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-brand-yellow-golden px-7 py-2.5 text-xs font-syne font-bold tracking-caps text-black rounded-full hover:bg-[#FFEC69] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"} <Send className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
