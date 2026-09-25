"use client";

import { useEffect, useState } from "react";
import { History, RotateCcw, Clock, ShieldCheck } from "lucide-react";
import { VersionHistoryEntry } from "@/lib/admin/config-schema";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function VersionHistoryPage() {
  const { updateLocalDraftConfig, saveDraft, publish } = useSiteConfig();
  const [history, setHistory] = useState<VersionHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/config", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (e) {
      console.warn("Could not fetch version history:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreVersion = async (entry: VersionHistoryEntry) => {
    if (!confirm(`Are you sure you want to restore configuration from version ${entry.versionId}?`)) return;

    updateLocalDraftConfig(() => entry.configSnapshot);
    setTimeout(async () => {
      await saveDraft();
      const ok = await publish(`Restored version snapshot ${entry.versionId}`);
      if (ok) {
        setStatusMessage(`Successfully restored version ${entry.versionId}!`);
        await fetchHistory();
        setTimeout(() => setStatusMessage(null), 3000);
      }
    }, 150);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            VERSION HISTORY &amp; RECOVERY
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Compare and restore previously published site configurations with 1-click rollback recovery.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-xs font-syne text-white/50">
          Loading version history snapshots...
        </div>
      ) : history.length === 0 ? (
        <div className="py-16 text-center text-xs font-syne text-white/50 bg-[#0F0E0D] rounded-2xl border border-white/10">
          No version history entries recorded yet.
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <div
              key={entry.versionId}
              className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                    {entry.versionId}
                  </span>
                  <span className="text-xs text-white/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(entry.publishedAt).toLocaleString()}
                  </span>
                </div>
                <p className="font-sans text-xs text-white/90 font-medium">
                  {entry.note || "Published configuration snapshot"}
                </p>
                <div className="text-[10px] font-syne text-white/40">
                  BY: {entry.publishedBy || "Master Admin"}
                </div>
              </div>

              <button
                onClick={() => handleRestoreVersion(entry)}
                className="bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white px-4 py-2 rounded-xl text-xs font-syne font-bold uppercase transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESTORE THIS VERSION</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
