"use client";

import { useState } from "react";
import { Layers, Save, CheckCircle2, Eye } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { PopupSettings } from "@/lib/admin/config-schema";

export default function PopupControlPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const pop = config.popupSettings || {
    enabled: true,
    eventId: "lifestyle_2026",
    title: "LifeStyle 2026 · Dubai",
    subtitle: "INTERNATIONAL FASHION & LIFESTYLE SUMMIT",
    backgroundImage: "/assets/photos_more/lifestyle_banner.png",
    overlayOpacity: 0.6,
    date: "TO BE ANNOUNCED",
    venue: "TO BE ANNOUNCED",
    dressCode: "Black Tie / Haute Couture",
    registrationCtaText: "REGISTER INTEREST →",
    sponsorshipCtaText: "SPONSORSHIP ENQUIRY →",
    registrationUrl: "/contact",
    sponsorshipUrl: "/contact",
    displayDelay: 3000,
    scrollTriggerPercentage: 30,
    showOncePerSession: true,
    showOncePerVisitor: false,
  };

  const handleChange = (key: keyof PopupSettings, val: any) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      popupSettings: {
        ...prev.popupSettings,
        [key]: val,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Event Popup Settings");
    setSaving(false);
    if (ok) {
      setStatusMessage("Popup settings published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            EVENT POPUP &amp; MODAL MANAGER
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Control first-visit popup overlay text, background image, delay, scroll trigger percentage, and frequency.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-white/15"
          >
            <Eye className="w-3.5 h-3.5 text-[#FAB60A]" />
            <span>PREVIEW POPUP</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>PUBLISH POPUP</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* POPUP TOGGLE & SETTINGS */}
      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="font-syne text-xs font-bold uppercase tracking-wider text-[#FAB60A]">
              POPUP OVERLAY STATUS
            </span>
            <h3 className="font-serif-display text-xl text-white uppercase">
              {pop.enabled ? "POPUP IS ENABLED FOR PUBLIC VISITORS" : "POPUP IS CURRENTLY DISABLED"}
            </h3>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={pop.enabled}
              onChange={(e) => handleChange("enabled", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#F15E1C]" />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
              POPUP HEADING TITLE
            </label>
            <input
              type="text"
              value={pop.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
              SUBTITLE / EVENT TYPE
            </label>
            <input
              type="text"
              value={pop.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
              DISPLAY DELAY (MS)
            </label>
            <input
              type="number"
              value={pop.displayDelay}
              onChange={(e) => handleChange("displayDelay", parseInt(e.target.value))}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
              SCROLL TRIGGER (%)
            </label>
            <input
              type="number"
              value={pop.scrollTriggerPercentage}
              onChange={(e) => handleChange("scrollTriggerPercentage", parseInt(e.target.value))}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
              BACKGROUND IMAGE PATH
            </label>
            <input
              type="text"
              value={pop.backgroundImage}
              onChange={(e) => handleChange("backgroundImage", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>
        </div>
      </div>

      {/* POPUP PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#0F0E0D] border border-[#FAB60A]/40 rounded-2xl overflow-hidden shadow-2xl p-6 text-center space-y-4">
            <div className="text-xs font-syne font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
              {pop.subtitle}
            </div>
            <h2 className="font-serif-display text-2xl font-light uppercase text-white">
              {pop.title}
            </h2>
            <p className="font-sans text-xs text-white/70">
              DATE: {pop.date} | VENUE: {pop.venue}
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <span className="bg-[#F15E1C] text-white px-4 py-2 rounded-xl text-xs font-syne font-bold uppercase">
                {pop.registrationCtaText}
              </span>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-syne font-bold uppercase"
              >
                CLOSE PREVIEW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
