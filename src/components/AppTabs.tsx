import React, { useState } from "react";
import ScheduleScreen from "../screens/ScheduleScreen";
import ProfessorsScreen from "../screens/ProfessorsScreen";
import { useTheme } from "../contexts/ThemeContext";
import type { ScheduleEntry, Professor } from "../types";

interface AppTabsProps {
  scheduleData: ScheduleEntry;
  professorsData: Professor[];
  onReset: () => void;
}

type Tab = "schedule" | "professors";

const AppTabs: React.FC<AppTabsProps> = ({ scheduleData, professorsData, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");
  const { theme } = useTheme();

  const getTabClasses = (tab: Tab) => {
    const isActive = activeTab === tab;
    return `
            w-full py-3 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none 
            lg:focus:ring-2 lg:focus:ring-offset-2 ${theme.colors.ring}
            ${
              isActive
                ? `${theme.colors.primary} ${theme.colors.primaryText} shadow`
                : `${theme.colors.secondaryText} lg:${theme.colors.button.hoverBg}`
            }
        `;
  };

  return (
    <div>
      <div className={`sticky top-0 z-20 ${theme.colors.mainBg} shadow-sm`}>
        <div className="container mx-auto p-4 max-w-5xl">
          <div className={`${theme.colors.cardBg} p-2 rounded-xl grid grid-cols-2 gap-2`}>
            <button onClick={() => setActiveTab("schedule")} className={getTabClasses("schedule")}>
              Расписание
            </button>
            <button onClick={() => setActiveTab("professors")} className={getTabClasses("professors")}>
              Преподаватели
            </button>
          </div>
        </div>
      </div>

      <div className={activeTab === "schedule" ? "block" : "hidden"}>
        <ScheduleScreen scheduleData={scheduleData} onReset={onReset} />
      </div>
      <div className={activeTab === "professors" ? "block" : "hidden"}>
        <ProfessorsScreen professors={professorsData} scheduleData={scheduleData} onReset={onReset} />
      </div>
    </div>
  );
};

export default AppTabs;
