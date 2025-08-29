import React, { createContext, useState, useEffect, useMemo, ReactNode, useContext } from 'react';
import { THEMES, Theme } from '../constants/themes';

interface ThemeContextType {
  themeName: string;
  setThemeName: (name: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<string>('Indigo'); // Default theme

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('timetable-theme');
      if (savedTheme && THEMES.find(t => t.name === savedTheme)) {
        setThemeName(savedTheme);
      }
    } catch (error) {
      console.error("Could not access local storage:", error);
    }
  }, []);

  useEffect(() => {
    const selectedTheme = THEMES.find(t => t.name === themeName);
    if (selectedTheme) {
      try {
        localStorage.setItem('timetable-theme', themeName);
      } catch (error) {
        console.error("Could not access local storage:", error);
      }
      
      for (const [key, value] of Object.entries(selectedTheme.colors)) {
        document.documentElement.style.setProperty(key, value);
      }
    }
  }, [themeName]);

  const value = useMemo(() => ({
    themeName,
    setThemeName,
    themes: THEMES
  }), [themeName]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
