"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Image, Calendar, FileText, Layout, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface SearchResult {
  id: string;
  title: string;
  category: "CONTENT" | "EVENTS" | "MEDIA" | "PEOPLE" | "DESIGN";
  href: string;
  subtitle: string;
}

export function GlobalAdminSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { config } = useSiteConfig();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buildSearchIndex = (): SearchResult[] => {
    const items: SearchResult[] = [
      { id: "s-dash", title: "Dashboard", category: "CONTENT", href: "/admin", subtitle: "Main Overview & Quick Actions" },
      { id: "s-home", title: "Homepage Builder", category: "CONTENT", href: "/admin/homepage", subtitle: "Edit Hero, What We Do, Disciplines" },
      { id: "s-hero", title: "Hero Control", category: "CONTENT", href: "/admin/hero", subtitle: "Video, Headline, CTA buttons" },
      { id: "s-media", title: "Media Library", category: "MEDIA", href: "/admin/media", subtitle: "Upload & Manage Site Images" },
      { id: "s-video", title: "Video Library", category: "MEDIA", href: "/admin/video", subtitle: "Manage Hero & Background Videos" },
      { id: "s-gallery", title: "Gallery Manager", category: "MEDIA", href: "/admin/gallery", subtitle: "Manage Grid Images & Categories" },
      { id: "s-events", title: "Events Manager", category: "EVENTS", href: "/admin/events", subtitle: "LifeStyle 2026, Runway, Shows" },
      { id: "s-popup", title: "Event Popup", category: "EVENTS", href: "/admin/popup", subtitle: "Manage Homepage Event Modal" },
      { id: "s-[#apps]", title: "Talent Applications", category: "PEOPLE", href: "/admin/applications", subtitle: "Review Submissions & Candidates" },
      { id: "s-[#subs]", title: "Form Submissions", category: "PEOPLE", href: "/admin/submissions", subtitle: "Contact Us & Inquiry Data" },
      { id: "s-theme", title: "Theme & Colors", category: "DESIGN", href: "/admin/theme", subtitle: "Light/Dark Mode, Brand Palette" },
      { id: "s-nav", title: "Navigation Control", category: "DESIGN", href: "/admin/navigation", subtitle: "Header Menu & Pill Button" },
      { id: "s-footer", title: "Footer Control", category: "DESIGN", href: "/admin/footer", subtitle: "Links, Copyright & Social Icons" },
      { id: "s-web", title: "Website Status & Maintenance", category: "CONTENT", href: "/admin/website", subtitle: "Toggle Online / Maintenance Mode" },
      { id: "s-backups", title: "Backups & Restore", category: "CONTENT", href: "/admin/backups", subtitle: "Save & Load Site Snapshots" },
    ];

    // Append dynamic events from config
    if (config?.events) {
      config.events.forEach((ev) => {
        items.push({
          id: `ev-${ev.id}`,
          title: ev.title,
          category: "EVENTS",
          href: "/admin/events",
          subtitle: `Event in ${ev.location} (${ev.status})`,
        });
      });
    }

    return items;
  };

  const results = query.trim()
    ? buildSearchIndex().filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (href: string) => {
    setQuery("");
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-white/40 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search anything (media, events, pages, applications)..."
          className="w-full bg-[#181716] border border-white/12 rounded-2xl pl-10 pr-9 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all font-sans shadow-inner"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 text-white/40 hover:text-white transition-colors p-0.5 rounded-full hover:bg-white/10"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* SEARCH RESULTS DROPDOWN */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-[#121110] border border-white/20 rounded-3xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2 border-b border-white/10 text-[10px] font-syne uppercase tracking-[0.2em] text-[#D4AF37] font-bold px-3 flex items-center justify-between">
            <span>Search Results</span>
            <span className="font-mono text-white/50 text-[9px] bg-white/10 px-2 py-0.5 rounded-full">{results.length} found</span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-white/5 custom-scrollbar p-1">
            {results.length > 0 ? (
              results.map((res) => (
                <button
                  key={res.id}
                  onClick={() => handleSelect(res.href)}
                  className="w-full px-3.5 py-3 rounded-2xl flex items-center justify-between text-left hover:bg-white/8 transition-all group my-0.5"
                >
                  <div className="min-w-0 pr-3 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white font-medium group-hover:text-[#D4AF37] transition-colors truncate">
                        {res.title}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/60 uppercase border border-white/10">
                        {res.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/50 truncate font-sans">{res.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-white/40 font-sans">
                No matching admin pages or content found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
