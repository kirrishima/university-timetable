
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

export const DAY_ORDER: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


export const SCHEDULE_DATA: Schedule = {
  monday: [
    {
      time: '09:00 - 10:30',
      details: { name: 'Математический анализ', type: 'Лекция', location: 'Корпус 1, ауд. 101', instructor: 'Проф. Иванов И.И.' },
    },
    {
      time: '10:45 - 12:15',
      weeks: {
        [WeekType.FIRST]: { name: 'Дискретная математика', type: 'Семинар', location: 'Корпус 2, ауд. 305', instructor: 'Доц. Петров П.П.' },
        [WeekType.SECOND]: { name: 'Философия', type: 'Лекция', location: 'Корпус 5, ауд. 555 (поток)', instructor: 'Проф. Михайлов М.М.' },
      }
    },
    {
      time: '12:30 - 14:00',
      weeks: {
        [WeekType.FIRST]: { name: 'Физическая культура', type: 'Семинар', location: 'Спортзал', instructor: 'Ст. преп. Сидоров С.С.' },
      }
    },
  ],
  tuesday: [
    {
      time: '10:45 - 12:15',
      weeks: {
        [WeekType.FIRST]: { name: 'Основы программирования в жопе орла хаха 2', type: 'Лабораторная', location: 'Корпус 3, ауд. 210 (лаб)', instructor: 'Ас. Кузнецов К.К.' },
        [WeekType.SECOND]: { name: 'Основы программирования 1', type: 'Лабораторная', location: 'Корпус 3, ауд. 210 (лаб)', instructor: 'Ас. Кузнецов К.К.' },
      }
    },
    {
      time: '12:30 - 14:00',
      details: { name: 'Английский язык', type: 'Семинар', location: 'Корпус 2, ауд. 404', instructor: 'Преп. Смирнова О.В.' },
    },
    {
      time: '14:15 - 15:45',
      weeks: {
        [WeekType.SECOND]: { name: 'Дискретная математика', type: 'Лекция', location: 'Корпус 2, ауд. 301 (поток)', instructor: 'Доц. Петров П.П.' },
      }
    },
  ],
  wednesday: [
    {
      time: '09:00 - 10:30',
      details: { name: 'Математический анализ', type: 'Семинар', location: 'Корпус 1, ауд. 102', instructor: 'Проф. Иванов И.И.' },
    },
    {
      time: '10:45 - 12:15',
      weeks: {
        [WeekType.FIRST]: { name: 'История России', type: 'Лекция', location: 'Корпус 5, ауд. 555 (поток)', instructor: 'Проф. Васильев В.В.' },
        [WeekType.SECOND]: { name: 'История России', type: 'Семинар', location: 'Корпус 5, ауд. 501', instructor: 'Проф. Васильев В.В.' },
      }
    },
  ],
  thursday: [
    {
      time: '12:30 - 14:00',
      details: { name: 'Основы программирования', type: 'Лекция', location: 'Корпус 3, ауд. 301 (поток)', instructor: 'Доц. Зайцев З.З.' },
    },
    {
      time: '14:15 - 15:45',
      weeks: {
        [WeekType.SECOND]: { name: 'Философия', type: 'Семинар', location: 'Корпус 5, ауд. 502', instructor: 'Проф. Михайлов М.М.' },
      }
    },
  ],
  friday: [
    {
        time: '09:00 - 10:30',
        weeks: {
            [WeekType.SECOND]: { name: 'Физическая культура', type: 'Семинар', location: 'Спортзал', instructor: 'Ст. преп. Сидоров С.С.' },
        }
    }
  ],
  saturday: [
    {
        time: '10:00 - 11:30',
        weeks: {
            [WeekType.FIRST]: { name: 'Военная подготовка', type: 'Семинар', location: 'Военная кафедра', instructor: 'Полковник Носов Н.Н.' },
        }
    }
  ],
};
