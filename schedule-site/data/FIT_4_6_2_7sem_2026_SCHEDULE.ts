import { Schedule, WeekType } from '@/types';

export const FIT_4_6_2_7sem_2026_SCHEDULE: Schedule = {
    monday: [
        {
            time: '08:00 - 09:25',
            details: { name: 'Интеллектуальная обработка и анализ данных', type: 'Лабораторная', location: '322-1' }
        },
        {
            time: '09:35 - 11:00',
            details: { name: 'Проектирование интернет-систем', type: 'Лабораторная', location: '209-1' }
        },
        {
            time: '11:25 - 12:50',
            weeks: {
                [WeekType.FIRST]: { name: 'Основы бизнеса и права в информационных технологиях', type: 'Лекция', location: '200-3а', instructor: 'Ледницкий А.В.' },
                [WeekType.SECOND]: { name: 'Управление IT- проектами', type: 'Лекция', location: '200-3а', instructor: 'Евлаш А.И.' },
            },
        },
        {
            time: '13:00 - 14:25',
            weeks: {
                [WeekType.SECOND]: { name: 'Распределённые и облачные технологии', type: 'Лабораторная', location: '206-1' },
            },
        },
    ],
    tuesday: [
        {
            time: '08:00 - 09:25',
            details: { name: 'Интеллектуальная обработка и анализ данных', type: 'Лекция', location: '114-4', instructor: 'Сухорукова И.Г.' }
        },
        {
            time: '09:35 - 11:00',
            details: { name: 'Программирование мобильных приложений', type: 'Лекция', location: '114-4', instructor: 'Уласевич Н.И.' }
        },
        {
            time: '11:25 - 12:50',
            details: { name: 'Распределённые и облачные технологии', type: 'Лабораторная', location: '206-1' }
        },
        {
            time: '13:00 - 14:25',
            weeks: {
                [WeekType.FIRST]: { name: 'Интеллектуальная обработка и анализ данных', type: 'Лабораторная', location: '322-1' },
            },
        },
    ],
    wednesday: [
        {
            time: '08:00 - 09:25',
            details: { name: 'Корпоративные информационные системы', type: 'Лабораторная', location: '209-1' }
        },
        {
            time: '09:35 - 11:00',
            weeks: {
                [WeekType.FIRST]: { name: 'Основы управления интеллектуальной собственностью', type: 'Семинар', location: '131-4' },
                [WeekType.SECOND]: { name: 'Основы стандартизации оценки соответствия и метрология', type: 'Семинар', location: '406-3' },
            },
        },
        {
            time: '11:25 - 12:50',
            weeks: {
                [WeekType.FIRST]: { name: 'Основы управления интеллектуальной собственностью', type: 'Лекция', location: '200-3а', instructor: 'Подручный М.В.' },
                [WeekType.SECOND]: { name: 'Основы управления интеллектуальной собственностью', type: 'Лекция', location: '200-3а', instructor: 'Нистюк О.А.' },
            },
        },
    ],
    thursday: [
        {
            time: '08:00 - 09:25',
            details: { name: 'Программирование веб-сервисов', type: 'Лабораторная', location: '206-1' }
        },
        {
            time: '09:35 - 11:00',
            details: { name: 'Распределённые и облачные технологии', type: 'Лекция', location: '301-4', instructor: 'Подрез А.А.' }
        },
        {
            time: '11:25 - 12:50',
            weeks: {
                [WeekType.FIRST]: { name: 'Программирование мобильных приложений', type: 'Лабораторная', location: '206-1' },
            },
        },
    ],
    friday: [
        {
            time: '08:00 - 09:25',
            weeks: {
                [WeekType.FIRST]: { name: 'Управление IT-проектами', type: 'Семинар', location: '301-1' },
                [WeekType.SECOND]: { name: 'Основы бизнеса и права в информационных технологиях', type: 'Семинар', location: '430-4' },
            },
        },
        {
            time: '09:35 - 11:00',
            details: { name: 'Программирование мобильных приложений', type: 'Лабораторная', location: '206-1' }
        },
        {
            time: '11:25 - 12:50',
            weeks: {
                [WeekType.FIRST]: { name: 'Распределённые и облачные технологии', type: 'Лекция', location: '301-4', instructor: 'Подрез А.А.' },
                [WeekType.SECOND]: { name: 'Проектирование интернет-систем', type: 'Лекция', location: '301-4', instructor: 'Гончар Е.А.' },
            },
        },
    ],
    saturday: [
        {
            time: '08:00 - 09:25',
            weeks: {
                [WeekType.FIRST]: { name: 'Основы стандартизации оценки соответствия и метрология', type: 'Лекция', location: '200-3а', instructor: 'Сергиевич О.А.' },
            },
        },
        {
            time: '09:35 - 11:00',
            details: { name: 'Корпоративные информационные системы', type: 'Лекция', location: '305-4', instructor: 'Ивашкова А.В.' }
        },
        {
            time: '11:25 - 12:50',
            details: { name: 'Программирование веб-сервисов', type: 'Лекция', location: '401-4', instructor: 'Смелов В.В.' }
        },
    ],
};
