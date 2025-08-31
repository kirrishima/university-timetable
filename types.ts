
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

export type ClassType = 'Лекция' | 'Семинар' | 'Лабораторная';

export interface ClassDetailsData {
  name: string;
  type: ClassType;
  location?: string;
  instructor?: string;
  visibleFrom?: Date;
  visibleUntil?: Date;
}

export interface AlternatingClasses {
  [WeekType.FIRST]?: ClassDetailsData;
  [WeekType.SECOND]?: ClassDetailsData;
}

export interface ScheduleSlot {
  time: string;
  details?: ClassDetailsData;
  weeks?: AlternatingClasses;
}

export type DaySchedule = ScheduleSlot[];

export type Schedule = {
  [key in DayKey]?: DaySchedule;
};

export type DateLike = string | Date | number | undefined | null;
