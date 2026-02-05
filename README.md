# Расписание Университета


| Назначение | Ссылка                                                |
| ---------------------- | ------------------------------------------------------------- |
| Расписание | https://kirrishima.github.io/university-timetable/timetable |
| Генератор   | https://kirrishima.github.io/university-timetable/generator |

## Гайд на добавление рассписания

1. Создаём форк репозитория(ставим галочка only main)
2. Переходим на страницу [генератора](https://kirrishima.github.io/university-timetable/generatorhttps:/)
3. Создаём расписание
4. Скачиваем полученый файл
5. Добавляем полученый файл в папку *./schedule-site/data/* вашего форк репозитория
6. В файле *./schedule-site/data/schedules.ts* делаем следующие шаги:

   1. В начале добавляем данную строку
   <br/>

   ```typescript
   import { Имя_рассписания } from './имя_файла_безрасширения';
   ```

   2. В `export const ALL_SCHEDULES: ScheduleEntry[] = []` добавить своё рассписание(как в примере)
   <br/>

   ```typescript
   {
       faculty: 'Факультет информационных технологий',
       facultyShort: "ФИТ",
       course: 3,
       group: 6,
       subgroup: 1,
       schedule: Имя_рассписания,
       universityName: 'БГТУ',
       semester: 'Весенний'
   }
   ```
7. Отправляем pull request и ждём подтверждения
8. Пользуемся

---
