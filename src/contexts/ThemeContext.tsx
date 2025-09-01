import React, { createContext, useState, useContext, useMemo, ReactNode, useEffect } from "react";
// FIX: Import Theme type from types.ts, not themes.ts
import { themes } from "../themes";
import type { Theme } from "../types";

interface ThemeContextType {
  theme: Theme;
  setTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<string>(() => {
    try {
      const savedTheme = window.localStorage.getItem("theme");
      if (savedTheme && themes[savedTheme]) {
        return savedTheme;
      }
    } catch (error) {
      console.warn("Could not access localStorage to get theme.", error);
    }
    return "indigo";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem("theme", themeName);
    } catch (error) {
      console.warn("Could not save theme to localStorage.", error);
    }
  }, [themeName]);

  const theme = useMemo(() => themes[themeName] || themes.indigo, [themeName]);

  const setTheme = (name: string) => {
    if (themes[name]) {
      setThemeName(name);
    }
  };

  const value = { theme, setTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
