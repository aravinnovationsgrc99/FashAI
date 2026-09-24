"use client";

import { useState } from "react";
import { MousePointer, Save, CheckCircle2 } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { FooterSettings } from "@/lib/admin/config-schema";

export default function FooterControlPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const foot = config.footerSettings || {
    brandName: "FashAI Universal",
    description: "Fashion, talent and experiences across Dubai, UAE & India.",
    instagramHandle: "@fashai_universal",
    instagramUrl: "https://www.instagram.com/fashai_universal",
    exploreLinks: [],
    getInvolvedLinks: [],
    legalLinks: [],
    poweredByLogo: "/assets/brand/Final_Powered_by_logo.png",
  };

  const handleChange = (key: keyof FooterSettings, val: any) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      footerSettings: {
        ...prev.footerSettings,
        [key]: val,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Footer Settings");
    setSaving(false);
    if (ok) {
      setStatusMessage("Footer settings published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            FOOTER ARCHITECTURE CONTROL
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Edit brand lockup text, Instagram handles, footer column links, and Powered by Arav Innovation branding.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH FOOTER</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* BRAND LOCKUP & SOCIAL */}
      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-5">
        <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
          BRAND COLUMN &amp; SOCIAL LINK
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
              BRAND NAME
            </label>
            <input
              type="text"
              value={foot.brandName}
              onChange={(e) => handleChange("brandName", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
              INSTAGRAM HANDLE
            </label>
            <input
              type="text"
              value={foot.instagramHandle}
              onChange={(e) => handleChange("instagramHandle", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
            BRAND DESCRIPTION SUMMARY
          </label>
          <textarea
            rows={2}
            value={foot.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
            POWERED BY ARAV INNOVATION LOGO PATH
          </label>
          <input
            type="text"
            value={foot.poweredByLogo}
            onChange={(e) => handleChange("poweredByLogo", e.target.value)}
            className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
