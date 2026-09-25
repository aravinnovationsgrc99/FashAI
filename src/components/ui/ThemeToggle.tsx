"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  isHeroHeader?: boolean;
  inMobileMenu?: boolean;
}

export default function ThemeToggle({
  className = "",
  isHeroHeader = false,
  inMobileMenu = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  if (inMobileMenu) {
    return (
      <button
        onClick={toggleTheme}
        className={`mobile-menu-toggle w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/45 dark:border-white/20 bg-[#D4AF37]/10 dark:bg-white/15 text-[#D4AF37] dark:text-white hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center p-0 group shrink-0 shadow-sm ${className}`}
        aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45 text-[#D4AF37]" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 text-[#D4AF37] dark:text-white" />
        )}
      </button>
    );
  }

  if (isHeroHeader) {
    return (
      <button
        onClick={toggleTheme}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/45 dark:border-white/20 bg-[#D4AF37]/10 dark:bg-white/10 text-[#D4AF37] dark:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all duration-300 flex items-center justify-center p-0 group shrink-0 shadow-sm ${className}`}
        aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45 text-[#D4AF37]" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 text-[#D4AF37] dark:text-white" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/45 dark:border-white/20 bg-[#D4AF37]/10 dark:bg-white/10 text-[#D4AF37] dark:text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all duration-300 flex items-center justify-center p-0 group shrink-0 shadow-sm ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45 text-[#D4AF37]" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 text-[#D4AF37] dark:text-white" />
      )}
    </button>
  );
}
