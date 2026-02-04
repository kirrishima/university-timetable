
import React from "react";
import type { DayKey } from "../types";
import { DAY_MAP, SHORT_DAY_MAP, DAY_ORDER } from "../constants";
import useIsMobile from "../hooks/useIsMobile";
import { useTheme } from "../contexts/ThemeContext";

interface DaySelectorProps {
  selectedDay: DayKey | "all";
  setSelectedDay: (day: DayKey | "all") => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, setSelectedDay }) => {
  const { theme } = useTheme();
  const days: (DayKey | "all")[] = [...DAY_ORDER, "all"];
  const isMobile = useIsMobile();

  const getButtonText = (day: DayKey | "all") => {
    if (day === "all") return isMobile ? "Все" : "Вся неделя";
    return isMobile ? SHORT_DAY_MAP[day] : DAY_MAP[day];
  };

  return (
    <div className={`${theme.colors.cardBg} p-2 rounded-xl shadow-sm grid custom-selectday-grid md:grid-cols-7 gap-1 md:gap-2`}>
      {days.map((day) => {
        const isActive = selectedDay === day;
        const colSpan = day === "all" ? "col-span-1" : "col-span-1";

        return (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`
              ${colSpan} md:col-span-1
              px-0 py-2.5 w-full text-sm md:text-base font-semibold rounded-lg transition-colors duration-200
              focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2 ${theme.colors.ring}
              ${isActive ? `${theme.colors.primary} ${theme.colors.primaryText} shadow` : `${theme.colors.secondaryText} lg:${theme.colors.button.hoverBg}`}
            `}
            title={day === "all" ? getButtonText("all") : DAY_MAP[day as DayKey]}
          >
            {getButtonText(day)}
          </button>
        );
      })}
    </div>
  );
};

export default DaySelector;
