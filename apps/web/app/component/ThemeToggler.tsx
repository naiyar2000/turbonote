"use client";

import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full bg-muted transition-colors"
    >
      <span
        className={`absolute h-5 w-5 transform rounded-full bg-primary transition-transform duration-300 flex items-center justify-center text-[10px] ${
          isDark ? "translate-x-6" : "translate-x-1"
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-white" />
        ) : (
          <Sun className="h-3 w-3 text-yellow-400" />
        )}
      </span>
    </button>
  );
};
