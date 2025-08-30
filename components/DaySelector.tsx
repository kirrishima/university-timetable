import React from "react";
import type { DayKey } from "../types";
import { DAY_MAP, SHORT_DAY_MAP, DAY_ORDER } from "../constants";
import useIsMobile from "../hooks/useIsMobile";

interface DaySelectorProps {
  selectedDay: DayKey | "all";
  setSelectedDay: (day: DayKey | "all") => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, setSelectedDay }) => {
  const days: (DayKey | "all")[] = [...DAY_ORDER, "all"];
  const isMobile = useIsMobile();

  const getButtonText = (day: DayKey | "all") => {
    if (day === "all") return isMobile ? "Все" : "Вся неделя";
    const dayName = DAY_MAP[day];
    // Use a more robust check for mobile viewports
    if (isMobile) {
      return SHORT_DAY_MAP[day];
    }
    return dayName;
  };

  return (
    <div className="bg-white p-2 rounded-xl shadow-sm grid grid-cols-8 md:grid-cols-7 gap-1 md:gap-2">
      {days.map((day) => {
        const isActive = selectedDay === day;
        // The "all" button spans multiple columns on mobile
        const colSpan = day === "all" ? "col-span-2 md:col-span-1" : "col-span-1 md:col-span-1";

        return (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`
              ${colSpan}
              px-3 py-2.5 w-full text-sm md:text-base font-semibold rounded-lg transition-colors duration-200
              focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2 lg:focus:ring-indigo-500
              ${isActive ? "bg-indigo-600 text-white shadow" : "text-slate-600 lg:hover:bg-slate-200"}
              ${day === "all" ? "p-2" : ""}
            `}
            title={day === "all" ? (isMobile ? "Все" : "Вся неделя") : DAY_MAP[day as DayKey]}
          >
            {getButtonText(day)}
          </button>
        );
      })}
    </div>
  );
};

export default DaySelector;
