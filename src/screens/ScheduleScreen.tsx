
import React, { useState } from "react";
import Header from "../components/Header";
import DaySelector from "../components/DaySelector";
import ScheduleView from "../components/ScheduleView";
import Controls from "../components/Controls";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useUniversityWeek } from "../hooks/useUniversityWeek";
import { ENABLE_STUDY_WEEKS } from "../constants";
import type { DayKey, WeekType, ScheduleEntry } from "../types";

interface ScheduleScreenProps {
  scheduleData: ScheduleEntry;
  onReset: () => void;
}

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({ scheduleData, onReset }) => {
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
  
  const scheduleTitle = `${scheduleData.faculty}, ${scheduleData.course} курс, группа ${scheduleData.group}${scheduleData.subgroup ? ` (${scheduleData.subgroup})` : ''}`;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <Header 
        formattedDate={formattedDate} 
        weekTypeString={weekTypeString}
        scheduleTitle={scheduleTitle}
        onReset={onReset}
      />
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
          schedule={scheduleData.schedule}
          viewMode={viewMode}
          selectedDay={selectedDay}
          currentAcademicWeek={currentAcademicWeek}
          displayWeek={displayWeek}
        />
      </main>
      <footer className="text-center mt-12 text-sm">
        <ThemeSwitcher />
      </footer>
    </div>
  );
}

export default ScheduleScreen;
