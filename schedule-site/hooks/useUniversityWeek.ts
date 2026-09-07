import { useMemo } from 'react';
import type { DayKey } from '../types';
import { WeekType } from '../types';

interface UniversityWeekInfo {
  currentDate: Date;
  formattedDate: string;
  weekType: WeekType;
  weekTypeString: string;
  currentDayKey: DayKey;
}

export const useUniversityWeek = (): UniversityWeekInfo => {
  const now = new Date();
    
  let year = now.getFullYear();
  if (now.getMonth() < 8) {
    year -= 1;
  }
  const academicYearStart = new Date(year, 8, 1);

  const getMonday = (d: Date): Date => {
    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const day = date.getDay();
    const diff = day === 0 ? 6 : day - 1;
    date.setDate(date.getDate() - diff);
    return date;
  };

  const startWeekMonday = getMonday(academicYearStart);
  const currentWeekMonday = getMonday(now);

  const diffTime = currentWeekMonday.getTime() - startWeekMonday.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const weekNumber = Math.floor(diffDays / 7);
  
  const weekType = weekNumber % 2 === 0 ? WeekType.FIRST : WeekType.SECOND;
  const weekTypeString = weekType === WeekType.FIRST ? '1-ая учебная неделя' : '2-ая учебная неделя';

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedDate = formatter.format(now);

  const dayIndex = now.getDay();
  const dayKeys: DayKey[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDayKey = dayKeys[dayIndex];

  return useMemo(() => ({
    currentDate: now,
    formattedDate,
    weekType,
    weekTypeString,
    currentDayKey,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [now.getDate()]); 
};
