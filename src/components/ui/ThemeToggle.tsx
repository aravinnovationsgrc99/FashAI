"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  isHeroHeader?: boolean;
}

export default function ThemeToggle({ className = "", isHeroHeader = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-11 h-11 rounded-full border transition-all duration-300 flex items-center justify-center p-0 group aspect-square ${
        isHeroHeader || theme === "dark"
          ? "bg-black/60 border-brand-yellow-golden/60 text-brand-yellow-golden hover:border-brand-yellow-golden hover:shadow-[0_0_15px_rgba(250,182,10,0.4)]"
          : "bg-black/5 border-brand-yellow-golden/60 text-black hover:border-brand-yellow-golden hover:shadow-[0_0_15px_rgba(250,182,10,0.4)]"
      } ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4.5 h-4.5 transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="w-4.5 h-4.5 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
