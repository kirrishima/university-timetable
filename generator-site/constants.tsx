
import { DayOfWeek, LessonType } from './types';

export const DAYS_OF_WEEK: { key: DayOfWeek; label: string }[] = [
  { key: 'monday', label: 'Понедельник' },
  { key: 'tuesday', label: 'Вторник' },
  { key: 'wednesday', label: 'Среда' },
  { key: 'thursday', label: 'Четверг' },
  { key: 'friday', label: 'Пятница' },
  { key: 'saturday', label: 'Суббота' },
  { key: 'sunday', label: 'Воскресенье' }
];

export const LESSON_TYPES = Object.values(LessonType);

export const DEFAULT_TIMES = [
  '08:00 - 09:25',
  '09:35 - 11:00',
  '11:25 - 12:50',
  '13:00 - 14:25',
  '14:35 - 16:00',
  '16:10 - 17:35'
];
