"use client";

import { useState } from "react";
import { Palette, RotateCcw, Eye, Save, Send, Sparkles } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { ColorPalette } from "@/lib/admin/config-schema";

export default function ThemeControlPage() {
  const {
    config,
    updateLocalDraftConfig,
    saveDraft,
    publish,
    resetThemeDefaults,
    setIsPreviewOpen,
    showToast,
  } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<"light" | "dark">("dark");

  const approvedSwatches = [
    "#FFFFFF",
    "#111111",
    "#F15E1C",
    "#2E936F",
    "#FAB60A",
    "#FFEC69",
    "#F7D7B0",
  ];

  const theme = config.themeSettings || {
    light: {
      background: "#FFFFFF",
      primaryText: "#111111",
      secondaryText: "#333333",
      primaryAccent: "#F15E1C",
      secondaryAccent: "#FAB60A",
      softSurface: "#FAF8F5",
      border: "rgba(0, 0, 0, 0.1)",
    },
    dark: {
      background: "#111111",
      primaryText: "#FFFFFF",
      secondaryText: "#E0E0E0",
      primaryAccent: "#FAB60A",
      secondaryAccent: "#F15E1C",
      softSurface: "#181716",
      border: "rgba(255, 255, 255, 0.1)",
    },
  };

  const handleColorChange = (mode: "light" | "dark", key: keyof ColorPalette, value: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      themeSettings: {
        ...prev.themeSettings,
        [mode]: {
          ...prev.themeSettings[mode],
          [key]: value,
        },
      },
    }));
  };

  const colorTokens: { key: keyof ColorPalette; label: string; desc: string }[] = [
    { key: "background", label: "BACKGROUND", desc: "Main website background color" },
    { key: "primaryText", label: "PRIMARY TEXT", desc: "Headings, titles, and high-contrast text" },
    { key: "secondaryText", label: "SECONDARY TEXT", desc: "Body text, captions, and muted labels" },
    { key: "primaryAccent", label: "PRIMARY ACCENT", desc: "Primary CTA buttons & active highlights (#FAB60A / #F15E1C)" },
    { key: "secondaryAccent", label: "SECONDARY ACCENT", desc: "Secondary pills, badges, and icon accents (#2E936F)" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 select-none font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
            VISUAL BRANDING
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            THEME &amp; <span className="text-[#FAB60A]">COLOR PALETTE</span>
          </h1>
          <p className="font-sans text-xs text-white/60">
            Configure approved FashAI color swatches for Light &amp; Dark mode with live visual previews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetThemeDefaults}
            className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl font-syne text-xs font-bold uppercase transition-all flex items-center gap-1.5 border border-white/15"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FAB60A]" />
            <span>RESET TO FASHAI DEFAULTS</span>
          </button>

          <button
            onClick={() => setIsPreviewOpen(true)}
            className="bg-[#FAB60A] hover:bg-[#FFEC69] text-black px-4 py-2 rounded-xl font-syne text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-md shrink-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>PREVIEW CHANGES</span>
          </button>
        </div>
      </div>

      {/* APPROVED FASHAI COLOR PALETTE SWATCHES (Section 16) */}
      <div className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-syne font-bold uppercase text-[#FAB60A] tracking-wider">
            APPROVED FASHAI BRAND PALETTE
          </span>
          <span className="text-[10px] font-mono text-white/40">7 Curated Tokens</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {approvedSwatches.map((swatch) => (
            <div
              key={swatch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/15 bg-black/40 shrink-0"
            >
              <span
                style={{ backgroundColor: swatch }}
                className="w-5 h-5 rounded-full border border-white/30 shadow-inner"
              />
              <span className="text-xs font-mono text-white font-bold">{swatch}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHT / DARK MODE TAB CONTROL */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab("dark")}
          className={`px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all ${
            activeTab === "dark"
              ? "bg-[#FAB60A] text-black shadow-lg"
              : "text-white/60 hover:text-white bg-white/5"
          }`}
        >
          DARK MODE [LIVE PREVIEW]
        </button>
        <button
          onClick={() => setActiveTab("light")}
          className={`px-4 py-2 rounded-xl text-xs font-syne font-bold transition-all ${
            activeTab === "light"
              ? "bg-white text-black shadow-lg"
              : "text-white/60 hover:text-white bg-white/5"
          }`}
        >
          LIGHT MODE [LIVE PREVIEW]
        </button>
      </div>

      {/* TWO-COLUMN LAYOUT: EDIT CONTROLS & LIVE PREVIEW CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7-COLS: SWATCH COLOR CONTROLS */}
        <div className="lg:col-span-7 space-y-4">
          {colorTokens.map((token) => {
            const currentColor = theme[activeTab][token.key];
            return (
              <div
                key={token.key}
                className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-syne text-xs font-bold text-white uppercase">
                      {token.label}
                    </span>
                    <p className="text-[11px] text-white/50 font-sans">{token.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      style={{ backgroundColor: currentColor }}
                      className="w-6 h-6 rounded-full border border-white/30 shadow-md"
                    />
                    <span className="font-mono text-xs font-bold text-[#FAB60A]">
                      {currentColor}
                    </span>
                  </div>
                </div>

                {/* APPROVED SWATCH SELECTOR ROW */}
                <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                  {approvedSwatches.map((swatch) => (
                    <button
                      key={swatch}
                      onClick={() => handleColorChange(activeTab, token.key, swatch)}
                      style={{ backgroundColor: swatch }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                        currentColor === swatch ? "border-[#FAB60A] ring-2 ring-[#FAB60A]/50 scale-110" : "border-white/20"
                      }`}
                      title={`Select ${swatch}`}
                    />
                  ))}
                  <input
                    type="color"
                    value={currentColor.startsWith("#") ? currentColor : "#111111"}
                    onChange={(e) => handleColorChange(activeTab, token.key, e.target.value)}
                    className="w-7 h-7 rounded-full bg-transparent border-0 cursor-pointer p-0"
                    title="Custom color picker"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT 5-COLS: LIVE COMPONENT PREVIEW CARD (Section 16) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-syne font-bold text-[#FAB60A] uppercase tracking-wider">
            {activeTab.toUpperCase()} MODE LIVE COMPONENT PREVIEW
          </span>

          <div
            style={{
              backgroundColor: theme[activeTab].background,
              color: theme[activeTab].primaryText,
            }}
            className="p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4 font-sans transition-all"
          >
            <div className="flex items-center justify-between border-b border-current/10 pb-3">
              <span className="font-serif-display text-lg uppercase font-semibold">
                FashAI Universal
              </span>
              <span
                style={{
                  backgroundColor: theme[activeTab].secondaryAccent,
                  color: "#000",
                }}
                className="text-[10px] font-syne font-bold uppercase px-2.5 py-0.5 rounded-full"
              >
                PREVIEW
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif-display text-xl uppercase font-light">
                High Fashion Editorial
              </h4>
              <p style={{ color: theme[activeTab].secondaryText }} className="text-xs">
                Experience generative couture and AI runway curation.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                style={{
                  backgroundColor: theme[activeTab].primaryAccent,
                  color: "#000",
                }}
                className="px-4 py-2 rounded-full font-syne text-xs font-bold uppercase shadow-md"
              >
                Explore FashAI
              </button>
              <span style={{ color: theme[activeTab].secondaryText }} className="text-xs font-syne">
                Learn More →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
