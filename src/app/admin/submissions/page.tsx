"use client";

import { useState, useEffect } from "react";
import { Inbox, Trash2, Download, Search, CheckCircle2, Clock, Filter, Eye } from "lucide-react";
import { SubmissionRecord } from "@/lib/admin/config-schema";

export default function FormSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRecord | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.warn("Could not fetch submissions:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusChange = async (id: string, status: SubmissionRecord["status"]) => {
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        await fetchSubmissions();
        if (selectedSubmission?.id === id) {
          setSelectedSubmission((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (e) {
      console.warn("Status update error:", e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      const res = await fetch(`/api/admin/submissions?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (selectedSubmission?.id === id) setSelectedSubmission(null);
        await fetchSubmissions();
      }
    } catch (e) {
      console.warn("Delete error:", e);
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    const headers = ["ID", "Type", "Full Name", "Email", "Phone", "Status", "Submitted At"];
    const rows = submissions.map((s) => [
      s.id,
      s.type,
      `"${s.fullName.replace(/"/g, '""')}"`,
      s.email,
      s.phone || "",
      s.status,
      s.submittedAt,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `submissions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = submissions.filter((s) => {
    const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.enquiryType && s.enquiryType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            FORM SUBMISSIONS &amp; REGISTRATIONS
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Secure intake repository for candidate applications, partner enquiries, and delegate registrations.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={submissions.length === 0}
          className="bg-[#2E936F] hover:bg-[#257759] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT CSV</span>
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F0E0D] border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by applicant name, email, or enquiry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#D4AF37]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2.5 outline-none font-syne uppercase"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="NEW">NEW</option>
            <option value="UNDER REVIEW">UNDER REVIEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="ARCHIVED">ARCHIVED</option>
          </select>
        </div>
      </div>

      {/* SUBMISSIONS TABLE */}
      {loading ? (
        <div className="py-16 text-center text-xs font-syne text-white/50">
          Loading submission records...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-xs font-syne text-white/50 bg-[#0F0E0D] rounded-2xl border border-white/10">
          No submission records found.
        </div>
      ) : (
        <div className="bg-[#0F0E0D] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#151413] border-b border-white/10 font-syne text-white/70 uppercase">
                <tr>
                  <th className="p-4">APPLICANT</th>
                  <th className="p-4">TYPE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4">SUBMITTED</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filtered.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-syne font-bold text-white text-sm">{sub.fullName}</div>
                      <div className="text-white/60 text-[11px]">{sub.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-white/10 text-white font-syne text-[10px] font-bold uppercase">
                        {sub.applicationType || sub.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={sub.status}
                        onChange={(e) => handleStatusChange(sub.id, e.target.value as any)}
                        className={`text-[10px] font-syne font-bold uppercase px-2.5 py-1 rounded-lg border outline-none bg-transparent ${
                          sub.status === "NEW"
                            ? "border-[#F15E1C] text-[#F15E1C]"
                            : sub.status === "UNDER REVIEW"
                            ? "border-[#D4AF37] text-[#D4AF37]"
                            : sub.status === "CONTACTED"
                            ? "border-[#2E936F] text-[#2E936F]"
                            : "border-white/20 text-white/40"
                        }`}
                      >
                        <option value="NEW" className="bg-[#0F0E0D] text-white">NEW</option>
                        <option value="UNDER REVIEW" className="bg-[#0F0E0D] text-white">UNDER REVIEW</option>
                        <option value="CONTACTED" className="bg-[#0F0E0D] text-white">CONTACTED</option>
                        <option value="ARCHIVED" className="bg-[#0F0E0D] text-white">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="p-4 text-white/60 text-[11px]">
                      {new Date(sub.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedSubmission(sub)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                        title="View Full Record"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FULL RECORD MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0F0E0D] border border-white/20 rounded-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-syne text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                SUBMISSION RECORD: {selectedSubmission.id}
              </span>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-white/60 hover:text-white text-xs font-syne font-bold uppercase"
              >
                CLOSE [X]
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-white/50 block font-syne">APPLICANT NAME:</span>
                <span className="text-white font-bold text-sm">{selectedSubmission.fullName}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-white/50 block font-syne">EMAIL:</span>
                  <span className="text-white font-mono">{selectedSubmission.email}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne">PHONE / WHATSAPP:</span>
                  <span className="text-white font-mono">{selectedSubmission.phone || "N/A"}</span>
                </div>
              </div>

              {selectedSubmission.message && (
                <div>
                  <span className="text-white/50 block font-syne mb-1">MESSAGE:</span>
                  <p className="p-3 rounded-xl bg-[#181715] text-white/90 leading-relaxed font-sans">
                    {selectedSubmission.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
