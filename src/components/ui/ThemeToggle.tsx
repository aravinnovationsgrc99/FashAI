"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2.5 rounded-full border transition-all duration-300 min-w-[40px] min-h-[40px] flex items-center justify-center ${
        theme === "dark"
          ? "bg-brand-void/90 border-brand-orange/40 text-brand-yellow-golden hover:text-brand-orange hover:border-brand-orange"
          : "bg-white border-brand-orange/40 text-brand-orange hover:bg-brand-peach/20 hover:border-brand-orange shadow-sm"
      } ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
