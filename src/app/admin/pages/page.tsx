"use client";

import { useState } from "react";
import { Zap, Save, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { PageConfig } from "@/lib/admin/config-schema";

export default function PageManagerPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const pages = config.pages || [];

  const handlePageChange = (id: string, key: keyof PageConfig, val: any) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      pages: prev.pages.map((p) => (p.id === id ? { ...p, [key]: val } : p)),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Page configuration and SEO titles");
    setSaving(false);
    if (ok) {
      setStatusMessage("Page settings published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            PAGE &amp; ROUTE MANAGER
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Manage page routes, SEO titles, meta descriptions, and publication status without removing existing routes.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH PAGES</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* PAGE ROUTE LIST */}
      <div className="space-y-4">
        {pages.map((page) => (
          <div
            key={page.id}
            className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
              page.published ? "bg-[#0F0E0D] border-white/10" : "bg-black/40 border-white/5 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#FAB60A] font-bold bg-[#FAB60A]/10 px-2.5 py-1 rounded-md border border-[#FAB60A]/20">
                  {page.route}
                </span>
                <span className="font-syne text-xs font-bold uppercase text-white">
                  {page.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={page.visibility}
                  onChange={(e) => handlePageChange(page.id, "visibility", e.target.value)}
                  className="bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-2.5 py-1 font-syne uppercase"
                >
                  <option value="PUBLIC">PUBLIC</option>
                  <option value="PRIVATE">PRIVATE</option>
                  <option value="DRAFT">DRAFT</option>
                </select>

                <button
                  onClick={() => handlePageChange(page.id, "published", !page.published)}
                  className={`p-1.5 rounded-lg ${page.published ? "bg-[#2E936F]/20 text-[#2E936F]" : "bg-white/10 text-white/40"}`}
                >
                  {page.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-syne font-bold uppercase text-white/60 mb-1">
                  SEO TITLE
                </label>
                <input
                  type="text"
                  value={page.title}
                  onChange={(e) => handlePageChange(page.id, "title", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-lg px-3 py-2 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-syne font-bold uppercase text-white/60 mb-1">
                  META DESCRIPTION
                </label>
                <input
                  type="text"
                  value={page.metaDescription}
                  onChange={(e) => handlePageChange(page.id, "metaDescription", e.target.value)}
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
