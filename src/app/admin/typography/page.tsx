"use client";

import { useState } from "react";
import { Type, Save, CheckCircle2 } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { TypographySettings } from "@/lib/admin/config-schema";

export default function TypographyControlPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const typo = config.typographySettings || {
    headingFont: "Syne, sans-serif",
    bodyFont: "Inter, sans-serif",
    navigationFont: "Syne, sans-serif",
    headingScale: 1.0,
    bodyScale: 1.0,
    letterSpacing: "normal",
    lineHeight: "normal",
  };

  const handleChange = (key: keyof TypographySettings, value: string | number) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      typographySettings: {
        ...prev.typographySettings,
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Typography Settings");
    setSaving(false);
    if (ok) {
      setStatusMessage("Typography settings published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            TYPOGRAPHY CONTROL &amp; SCALING
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Control font families, text scaling multipliers, letter spacing, and line height with live preview.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH TYPOGRAPHY</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7-COLS: CONTROLS */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-5">
            <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
              FONT FAMILY SELECTION
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
                  HEADING FONT FAMILY
                </label>
                <select
                  value={typo.headingFont}
                  onChange={(e) => handleChange("headingFont", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
                >
                  <option value="Syne, sans-serif">Syne (Default Brand Serif / Display)</option>
                  <option value="'Playfair Display', serif">Playfair Display</option>
                  <option value="'Cormorant Garamond', serif">Cormorant Garamond</option>
                  <option value="Inter, sans-serif">Inter Sans</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
                  BODY FONT FAMILY
                </label>
                <select
                  value={typo.bodyFont}
                  onChange={(e) => handleChange("bodyFont", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
                >
                  <option value="Inter, sans-serif">Inter (Default Body)</option>
                  <option value="Roboto, sans-serif">Roboto</option>
                  <option value="'Outfit', sans-serif">Outfit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-2">
                  NAVIGATION FONT FAMILY
                </label>
                <select
                  value={typo.navigationFont}
                  onChange={(e) => handleChange("navigationFont", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-3 outline-none"
                >
                  <option value="Syne, sans-serif">Syne Caps (Default Navigation)</option>
                  <option value="Inter, sans-serif">Inter Caps</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-5">
            <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
              TEXT SCALING MULTIPLIERS
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-syne font-bold uppercase text-white/80 mb-2">
                  <span>HEADING SCALE</span>
                  <span className="text-[#FAB60A]">{typo.headingScale}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.4"
                  step="0.05"
                  value={typo.headingScale}
                  onChange={(e) => handleChange("headingScale", parseFloat(e.target.value))}
                  className="w-full accent-[#F15E1C] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-syne font-bold uppercase text-white/80 mb-2">
                  <span>BODY SCALE</span>
                  <span className="text-[#FAB60A]">{typo.bodyScale}x</span>
                </div>
                <input
                  type="range"
                  min="0.85"
                  max="1.25"
                  step="0.05"
                  value={typo.bodyScale}
                  onChange={(e) => handleChange("bodyScale", parseFloat(e.target.value))}
                  className="w-full accent-[#F15E1C] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 5-COLS: LIVE TYPOGRAPHY PREVIEW */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
            LIVE TYPOGRAPHY PREVIEW
          </h2>

          <div className="p-6 rounded-2xl bg-[#121110] border border-white/15 space-y-4 shadow-xl">
            <div className="text-xs font-syne text-[#FAB60A] font-bold uppercase tracking-[0.2em]">
              DUBAI · EST. 2026
            </div>

            <h2
              style={{
                fontFamily: typo.headingFont,
                fontSize: `${2.2 * typo.headingScale}rem`,
                lineHeight: 1.1,
              }}
              className="uppercase font-light text-white"
            >
              A GLOBAL FASHION <br />
              <span className="italic text-[#F15E1C]">MOVEMENT</span>
            </h2>

            <p
              style={{
                fontFamily: typo.bodyFont,
                fontSize: `${0.9 * typo.bodyScale}rem`,
              }}
              className="text-white/80 leading-relaxed"
            >
              FashAI Universal is an international fashion, lifestyle, and events platform connecting global designers, models, creative talent, and brand experiences across Dubai, UAE &amp; India.
            </p>

            <div className="pt-2">
              <span
                style={{ fontFamily: typo.navigationFont }}
                className="inline-block bg-[#F15E1C] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider"
              >
                SEE UPCOMING SHOWS →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
