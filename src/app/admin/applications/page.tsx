"use client";

import { useState } from "react";
import { FileText, Save, CheckCircle2 } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function ApplicationManagerPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const categories = config.applicationCategories || [];

  const handleToggle = (id: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      applicationCategories: prev.applicationCategories.map((c) =>
        c.id === id ? { ...c, enabled: !c.enabled } : c
      ),
    }));
  };

  const handleTextChange = (id: string, key: "title" | "description", val: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      applicationCategories: prev.applicationCategories.map((c) =>
        c.id === id ? { ...c, [key]: val } : c
      ),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Application Categories");
    setSaving(false);
    if (ok) {
      setStatusMessage("Application settings published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            APPLICATION &amp; NOMINATION CATEGORY MANAGER
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Enable/disable application categories, edit category descriptions, and configure candidate intake options.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH CATEGORIES</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* APPLICATION CATEGORY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
              cat.enabled ? "bg-[#0F0E0D] border-white/10" : "bg-black/40 border-white/5 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-syne text-xs font-bold uppercase tracking-wider text-[#FAB60A]">
                {cat.id.toUpperCase()} CATEGORY
              </span>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cat.enabled}
                  onChange={() => handleToggle(cat.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E936F]" />
              </label>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-syne font-bold uppercase text-white/60 mb-1">
                  CATEGORY TITLE
                </label>
                <input
                  type="text"
                  value={cat.title}
                  onChange={(e) => handleTextChange(cat.id, "title", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-3 py-2 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-syne font-bold uppercase text-white/60 mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={cat.description}
                  onChange={(e) => handleTextChange(cat.id, "description", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-3 py-2 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
