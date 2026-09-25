"use client";

import { useEffect, useState } from "react";
import { Activity, Clock, User, Tag } from "lucide-react";
import { ActivityLogEntry } from "@/lib/admin/config-schema";

export default function ActivityLogPage() {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/activity", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (e) {
      console.warn("Could not fetch activity log:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            ADMIN ACTIVITY &amp; AUDIT LOG
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Immutable audit record of all authentication events, content publishes, media uploads, and configuration changes.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-xs font-syne text-white/50">
          Loading system audit logs...
        </div>
      ) : logs.length === 0 ? (
        <div className="py-16 text-center text-xs font-syne text-white/50 bg-[#0F0E0D] rounded-2xl border border-white/10">
          No activity logs recorded yet.
        </div>
      ) : (
        <div className="bg-[#0F0E0D] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#151413] border-b border-white/10 font-syne text-white/70 uppercase">
                <tr>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">ACTION</th>
                  <th className="p-4">ACTOR</th>
                  <th className="p-4">DETAILS</th>
                  <th className="p-4 text-right">TIMESTAMP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/10 text-[#D4AF37] font-syne text-[10px] font-bold uppercase border border-[#D4AF37]/20">
                        {log.category}
                      </span>
                    </td>
                    <td className="p-4 font-syne font-bold text-white uppercase">
                      {log.action}
                    </td>
                    <td className="p-4 text-white/80 font-mono text-[11px]">
                      {log.actor || "Admin"}
                    </td>
                    <td className="p-4 text-white/70">
                      {log.details || "—"}
                    </td>
                    <td className="p-4 text-right text-white/50 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
