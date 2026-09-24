"use client";

import { useState } from "react";
import { Sliders, Save, CheckCircle2 } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function GlobalSettingsPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const g = config.globalSettings || {
    siteTitle: "FashAI Universal — International Luxury Fashion & Events Platform",
    metaTitle: "FashAI Universal — International Fashion & Events Platform",
    metaDescription: "FashAI Universal is an international fashion, lifestyle, and events platform connecting global designers, models, creative talent, and brand experiences across Dubai, UAE & India.",
    favicon: "/favicon.ico",
    ogImage: "/assets/models/model_01.jpeg",
    contactEmail: "contact@fashaiuniversal.com",
    instagramUrl: "https://www.instagram.com/fashai_universal",
    copyrightYear: "2026",
    defaultCtaText: "CONTACT US →",
    defaultCtaUrl: "/contact",
  };

  const handleChange = (key: keyof typeof g, value: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      globalSettings: {
        ...prev.globalSettings,
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Global Settings");
    setSaving(false);
    if (ok) {
      setStatusMessage("Global settings published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            GLOBAL WEBSITE SETTINGS
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Configure site metadata, brand identity handles, copyright year, and default CTA destinations.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH SETTINGS</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-5">
        <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
          METADATA &amp; SEO IDENTIFIERS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              WEBSITE TITLE (TITLE TAG)
            </label>
            <input
              type="text"
              value={g.siteTitle}
              onChange={(e) => handleChange("siteTitle", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              META TITLE (OPEN GRAPH)
            </label>
            <input
              type="text"
              value={g.metaTitle}
              onChange={(e) => handleChange("metaTitle", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
            META DESCRIPTION
          </label>
          <textarea
            rows={3}
            value={g.metaDescription}
            onChange={(e) => handleChange("metaDescription", e.target.value)}
            className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              FAVICON PATH
            </label>
            <input
              type="text"
              value={g.favicon}
              onChange={(e) => handleChange("favicon", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              SOCIAL SHARING (OG IMAGE) PATH
            </label>
            <input
              type="text"
              value={g.ogImage}
              onChange={(e) => handleChange("ogImage", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-5">
        <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
          CONTACT &amp; SOCIAL LINKAGE
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              OFFICIAL CONTACT EMAIL
            </label>
            <input
              type="email"
              value={g.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              INSTAGRAM URL
            </label>
            <input
              type="text"
              value={g.instagramUrl}
              onChange={(e) => handleChange("instagramUrl", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              FOOTER COPYRIGHT YEAR
            </label>
            <input
              type="text"
              value={g.copyrightYear}
              onChange={(e) => handleChange("copyrightYear", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              DEFAULT CTA TEXT
            </label>
            <input
              type="text"
              value={g.defaultCtaText}
              onChange={(e) => handleChange("defaultCtaText", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
              DEFAULT CTA DESTINATION URL
            </label>
            <input
              type="text"
              value={g.defaultCtaUrl}
              onChange={(e) => handleChange("defaultCtaUrl", e.target.value)}
              className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
