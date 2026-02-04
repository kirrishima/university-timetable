
import React, { useState, useMemo, useEffect } from "react";
import { ALL_SCHEDULES } from "../data/schedules";
import type { ScheduleEntry } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import { FacultyIcon, CourseIcon, GroupIcon, SubgroupIcon, SemesterIcon } from "../components/icons/ScheduleIcons";

interface SetupScreenProps {
  onScheduleSelect: (schedule: ScheduleEntry) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onScheduleSelect }) => {
  const { theme } = useTheme();
  const [faculty, setFaculty] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [subgroup, setSubgroup] = useState<string>("");

  const faculties = useMemo(() => [...new Set(ALL_SCHEDULES.map((s) => s.faculty))], []);

  const courses = useMemo(() => {
    if (!faculty) return [];
    return [...new Set(ALL_SCHEDULES.filter((s) => s.faculty === faculty).map((s) => s.course))].sort((a, b) => a - b);
  }, [faculty]);

  const groups = useMemo(() => {
    if (!faculty || !course) return [];
    return [
      ...new Set(
        ALL_SCHEDULES.filter((s) => s.faculty === faculty && s.course === parseInt(course)).map((s) => s.group)
      ),
    ].sort((a, b) => a - b);
  }, [faculty, course]);

  const semesters = useMemo(() => {
    if (!faculty || !course || !group) return [];
    return [
        ...new Set(
            ALL_SCHEDULES.filter(
                (s) => s.faculty === faculty && s.course === parseInt(course) && s.group === parseInt(group)
            ).map(s => s.semester)
        )
    ];
  }, [faculty, course, group]);

  const subgroups = useMemo(() => {
    if (!faculty || !course || !group || !semester) return [];
    const groupSchedules = ALL_SCHEDULES.filter(
      (s) => s.faculty === faculty && s.course === parseInt(course) && s.group === parseInt(group) && s.semester === semester
    );
    const hasSubgroups = groupSchedules.some((s) => s.subgroup !== undefined);
    if (!hasSubgroups) return [];
    return [...new Set(groupSchedules.map((s) => s.subgroup).filter(Boolean) as number[])].sort((a, b) => a - b);
  }, [faculty, course, group, semester]);

  useEffect(() => {
    if (faculties.length === 1) setFaculty(faculties[0]);
  }, [faculties]);

  useEffect(() => {
    if (courses.length === 1) setCourse(courses[0].toString());
  }, [courses]);

  useEffect(() => {
    if (groups.length === 1) setGroup(groups[0].toString());
  }, [groups]);

  useEffect(() => {
    if (semesters.length === 1) setSemester(semesters[0]);
  }, [semesters]);

  useEffect(() => {
    if (subgroups.length === 1) setSubgroup(subgroups[0].toString());
  }, [subgroups]);

  useEffect(() => {
    setCourse("");
  }, [faculty]);
  useEffect(() => {
    setGroup("");
  }, [course]);
  useEffect(() => {
    setSemester("");
  }, [group]);
  useEffect(() => {
    setSubgroup("");
  }, [semester]);

  const selectedSchedule = useMemo(() => {
    if (!faculty || !course || !group || !semester) return null;

    const requiresSubgroup = subgroups.length > 0;
    if (requiresSubgroup && !subgroup) return null;

    return (
      ALL_SCHEDULES.find(
        (s) =>
          s.faculty === faculty &&
          s.course === parseInt(course) &&
          s.group === parseInt(group) &&
          s.semester === semester &&
          (requiresSubgroup ? s.subgroup === parseInt(subgroup) : s.subgroup === undefined)
      ) || null
    );
  }, [faculty, course, group, semester, subgroup, subgroups]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className={`w-full max-w-md mx-auto ${theme.colors.cardBg} shadow-xl rounded-2xl p-8`}>
        <div className="text-center mb-6">
          <h1 className={`text-3xl font-bold ${theme.colors.cardHeader}`}>Выбор расписания</h1>
          <p className={`mt-2 text-md ${theme.colors.secondaryText}`}>Пожалуйста, заполните форму.</p>
        </div>

        <div className="grid gap-y-4 mb-6">
          <Select
            label="Факультет"
            icon={<FacultyIcon />}
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            options={faculties.map((f) => ({ value: f, label: f }))}
            disabled={faculties.length === 0}
          />
          <Select
            label="Курс"
            icon={<CourseIcon />}
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            options={courses.map((c) => ({ value: c.toString(), label: `${c} курс` }))}
            disabled={!faculty}
            placeholder="Выберите курс"
          />
          <Select
            label="Группа"
            icon={<GroupIcon />}
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            options={groups.map((g) => ({ value: g.toString(), label: `Группа ${g}` }))}
            disabled={!course}
            placeholder="Выберите группу"
          />
          <Select
            label="Семестр"
            icon={<SemesterIcon />}
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            options={semesters.map((s) => ({ value: s, label: s }))}
            disabled={!group}
            placeholder="Выберите семестр"
          />
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden
   focus-within:overflow-visible
   ${subgroups.length > 0 ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <Select
              label="Подгруппа"
              icon={<SubgroupIcon />}
              value={subgroup}
              onChange={(e) => setSubgroup(e.target.value)}
              options={subgroups.map((sg) => ({ value: sg.toString(), label: `Подгруппа ${sg}` }))}
              disabled={!semester}
              placeholder="Выберите подгруппу"
            />
          </div>
        </div>

        <Button onClick={() => selectedSchedule && onScheduleSelect(selectedSchedule)} disabled={!selectedSchedule}>
          Подтвердить
        </Button>
      </div>
    </div>
  );
};

export default SetupScreen;
