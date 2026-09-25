"use client";

import { useState } from "react";
import { Globe, Wrench, ShieldAlert, CheckCircle2, Lock, Power } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function WebsiteControlPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, refreshConfig, showToast } = useSiteConfig();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const m = config.maintenanceSettings || {
    enabled: false,
    title: "WEBSITE TEMPORARILY UNAVAILABLE",
    message: "FashAI Universal is currently undergoing scheduled platform maintenance. Public access will resume shortly.",
  };

  const handleConfirmToggleMaintenance = async () => {
    setIsProcessing(true);
    const newState = !m.enabled;
    updateLocalDraftConfig((prev) => ({
      ...prev,
      maintenanceSettings: {
        ...prev.maintenanceSettings,
        enabled: newState,
      },
    }));

    try {
      const saved = await saveDraft();
      if (!saved) {
        showToast("Unable to change website status. Please try again.", "error");
        setIsProcessing(false);
        return;
      }

      const published = await publish(`Maintenance mode set to ${newState ? "ACTIVE" : "OFF"}`);
      if (!published) {
        showToast("Unable to change website status. Please try again.", "error");
        setIsProcessing(false);
        return;
      }

      await refreshConfig();
      setShowModal(false);
      showToast(
        newState ? "Website is now in GLOBAL MAINTENANCE mode." : "Website restored ONLINE successfully.",
        newState ? "warning" : "success"
      );
    } catch {
      showToast("Unable to change website status. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none font-sans">
      {/* HEADER */}
      <div className="border-b border-white/10 pb-4">
        <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
          SYSTEM AVAILABILITY
        </span>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
          WEBSITE <span className="text-[#D4AF37]">STATUS &amp; CONTROL</span>
        </h1>
        <p className="font-sans text-xs text-white/60">
          Authoritative control over public routing, global maintenance overlay, and availability messaging.
        </p>
      </div>

      {/* WEBSITE STATUS BANNER */}
      <div className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-white/50">
              WEBSITE ROUTING STATUS
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  m.enabled ? "bg-[#F15E1C] animate-ping" : "bg-[#2E936F] shadow-[0_0_10px_#2E936F]"
                }`}
              />
              <h2
                className={`font-serif-display text-2xl uppercase ${
                  m.enabled ? "text-[#F15E1C]" : "text-[#2E936F]"
                }`}
              >
                {m.enabled ? "● MAINTENANCE ACTIVE" : "● WEBSITE ONLINE"}
              </h2>
            </div>
            <p className="text-xs text-white/60 font-sans">
              {m.enabled
                ? "Public access is restricted across all public routes. Visitors see the custom maintenance screen."
                : "All public pages, forms, gallery views, and application routes are fully accessible."}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-2xl font-syne text-xs font-bold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 shrink-0 ${
              m.enabled
                ? "bg-[#2E936F] hover:bg-[#3AA881] text-black"
                : "bg-[#F15E1C] hover:bg-[#FF7334] text-white"
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{m.enabled ? "RESTORE WEBSITE" : "STOP WEBSITE"}</span>
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
              className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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
              className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-[#0F0E0D] border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="space-y-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F15E1C]/15 border border-[#F15E1C]/30 text-[#F15E1C] flex items-center justify-center mx-auto">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="font-serif-display text-2xl font-light uppercase text-white">
                {m.enabled ? "RESTORE WEBSITE?" : "STOP ENTIRE WEBSITE?"}
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                {m.enabled
                  ? "The public FashAI website will become accessible again to all visitors."
                  : "The public website will enter maintenance mode and visitors will no longer be able to access public pages."}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                disabled={isProcessing}
                className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-syne text-xs font-bold uppercase transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmToggleMaintenance}
                disabled={isProcessing}
                className={`flex-1 py-3 rounded-2xl font-syne text-xs font-bold uppercase transition-all shadow-lg ${
                  m.enabled
                    ? "bg-[#2E936F] hover:bg-[#3AA881] text-black"
                    : "bg-[#F15E1C] hover:bg-[#FF7334] text-white"
                }`}
              >
                {isProcessing
                  ? "Processing..."
                  : m.enabled
                  ? "Restore Website"
                  : "Enter Maintenance"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
