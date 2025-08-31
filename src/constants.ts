
import type { Schedule, Day, DayKey } from './types';
import { WeekType } from './types';

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

export const SCHEDULE_DATA: Schedule = {
  monday: [
    {
      time: '08:00 - 9:25',
      weeks: {
        [WeekType.FIRST]: { name: 'Основы компьютерной геометрии', type: 'Лабораторная', location: 'Корпус 1, ауд. 102' },
      },
    },
    {
      time: '9:35 - 11:00',
      details: { name: 'Програм-е серверных кроссплатф. приложений', type: 'Лабораторная', location: 'Корпус 1, ауд. 308' }
    },
    {
      time: '11:25 - 12:50',
      details: { name: 'Базы данных', type: 'Лекция', location: 'Корпус 3а, ауд. 100 (поток)', instructor: 'ст. преп. Нистюк О.А.' }
    },
  ],
  tuesday: [
    {
      time: '08:00 - 9:25',
      details: { name: 'Базы данных', type: 'Лабораторная', location: 'Корпус 1, ауд. 301' },
    },
    {
      time: '9:35 - 11:00',
      weeks: {
        [WeekType.FIRST]: { name: 'Программирование серверных кроссплатформенных приложений', type: 'Лекция', location: 'Корпус 3a, ауд. 200 (поток)', instructor: 'доц. Смелов В.В.' },
        [WeekType.SECOND]: { name: 'Технологии программирования в интернет', type: 'Лекция', location: 'Корпус 3a, ауд. 200 (поток)', instructor: 'доц. Смелов В.В.' },
      }
    },
    {
      time: '11:25 - 12:50',
      weeks: {
        [WeekType.FIRST]: { name: 'Системное программирование', type: 'Лекция', location: 'Корпус 3a, ауд. 200 (поток)', instructor: 'доц. Смелов В.В.' },
        [WeekType.SECOND]: { name: 'Основы компьютерной геометрии', type: 'Лекция', location: 'Корпус 3a, ауд. 100 (поток)', instructor: 'доц. Дятко А.А.' },
      }
    },
  ],
  wednesday: [
    {
      time: '08:00 - 9:25',
      details: { name: 'Деловые коммуникации', type: 'Лекция', location: 'Корпус 3a, ауд. 100 (поток)', instructor: 'Криштаносов В.Б.' },
    },
    {
      time: '9:35 - 11:00',
      weeks: {
        [WeekType.FIRST]: { name: 'Деловые коммуникации', type: 'Семинар', location: 'Корпус 4, ауд. 430' },
        [WeekType.SECOND]: { name: 'Основы компьютерной геометрии', type: 'Лабораторная', location: 'Корпус 1, ауд. 102' },
      }
    },
    {
      time: '11:25 - 12:50',
      details: { name: 'Физическая культура', type: 'Семинар', location: '', instructor: '' },
    },
  ],
  thursday: [
    {
      time: '08:00 - 9:25',
      details: { name: 'Операционные системы', type: 'Лабораторная', location: 'Корпус 1, ауд. 204' },
    },
    {
      time: '9:35 - 11:00',
      weeks: {
        [WeekType.FIRST]: { name: 'Технологии программирования в интернет', type: 'Лабораторная', location: 'Корпус 1, ауд. 309' },
      }
    }
  ],
  friday: [
    {
      time: '08:00 - 9:25',
      weeks: {
        [WeekType.FIRST]: { name: 'Компьютерные мультимедийные системы', type: 'Лекция', location: 'Корпус 3a, ауд. 100 (поток)', instructor: 'доц. Гурин Н.И.' },
      },
    },
    {
      time: '9:35 - 11:00',
      details: { name: 'Программирование сетевых приложений', type: 'Лабораторная', location: 'Корпус 1, ауд. 308' },
    },
    {
      time: '11:25 - 12:50',
      details: { name: 'Программирование сетевых приложений', type: 'Лекция', location: 'Корпус 3a, ауд. 200 (поток)', instructor: 'доц. Шиман Д.В.' },
    },
    {
      time: '13:00 - 14:25',
      details: { name: 'Компьютерные мультимедийные системы', type: 'Лабораторная', location: 'Корпус 1, ауд. 301' },
    }
  ],
  saturday: [
    {
      time: '9:35 - 11:00',
      details: { name: 'Операционные системы', type: 'Лекция', location: 'Корпус 3a, ауд. 200 (поток)', instructor: 'асс. Бернацкий П.В.' },
    },
    {
      time: '11:25 - 12:50',
      details: { name: 'Системное программирование', type: 'Лабораторная', location: 'Корпус 1, ауд. 322' },
    },
    {
      time: '13:00 - 14:25',
      details: { name: 'Программирование серверных кроссплатформенных приложений', type: 'Лекция', location: 'Корпус 3a, ауд. 200 (поток)', instructor: 'доц. Смелов В.В.' },
    }
  ],
};
