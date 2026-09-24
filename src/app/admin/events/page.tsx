"use client";

import { useState } from "react";
import { Calendar, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { EventConfig } from "@/lib/admin/config-schema";

export default function EventManagerPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const events = config.events || [];

  const handleEventChange = (id: string, key: keyof EventConfig, val: any) => {
    updateLocalDraftConfig((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, [key]: val } : e)),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await saveDraft();
    const ok = await publish("Updated Event details");
    setSaving(false);
    if (ok) {
      setStatusMessage("Event configuration published successfully!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            EVENT MANAGEMENT &amp; SHOWCASES
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Manage official LifeStyle and Runway event details, verified dates, venues, dress codes, and registration status.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {saving ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>PUBLISH EVENTS</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* FACTUAL INTEGRITY NOTE */}
      <div className="p-4 rounded-xl bg-[#FAB60A]/10 border border-[#FAB60A]/30 text-[#FAB60A] text-xs font-syne flex items-center gap-2.5">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>
          FACTUAL INTEGRITY MANDATE: LifeStyle 2026 dates &amp; venues remain &quot;TO BE ANNOUNCED&quot; unless explicitly updated with verified event information.
        </span>
      </div>

      {/* EVENT CARDS */}
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="p-6 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FAB60A]" />
                <span className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
                  EVENT CATEGORY: {event.category}
                </span>
              </div>
              <span className="text-xs font-syne font-bold uppercase px-3 py-1 rounded-full bg-[#F15E1C]/20 text-[#F15E1C] border border-[#F15E1C]/30">
                {event.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
                  EVENT TITLE
                </label>
                <input
                  type="text"
                  value={event.title}
                  onChange={(e) => handleEventChange(event.id, "title", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
                  LOCATION / CITY
                </label>
                <input
                  type="text"
                  value={event.location}
                  onChange={(e) => handleEventChange(event.id, "location", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
                  EVENT DATE
                </label>
                <input
                  type="text"
                  value={event.date}
                  onChange={(e) => handleEventChange(event.id, "date", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
                  EVENT VENUE
                </label>
                <input
                  type="text"
                  value={event.venue}
                  onChange={(e) => handleEventChange(event.id, "venue", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
                  DRESS CODE
                </label>
                <input
                  type="text"
                  value={event.dressCode}
                  onChange={(e) => handleEventChange(event.id, "dressCode", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
                EVENT DESCRIPTION
              </label>
              <textarea
                rows={2}
                value={event.description}
                onChange={(e) => handleEventChange(event.id, "description", e.target.value)}
                className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
                  COVER IMAGE PATH
                </label>
                <input
                  type="text"
                  value={event.coverImage}
                  onChange={(e) => handleEventChange(event.id, "coverImage", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-syne font-bold uppercase text-white/80 mb-1.5">
                  CTA DESTINATION URL
                </label>
                <input
                  type="text"
                  value={event.ctaUrl}
                  onChange={(e) => handleEventChange(event.id, "ctaUrl", e.target.value)}
                  className="w-full bg-[#181715] border border-white/15 text-white text-sm rounded-xl px-4 py-2.5 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
