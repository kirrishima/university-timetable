import React from 'react';
// FIX: Changed import for 'Day' to be a value import since it is an enum used as a value.
import { Day, type DayKey, type NavItemType } from './types';

export const ENABLE_STUDY_WEEKS = true;

export const DAY_MAP: Record<DayKey, Day> = {
  monday: Day.MONDAY,
  tuesday: Day.TUESDAY,
  wednesday: Day.WEDNESDAY,
  thursday: Day.THURSDAY,
  friday: Day.FRIDAY,
  saturday: Day.SATURDAY,
  sunday: Day.SUNDAY,
};

export const SHORT_DAY_MAP: Record<DayKey, string> = {
  monday: 'Пн',
  tuesday: 'Вт',
  wednesday: 'Ср',
  thursday: 'Чт',
  friday: 'Пт',
  saturday: 'Сб',
  sunday: 'Вс',
};

export const DAY_ORDER: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Icons for Bottom Nav Bar
// FIX: Rewrote component using React.createElement to avoid JSX syntax errors in a .ts file.
const ScheduleIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2
  },
    React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    })
  )
);

// FIX: Rewrote component using React.createElement to avoid JSX syntax errors in a .ts file.
const ProfessorsIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    className,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2
  },
    React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-2.072-1.036A48.402 48.402 0 0112 3.493a48.402 48.402 0 0111.82 5.617l-2.072 1.036m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
    }),
    React.createElement('path', {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z"
    })
  )
);

export const TAB_ITEMS: NavItemType[] = [
  {
    id: 'schedule',
    label: 'Расписание',
    // FIX: Use React.createElement to avoid JSX syntax errors.
    icon: React.createElement(ScheduleIcon),
  },
  {
    id: 'professors',
    label: 'Преподаватели',
    // FIX: Use React.createElement to avoid JSX syntax errors.
    icon: React.createElement(ProfessorsIcon),
  },
];