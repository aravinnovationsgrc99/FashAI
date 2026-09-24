"use client";

import { useState } from "react";
import { Globe, Wrench, ShieldAlert, CheckCircle2, Lock } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function WebsiteControlPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, showToast } = useSiteConfig();
  const [isProcessing, setIsProcessing] = useState(false);

  const m = config.maintenanceSettings || {
    enabled: false,
    title: "WEBSITE TEMPORARILY UNAVAILABLE",
    message: "FashAI Universal is currently undergoing scheduled platform maintenance. Public access will resume shortly.",
  };

  const handleToggleMaintenance = async () => {
    setIsProcessing(true);
    const newState = !m.enabled;
    updateLocalDraftConfig((prev) => ({
      ...prev,
      maintenanceSettings: {
        ...prev.maintenanceSettings,
        enabled: newState,
      },
    }));

    await saveDraft();
    await publish(`Maintenance mode set to ${newState ? "ON" : "OFF"}`);
    setIsProcessing(false);
    showToast(
      newState ? "⚠️ Maintenance mode enabled" : "✓ Website returned ONLINE",
      newState ? "warning" : "success"
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none font-sans">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4">
        <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
          SYSTEM AVAILABILITY
        </span>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
          WEBSITE <span className="text-[#FAB60A]">STATUS &amp; CONTROL</span>
        </h1>
        <p className="font-sans text-xs text-white/60">
          Manage master availability and maintenance mode overlay settings safely.
        </p>
      </div>

      {/* WEBSITE STATUS BANNER (Section 30) */}
      <div className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-white/50">
              WEBSITE STATUS
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  m.enabled ? "bg-[#F15E1C] animate-ping" : "bg-[#2E936F]"
                }`}
              />
              <h2
                className={`font-serif-display text-2xl uppercase ${
                  m.enabled ? "text-[#F15E1C]" : "text-[#2E936F]"
                }`}
              >
                {m.enabled ? "● MAINTENANCE MODE" : "● ONLINE"}
              </h2>
            </div>
            <p className="text-xs text-white/60 font-sans">
              {m.enabled
                ? "Public access is restricted. Visitors will see the custom maintenance screen."
                : "All public pages, forms, and features are fully accessible globally."}
            </p>
          </div>

          <button
            onClick={handleToggleMaintenance}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-2xl font-syne text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 shrink-0 ${
              m.enabled
                ? "bg-[#2E936F] hover:bg-[#257759] text-white"
                : "bg-[#F15E1C] hover:bg-[#e04f10] text-white"
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>{m.enabled ? "RETURN WEBSITE ONLINE" : "ENABLE MAINTENANCE"}</span>
          </button>
        </div>

        {/* OVERLAY TEXT EDITING */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-syne text-white/70">Maintenance Overlay Headline</label>
            <input
              type="text"
              value={m.title}
              onChange={(e) =>
                updateLocalDraftConfig((prev) => ({
                  ...prev,
                  maintenanceSettings: {
                    ...prev.maintenanceSettings,
                    title: e.target.value,
                  },
                }))
              }
              className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-syne text-white/70">Maintenance Overlay Notice</label>
            <textarea
              rows={3}
              value={m.message}
              onChange={(e) =>
                updateLocalDraftConfig((prev) => ({
                  ...prev,
                  maintenanceSettings: {
                    ...prev.maintenanceSettings,
                    message: e.target.value,
                  },
                }))
              }
              className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
