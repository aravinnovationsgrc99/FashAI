"use client";

import { useState } from "react";
import { Palette, RotateCcw, Save, CheckCircle2 } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { ColorPalette } from "@/lib/admin/config-schema";

export default function ThemeControlPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, resetThemeDefaults } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

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
      background: "#050505",
      primaryText: "#FFFFFF",
      secondaryText: "#E0E0E0",
      primaryAccent: "#FAB60A",
      secondaryAccent: "#F15E1C",
      softSurface: "#0A0908",
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

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Theme & Color Palette Settings");
    setSaving(false);
    if (ok) {
      setStatusMessage("Theme settings published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const colorFields: { key: keyof ColorPalette; label: string }[] = [
    { key: "background", label: "Background" },
    { key: "primaryText", label: "Primary Text" },
    { key: "secondaryText", label: "Secondary Text" },
    { key: "primaryAccent", label: "Primary Accent (#F15E1C)" },
    { key: "secondaryAccent", label: "Secondary Accent (#FAB60A)" },
    { key: "softSurface", label: "Soft Surface" },
    { key: "border", label: "Border Color" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            GLOBAL THEME &amp; COLOR CONTROL
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Customize Light &amp; Dark mode color tokens with real-time preview and default palette restoration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetThemeDefaults}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-white/15"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FAB60A]" />
            <span>RESET TO FASHAI PALETTE</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>PUBLISH THEME</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* APPROVED BRAND PALETTE BADGE */}
      <div className="p-4 rounded-xl bg-[#0F0E0D] border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <span className="font-syne text-xs font-bold uppercase tracking-wider text-white/80">
          APPROVED FASHAI BRAND PALETTE TOKENS:
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {[
            { name: "#FFFFFF", color: "#FFFFFF", text: "#000" },
            { name: "#111111", color: "#111111", text: "#FFF" },
            { name: "#F15E1C", color: "#F15E1C", text: "#FFF" },
            { name: "#2E936F", color: "#2E936F", text: "#FFF" },
            { name: "#FAB60A", color: "#FAB60A", text: "#000" },
            { name: "#FFEC69", color: "#FFEC69", text: "#000" },
            { name: "#F7D7B0", color: "#F7D7B0", text: "#000" },
          ].map((c) => (
            <span
              key={c.name}
              style={{ backgroundColor: c.color, color: c.text }}
              className="px-2.5 py-1 rounded-md border border-white/20 font-bold"
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>

      {/* LIGHT & DARK MODE EDITORS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LIGHT MODE */}
        <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
              LIGHT MODE PALETTE
            </span>
            <span className="text-xs text-white/50">Daytime Theme</span>
          </div>

          <div className="space-y-3">
            {colorFields.map((f) => (
              <div key={f.key} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#181715]">
                <label className="text-xs font-syne font-semibold uppercase text-white/90">
                  {f.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.light[f.key].startsWith("#") ? theme.light[f.key] : "#ffffff"}
                    onChange={(e) => handleColorChange("light", f.key, e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={theme.light[f.key]}
                    onChange={(e) => handleColorChange("light", f.key, e.target.value)}
                    className="w-28 bg-black/40 border border-white/20 font-mono text-xs rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DARK MODE */}
        <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#F15E1C]">
              DARK MODE PALETTE
            </span>
            <span className="text-xs text-white/50">Nighttime Theme</span>
          </div>

          <div className="space-y-3">
            {colorFields.map((f) => (
              <div key={f.key} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#181715]">
                <label className="text-xs font-syne font-semibold uppercase text-white/90">
                  {f.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.dark[f.key].startsWith("#") ? theme.dark[f.key] : "#050505"}
                    onChange={(e) => handleColorChange("dark", f.key, e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={theme.dark[f.key]}
                    onChange={(e) => handleColorChange("dark", f.key, e.target.value)}
                    className="w-28 bg-black/40 border border-white/20 font-mono text-xs rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
