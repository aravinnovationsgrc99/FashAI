"use client";

import { useState } from "react";
import { Wrench, ShieldAlert, CheckCircle2, Save } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function WebsiteControlPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const m = config.maintenanceSettings || {
    enabled: false,
    title: "WEBSITE TEMPORARILY UNAVAILABLE",
    message: "FashAI Universal is currently undergoing scheduled platform maintenance. Public access will resume shortly.",
    allowNavigation: false,
    allowEnquiryForms: false,
    allowRegistrations: false,
    allowApplications: false,
    allowGalleryInteraction: false,
    allowCTA: false,
  };

  const handleToggle = (key: keyof typeof m, value: boolean | string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      maintenanceSettings: {
        ...prev.maintenanceSettings,
        [key]: value,
      },
    }));
  };

  const handleSaveAndPublish = async () => {
    setSaving(true);
    setStatusMessage(null);
    await saveDraft();
    const ok = await publish("Updated Website Control & Maintenance settings");
    setSaving(false);
    if (ok) {
      setStatusMessage("Website control settings published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            WEBSITE MASTER CONTROL
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Control maintenance mode state, public form availability, and interactive feature toggles.
          </p>
        </div>

        <button
          onClick={handleSaveAndPublish}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH CHANGES</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* MAINTENANCE MODE TOGGLE CARD */}
      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-6 shadow-lg">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#FAB60A]" />
              <span className="font-syne text-xs font-bold uppercase tracking-wider text-[#FAB60A]">
                MAINTENANCE MODE STATUS
              </span>
            </div>
            <h3 className="font-serif-display text-xl text-white uppercase">
              {m.enabled ? "MAINTENANCE MODE IS CURRENTLY ACTIVE" : "PUBLIC WEBSITE IS ONLINE"}
            </h3>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={m.enabled}
              onChange={(e) => handleToggle("enabled", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#F15E1C]" />
          </label>
        </div>

        {/* EDITABLE MAINTENANCE OVERLAY TEXT */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              MAINTENANCE OVERLAY HEADING
            </label>
            <input
              type="text"
              value={m.title}
              onChange={(e) => handleToggle("title", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 focus:border-[#FAB60A] text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              MAINTENANCE MESSAGE FOR VISITORS
            </label>
            <textarea
              rows={3}
              value={m.message}
              onChange={(e) => handleToggle("message", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 focus:border-[#FAB60A] text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>
        </div>
      </div>

      {/* FEATURE INTERACTION CONTROL GRID */}
      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-4">
        <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
          FEATURE &amp; INTERACTION CONTROL TOGGLES
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {[
            { key: "allowNavigation", label: "Public Navigation Links" },
            { key: "allowEnquiryForms", label: "Contact & Enquiry Forms" },
            { key: "allowRegistrations", label: "Event Registrations" },
            { key: "allowApplications", label: "Talent Applications" },
            { key: "allowGalleryInteraction", label: "Gallery Lightbox" },
            { key: "allowCTA", label: "CTA Action Buttons" },
          ].map((item) => {
            const val = m[item.key as keyof typeof m] as boolean;
            return (
              <div key={item.key} className="p-4 rounded-xl bg-[#181715] border border-white/10 flex items-center justify-between">
                <span className="font-sans text-xs font-medium text-white/90">{item.label}</span>
                <input
                  type="checkbox"
                  checked={val}
                  onChange={(e) => handleToggle(item.key as keyof typeof m, e.target.checked)}
                  className="w-4 h-4 accent-[#F15E1C] cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
