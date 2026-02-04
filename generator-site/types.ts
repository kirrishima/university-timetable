
export enum WeekType {
  FIRST = 'FIRST',
  SECOND = 'SECOND'
}

export enum LessonType {
  LECTURE = 'Лекция',
  LAB = 'Лабораторная',
  PRACTICE = 'Практика',
  SEMINAR = 'Семинар'
}

export interface LessonDetail {
  name: string;
  type: string;
  location: string;
  instructor?: string;
  startDate?: string;
}

export interface ScheduleSlot {
  id: string;
  time: string;
  details?: LessonDetail;
  weeks?: {
    [WeekType.FIRST]?: LessonDetail;
    [WeekType.SECOND]?: LessonDetail;
  };
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type Schedule = {
  [key in DayOfWeek]?: ScheduleSlot[];
};

export interface Discipline {
  id: string;
  name: string;
  instructors: Record<string, string>; 
}
