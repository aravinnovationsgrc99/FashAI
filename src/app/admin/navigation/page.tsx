"use client";

import { useState } from "react";
import { Navigation as NavIcon, ArrowUp, ArrowDown, Save, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function NavigationControlPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const navItems = config.navigationSettings || [];

  const handleToggle = (id: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      navigationSettings: prev.navigationSettings.map((n) =>
        n.id === id ? { ...n, enabled: !n.enabled } : n
      ),
    }));
  };

  const handleTextChange = (id: string, key: "label" | "href", val: string) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      navigationSettings: prev.navigationSettings.map((n) =>
        n.id === id ? { ...n, [key]: val } : n
      ),
    }));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === navItems.length - 1)
    ) {
      return;
    }

    const items = [...navItems];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;

    items.forEach((item, idx) => {
      item.order = idx + 1;
    });

    updateLocalDraftConfig((prev) => ({
      ...prev,
      navigationSettings: items,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Navigation Menu items");
    setSaving(false);
    if (ok) {
      setStatusMessage("Navigation menu published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            NAVIGATION MENU MANAGER
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Reorder, enable/disable, and edit navigation links for the main desktop header and mobile drawer.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH NAVIGATION</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* NAVIGATION ITEMS LIST */}
      <div className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-4">
        <h3 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
          NAVIGATION MENU ITEMS
        </h3>

        <div className="space-y-3">
          {navItems.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                item.enabled ? "bg-[#181715] border-white/15" : "bg-black/40 border-white/5 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="w-8 h-8 rounded-lg bg-white/10 text-white font-mono text-xs font-bold flex items-center justify-center">
                  0{idx + 1}
                </span>

                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleTextChange(item.id, "label", e.target.value)}
                  className="bg-[#0F0E0D] border border-white/15 text-white font-syne text-xs font-bold uppercase rounded-lg px-3 py-2 outline-none w-36"
                />

                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => handleTextChange(item.id, "href", e.target.value)}
                  className="bg-[#0F0E0D] border border-white/15 text-white/80 font-mono text-xs rounded-lg px-3 py-2 outline-none flex-1"
                />
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === navItems.length - 1}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-white"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleToggle(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-syne font-bold uppercase ${
                    item.enabled ? "bg-[#2E936F]/20 text-[#2E936F]" : "bg-white/10 text-white/40"
                  }`}
                >
                  {item.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{item.enabled ? "VISIBLE" : "HIDDEN"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
