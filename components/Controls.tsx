import React from 'react';
import { WeekType } from '../types';

interface ControlsProps {
  viewMode: 'single' | 'both';
  setViewMode: (mode: 'single' | 'both') => void;
  displayWeek: WeekType;
  setDisplayWeek: (week: WeekType) => void;
  currentAcademicWeek: WeekType;
}

const Controls: React.FC<ControlsProps> = ({
  viewMode,
  setViewMode,
  displayWeek,
  setDisplayWeek,
  currentAcademicWeek,
}) => {
  const isSingleMode = viewMode === 'single';

  const getButtonClasses = (week: WeekType): string => {
    const isActive = isSingleMode && displayWeek === week;
    
    if (!isSingleMode) {
      return 'bg-slate-100 text-slate-400 cursor-not-allowed';
    }
    if (isActive) {
      return 'bg-indigo-600 text-white shadow'; // Active button, no hover change
    }
    return 'text-slate-600 lg:hover:bg-slate-200'; // Inactive button with hover
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Week Selector */}
      <div className="w-full sm:w-auto flex items-center gap-2" role="radiogroup" aria-label="Выберите учебную неделю">
        {(['first', 'second'] as WeekType[]).map((week) => (
          <button
            key={week}
            onClick={() => setDisplayWeek(week)}
            disabled={!isSingleMode}
            className={`
              w-full px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap
              focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2 lg:focus:ring-indigo-500
              ${getButtonClasses(week)}
              ${week === currentAcademicWeek ? 'relative' : ''}
            `}
            role="radio"
            aria-checked={isSingleMode && displayWeek === week}
          >
            {week === 'first' ? '1-ая неделя' : '2-ая неделя'}
            {week === currentAcademicWeek && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 border-2 border-white text-white text-[10px] items-center justify-center font-bold">
                  !
                </span>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="w-full sm:w-auto flex items-center justify-end gap-3">
        <label htmlFor="view-toggle" className="text-sm font-medium text-slate-700 whitespace-nowrap">
          Показать обе недели
        </label>
        <button
            id="view-toggle"
            role="switch"
            aria-checked={!isSingleMode}
            onClick={() => setViewMode(isSingleMode ? 'both' : 'single')}
            className={`relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none lg:focus:ring-2 lg:focus:ring-indigo-500 lg:focus:ring-offset-2
            ${!isSingleMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
        >
          <span
            aria-hidden="true"
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out 
            ${!isSingleMode ? 'translate-x-5' : 'translate-x-0'}`}
          />
        </button>
      </div>
    </div>
  );
};

export default Controls;