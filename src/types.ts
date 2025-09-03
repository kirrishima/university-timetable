import type { ReactElement } from 'react';

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

export type DateLike = Date | string | number | null | undefined;

export interface ClassDetailsData {
  name: string;
  type: ClassType;
  location?: string;
  instructor?: string;
  visibleFrom?: DateLike;
  visibleUntil?: DateLike;
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

export interface ScheduleIdentifier {
  faculty: string;
  facultyShort: string,
  course: number;
  group: number;
  subgroup?: number;
  universityName: string;
}

export interface ScheduleEntry extends ScheduleIdentifier {
  schedule: Schedule;
}

export interface Professor {
  fullName: string;
  department: string;
  imageUrl?: string;
}

export interface ProfessorListEntry {
  faculty: string;
  professors: Professor[];
}

export interface ThemeColors {
  mainBg: string;
  mainText: string;
  cardBg: string;
  cardHeader: string;
  secondaryText: string;
  mutedText: string;
  primary: string;
  primaryText: string;
  primaryAccent: string;
  primaryAccentLight: string;
  primaryMuted: string;
  primaryMutedBg: string;
  primaryBorder: string;
  primaryLightestBg: string;
  ring: string;
  button: {
    hoverBg: string;
    disabledBg: string;
    disabledText: string;
  };
  classType: {
    lecture: string;
    seminar: string;
    lab: string;
  };
  divider: string;
  navBarBg: string;
}

export interface Theme {
  name: string;
  themeColorHex: string,
  colors: ThemeColors;
}

export interface NavItemType {
  id: string;
  label: string;
  icon: ReactElement<{ className?: string }>;
}