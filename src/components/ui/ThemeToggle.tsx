"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  isHeroHeader?: boolean;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-300 flex items-center justify-center p-0 group shrink-0 ${
        theme === "dark"
          ? "bg-white/10 border-white/15 text-[#FAB60A] hover:border-[#FAB60A] hover:bg-white/15 shadow-sm"
          : "bg-black/5 border-black/10 text-[#111111] hover:border-[#F15E1C] hover:text-[#F15E1C] shadow-sm"
      } ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45 text-[#FAB60A]" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 text-[#111111]" />
      )}
    </button>
  );
}
