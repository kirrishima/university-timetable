
import React from 'react';
import type { ScheduleSlot, DayKey, Schedule, WeekType } from '../types';
import ClassCard from './ClassCard';
import PairedClassCard from './PairedClassCard';
import { DAY_MAP, DAY_ORDER } from '../constants';

interface ScheduleViewProps {
  schedule: Schedule;
  viewMode: 'single' | 'both';
  selectedDay: DayKey | 'all';
  currentAcademicWeek: WeekType;
  displayWeek: WeekType;
}

const EmptyState: React.FC = () => (
  <div className="mt-6 text-center bg-white p-8 rounded-xl shadow-sm">
    <svg xmlns="http://www.w.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <h3 className="mt-2 text-lg font-medium text-slate-900">Свободный день</h3>
    <p className="mt-1 text-sm text-slate-500">Нет запланированных занятий.</p>
  </div>
);

const ScheduleView: React.FC<ScheduleViewProps> = ({ 
    schedule, 
    viewMode, 
    selectedDay,
    currentAcademicWeek,
    displayWeek
}) => {
  const dayKeysToDisplay = selectedDay === 'all' ? DAY_ORDER : [selectedDay];
  
  const hasContentOnDay = (dayKey: DayKey): boolean => {
    const slots = schedule[dayKey] || [];
    if (viewMode === 'single') {
        return slots.some(slot => slot.details || slot.weeks?.[displayWeek]);
    }
    return slots.length > 0;
  };

  const hasAnyContent = dayKeysToDisplay.some(hasContentOnDay);

  if (!hasAnyContent) {
    return <EmptyState />;
  }

  return (
    <div className="mt-6 space-y-8">
      {dayKeysToDisplay.map((dayKey) => {
        const daySlots = schedule[dayKey] || [];

        if (selectedDay === 'all' && !hasContentOnDay(dayKey)) {
            return null;
        }

        const dayContent = (
            <div className="space-y-4">
              {viewMode === 'single' ? (
                daySlots
                  .map(slot => ({ ...slot, details: slot.details || slot.weeks?.[displayWeek] }))
                  .filter(slot => slot.details)
                  .map((slot, index) => (
                    <ClassCard key={`${slot.time}-${index}`} details={slot.details!} time={slot.time} />
                  ))
              ) : (
                daySlots.map((slot, index) => {
                  if (slot.details && !slot.weeks) { // Only a common class
                    return <ClassCard key={`${slot.time}-${index}`} details={slot.details} time={slot.time} />;
                  }
                  if (slot.weeks) { // Alternating or single-week classes
                    return (
                      <PairedClassCard 
                        key={`${slot.time}-${index}`}
                        time={slot.time}
                        sessions={slot.weeks}
                        commonDetails={slot.details} // Pass common details if they exist
                        currentAcademicWeek={currentAcademicWeek}
                      />
                    );
                  }
                  return null;
                })
              )}
            </div>
        );
        
        // If single day view has no content for that day, show empty state
        if (selectedDay !== 'all' && !hasContentOnDay(dayKey)) {
          return <EmptyState key={dayKey} />;
        }
        
        return (
          <div key={dayKey}>
            {selectedDay === 'all' && (
              <h2 className="text-xl font-bold text-slate-700 mb-4 pb-2 border-b-2 border-indigo-200">
                {DAY_MAP[dayKey]}
              </h2>
            )}
            {dayContent}
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleView;
