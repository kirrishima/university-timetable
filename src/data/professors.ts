import type { ProfessorListEntry } from '../types';

export const ALL_PROFESSORS: ProfessorListEntry[] = [
    {
        faculty: 'Факультет информационных технологий',
        professors: [
            {
                fullName: 'Дятко Александр Аркадьевич',
                department: 'Кафедра информатики',
                imageUrl: 'https://www.bsuir.by/get-photo/100032_100109_1.jpg'
            },
            {
                fullName: 'Нистюк Ольга Александровна',
                department: 'Кафедра информатики',
                imageUrl: 'https://www.bsuir.by/get-photo/100032_100109_16.jpg'
            },
            {
                fullName: 'Хартанович Алина Александровна',
                department: 'Кафедра информатики',
                imageUrl: 'https://www.bsuir.by/get-photo/100032_100109_17.jpg'
            },
            {
                fullName: 'Смелов Владимир Владиславович',
                department: 'Кафедра информатики',
                imageUrl: 'https://www.bsuir.by/get-photo/100032_100109_12.jpg'
            },
            {
                fullName: 'Криштаносов Владимир Борисович',
                department: 'Кафедра философии',
                imageUrl: 'https://www.bsuir.by/get-photo/100032_100101_11.jpg'
            },
            {
                fullName: 'Гурин Николай Иванович',
                department: 'Кафедра информатики',
                // No image URL to test fallback
            },
            {
                fullName: 'Шиман Дмитрий Васильевич',
                department: 'Кафедра ИПиЭ',
                imageUrl: 'https://www.bsuir.by/get-photo/100032_100110_13.jpg'
            },
            {
                fullName: 'Бернацкий Павел Владимирович',
                department: 'Кафедра информатики',
                imageUrl: 'invalid-url-to-test-fallback.jpg' // Invalid URL
            },
        ],
    },
];
