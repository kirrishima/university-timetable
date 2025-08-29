
export enum WeekType {
  FIRST = 'first',
  SECOND = 'second',
}

export enum Day {
  MONDAY = 'Понедельник',
  TUESDAY = 'Вторник',
  WEDNESDAY = 'Среда',
  THURSDAY = 'Четверг',
  FRIDAY = 'Пятница',
  SATURDAY = 'Суббота',
  SUNDAY = 'Воскресенье',
}

export type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// Represents the details of a single class, independent of when it occurs.
export interface ClassDetailsData {
  name: string;
  type: 'Лекция' | 'Семинар' | 'Лабораторная';
  location?: string;
  instructor?: string;
  visibleFrom?: Date;
  visibleUntil?: Date;
}

// Represents classes that alternate between weeks for the same time slot.
export interface AlternatingClasses {
  [WeekType.FIRST]?: ClassDetailsData;
  [WeekType.SECOND]?: ClassDetailsData;
}

// Represents a single time slot in the schedule.
// It can be a common class (details), an alternating one (weeks), or both.
export interface ScheduleSlot {
  time: string;
  details?: ClassDetailsData; // For common classes that occur every week
  weeks?: AlternatingClasses;  // For classes that differ between weeks
}

// A day's schedule is an array of these slots.
export type DaySchedule = ScheduleSlot[];

// The main schedule is a map of DayKey to that day's schedule.
export type Schedule = {
  [key in DayKey]?: DaySchedule;
};

export type DateLike = string | Date | number | undefined | null;