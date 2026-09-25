"use client";

import React, { useState } from "react";
import {
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Power,
  Edit3,
  Save,
  RotateCcw,
  Info,
  Sliders,
  ShieldAlert,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { ServiceStatusConfig } from "@/lib/admin/config-schema";

export default function AdminServicesPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, showToast } = useSiteConfig();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const services = config?.servicesSettings || [];

  const handleToggleStatus = async (serviceId: string) => {
    const target = services.find((s) => s.id === serviceId);
    if (!target) return;

    const newStatus = target.status === "ACTIVE" ? "DISABLED" : "ACTIVE";

    updateLocalDraftConfig((prev) => {
      const currentServices = prev.servicesSettings || [];
      const updated = currentServices.map((s) =>
        s.id === serviceId ? { ...s, status: newStatus as "ACTIVE" | "DISABLED" } : s
      );
      return {
        ...prev,
        servicesSettings: updated,
      };
    });

    showToast(
      `${target.name} is now ${newStatus === "ACTIVE" ? "ACTIVE" : "DISABLED"}`,
      newStatus === "ACTIVE" ? "success" : "info"
    );
  };

  const handleUpdateMessage = (serviceId: string, disabledMessage: string) => {
    updateLocalDraftConfig((prev) => {
      const currentServices = prev.servicesSettings || [];
      const updated = currentServices.map((s) =>
        s.id === serviceId ? { ...s, disabledMessage } : s
      );
      return {
        ...prev,
        servicesSettings: updated,
      };
    });
  };

  const handleSaveAndPublish = async () => {
    try {
      setIsSaving(true);
      await saveDraft();
      await publish("Updated Service Status & Availability controls");
    } catch (e) {
      showToast("Could not save service changes. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const activeCount = services.filter((s) => s.status === "ACTIVE").length;
  const disabledCount = services.filter((s) => s.status === "DISABLED").length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 select-none">
      {/* 1. HEADER CONTROL BAR */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F0E0D] border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-syne text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              SERVICE-LEVEL CONTROLS
            </span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-light uppercase tracking-tight text-white">
            Services <span className="text-[#D4AF37] font-semibold">Status &amp; Availability</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/60 max-w-xl leading-relaxed">
            Individually pause or activate services, update availability banners, and adjust client actions without affecting the public website availability.
          </p>
        </div>

        {/* STATS BADGES */}
        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <div className="px-4 py-3 rounded-2xl bg-[#141312] border border-white/10 text-center">
            <div className="text-xl font-bold font-syne text-[#2E936F]">{activeCount}</div>
            <div className="text-[10px] font-syne uppercase text-white/50 tracking-wider">ACTIVE</div>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-[#141312] border border-white/10 text-center">
            <div className="text-xl font-bold font-syne text-[#F15E1C]">{disabledCount}</div>
            <div className="text-[10px] font-syne uppercase text-white/50 tracking-wider">DISABLED</div>
          </div>
          <button
            onClick={handleSaveAndPublish}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-syne text-xs font-bold uppercase px-5 py-3 rounded-2xl transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "SAVING..." : "SAVE & PUBLISH"}</span>
          </button>
        </div>
      </div>

      {/* 2. IMPORTANT NOTICE BANNER */}
      <div className="p-4 rounded-2xl bg-[#141312] border border-white/10 flex items-start gap-3 text-xs text-white/70">
        <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
        <p>
          <strong className="text-white font-medium">Important:</strong> Disabling an individual service pauses its public availability and updates CTAs to reflect the unavailable state. It <span className="text-[#D4AF37] underline">does not</span> delete service records and <span className="text-[#D4AF37] underline">does not</span> activate site-wide maintenance mode.
        </p>
      </div>

      {/* 3. SERVICES CONTROL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const isActive = service.status === "ACTIVE";
          const isEditing = editingId === service.id;

          return (
            <div
              key={service.id}
              className={`p-6 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${
                isActive
                  ? "bg-[#0F0E0D] border-white/12 hover:border-[#2E936F]/40"
                  : "bg-[#14100E] border-[#F15E1C]/30 hover:border-[#F15E1C]/60"
              }`}
            >
              <div className="space-y-4">
                {/* STATUS BAR */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-syne font-bold uppercase tracking-wider bg-white/5 text-white/70 border border-white/10">
                      {service.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-syne font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F]"
                          : "bg-[#F15E1C]/15 border border-[#F15E1C]/30 text-[#F15E1C]"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-[#2E936F] shadow-[0_0_8px_#2E936F]" : "bg-[#F15E1C]"
                        }`}
                      />
                      <span>{isActive ? "ACTIVE" : "DISABLED"}</span>
                    </span>
                  </div>

                  {/* TOGGLE POWER BUTTON */}
                  <button
                    onClick={() => handleToggleStatus(service.id)}
                    className={`p-2.5 rounded-2xl border transition-all flex items-center gap-2 font-syne text-xs font-bold uppercase ${
                      isActive
                        ? "bg-[#2E936F]/10 text-[#2E936F] border-[#2E936F]/30 hover:bg-[#2E936F]/20"
                        : "bg-[#F15E1C]/10 text-[#F15E1C] border-[#F15E1C]/30 hover:bg-[#F15E1C]/20"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>{isActive ? "DISABLE SERVICE" : "ENABLE SERVICE"}</span>
                  </button>
                </div>

                {/* TITLE & DESCRIPTION */}
                <div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-light uppercase text-white mb-1">
                    {service.name}
                  </h3>
                  <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* CONFIGURABLE DISABLED MESSAGE */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-syne text-[10px] uppercase tracking-wider text-white/50">
                      PUBLIC DISABLED MESSAGE
                    </span>
                    <button
                      onClick={() => setEditingId(isEditing ? null : service.id)}
                      className="text-[10px] font-syne text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{isEditing ? "Done" : "Configure Message"}</span>
                    </button>
                  </div>

                  {isEditing ? (
                    <input
                      type="text"
                      value={service.disabledMessage || ""}
                      onChange={(e) => handleUpdateMessage(service.id, e.target.value)}
                      placeholder="e.g. Currently unavailable or Temporarily paused"
                      className="w-full bg-[#1A1816] border border-[#D4AF37]/50 focus:border-[#D4AF37] rounded-xl px-3 py-2 text-xs text-white outline-none"
                    />
                  ) : (
                    <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 font-mono">
                      &quot;{service.disabledMessage || "Currently unavailable"}&quot;
                    </div>
                  )}
                </div>
              </div>

              {/* FOOTER METRICS */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-syne">
                <span>ID: {service.id}</span>
                <span>CTA: {service.ctaText || "CONTACT"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
