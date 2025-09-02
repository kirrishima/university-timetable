import React, { useState } from "react";
import ScheduleScreen from "../screens/ScheduleScreen";
import ProfessorsScreen from "../screens/ProfessorsScreen";
import SettingsScreen from "../screens/SettingsScreen.tsx";
import { useTheme } from "../contexts/ThemeContext";
import type { ScheduleEntry, Professor } from "../types";
import useIsMobile from "../hooks/useIsMobile";
import BottomNavBar from "./BottomNavBar";

interface AppTabsProps {
  scheduleData: ScheduleEntry;
  professorsData: Professor[];
  onReset: () => void;
}

type Tab = "schedule" | "professors" | "settings";

const AppTabs: React.FC<AppTabsProps> = ({ scheduleData, professorsData, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");
  const { theme } = useTheme();
  const isMobile = useIsMobile(768);

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

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId as Tab);
  };

  const getTabContentClasses = (tab: Tab) => {
    const isActive = activeTab === tab;
    return isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none";
  };

  const DesktopTabs = () => (
    <div className={`sticky top-0 z-20 ${theme.colors.mainBg} shadow-sm`}>
      <div className="container mx-auto p-4 max-w-5xl">
        <div className={`${theme.colors.cardBg} p-2 rounded-xl grid grid-cols-3 gap-2 max-w-md mx-auto`}>
          <button onClick={() => setActiveTab("schedule")} className={getTabClasses("schedule")}>
            Расписание
          </button>
          <button onClick={() => setActiveTab("professors")} className={getTabClasses("professors")}>
            Преподаватели
          </button>
          <button onClick={() => setActiveTab("settings")} className={getTabClasses("settings")}>
            Настройки
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={isMobile ? "pb-20" : ""}>
      {!isMobile && <DesktopTabs />}

      <div className="grid">
        <div
          className={`transform transition-all duration-300 ease-in-out col-start-1 row-start-1 ${getTabContentClasses(
            "schedule"
          )}`}
        >
          <ScheduleScreen scheduleData={scheduleData} onReset={onReset} />
        </div>
        <div
          className={`transform transition-all duration-300 ease-in-out col-start-1 row-start-1 ${getTabContentClasses(
            "professors"
          )}`}
        >
          <ProfessorsScreen professors={professorsData} scheduleData={scheduleData} onReset={onReset} />
        </div>
        <div
          className={`transform transition-all duration-300 ease-in-out col-start-1 row-start-1 ${getTabContentClasses(
            "settings"
          )}`}
        >
          <SettingsScreen scheduleData={scheduleData} onReset={onReset} />
        </div>
      </div>

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-20">
          <BottomNavBar activeTab={activeTab} onTabClick={handleTabClick} />
        </div>
      )}
    </div>
  );
};

export default AppTabs;
