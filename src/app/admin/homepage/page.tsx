"use client";

import { useState } from "react";
import { LayoutTemplate, ArrowUp, ArrowDown, Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { HomepageSectionConfig } from "@/lib/admin/config-schema";

export default function HomepageBuilderPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const sections = config.homepageSections || [];

  const handleToggleSection = (id: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      homepageSections: prev.homepageSections.map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      ),
    }));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // Update order numbers
    newSections.forEach((s, idx) => {
      s.order = idx + 1;
    });

    updateLocalDraftConfig((prev) => ({
      ...prev,
      homepageSections: newSections,
    }));
  };

  const handleTitleChange = (id: string, title: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      homepageSections: prev.homepageSections.map((s) =>
        s.id === id ? { ...s, title } : s
      ),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Reordered and updated Homepage sections");
    setSaving(false);
    if (ok) {
      setStatusMessage("Homepage section layout published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            HOMEPAGE BUILDER &amp; LAYOUT
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Enable/disable, reorder, and configure visibility for all 12 homepage section blocks.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH HOMEPAGE</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* SECTIONS LIST */}
      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-4">
        <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
          SECTION STACK &amp; ORDER
        </h3>

        <div className="space-y-3">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                section.enabled
                  ? "bg-[#181715] border-white/15"
                  : "bg-black/30 border-white/5 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-white/10 text-white font-mono text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleTitleChange(section.id, e.target.value)}
                  className="bg-transparent text-white font-syne text-xs sm:text-sm font-bold uppercase outline-none border-b border-transparent focus:border-[#FAB60A]"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
                  title="Move Section Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === sections.length - 1}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
                  title="Move Section Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleToggleSection(section.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-syne font-bold uppercase transition-all ${
                    section.enabled
                      ? "bg-[#2E936F]/20 text-[#2E936F] border border-[#2E936F]/30"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {section.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{section.enabled ? "VISIBLE" : "HIDDEN"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
