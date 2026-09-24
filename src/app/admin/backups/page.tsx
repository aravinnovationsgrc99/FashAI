"use client";

import { useEffect, useState } from "react";
import { Archive, Plus, Download, RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface BackupFile {
  filename: string;
  createdAt: string;
  size: number;
}

export default function BackupsPage() {
  const { refreshConfig } = useSiteConfig();
  const [backups, setBackups] = useState<BackupFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchBackups = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/backups", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setBackups(data.backups || []);
      }
    } catch (e) {
      console.warn("Could not fetch backups:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const handleCreateBackup = async () => {
    setCreating(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "manual" }),
      });
      if (res.ok) {
        setStatusMessage("Backup created successfully!");
        await fetchBackups();
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (e) {
      alert("Error creating backup");
    } finally {
      setCreating(false);
    }
  };

  const handleRestore = async (filename: string) => {
    if (!confirm(`Are you sure you want to restore system state from ${filename}?`)) return;

    try {
      const res = await fetch("/api/admin/backups", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      if (res.ok) {
        setStatusMessage(`Restored successfully from ${filename}!`);
        await refreshConfig();
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (e) {
      alert("Error restoring backup");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            BACKUP &amp; SYSTEM RESTORE
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Export complete site configuration archives and perform full system state restoration.
          </p>
        </div>

        <button
          onClick={handleCreateBackup}
          disabled={creating}
          className="bg-[#2E936F] hover:bg-[#257759] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0"
        >
          {creating ? <CheckCircle2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span>CREATE SYSTEM BACKUP</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* SECURITY NOTICE */}
      <div className="p-4 rounded-xl bg-[#0F0E0D] border border-white/10 text-xs font-syne text-white/70 flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-[#2E936F] shrink-0" />
        <span>System backups contain site configuration, theme settings, navigation, and section state. Raw passwords are never stored in backups.</span>
      </div>

      {/* BACKUPS LIST */}
      {loading ? (
        <div className="py-16 text-center text-xs font-syne text-white/50">
          Loading backups repository...
        </div>
      ) : backups.length === 0 ? (
        <div className="py-16 text-center text-xs font-syne text-white/50 bg-[#0F0E0D] rounded-2xl border border-white/10">
          No system backup files available yet. Click &quot;CREATE SYSTEM BACKUP&quot; to generate your first backup archive.
        </div>
      ) : (
        <div className="space-y-3">
          {backups.map((b) => (
            <div
              key={b.filename}
              className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 flex items-center justify-between gap-4"
            >
              <div>
                <div className="font-mono text-xs font-bold text-white">{b.filename}</div>
                <div className="text-[11px] text-white/50 font-sans mt-0.5">
                  Created: {new Date(b.createdAt).toLocaleString()} · Size: {(b.size / 1024).toFixed(1)} KB
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRestore(b.filename)}
                  className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-3.5 py-2 rounded-xl text-xs font-syne font-bold uppercase transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESTORE</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
