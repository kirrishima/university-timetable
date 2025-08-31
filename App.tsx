
import React, { useState } from "react";
import Header from "./components/Header";
import DaySelector from "./components/DaySelector";
import ScheduleView from "./components/ScheduleView";
import Controls from "./components/Controls";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useUniversityWeek } from "./hooks/useUniversityWeek";
import { SCHEDULE_DATA, ENABLE_STUDY_WEEKS } from "./constants";
import type { DayKey, WeekType } from "./types";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const { formattedDate, weekType: currentAcademicWeek, weekTypeString, currentDayKey } = useUniversityWeek();

  const [selectedDay, setSelectedDay] = useState<DayKey | "all">(currentDayKey);
  const [displayWeek, setDisplayWeek] = useState<WeekType>(currentAcademicWeek);
  const [viewMode, setViewMode] = useState<"single" | "both">("single");

  const handleViewModeChange = (newMode: "single" | "both") => {
    setViewMode(newMode);
    if (newMode === "single" && !displayWeek) {
      setDisplayWeek(currentAcademicWeek);
    }
  };

  return (
    <div className={`min-h-screen font-sans ${theme.colors.mainBg} ${theme.colors.mainText} transition-colors duration-300`}>
      <div className="container mx-auto p-4 md:p-8 max-w-5xl">
        <Header formattedDate={formattedDate} weekTypeString={weekTypeString} />
        <main className="mt-8">
          <div className="space-y-4">
            {ENABLE_STUDY_WEEKS && (
              <Controls
                viewMode={viewMode}
                setViewMode={handleViewModeChange}
                displayWeek={displayWeek}
                setDisplayWeek={setDisplayWeek}
                currentAcademicWeek={currentAcademicWeek}
              />
            )}
            <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          </div>
          <ScheduleView
            schedule={SCHEDULE_DATA}
            viewMode={viewMode}
            selectedDay={selectedDay}
            currentAcademicWeek={currentAcademicWeek}
            displayWeek={displayWeek}
          />
        </main>
        <footer className="text-center mt-12 text-sm">
          <ThemeSwitcher />
          <p className={`${theme.colors.mutedText} mt-6`}>Разработано для "современного" университета</p>
        </footer>
      </div>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
