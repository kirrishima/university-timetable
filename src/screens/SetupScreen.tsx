
import React, { useState, useMemo, useEffect } from 'react';
import { ALL_SCHEDULES } from '../data/schedules';
import type { ScheduleEntry } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { FacultyIcon, CourseIcon, GroupIcon, SubgroupIcon } from '../components/icons/ScheduleIcons';

interface SetupScreenProps {
  onScheduleSelect: (schedule: ScheduleEntry) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onScheduleSelect }) => {
  const { theme } = useTheme();
  const [faculty, setFaculty] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [group, setGroup] = useState<string>('');
  const [subgroup, setSubgroup] = useState<string>('');
  
  const faculties = useMemo(() => [...new Set(ALL_SCHEDULES.map(s => s.faculty))], []);
  
  const courses = useMemo(() => {
    if (!faculty) return [];
    return [...new Set(ALL_SCHEDULES.filter(s => s.faculty === faculty).map(s => s.course))].sort((a,b) => a-b);
  }, [faculty]);

  const groups = useMemo(() => {
    if (!course) return [];
    return [...new Set(ALL_SCHEDULES.filter(s => s.course === parseInt(course)).map(s => s.group))].sort((a,b) => a-b);
  }, [course]);

  const subgroups = useMemo(() => {
    if (!group) return [];
    const groupSchedules = ALL_SCHEDULES.filter(s => s.group === parseInt(group));
    const hasSubgroups = groupSchedules.some(s => s.subgroup !== undefined);
    if (!hasSubgroups) return [];
    return [...new Set(groupSchedules.map(s => s.subgroup).filter(Boolean) as number[])].sort((a,b) => a-b);
  }, [group]);

  useEffect(() => {
    if (faculties.length === 1) setFaculty(faculties[0]);
  }, [faculties]);

  useEffect(() => setCourse(''), [faculty]);
  useEffect(() => setGroup(''), [course]);
  useEffect(() => setSubgroup(''), [group]);

  const selectedSchedule = useMemo(() => {
    if (!faculty || !course || !group) return null;

    const requiresSubgroup = subgroups.length > 0;
    if (requiresSubgroup && !subgroup) return null;

    return ALL_SCHEDULES.find(s => 
      s.faculty === faculty &&
      s.course === parseInt(course) &&
      s.group === parseInt(group) &&
      (requiresSubgroup ? s.subgroup === parseInt(subgroup) : s.subgroup === undefined)
    ) || null;
  }, [faculty, course, group, subgroup, subgroups]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className={`w-full max-w-md mx-auto ${theme.colors.cardBg} shadow-xl rounded-2xl p-8 space-y-6`}>
        <div className="text-center">
            <h1 className={`text-3xl font-bold ${theme.colors.cardHeader}`}>Выбор расписания</h1>
            <p className={`mt-2 text-md ${theme.colors.secondaryText}`}>Пожалуйста, укажите вашу группу.</p>
        </div>

        <div className="space-y-4">
          <Select
            label="Факультет"
            icon={<FacultyIcon />}
            value={faculty}
            onChange={e => setFaculty(e.target.value)}
            options={faculties.map(f => ({ value: f, label: f }))}
            disabled={faculties.length <= 1}
          />
          <Select
            label="Курс"
            icon={<CourseIcon />}
            value={course}
            onChange={e => setCourse(e.target.value)}
            options={courses.map(c => ({ value: c.toString(), label: `${c} курс` }))}
            disabled={!faculty || courses.length === 0}
            placeholder="Выберите курс"
          />
          <Select
            label="Группа"
            icon={<GroupIcon />}
            value={group}
            onChange={e => setGroup(e.target.value)}
            options={groups.map(g => ({ value: g.toString(), label: `Группа ${g}` }))}
            disabled={!course || groups.length === 0}
            placeholder="Выберите группу"
          />
          {subgroups.length > 0 && (
            <Select
              label="Подгруппа"
              icon={<SubgroupIcon />}
              value={subgroup}
              onChange={e => setSubgroup(e.target.value)}
              options={subgroups.map(sg => ({ value: sg.toString(), label: `Подгруппа ${sg}` }))}
              disabled={!group}
              placeholder="Выберите подгруппу"
            />
          )}
        </div>
        
        <Button
            onClick={() => selectedSchedule && onScheduleSelect(selectedSchedule)}
            disabled={!selectedSchedule}
        >
            Подтвердить
        </Button>
      </div>
    </div>
  );
};

export default SetupScreen;
