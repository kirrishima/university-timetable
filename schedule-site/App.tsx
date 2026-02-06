
import React, { useEffect, useRef } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { ModalProvider } from "./contexts/ModalContext";
import { useSchedule } from "./hooks/useSchedule";
import SetupScreen from "./screens/SetupScreen";
import { ALL_SCHEDULES } from "./data/schedules";
import type { ScheduleEntry, Theme } from "./types";
import AppTabs from "./components/AppTabs";
import { ALL_PROFESSORS } from "./data/professors";

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const { selectedSchedule, saveSchedule, clearSchedule } = useSchedule();
  const previousThemeRef = useRef<Theme | null>(null);

  useEffect(() => {
    const body = document.body;

    if (previousThemeRef.current) {
      body.classList.remove(previousThemeRef.current.colors.mainBg, previousThemeRef.current.colors.mainText);
    }

    body.classList.add(theme.colors.mainBg, theme.colors.mainText);

    previousThemeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.setAttribute('name', 'theme-color');
      document.head.appendChild(themeColorMeta);
    }
    
    themeColorMeta.setAttribute('content', theme.themeColorHex);

  }, [theme]);

  const scheduleData: ScheduleEntry | undefined = React.useMemo(() => {
    if (!selectedSchedule) return undefined;
    return ALL_SCHEDULES.find(
      (s) =>
        s.faculty === selectedSchedule.faculty &&
        s.course === selectedSchedule.course &&
        s.group === selectedSchedule.group &&
        s.subgroup === selectedSchedule.subgroup &&
        s.universityName === selectedSchedule.universityName &&
        s.semester === selectedSchedule.semester
    );
  }, [selectedSchedule]);

  const professorsData = React.useMemo(() => {
    if (!scheduleData) return [];
    return ALL_PROFESSORS.find((p) => p.faculty === scheduleData.faculty)?.professors || [];
  }, [scheduleData]);

  const handleScheduleSelect = (schedule: ScheduleEntry) => {
    const { schedule: _, ...identifier } = schedule;
    saveSchedule(identifier);
  };

  const handleReset = () => {
    clearSchedule();
  };

  return (
    <div className="min-h-screen">
      {scheduleData ? (
        <AppTabs scheduleData={scheduleData} professorsData={professorsData} onReset={handleReset} />
      ) : (
        <SetupScreen onScheduleSelect={handleScheduleSelect} />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  </ThemeProvider>
);

export default App;
