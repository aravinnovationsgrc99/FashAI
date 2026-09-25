"use client";

import { useState, useEffect } from "react";
import {
  Inbox,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Filter,
  Eye,
  X,
  MessageSquare,
  FileText,
  HelpCircle,
  Building,
  Mail,
  Phone,
  Globe,
  Tag,
} from "lucide-react";
import { SubmissionRecord } from "@/lib/admin/config-schema";

export default function FormSubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
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
    if (!confirm("Are you sure you want to delete this submission record?")) return;

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
    const headers = ["ID", "Source", "Type", "Domain", "Full Name", "Email", "Phone", "Status", "Submitted At"];
    const rows = submissions.map((s) => [
      s.id,
      s.source || "WEBSITE",
      s.type,
      `"${(s.domain || s.applicationType || s.enquiryType || "").replace(/"/g, '""')}"`,
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
    link.setAttribute("download", `fashai_submissions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = submissions.filter((s) => {
    const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
    const matchesSource = sourceFilter === "ALL" || s.source === sourceFilter;
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.domain && s.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.enquiryType && s.enquiryType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSource && matchesSearch;
  });

  return (
    <div className="space-y-6 select-none font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            AGGREGATED SUBMISSIONS REPOSITORY
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            SUBMITTED FORMS &amp; <span className="text-[#D4AF37]">INQUIRIES</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Intake repository aggregating form submissions, chatbot leads, contact inquiries, and applications.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={submissions.length === 0}
          className="bg-[#2E936F] hover:bg-[#257759] text-white px-5 py-2.5 rounded-2xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shrink-0 disabled:opacity-50"
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
            placeholder="Search submitter name, email, or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-xl pl-9 pr-4 py-2 outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#D4AF37]" />
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none font-syne uppercase"
            >
              <option value="ALL">ALL SOURCES</option>
              <option value="CHATBOT">CHATBOT</option>
              <option value="CONTACT_FORM">CONTACT FORM</option>
              <option value="APPLICATION_FORM">APPLICATION FORM</option>
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none font-syne uppercase"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="NEW">NEW</option>
            <option value="UNDER REVIEW">UNDER REVIEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="RESOLVED">RESOLVED</option>
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
          No submission records found matching your filters.
        </div>
      ) : (
        <div className="bg-[#0F0E0D] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#151413] border-b border-white/10 font-syne text-white/70 uppercase">
                <tr>
                  <th className="p-4">SUBMITTER</th>
                  <th className="p-4">DOMAIN / TYPE</th>
                  <th className="p-4">SOURCE</th>
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
                      <div className="text-white/60 text-[11px] font-mono">{sub.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-syne text-[10px] font-bold uppercase block w-max">
                        {sub.domain || sub.applicationType || sub.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 font-mono text-[9px] uppercase border border-white/10">
                        {sub.source || "WEBSITE"}
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
                        <option value="RESOLVED" className="bg-[#0F0E0D] text-white">RESOLVED</option>
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
                        title="View Full Submission Fields"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        title="Delete Submission"
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

      {/* FULL DYNAMIC FORM VIEWER MODAL (Requirement #7) */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0F0E0D] border border-white/20 rounded-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-syne text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">
                  SUBMISSION DETAILS ({selectedSubmission.id})
                </span>
                <h3 className="font-serif-display text-xl uppercase text-white">
                  {selectedSubmission.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* APPLICANT METADATA */}
            <div className="p-4 rounded-2xl bg-[#161514] border border-white/10 space-y-3">
              <span className="font-syne text-[10px] text-white/50 uppercase font-bold tracking-wider block">
                SUBMITTER &amp; SOURCE INFO
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">EMAIL ADDRESS:</span>
                  <span className="font-mono text-white">{selectedSubmission.email}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">PHONE / WHATSAPP:</span>
                  <span className="font-mono text-white">{selectedSubmission.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">CITY / LOCATION:</span>
                  <span className="text-white">{selectedSubmission.city || selectedSubmission.country || "N/A"}</span>
                </div>
                <div>
                  <span className="text-white/50 block font-syne text-[10px]">SOURCE ORIGIN:</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-mono text-[10px] uppercase border border-[#D4AF37]/30">
                    {selectedSubmission.source || "WEBSITE"}
                  </span>
                </div>
              </div>
            </div>

            {/* DYNAMIC CATEGORY DETAILS (Every submitted field rendered dynamically) */}
            {selectedSubmission.categoryDetails && Object.keys(selectedSubmission.categoryDetails).length > 0 && (
              <div className="p-4 rounded-2xl bg-[#161514] border border-white/10 space-y-3">
                <span className="font-syne text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                  CATEGORY &amp; DOMAIN SPECIFIC SUBMITTED FIELDS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  {Object.entries(selectedSubmission.categoryDetails).map(([key, val]) => {
                    if (val === undefined || val === null || val === "") return null;
                    const readableKey = key.replace(/([A-Z])/g, " $1").toUpperCase();
                    const formattedVal = Array.isArray(val)
                      ? val.join(", ")
                      : typeof val === "boolean"
                      ? val ? "Yes" : "No"
                      : String(val);

                    return (
                      <div key={key} className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/50 block font-syne text-[9px] uppercase tracking-wider">
                          {readableKey}
                        </span>
                        <span className="text-white font-medium whitespace-pre-line leading-snug">
                          {formattedVal}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MESSAGE BODY */}
            {selectedSubmission.message && (
              <div className="space-y-1.5">
                <span className="text-white/50 font-syne text-[10px] uppercase font-bold">SUBMITTED MESSAGE:</span>
                <p className="p-4 rounded-2xl bg-[#161514] text-white/90 leading-relaxed text-xs font-sans border border-white/5">
                  {selectedSubmission.message}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
