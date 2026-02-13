import { Schedule, WeekType } from '@/types';

export const FIT_3_6_2_6sem_2026_SCHEDULE: Schedule = {
    monday: [
        {
            time: '08:00 - 09:25',
            details: { name: 'Программирование интернет-серверов', type: 'Лабораторная', location: '309-1', instructor: 'Авдеева В.Д.' }
        },
        {
            time: '09:35 - 11:00',
            details: { name: 'Программирование серверных кроссплатформенных приложений', type: 'Лабораторная', location: '324-1', instructor: 'Смелов В.В.' }
        },
        {
            time: '11:25 - 12:50',
            details: { name: 'Технологии разработки веб-приложений', type: 'Лекция', location: '200-3а', instructor: 'Смелов В.В.' }
        },
        {
            time: '13:00 - 14:25',
            weeks: {
                [WeekType.SECOND]: { name: 'Безопасность жизнедеятельности человека', type: 'Лабораторная', location: '151, 153-4', instructor: 'Кичкайло О.В.' },
            },
        },
    ],
    tuesday: [
        {
            time: '08:00 - 09:25',
            weeks: {
                [WeekType.SECOND]: { name: 'Проектирование и разработка баз данных интернет-приложений', type: 'Лекция', location: '200-3а', instructor: 'Блинова Е.А.' },
            },
        },
        {
            time: '09:35 - 11:00',
            details: { name: 'Тестирование программного обеспечения', type: 'Лекция', location: '200-3а', instructor: 'Сухорукова И.Г.' }
        },
        {
            time: '11:25 - 12:50',
            details: { name: 'Безопасность жизнедеятельности человека', type: 'Лекция', location: '200-3а', instructor: 'Кичкайло О.В.' }
        },
    ],
    wednesday: [
        {
            time: '08:00 - 09:25',
            details: { name: 'Программирование интернет-серверов', type: 'Лекция', location: '200-3а', instructor: 'Смелов В.В.' }
        },
        {
            time: '09:35 - 11:00',
            details: { name: 'Экономика IT-компании', type: 'Лекция', location: '200-3а', instructor: 'Ледницкий А.В.' }
        },
        {
            time: '11:25 - 12:50',
            details: { name: 'Физическая культура', type: 'Лекция', location: '' }
        },
    ],
    thursday: [
        {
            time: '09:35 - 11:00',
            details: { name: 'Тестирование программного обеспечения', type: 'Лабораторная', location: '209-1' , instructor: 'Цягунович Т.В.' }
        },
        {
            time: '11:25 - 12:50',
            details: { name: 'Информационная безопасность', type: 'Лекция', location: '200-3а', instructor: 'Урбанович П.П.' }
        },
        {
            time: '13:00 - 14:25',
            details: { name: 'Администрирование и безопасность интернет систем', type: 'Лабораторная', location: '209-1', instructor: 'Сазонова Д.В.' }
        },
    ],
    friday: [
        {
            time: '08:00 - 09:25',
            weeks: {
                [WeekType.SECOND]: { name: 'Экономика IT-компании', type: 'Лабораторная', location: '204-1', instructor: 'Пшебельская Л.Ю.' },
            },
        },
        {
            time: '09:35 - 11:00',
            details: { name: 'Информационная безопасность', type: 'Лабораторная', location: '308-1', instructor: 'Савельева М.Г.' }
        },
        {
            time: '11:25 - 12:50',
            details: { name: 'Технологии разработки веб-приложений', type: 'Лабораторная', location: '206-1', instructor: 'Гурина К.С.' }
        },
    ],
    saturday: [
        {
            time: '08:00 - 09:25',
            details: { name: 'Программирование серверных кроссплатформенных приложений', type: 'Лекция', location: '200-3а', instructor: 'Смелов В.В.' }
        },
        {
            time: '09:35 - 11:00',
            weeks: {
                [WeekType.FIRST]: { name: 'Экономика IT-компании', type: 'Семинар', location: '334-4' },
                [WeekType.SECOND]: { name: 'Безопасность жизнедеятельности человека', type: 'Семинар', location: '151-4' },
            },
        },
        {
            time: '11:25 - 12:50',
            details: { name: 'Проектирование и разработка баз данных интернет-приложений', type: 'Лабораторная', location: '206-1', instructor: 'Заянковский Д.В.' }
        },
        {
            time: '13:00 - 14:25',
            details: { name: 'Администрирование и безопасность интернет систем', type: 'Лекция', location: '408-2', instructor: 'Жук Я.А.' }
        },
    ],
};
