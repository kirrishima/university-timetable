
import type { Day, DayKey } from './types';

export const DAY_MAP: { [key in DayKey]: Day } = {
  monday: 'Понедельник' as Day.MONDAY,
  tuesday: 'Вторник' as Day.TUESDAY,
  wednesday: 'Среда' as Day.WEDNESDAY,
  thursday: 'Четверг' as Day.THURSDAY,
  friday: 'Пятница' as Day.FRIDAY,
  saturday: 'Суббота' as Day.SATURDAY,
  sunday: 'Воскресенье' as Day.SUNDAY,
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

export const ENABLE_STUDY_WEEKS: boolean = true;

export const DAY_ORDER: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
