"use client";

import { useState } from "react";
import { Film, Save, CheckCircle2, ShieldCheck } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { MotionSettings } from "@/lib/admin/config-schema";

export default function MotionControlPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const mot = config.motionSettings || {
    globalAnimations: true,
    pageTransitions: true,
    scrollAnimations: true,
    hoverAnimations: true,
    backgroundMotion: true,
    customCursor: true,
    backgroundVideo: true,
    reducedMotionSafe: true,
  };

  const handleToggle = (key: keyof MotionSettings) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      motionSettings: {
        ...prev.motionSettings,
        [key]: !prev.motionSettings[key],
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Motion & Animation Settings");
    setSaving(false);
    if (ok) {
      setStatusMessage("Motion settings published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            MOTION, ANIMATION &amp; CURSOR CONTROL
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Configure global cinematic transitions, cursor effects, scroll motions, and accessibility preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH MOTION</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* REDUCED MOTION SAFE MODE BADGE */}
      <div className="p-4 rounded-xl bg-[#2E936F]/10 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne flex items-center gap-2.5 font-bold">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>REDUCED MOTION SAFE MODE IS AUTOMATICALLY RESPECTED BASED ON USER SYSTEM PREFERENCES.</span>
      </div>

      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-5">
        <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
          CINEMATIC &amp; INTERACTION TOGGLES
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "globalAnimations", label: "Initial Cinematic Preloader", desc: "Show initial preloader sequence" },
            { key: "pageTransitions", label: "Page Transition Animations", desc: "Smooth route fade transitions" },
            { key: "scrollAnimations", label: "Framer Scroll In-View Animations", desc: "Reveal content on scroll" },
            { key: "hoverAnimations", label: "Card & Button Micro-Hover Effects", desc: "Interactive button scale/shift" },
            { key: "backgroundMotion", label: "Footer Background Motion", desc: "Subtle background zoom motion" },
            { key: "customCursor", label: "Custom Fine-Pointer Cursor", desc: "Editorial custom cursor ring" },
            { key: "backgroundVideo", label: "Background Video Playback", desc: "Allow background video streams" },
            { key: "reducedMotionSafe", label: "Reduced Motion System Sync", desc: "Auto disable heavy motion if requested" },
          ].map((item) => {
            const val = mot[item.key as keyof MotionSettings];
            return (
              <div key={item.key} className="p-4 rounded-xl bg-[#181715] border border-white/10 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-syne text-xs font-bold uppercase text-white">{item.label}</div>
                  <div className="font-sans text-[11px] text-white/50">{item.desc}</div>
                </div>

                <input
                  type="checkbox"
                  checked={val}
                  onChange={() => handleToggle(item.key as keyof MotionSettings)}
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
