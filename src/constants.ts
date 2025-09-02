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
            d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-3 3a2 2 0 11-4 0 2 2 0 014 0z"
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