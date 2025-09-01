
import type { ScheduleEntry, Schedule } from '../types';
import { WeekType } from '../types';

const USER_SCHEDULE: Schedule = {
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
      weeks: {
        [WeekType.SECOND]: { name: 'Программирование серверных кроссплатформенных приложений', type: 'Лекция', location: 'Корпус 3a, ауд. 200 (поток)', instructor: 'доц. Смелов В.В.' },
      }
    }
  ],
};

export const ALL_SCHEDULES: ScheduleEntry[] = [
  { faculty: 'Факультет информационных технологий', facultyShort: "ФИТ", course: 3, group: 6, subgroup: 1, schedule: USER_SCHEDULE },
];
