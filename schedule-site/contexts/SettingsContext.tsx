import React, { createContext, useState, useContext, useMemo, ReactNode, useEffect } from "react";
import type { AppSettings } from "../types";

const SETTINGS_STORAGE_KEY = "app-settings";

const DEFAULT_SETTINGS: AppSettings = {
  pastClassDimmingEnabled: true,
  pastClassDimmingPercent: 40,
  showElectiveClasses: true,
};

interface SettingsContextType {
  settings: AppSettings;
  setPastClassDimmingEnabled: (enabled: boolean) => void;
  setPastClassDimmingPercent: (percent: number) => void;
  setShowElectiveClasses: (show: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function loadSettings(): AppSettings {
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (error) {
    console.warn("Could not access localStorage to get settings.", error);
  }
  return DEFAULT_SETTINGS;
}

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn("Could not save settings to localStorage.", error);
    }
  }, [settings]);

  const setPastClassDimmingEnabled = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, pastClassDimmingEnabled: enabled }));
  };

  const setPastClassDimmingPercent = (percent: number) => {
    const clamped = Math.min(100, Math.max(0, Math.round(percent)));
    setSettings((prev) => ({ ...prev, pastClassDimmingPercent: clamped }));
  };

  const setShowElectiveClasses = (show: boolean) => {
    setSettings((prev) => ({ ...prev, showElectiveClasses: show }));
  };

  const value = useMemo(
    () => ({
      settings,
      setPastClassDimmingEnabled,
      setPastClassDimmingPercent,
      setShowElectiveClasses,
    }),
    [settings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
