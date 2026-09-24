"use client";

import { useState } from "react";
import {
  LayoutTemplate,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  Edit3,
  X,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { HomepageSectionConfig } from "@/lib/admin/config-schema";

export default function HomepageBuilderPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, setIsPreviewOpen, showToast } =
    useSiteConfig();
  const [editingSection, setEditingSection] = useState<HomepageSectionConfig | null>(null);

  const sections = config.homepageSections || [
    { id: "hero", name: "HERO", title: "FashAI Universal Hero", enabled: true, order: 1 },
    { id: "events", name: "UPCOMING EVENT", title: "LifeStyle 2026 Showcase", enabled: true, order: 2 },
    { id: "whatwedo", name: "WHAT WE DO", title: "What We Do", enabled: true, order: 3 },
    { id: "disciplines", name: "DISCIPLINES", title: "Disciplines & Categories", enabled: true, order: 4 },
    { id: "fashprism", name: "FASHPRISM", title: "FashPrism Experience", enabled: true, order: 5 },
    { id: "nominations", name: "OPEN NOMINATIONS", title: "Talent Applications & Nominations", enabled: true, order: 6 },
    { id: "instagram", name: "INSTAGRAM", title: "Instagram Editorial Feed", enabled: true, order: 7 },
  ];

  const handleToggleSection = (id: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      homepageSections: (prev.homepageSections || sections).map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s
      ),
    }));
    showToast("Section visibility updated", "info");
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

    newSections.forEach((s, idx) => {
      s.order = idx + 1;
    });

    updateLocalDraftConfig((prev) => ({
      ...prev,
      homepageSections: newSections,
    }));
    showToast("Section order updated", "info");
  };

  const handleSaveModal = () => {
    if (!editingSection) return;
    updateLocalDraftConfig((prev) => ({
      ...prev,
      homepageSections: (prev.homepageSections || sections).map((s) =>
        s.id === editingSection.id ? editingSection : s
      ),
    }));
    setEditingSection(null);
    showToast("✓ Section changes updated in draft", "success");
  };

  const sectionPreviews: Record<string, string> = {
    hero: "High-definition background video, fashion editorial headline, interactive floating CTA buttons.",
    events: "Dubai LifeStyle 2026 showcase card, venue details, countdown timer, register modal trigger.",
    whatwedo: "3-column editorial grid showcasing AI design, runway curation, and global fashion events.",
    disciplines: "Interactive category carousel displaying Designers, Models, Stylists, Photographers.",
    fashprism: "Futuristic 3D prism showcase highlighting AI fashion technology.",
    nominations: "Intake form call-to-action banner for global fashion talent nominations.",
    instagram: "Social media grid with high-fashion photography and live Instagram feed link.",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 select-none font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
            CONTENT BUILDER
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            HOMEPAGE <span className="text-[#FAB60A]">SECTION STACK</span>
          </h1>
          <p className="font-sans text-xs text-white/60">
            Reorder, enable/disable, and visually preview homepage layout sections.
          </p>
        </div>

        <button
          onClick={() => setIsPreviewOpen(true)}
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl font-syne text-xs font-bold uppercase transition-all flex items-center gap-2"
        >
          <Eye className="w-3.5 h-3.5 text-[#FAB60A]" />
          <span>PREVIEW SITE</span>
        </button>
      </div>

      {/* VISUAL SECTION LIST (Section 8) */}
      <div className="space-y-3">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm ${
              sec.enabled
                ? "bg-[#0F0E0D] border-white/15 hover:border-[#FAB60A]/40"
                : "bg-[#0A0A0A] border-white/5 opacity-50"
            }`}
          >
            {/* LEFT: ORDER & PREVIEW INFO */}
            <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
              <span className="w-7 h-7 rounded-full bg-white/10 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>

              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-syne text-xs font-bold uppercase text-white tracking-wider">
                    {sec.title}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                      sec.enabled
                        ? "bg-[#2E936F]/20 text-[#2E936F] border border-[#2E936F]/30"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {sec.enabled ? "ENABLED" : "DISABLED"}
                  </span>
                </div>
                <p className="text-[11px] text-white/50 truncate font-sans">
                  {sectionPreviews[sec.id] || "Homepage editorial component"}
                </p>
              </div>
            </div>

            {/* RIGHT: CONTROLS (Move, Toggle, Edit, Preview) */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={() => handleMove(idx, "up")}
                disabled={idx === 0}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white transition-colors"
                title="Move Up"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleMove(idx, "down")}
                disabled={idx === sections.length - 1}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white transition-colors"
                title="Move Down"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleToggleSection(sec.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-syne font-bold uppercase transition-all ${
                  sec.enabled
                    ? "bg-[#2E936F]/20 text-[#2E936F] border border-[#2E936F]/30"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{sec.enabled ? "Enabled" : "Disabled"}</span>
              </button>

              <button
                onClick={() => setEditingSection(sec)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAB60A]/10 hover:bg-[#FAB60A]/20 border border-[#FAB60A]/30 text-[#FAB60A] text-xs font-syne font-bold transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDITING MODAL WITH VISUAL PREVIEW (Section 9) */}
      {editingSection && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121110] border border-white/20 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-syne text-[10px] text-[#FAB60A] uppercase tracking-widest font-bold">
                  VISUAL EDITOR
                </span>
                <h3 className="font-serif-display text-xl text-white uppercase">
                  EDIT {editingSection.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingSection(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* VISUAL PREVIEW BANNER */}
            <div className="bg-[#1A1918] border border-white/10 p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-syne text-[#FAB60A] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Section Preview
              </div>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                {sectionPreviews[editingSection.id] || "Visual representation of this component."}
              </p>
            </div>

            {/* FORM FIELDS */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-syne text-white/70">Section Title Header</label>
                <input
                  type="text"
                  value={editingSection.title}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, title: e.target.value })
                  }
                  className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="section-enabled"
                  checked={editingSection.enabled}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, enabled: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#FAB60A] rounded"
                />
                <label htmlFor="section-enabled" className="text-xs text-white/80 font-syne">
                  Display this section on published homepage
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 rounded-xl text-xs font-syne text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-5 py-2 rounded-xl text-xs font-syne font-bold bg-[#FAB60A] hover:bg-[#FFEC69] text-black shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
