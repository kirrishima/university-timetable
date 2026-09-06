
import React from "react";
import type { DayKey, Schedule, WeekType, DateLike } from "../types";
import ClassCard from "./ClassCard";
import PairedClassCard from "./PairedClassCard";
import { DAY_MAP, DAY_ORDER } from "../constants";
import { useTheme } from "../contexts/ThemeContext";

interface ScheduleViewProps {
  schedule: Schedule;
  viewMode: "single" | "both";
  selectedDay: DayKey | "all";
  currentAcademicWeek: WeekType;
  displayWeek: WeekType;
}

const EmptyState: React.FC = () => {
    const { theme } = useTheme();
    return (
        <div className={`mt-6 text-center ${theme.colors.cardBg} p-8 rounded-xl shadow-sm`}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`mx-auto h-12 w-12 ${theme.colors.mutedText}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
            </svg>
            <h3 className={`mt-2 text-lg font-medium ${theme.colors.cardHeader}`}>Свободный день</h3>
            <p className={`mt-1 text-sm ${theme.colors.mutedText}`}>Нет запланированных занятий.</p>
        </div>
    );
};


function parseDate(d: DateLike): Date | null {
  if (d == null) return null;
  if (d instanceof Date) {
    return isNaN(d.getTime()) ? null : d;
  }
  const num = typeof d === "number" ? d : undefined;
  const candidate = new Date(num ?? String(d));
  return isNaN(candidate.getTime()) ? null : candidate;
}



type ClassStatus = "past" | "current" | "future";

function getClassStatus(
  time: string,
  dayKey: DayKey,
  todayDayKey: DayKey,
  isAllWeek: boolean
): ClassStatus {

  // Если "Вся неделя" — учитываем день недели
  if (isAllWeek) {
    const todayIndex = DAY_ORDER.indexOf(todayDayKey);
    const dayIndex = DAY_ORDER.indexOf(dayKey);

    if (dayIndex != todayIndex) {
      return "future";
    }
   
  }

  // Если выбран конкретный день, который НЕ сегодня,
  // вообще не проверяем время
  if (!isAllWeek && dayKey !== todayDayKey) {
    return "future";
  }

  // Здесь либо:
  // 1. "Вся неделя" и сегодня
  // 2. выбран сегодняшний день

  const match = time.match(
    /(\d{1,2}):(\d{2})\s*[-–—]\s*(\d{1,2}):(\d{2})/
  );

  if (!match) return "future";

  const [, startHour, startMinute, endHour, endMinute] = match;

  const now = new Date();

  const start = new Date();
  start.setHours(Number(startHour), Number(startMinute), 0, 0);

  const end = new Date();
  end.setHours(Number(endHour), Number(endMinute), 0, 0);

  if (now < start) {
    return "future";
  }

  if (now < end) {
    return "current";
  }

  if(isAllWeek)
    return "future";
  return "past";
}

const ScheduleView: React.FC<ScheduleViewProps> = ({
  schedule,
  viewMode,
  selectedDay,
  currentAcademicWeek,
  displayWeek,
}) => {
  const { theme } = useTheme();


  const [, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  
  const dayKeysToDisplay = selectedDay === "all" ? DAY_ORDER : [selectedDay];

  const today = new Date();

  const todayDayIndex = today.getDay() === 0
    ? 6
    : today.getDay() - 1;

  const todayDayKey = DAY_ORDER[todayDayIndex];

  const hasContentOnDay = (dayKey: DayKey): boolean => {
    const slots = schedule[dayKey] || [];
    if (viewMode === "single") {
      return slots.some((slot) => slot.details || slot.weeks?.[displayWeek]);
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

        if (selectedDay === "all" && !hasContentOnDay(dayKey)) {
          return null;
        }

        const dayContent = (
          <div className="space-y-4">
            {viewMode === "single"
              ? daySlots
                  .map((slot) => ({ ...slot, details: slot.details || slot.weeks?.[displayWeek] }))
                  .filter((slot) => slot.details)
                  .filter((slot) => {
                    const from = parseDate(slot.details!.visibleFrom);
                    const until = parseDate(slot.details!.visibleUntil);

                    const now = new Date();

                    const afterFrom = from ? now >= from : true;
                    const beforeUntil = until ? now < until : true;

                    return afterFrom && beforeUntil;
                  })
                  .map((slot, index) => (
                    <ClassCard key={`${slot.time}-${index}`} details={slot.details!} time={slot.time} 
                      status={getClassStatus(slot.time, dayKey, todayDayKey, selectedDay === "all")}/>
                  ))
              : daySlots.map((slot, index) => {
                  if (slot.details && !slot.weeks) {
                    return <ClassCard key={`${slot.time}-${index}`} details={slot.details} time={slot.time} 
                      status={getClassStatus(slot.time, dayKey, todayDayKey, selectedDay === "all")}/>;
                  }
                  if (slot.weeks) {
                    return (
                      <PairedClassCard
                        key={`${slot.time}-${index}`}
                        time={slot.time}
                        sessions={slot.weeks}
                        commonDetails={slot.details}
                        currentAcademicWeek={currentAcademicWeek}
                        status={getClassStatus(slot.time, dayKey, todayDayKey, selectedDay === "all")}
                      />
                    );
                  }
                  return null;
                })}
          </div>
        );

        if (selectedDay !== "all" && !hasContentOnDay(dayKey)) {
          return <EmptyState key={dayKey} />;
        }

        return (
          <div key={dayKey}>
            {selectedDay === "all" && (
              <h2 className={`text-xl font-bold ${theme.colors.secondaryText} mb-4 pb-2 border-b-2 ${theme.colors.primaryBorder}`}>
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
