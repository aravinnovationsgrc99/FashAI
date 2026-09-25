"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  User,
  ExternalLink,
  X,
  Mail,
  Phone,
  Briefcase,
  Globe,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface ApplicationRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "NEW" | "UNDER REVIEW" | "CONTACTED" | "ARCHIVED";
  date: string;
  portfolio: string;
  experience: string;
  bio: string;
  socials: string;
}

export default function ApplicationManagerPage() {
  const { showToast } = useSiteConfig();
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "NEW" | "UNDER REVIEW" | "CONTACTED" | "ARCHIVED">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.submissions) && data.submissions.length > 0) {
          const mapped: ApplicationRecord[] = data.submissions.map((sub: any, idx: number) => ({
            id: sub.id || `app-${idx}`,
            name: sub.name || sub.fullName || "Fashion Candidate",
            email: sub.email || "candidate@fashai.com",
            phone: sub.phone || "+971 50 123 4567",
            role: sub.category || sub.role || "Talent Intake",
            status: (sub.status as any) || (idx % 3 === 0 ? "NEW" : idx % 3 === 1 ? "UNDER REVIEW" : "CONTACTED"),
            date: sub.timestamp ? new Date(sub.timestamp).toLocaleDateString() : "Sep 2026",
            portfolio: sub.portfolio || "https://portfolio.fashai.com/view",
            experience: sub.experience || "5+ years in high-fashion editorial & runway",
            bio: sub.message || sub.bio || "Experienced candidate seeking nomination in FashAI Universal 2026.",
            socials: "@fashai_candidate",
          }));
          setApplications(mapped);
        } else {
          // Provide realistic mock data if submissions are empty
          setApplications(DEFAULT_MOCK_APPLICATIONS);
        }
      } else {
        setApplications(DEFAULT_MOCK_APPLICATIONS);
      }
    } catch {
      setApplications(DEFAULT_MOCK_APPLICATIONS);
    } finally {
      setLoading(false);
    }
  };

  const DEFAULT_MOCK_APPLICATIONS: ApplicationRecord[] = [
    {
      id: "app-101",
      name: "Sophia Laurent",
      email: "sophia.l@couture.com",
      phone: "+33 6 12 34 56 78",
      role: "Haute Couture Designer",
      status: "NEW",
      date: "Sep 24, 2026",
      portfolio: "https://sophialaurent.design",
      experience: "7 years Paris Fashion Week",
      bio: "Specializing in 3D generative textiles and sustainable bridal wear.",
      socials: "@sophialaurent_official",
    },
    {
      id: "app-102",
      name: "Aarav Sharma",
      email: "aarav.stylist@fashai.org",
      phone: "+91 98765 43210",
      role: "AI Runway Stylist",
      status: "UNDER REVIEW",
      date: "Sep 23, 2026",
      portfolio: "https://aaravsharma.style",
      experience: "Featured in Vogue India & GQ",
      bio: "Curator of virtual avatars and physical runway hybrid showcases.",
      socials: "@aarav_stylist",
    },
    {
      id: "app-103",
      name: "Elena Rostova",
      email: "elena.r@modelling.ae",
      phone: "+971 52 987 6543",
      role: "Editorial Fashion Model",
      status: "CONTACTED",
      date: "Sep 22, 2026",
      portfolio: "https://elenarostova.model",
      experience: "Dubai Fashion Week Main Stage",
      bio: "Professional haute couture runway model available for October 2026 Dubai event.",
      socials: "@elena_rostova",
    },
    {
      id: "app-104",
      name: "Marcus Sterling",
      email: "marcus@sterlingmedia.co.uk",
      phone: "+44 20 7946 0912",
      role: "Fashion Photographer",
      status: "ARCHIVED",
      date: "Sep 15, 2026",
      portfolio: "https://marcussterling.photography",
      experience: "10+ years commercial campaign coverage",
      bio: "High-contrast editorial lighting specialist.",
      socials: "@marcussterling_photo",
    },
  ];

  const updateAppStatus = (id: string, newStatus: ApplicationRecord["status"]) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    showToast(`✓ Marked applicant as ${newStatus}`, "info");
  };

  // Counts for summary pills
  const counts = {
    NEW: applications.filter((a) => a.status === "NEW").length,
    UNDER_REVIEW: applications.filter((a) => a.status === "UNDER REVIEW").length,
    CONTACTED: applications.filter((a) => a.status === "CONTACTED").length,
    ARCHIVED: applications.filter((a) => a.status === "ARCHIVED").length,
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 select-none font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            TALENT INTAKE
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            TALENT <span className="text-[#D4AF37]">APPLICATIONS</span>
          </h1>
          <p className="font-sans text-xs text-white/60">
            Review candidates, review portfolio submissions, and manage candidate nomination pipelines.
          </p>
        </div>
      </div>

      {/* TOP SUMMARY STATUS PILLS (Section 14) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter("NEW")}
          className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between ${
            statusFilter === "NEW"
              ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
              : "bg-[#0F0E0D] border-white/10 text-white/70 hover:text-white"
          }`}
        >
          <div>
            <div className="text-[10px] font-syne font-bold uppercase tracking-wider">NEW</div>
            <div className="font-serif-display text-xl text-white">{counts.NEW}</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
        </button>

        <button
          onClick={() => setStatusFilter("UNDER REVIEW")}
          className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between ${
            statusFilter === "UNDER REVIEW"
              ? "bg-blue-500/20 border-blue-500 text-blue-400"
              : "bg-[#0F0E0D] border-white/10 text-white/70 hover:text-white"
          }`}
        >
          <div>
            <div className="text-[10px] font-syne font-bold uppercase tracking-wider">UNDER REVIEW</div>
            <div className="font-serif-display text-xl text-white">{counts.UNDER_REVIEW}</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-blue-400" />
        </button>

        <button
          onClick={() => setStatusFilter("CONTACTED")}
          className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between ${
            statusFilter === "CONTACTED"
              ? "bg-[#2E936F]/20 border-[#2E936F] text-[#2E936F]"
              : "bg-[#0F0E0D] border-white/10 text-white/70 hover:text-white"
          }`}
        >
          <div>
            <div className="text-[10px] font-syne font-bold uppercase tracking-wider">CONTACTED</div>
            <div className="font-serif-display text-xl text-white">{counts.CONTACTED}</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#2E936F]" />
        </button>

        <button
          onClick={() => setStatusFilter("ARCHIVED")}
          className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between ${
            statusFilter === "ARCHIVED"
              ? "bg-white/20 border-white/40 text-white"
              : "bg-[#0F0E0D] border-white/10 text-white/70 hover:text-white"
          }`}
        >
          <div>
            <div className="text-[10px] font-syne font-bold uppercase tracking-wider">ARCHIVED</div>
            <div className="font-serif-display text-xl text-white">{counts.ARCHIVED}</div>
          </div>
          <span className="w-2 h-2 rounded-full bg-white/40" />
        </button>
      </div>

      {/* SEARCH AND FILTER BAR (Section 14) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#0F0E0D] border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate name, role or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1918] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {statusFilter !== "ALL" && (
          <button
            onClick={() => setStatusFilter("ALL")}
            className="text-xs font-syne text-[#D4AF37] hover:underline"
          >
            Clear Filter (Show All {applications.length})
          </button>
        )}
      </div>

      {/* APPLICATIONS LIST */}
      {loading ? (
        <div className="py-16 text-center text-xs font-syne text-white/50">
          Loading candidate applications...
        </div>
      ) : filteredApps.length === 0 ? (
        /* EMPTY STATE (Section 21) */
        <div className="py-16 text-center bg-[#0F0E0D] border border-white/10 rounded-2xl space-y-3 p-6">
          <FileText className="w-8 h-8 text-white/20 mx-auto" />
          <div className="font-syne text-xs font-bold text-white uppercase tracking-wider">
            NO APPLICATIONS YET
          </div>
          <p className="text-xs text-white/50 font-sans max-w-sm mx-auto">
            New talent nominations and application submissions will automatically appear here.
          </p>
        </div>
      ) : (
        <div className="bg-[#0F0E0D] border border-white/10 rounded-2xl overflow-hidden shadow-md">
          <div className="divide-y divide-white/5">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-white/10 text-[#D4AF37] font-bold font-syne flex items-center justify-center shrink-0">
                    {app.name.charAt(0)}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-syne font-bold text-white text-xs sm:text-sm truncate">
                        {app.name}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">({app.role})</span>
                    </div>
                    <div className="text-[11px] text-white/50 truncate font-sans">
                      {app.email} • {app.experience}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <span className="text-[10px] font-mono text-white/40">{app.date}</span>
                  <span
                    className={`text-[9px] font-syne font-bold uppercase px-3 py-1 rounded-full border ${
                      app.status === "NEW"
                        ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                        : app.status === "UNDER REVIEW"
                        ? "bg-blue-500/20 border-blue-500 text-blue-400"
                        : app.status === "CONTACTED"
                        ? "bg-[#2E936F]/20 border-[#2E936F] text-[#2E936F]"
                        : "bg-white/10 border-white/20 text-white/50"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPLICATION DETAIL PROFILE DRAWER (Section 15) */}
      {selectedApp && (
        <div className="fixed inset-y-0 right-0 z-[250] w-full max-w-md bg-[#11100F] border-l border-white/20 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-syne text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">
                  APPLICANT PROFILE
                </span>
                <h3 className="font-serif-display text-xl text-white uppercase">
                  {selectedApp.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* PERSONAL & PROFESSIONAL INFORMATION */}
            <div className="space-y-3">
              <div className="p-4 bg-[#1A1918] border border-white/10 rounded-2xl space-y-2">
                <div className="text-xs font-syne font-bold text-[#D4AF37] uppercase">
                  APPLICATION ROLE: {selectedApp.role}
                </div>
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  {selectedApp.bio}
                </p>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="flex items-center justify-between p-2.5 bg-black/40 rounded-xl border border-white/5">
                  <span className="text-white/50 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> Email
                  </span>
                  <a href={`mailto:${selectedApp.email}`} className="text-white hover:text-[#D4AF37]">
                    {selectedApp.email}
                  </a>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-black/40 rounded-xl border border-white/5">
                  <span className="text-white/50 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#F15E1C]" /> Phone
                  </span>
                  <span className="text-white">{selectedApp.phone}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-black/40 rounded-xl border border-white/5">
                  <span className="text-white/50 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#2E936F]" /> Experience
                  </span>
                  <span className="text-white font-medium">{selectedApp.experience}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-black/40 rounded-xl border border-white/5">
                  <span className="text-white/50 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-blue-400" /> Portfolio Link
                  </span>
                  <a
                    href={selectedApp.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D4AF37] hover:underline flex items-center gap-1"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* STATUS PIPELINE ACTIONS */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-white/50">
                UPDATE APPLICANT STATUS
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateAppStatus(selectedApp.id, "UNDER REVIEW")}
                  className="py-2 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-syne text-xs font-bold hover:bg-blue-500/30"
                >
                  MARK REVIEWED
                </button>
                <button
                  onClick={() => updateAppStatus(selectedApp.id, "CONTACTED")}
                  className="py-2 rounded-xl bg-[#2E936F]/20 border border-[#2E936F]/40 text-[#2E936F] font-syne text-xs font-bold hover:bg-[#2E936F]/30"
                >
                  CONTACTED
                </button>
                <button
                  onClick={() => updateAppStatus(selectedApp.id, "ARCHIVED")}
                  className="col-span-2 py-2 rounded-xl bg-white/10 border border-white/20 text-white/70 font-syne text-xs font-bold hover:bg-white/20"
                >
                  ARCHIVE APPLICANT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
