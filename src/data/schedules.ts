import type { ScheduleEntry } from '../types';
import { FIT_3_6_1_5sem_2025_SCHEDULE } from './FIT_3_6_1_5sem_2025_SCHEDULE';
import { FIT_3_6_1_6sem_2025_SCHEDULE } from './FIT_3_6_1_6sem_2025_SCHEDULE';

export const ALL_SCHEDULES: ScheduleEntry[] = [
  {
    faculty: 'Факультет информационных технологий',
    facultyShort: "ФИТ",
    course: 3,
    group: 6,
    subgroup: 1,
    schedule: FIT_3_6_1_5sem_2025_SCHEDULE,
    universityName: 'БГТУ',
    semester: 'Осенний'
  }, {
    faculty: 'Факультет информационных технологий',
    facultyShort: "ФИТ",
    course: 3,
    group: 6,
    subgroup: 1,
    schedule: FIT_3_6_1_6sem_2025_SCHEDULE,
    universityName: 'БГТУ',
    semester: 'Весенний'
  },
];
