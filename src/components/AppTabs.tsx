import React, { useEffect, useRef, useState } from "react";
import ScheduleScreen from "../screens/ScheduleScreen";
import ProfessorsScreen from "../screens/ProfessorsScreen";
import SettingsScreen from "../screens/SettingsScreen";
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

  // Хранилище позиций скролла для каждой вкладки
  const scrollPositions = useRef<Record<Tab, number>>({
    schedule: 0,
    professors: 0,
    settings: 0,
  });

  // Если переключение происходит не через handleTabClick (например, программно),
  // эффект всё равно восстановит позицию при изменении activeTab.
  useEffect(() => {
    // Дважды RAF — ждем рендера/paint, затем ставим scroll
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        const y = scrollPositions.current[activeTab] ?? 0;
        // восстанавливаем позицию (без smooth, чтобы не было прокрутки)
        window.scrollTo({ top: y, left: 0, behavior: "auto" });
        cancelAnimationFrame(raf2);
      });
      cancelAnimationFrame(raf1);
    });

    // safety fallback
    const t = window.setTimeout(() => {
      const y = scrollPositions.current[activeTab] ?? 0;
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
      clearTimeout(t);
    }, 200);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(t);
    };
  }, [activeTab]);

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
    const nextTab = tabId as Tab;
    // Сохраняем текущую позицию скролла для текущей активной вкладки
    try {
      scrollPositions.current[activeTab] = window.scrollY || window.pageYOffset || 0;
    } catch {
      // noop — если доступ к window запрещён (SSR), просто игнорируем
    }

    // Переключаем вкладку — эффект выше восстановит позицию для nextTab
    setActiveTab(nextTab);
  };

  const getTabContentClasses = (tab: Tab) => {
    const isActive = activeTab === tab;
    return isActive
      ? "relative block  opacity-100 scale-100"
      : "absolute hidden  overflow-hidden top-0 left-0 w-full opacity-0 scale-95 pointer-events-none";
  };

  const DesktopTabs = () => (
    <div className={`sticky top-0 z-20 ${theme.colors.mainBg} shadow-sm`}>
      <div className="container mx-auto p-4 max-w-5xl">
        <div className={`${theme.colors.cardBg} p-2 rounded-xl grid grid-cols-3 gap-2 max-w-md mx-auto`}>
          <button onClick={() => handleTabClick("schedule")} className={getTabClasses("schedule")}>
            Расписание
          </button>
          <button onClick={() => handleTabClick("professors")} className={getTabClasses("professors")}>
            Преподаватели
          </button>
          <button onClick={() => handleTabClick("settings")} className={getTabClasses("settings")}>
            Настройки
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={isMobile ? "pb-20" : ""}>
      {!isMobile && <DesktopTabs />}

      <div className="relative">
        <div className={`transform transition-all duration-300 ease-in-out ${getTabContentClasses("schedule")}`}>
          <ScheduleScreen scheduleData={scheduleData} onReset={onReset} />
        </div>
        <div className={`transform transition-all duration-300 ease-in-out ${getTabContentClasses("professors")}`}>
          <ProfessorsScreen professors={professorsData} scheduleData={scheduleData} onReset={onReset} />
        </div>
        <div className={`transform transition-all duration-300 ease-in-out ${getTabContentClasses("settings")}`}>
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
