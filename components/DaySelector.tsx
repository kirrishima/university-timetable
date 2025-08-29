import React from 'react';
import type { DayKey } from '../types';
import { DAY_MAP, DAY_ORDER } from '../constants';

interface DaySelectorProps {
  selectedDay: DayKey | 'all';
  setSelectedDay: (day: DayKey | 'all') => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDay, setSelectedDay }) => {
  const days: (DayKey | 'all')[] = [...DAY_ORDER, 'all'];

  const getButtonText = (day: DayKey | 'all') => {
    if (day === 'all') return 'Вся неделя';
    const dayName = DAY_MAP[day];
    // Use a more robust check for mobile viewports
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return dayName.substring(0, 2);
    }
    return dayName;
  }

  return (
    <div className="bg-white p-2 rounded-xl shadow-sm grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-2">
      {days.map((day) => {
        const isActive = selectedDay === day;
        // The "all" button spans multiple columns on mobile
        const colSpan = day === 'all' ? 'col-span-4 md:col-span-1' : 'col-span-2 md:col-span-1';

        return (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`
              ${colSpan}
              px-3 py-2.5 w-full text-sm md:text-base font-semibold rounded-lg transition-colors duration-200
              focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2 lg:focus:ring-indigo-500
              ${
                isActive
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-600 lg:hover:bg-slate-200'
              }
            `}
            title={day === 'all' ? 'Вся неделя' : DAY_MAP[day as DayKey]}
          >
            {getButtonText(day)}
          </button>
        );
      })}
    </div>
  );
};

export default DaySelector;