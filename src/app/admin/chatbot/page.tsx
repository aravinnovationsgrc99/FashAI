"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  MessageSquare,
  MessageCircle,
  Users,
  HelpCircle,
  Search,
  Filter,
  Eye,
  Trash2,
  Download,
  Clock,
  Send,
  UserCheck,
  CheckCircle2,
  X,
  FileText,
  Sliders,
} from "lucide-react";
import { SubmissionRecord } from "@/lib/admin/config-schema";

export default function ChatbotAdminPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<SubmissionRecord | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.warn("Error fetching chatbot records:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: SubmissionRecord["status"]) => {
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        await fetchSubmissions();
        if (selectedItem?.id === id) {
          setSelectedItem((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (e) {
      console.warn("Status update error:", e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chatbot record?")) return;
    try {
      const res = await fetch(`/api/admin/submissions?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        if (selectedItem?.id === id) setSelectedItem(null);
        await fetchSubmissions();
      }
    } catch (e) {
      console.warn("Delete error:", e);
    }
  };

  // Filter records related to Chatbot
  const chatbotSubmissions = submissions.filter(
    (s) => s.source === "CHATBOT" || s.type.startsWith("CHATBOT_")
  );

  const leads = chatbotSubmissions.filter(
    (s) => (s.fullName || s.email || s.phone) && s.email
  );

  const inquiries = chatbotSubmissions.filter(
    (s) => s.type === "CONTACT" || s.type === "CHATBOT_INQUIRY" || s.enquiryType
  );

  const applications = chatbotSubmissions.filter(
    (s) => s.type === "APPLICATION"
  );

  // Metrics for Overview
  const totalConversations = chatbotSubmissions.length;
  const newConversations = chatbotSubmissions.filter((s) => s.status === "NEW").length;
  const leadsCaptured = leads.length;
  const chatbotInquiriesCount = inquiries.length;
  const chatbotAppsCompleted = applications.length;

  const getFilteredList = () => {
    let sourceList = chatbotSubmissions;
    if (activeTab === "leads") sourceList = leads;
    if (activeTab === "inquiries") sourceList = inquiries;

    return sourceList.filter((s) => {
      const matchesStatus = statusFilter === "ALL" || s.status === statusFilter;
      const matchesSearch =
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.domain && s.domain.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.message && s.message.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesStatus && matchesSearch;
    });
  };

  const currentList = getFilteredList();

  return (
    <div className="space-y-6 font-sans select-none">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            CONCIERGE &amp; CHATBOT INTELLIGENCE
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            CHATBOT <span className="text-[#D4AF37]">MANAGEMENT</span>
          </h1>
          <p className="font-sans text-xs text-white/60">
            Real-time persisted intelligence from visitors interacting with the FashAI Chatbot.
          </p>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121110] border border-white/10 rounded-2xl shrink-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-xl font-syne text-xs font-bold uppercase transition-all ${
              activeTab === "overview"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("conversations")}
            className={`px-3.5 py-1.5 rounded-xl font-syne text-xs font-bold uppercase transition-all ${
              activeTab === "conversations"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Conversations ({totalConversations})
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={`px-3.5 py-1.5 rounded-xl font-syne text-xs font-bold uppercase transition-all ${
              activeTab === "leads"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Leads ({leadsCaptured})
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-3.5 py-1.5 rounded-xl font-syne text-xs font-bold uppercase transition-all ${
              activeTab === "inquiries"
                ? "bg-[#D4AF37] text-black shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Inquiries ({chatbotInquiriesCount})
          </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-syne font-bold uppercase text-white/50 tracking-wider">
                  TOTAL CONVERSATIONS
                </span>
                <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="font-serif-display text-3xl text-white">{totalConversations}</div>
              <div className="text-[11px] text-[#2E936F] font-syne font-semibold">
                {newConversations} New Messages
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-syne font-bold uppercase text-white/50 tracking-wider">
                  LEADS CAPTURED
                </span>
                <Users className="w-4 h-4 text-[#2E936F]" />
              </div>
              <div className="font-serif-display text-3xl text-white">{leadsCaptured}</div>
              <div className="text-[11px] text-white/50 font-syne">Contact details collected</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-syne font-bold uppercase text-white/50 tracking-wider">
                  CHATBOT INQUIRIES
                </span>
                <HelpCircle className="w-4 h-4 text-blue-400" />
              </div>
              <div className="font-serif-display text-3xl text-white">{chatbotInquiriesCount}</div>
              <div className="text-[11px] text-white/50 font-syne">General &amp; Event queries</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-syne font-bold uppercase text-white/50 tracking-wider">
                  CHATBOT APPS COMPLETED
                </span>
                <UserCheck className="w-4 h-4 text-[#F15E1C]" />
              </div>
              <div className="font-serif-display text-3xl text-white">{chatbotAppsCompleted}</div>
              <div className="text-[11px] text-white/50 font-syne">Full nominations submitted</div>
            </div>
          </div>

          {/* RECENT CHATBOT SUBMISSIONS PREVIEW */}
          <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif-display text-base uppercase text-white tracking-wider">
                RECENT CHATBOT INTERACTIONS
              </h3>
              <button
                onClick={() => setActiveTab("conversations")}
                className="text-xs font-syne text-[#D4AF37] hover:underline"
              >
                View All Conversations →
              </button>
            </div>

            {chatbotSubmissions.length === 0 ? (
              <div className="py-8 text-center text-xs font-syne text-white/50">
                No chatbot interactions recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {chatbotSubmissions.slice(0, 5).map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedItem(sub)}
                    className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 px-2 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] font-bold font-syne text-xs flex items-center justify-center shrink-0">
                        {sub.fullName ? sub.fullName.charAt(0) : "V"}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-syne font-bold text-white truncate">
                          {sub.fullName || "Anonymous Visitor"}
                        </div>
                        <div className="text-[11px] text-white/50 truncate font-sans">
                          {sub.email || sub.phone || sub.domain || "Chatbot User"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] font-mono text-white/40">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </span>
                      <span
                        className={`text-[9px] font-syne font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                          sub.status === "NEW"
                            ? "bg-[#F15E1C]/20 border-[#F15E1C] text-[#F15E1C]"
                            : "bg-[#2E936F]/20 border-[#2E936F] text-[#2E936F]"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONVERSATIONS / LEADS / INQUIRIES TABS */}
      {activeTab !== "overview" && (
        <div className="space-y-4">
          {/* SEARCH & FILTER BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F0E0D] border border-white/10">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search user name, email, or domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-xl pl-9 pr-4 py-2 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#D4AF37]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2 outline-none font-syne uppercase"
              >
                <option value="ALL">ALL STATUSES</option>
                <option value="NEW">NEW</option>
                <option value="UNDER REVIEW">UNDER REVIEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          {loading ? (
            <div className="py-16 text-center text-xs font-syne text-white/50">
              Loading records...
            </div>
          ) : currentList.length === 0 ? (
            <div className="py-16 text-center text-xs font-syne text-white/50 bg-[#0F0E0D] rounded-2xl border border-white/10">
              No records found matching criteria.
            </div>
          ) : (
            <div className="bg-[#0F0E0D] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151413] border-b border-white/10 font-syne text-white/70 uppercase">
                    <tr>
                      <th className="p-4">USER / LEAD</th>
                      <th className="p-4">TYPE &amp; DOMAIN</th>
                      <th className="p-4">SOURCE</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4">SUBMITTED</th>
                      <th className="p-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {currentList.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="font-syne font-bold text-white text-sm">
                            {item.fullName || "Anonymous User"}
                          </div>
                          <div className="text-white/60 text-[11px] font-mono">
                            {item.email || item.phone || "No direct email"}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-syne text-[10px] font-bold uppercase block w-max">
                            {item.domain || item.applicationType || item.type}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-mono text-[9px] uppercase">
                            {item.source || "CHATBOT"}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                            className="text-[10px] font-syne font-bold uppercase px-2 py-1 rounded-lg border bg-transparent outline-none border-white/20 text-white"
                          >
                            <option value="NEW" className="bg-[#0F0E0D]">NEW</option>
                            <option value="UNDER REVIEW" className="bg-[#0F0E0D]">UNDER REVIEW</option>
                            <option value="CONTACTED" className="bg-[#0F0E0D]">CONTACTED</option>
                            <option value="RESOLVED" className="bg-[#0F0E0D]">RESOLVED</option>
                            <option value="ARCHIVED" className="bg-[#0F0E0D]">ARCHIVED</option>
                          </select>
                        </td>
                        <td className="p-4 text-white/60 text-[11px]">
                          {new Date(item.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                            title="View Transcript & Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                            title="Delete"
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
        </div>
      )}

      {/* FULL RECORD & CHAT TRANSCRIPT MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0F0E0D] border border-white/20 rounded-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-syne text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">
                  CHATBOT RECORD &amp; TRANSCRIPT
                </span>
                <h3 className="font-serif-display text-lg uppercase text-white">
                  {selectedItem.fullName || "Anonymous Conversation"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#161514] border border-white/10 text-xs">
              <div>
                <span className="text-white/50 block font-syne text-[10px] uppercase">EMAIL ADDRESS:</span>
                <span className="font-mono text-white font-medium">{selectedItem.email || "N/A"}</span>
              </div>
              <div>
                <span className="text-white/50 block font-syne text-[10px] uppercase">PHONE / WHATSAPP:</span>
                <span className="font-mono text-white font-medium">{selectedItem.phone || "N/A"}</span>
              </div>
              <div>
                <span className="text-white/50 block font-syne text-[10px] uppercase">DOMAIN / CATEGORY:</span>
                <span className="font-syne text-[#D4AF37] font-bold">{selectedItem.domain || selectedItem.applicationType || "General"}</span>
              </div>
              <div>
                <span className="text-white/50 block font-syne text-[10px] uppercase">SUBMISSION DATE:</span>
                <span className="font-mono text-white/80">{new Date(selectedItem.submittedAt).toLocaleString()}</span>
              </div>
            </div>

            {/* MESSAGE / SUMMARY */}
            {selectedItem.message && (
              <div className="space-y-1 text-xs">
                <span className="text-white/50 font-syne text-[10px] uppercase">USER INQUIRY / MESSAGE:</span>
                <p className="p-3 rounded-2xl bg-[#161514] text-white/90 leading-relaxed font-sans border border-white/5">
                  {selectedItem.message}
                </p>
              </div>
            )}

            {/* CONVERSATION TRANSCRIPT HISTORY */}
            {selectedItem.conversationHistory && selectedItem.conversationHistory.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="font-syne text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                  CONVERSATION TRANSCRIPT (PRESERVED LOG)
                </span>
                <div className="space-y-2 max-h-60 overflow-y-auto p-3 rounded-2xl bg-[#080808] border border-white/10">
                  {selectedItem.conversationHistory.map((chat, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${chat.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`px-3 py-2 rounded-2xl text-xs max-w-[85%] font-sans ${
                          chat.sender === "user"
                            ? "bg-[#F15E1C] text-white"
                            : "bg-[#1C1B19] border border-white/10 text-white"
                        }`}
                      >
                        <p className="whitespace-pre-line">{chat.text}</p>
                      </div>
                      <span className="text-[8px] font-syne text-white/40 mt-0.5 px-1">
                        {chat.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
