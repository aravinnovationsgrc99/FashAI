"use client";

import { useState } from "react";
import {
  Calendar,
  Edit3,
  X,
  Sparkles,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { EventConfig } from "@/lib/admin/config-schema";

export default function EventManagerPage() {
  const { config, updateLocalDraftConfig, showToast } = useSiteConfig();
  const [editingEvent, setEditingEvent] = useState<EventConfig | null>(null);
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "MEDIA" | "DETAILS" | "CTA" | "VISIBILITY">("OVERVIEW");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const events = config.events || [
    {
      id: "lifestyle-2026",
      title: "LIFESTYLE 2026 SHOWCASE",
      category: "LifeStyle",
      dateText: "October 2026 (TBA)",
      location: "Dubai, UAE",
      venue: "Grand Fashion Pavilion",
      status: "upcoming" as const,
      description: "Premier AI fashion editorial showcase, model runways, and designer competitions.",
      coverImage: "/assets/media/lifestyle_cover.jpg",
      ctaText: "REGISTER AS DELEGATE",
      ctaLink: "#register",
    },
    {
      id: "runway-2026",
      title: "GLOBAL RUNWAY 2026",
      category: "Runway",
      dateText: "December 2026 (TBA)",
      location: "Milan / Paris",
      venue: "Haute Couture Arena",
      status: "active" as const,
      description: "Live runway presentations featuring generative AI couture collection debuts.",
      coverImage: "/assets/media/runway_cover.jpg",
      ctaText: "EXPLORE RUNWAY",
      ctaLink: "#runway",
    },
  ];

  const handleSaveModal = () => {
    if (!editingEvent) return;
    updateLocalDraftConfig((prev) => ({
      ...prev,
      events: (prev.events || events).map((e) => (e.id === editingEvent.id ? editingEvent : e)),
    }));
    setEditingEvent(null);
    showToast("✓ Event changes updated in draft", "success");
  };

  const handleAddEvent = () => {
    const newEv: EventConfig = {
      id: `event-${Date.now()}`,
      title: "NEW FASHION SHOWCASE 2026",
      category: "General",
      dateText: "TBA 2026",
      location: "Dubai, UAE",
      venue: "Main Stage",
      status: "upcoming",
      description: "Description for upcoming fashion event showcase.",
      coverImage: "/assets/media/placeholder_event.jpg",
      ctaText: "REGISTER NOW",
      ctaLink: "#register",
    };
    updateLocalDraftConfig((prev) => ({
      ...prev,
      events: [...(prev.events || events), newEv],
    }));
    setEditingEvent(newEv);
    showToast("✓ New event added", "success");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 select-none font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
            SHOWCASE MANAGEMENT
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            EVENTS &amp; <span className="text-[#FAB60A]">RUNWAYS</span>
          </h1>
          <p className="font-sans text-xs text-white/60">
            Visual management for LifeStyle 2026, Global Runway, and bespoke fashion showcases.
          </p>
        </div>

        <button
          onClick={handleAddEvent}
          className="bg-[#FAB60A] hover:bg-[#FFEC69] text-black px-4 py-2 rounded-xl font-syne text-xs font-bold uppercase transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* VISUAL EVENT CARDS (Section 12) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 flex flex-col justify-between space-y-4 hover:border-[#FAB60A]/40 transition-all shadow-lg"
          >
            {/* COVER IMAGE & STATUS */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ev.coverImage || "/assets/brand/logo_transparent.png"}
                alt={ev.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`text-[10px] font-syne font-bold uppercase px-3 py-1 rounded-full border ${
                    ev.status === "active"
                      ? "bg-[#2E936F]/20 border-[#2E936F] text-[#2E936F]"
                      : ev.status === "upcoming"
                      ? "bg-[#FAB60A]/20 border-[#FAB60A] text-[#FAB60A]"
                      : "bg-white/10 border-white/20 text-white/50"
                  }`}
                >
                  STATUS: {ev.status}
                </span>
              </div>
            </div>

            {/* EVENT DETAILS */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-syne font-bold text-[#FAB60A] uppercase tracking-wider">
                {ev.category} Showcase
              </span>
              <h3 className="font-serif-display text-xl text-white uppercase font-light">
                {ev.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-white/60 font-sans">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F15E1C]" />
                  {ev.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FAB60A]" />
                  {ev.dateText}
                </span>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/40">{ev.venue}</span>
              <button
                onClick={() => {
                  setEditingEvent(ev);
                  setActiveTab("OVERVIEW");
                }}
                className="px-4 py-2 rounded-xl bg-[#FAB60A]/10 hover:bg-[#FAB60A]/20 border border-[#FAB60A]/30 text-[#FAB60A] text-xs font-syne font-bold transition-all flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                EDIT EVENT
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EVENT EDITOR MODAL WITH TABBED LAYOUT (Section 13) */}
      {editingEvent && (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121110] border border-white/20 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-syne text-[10px] text-[#FAB60A] uppercase tracking-widest font-bold">
                  EVENT EDITOR
                </span>
                <h3 className="font-serif-display text-xl text-white uppercase">
                  {editingEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingEvent(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* TABBED NAVIGATION (Section 13) */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
              {(["OVERVIEW", "MEDIA", "DETAILS", "CTA", "VISIBILITY"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-syne transition-all ${
                    activeTab === tab
                      ? "bg-[#FAB60A] text-black font-bold shadow"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="space-y-4">
              {/* 1. OVERVIEW */}
              {activeTab === "OVERVIEW" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-syne text-white/70">Event Title</label>
                    <input
                      type="text"
                      value={editingEvent.title}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, title: e.target.value })
                      }
                      className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-syne text-white/70">Category</label>
                    <input
                      type="text"
                      value={editingEvent.category}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, category: e.target.value })
                      }
                      className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-syne text-white/70">Description</label>
                    <textarea
                      rows={3}
                      value={editingEvent.description}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, description: e.target.value })
                      }
                      className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-syne text-white/70">Event Status</label>
                    <select
                      value={editingEvent.status}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          status: e.target.value as "upcoming" | "active" | "past",
                        })
                      }
                      className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none"
                    >
                      <option value="upcoming">UPCOMING</option>
                      <option value="active">ACTIVE</option>
                      <option value="past">PAST</option>
                    </select>
                  </div>
                </div>
              )}

              {/* 2. MEDIA */}
              {activeTab === "MEDIA" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-syne text-white/70">Cover Image URL</label>
                    <input
                      type="text"
                      value={editingEvent.coverImage || ""}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, coverImage: e.target.value })
                      }
                      className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
                    />
                  </div>

                  {editingEvent.coverImage && (
                    <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={editingEvent.coverImage}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 3. DETAILS */}
              {activeTab === "DETAILS" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-syne text-white/70">Date Text</label>
                      <input
                        type="text"
                        value={editingEvent.dateText}
                        onChange={(e) =>
                          setEditingEvent({ ...editingEvent, dateText: e.target.value })
                        }
                        className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-syne text-white/70">City / Location</label>
                      <input
                        type="text"
                        value={editingEvent.location}
                        onChange={(e) =>
                          setEditingEvent({ ...editingEvent, location: e.target.value })
                        }
                        className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-syne text-white/70">Venue Name</label>
                    <input
                      type="text"
                      value={editingEvent.venue}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, venue: e.target.value })
                      }
                      className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
                    />
                  </div>
                </div>
              )}

              {/* 4. CTA */}
              {activeTab === "CTA" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-syne text-white/70">CTA Button Label</label>
                    <input
                      type="text"
                      value={editingEvent.ctaText || ""}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, ctaText: e.target.value })
                      }
                      className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-syne text-white/70">CTA Action Link / Modal Trigger</label>
                    <input
                      type="text"
                      value={editingEvent.ctaLink || ""}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, ctaLink: e.target.value })
                      }
                      className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#FAB60A]"
                    />
                  </div>
                </div>
              )}

              {/* 5. VISIBILITY & ADVANCED */}
              {activeTab === "VISIBILITY" && (
                <div className="space-y-4">
                  <div className="bg-[#1A1918] p-4 rounded-2xl border border-white/10 space-y-3">
                    <div className="font-syne text-xs font-bold text-[#FAB60A] uppercase">
                      VISIBILITY CONTROLS
                    </div>
                    <p className="text-xs text-white/70 font-sans">
                      Toggle whether this event appears on the published event carousel and homepage banner.
                    </p>
                  </div>

                  {/* ADVANCED SETTINGS COLLAPSED (Section 13 & Section 29) */}
                  <div className="border border-white/10 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setAdvancedOpen(!advancedOpen)}
                      className="w-full p-4 bg-[#141312] flex items-center justify-between text-xs font-syne font-bold text-white/80 hover:text-white"
                    >
                      <span>ADVANCED SETTINGS</span>
                      {advancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {advancedOpen && (
                      <div className="p-4 bg-[#0A0A0A] space-y-3 text-xs">
                        <div className="space-y-1">
                          <label className="text-white/60">SEO Meta Keywords</label>
                          <input
                            type="text"
                            placeholder="fashion, lifestyle, dubai 2026"
                            className="w-full bg-[#141312] border border-white/10 rounded-xl px-3 py-2 text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setEditingEvent(null)}
                className="px-4 py-2 rounded-xl text-xs font-syne text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModal}
                className="px-5 py-2 rounded-xl text-xs font-syne font-bold bg-[#FAB60A] hover:bg-[#FFEC69] text-black shadow-lg"
              >
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
