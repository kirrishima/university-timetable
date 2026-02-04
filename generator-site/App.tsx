import React, { useState, useCallback, useRef } from "react";
import { DayOfWeek, Schedule, Discipline, WeekType, LessonDetail, ScheduleSlot } from "./types";
import { DAYS_OF_WEEK, DEFAULT_TIMES } from "./constants";
import {
  Plus,
  Trash2,
  Copy,
  Download,
  MapPin,
  User,
  BookOpen,
  Code,
  Clock,
  Settings,
  Monitor,
  GripVertical,
  ChevronRight,
  Calendar,
} from "lucide-react";

const DEFAULT_INSTRUCTORS = [
  "Смелов В.В.",
  "Сухорукова И.Г.",
  "Кичкайло О.В.",
  "Ледницкий А.В.",
  "Урбанович П.П.",
  "Жук Я.А.",
  "Блинова Е.А.",
];

const DEFAULT_LOCATIONS = [
  "324-1",
  "309-1",
  "308-1",
  "200-3а",
  "151, 153-4",
  "204-1",
  "304-1",
  "334-4",
  "151-4",
  "209-1",
];

const DEFAULT_LECTURE_INSTRUCTORS: Record<string, string> = {
  "Программирование серверных кроссплатформенных приложений": "Смелов В.В.",
  "Технологии разработки веб-приложений": "Смелов В.В.",
  "Программирование интернет-серверов": "Смелов В.В.",
  "Безопасность жизнедеятельности человека": "Кичкайло О.В.",
  "Проектирование и разработка баз данных интернет-приложений": "Блинова Е.А.",
  "Тестирование программного обеспечения": "Сухорукова И.Г.",
  "Экономика IT-компании": "Ледницкий А.В.",
  "Администрирование и безопасность интернет систем": "Жук Я.А.",
  "Информационная безопасность": "Урбанович П.П.",
};

const DEFAULT_DISCIPLINES_LIST = [
  "Программирование серверных кроссплатформенных приложений",
  "Программирование интернет-серверов",
  "Технологии разработки веб-приложений",
  "Безопасность жизнедеятельности человека",
  "Проектирование и разработка баз данных интернет-приложений",
  "Тестирование программного обеспечения",
  "Экономика IT-компании",
  "Физическая культура",
  "Администрирование и безопасность интернет систем",
  "Информационная безопасность",
];

const INITIAL_DISCIPLINES: Discipline[] = DEFAULT_DISCIPLINES_LIST.map((name) => ({
  id: crypto.randomUUID(),
  name,
  instructors: DEFAULT_LECTURE_INSTRUCTORS[name] ? { Лекция: DEFAULT_LECTURE_INSTRUCTORS[name] } : {},
}));

const App: React.FC = () => {
  const [scheduleName, setScheduleName] = useState("FIT_3_6_1_6sem_2025_SCHEDULE");
  const [disciplines, setDisciplines] = useState<Discipline[]>(INITIAL_DISCIPLINES);
  const [locations, setLocations] = useState<string[]>(DEFAULT_LOCATIONS);
  const [schedule, setSchedule] = useState<Schedule>({});
  const [activeDay, setActiveDay] = useState<DayOfWeek>("monday");
  const [newDiscipline, setNewDiscipline] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addDiscipline = () => {
    if (!newDiscipline.trim()) return;
    const disc: Discipline = {
      id: crypto.randomUUID(),
      name: newDiscipline.trim(),
      instructors: {},
    };
    setDisciplines((prev) => [...prev, disc]);
    setNewDiscipline("");
  };

  const removeDiscipline = (id: string) => {
    setDisciplines((prev) => prev.filter((d) => d.id !== id));
  };

  const updateInstructor = (disciplineId: string, type: string, name: string) => {
    setDisciplines((prev) =>
      prev.map((d) => (d.id === disciplineId ? { ...d, instructors: { ...d.instructors, [type]: name } } : d)),
    );
  };

  const addLocation = (loc?: string) => {
    const value = loc || newLocation.trim();
    if (!value || locations.includes(value)) return;
    setLocations((prev) => [...prev, value].sort());
    if (!loc) setNewLocation("");
  };

  const addSlot = () => {
    const daySlots = schedule[activeDay] || [];
    let nextTime = DEFAULT_TIMES[0];

    if (daySlots.length > 0) {
      const lastSlotTime = daySlots[daySlots.length - 1].time;
      const lastIndex = DEFAULT_TIMES.indexOf(lastSlotTime);
      if (lastIndex !== -1 && lastIndex < DEFAULT_TIMES.length - 1) {
        nextTime = DEFAULT_TIMES[lastIndex + 1];
      } else {
        nextTime = lastSlotTime;
      }
    }

    const newSlot: ScheduleSlot = {
      id: crypto.randomUUID(),
      time: nextTime,
      details: { name: "", type: "Лекция", location: "" },
    };
    setSchedule((prev) => ({
      ...prev,
      [activeDay]: [...(prev[activeDay] || []), newSlot],
    }));
  };

  const updateSlot = (day: DayOfWeek, slotId: string, updates: Partial<ScheduleSlot>) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day]?.map((s) => (s.id === slotId ? { ...s, ...updates } : s)),
    }));
  };

  const removeSlot = (day: DayOfWeek, slotId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day]?.filter((s) => s.id !== slotId),
    }));
  };

  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const daySlots = [...(schedule[activeDay] || [])];
    const item = daySlots[draggedIndex];
    daySlots.splice(draggedIndex, 1);
    daySlots.splice(index, 0, item);

    setDraggedIndex(index);
    setSchedule((prev) => ({ ...prev, [activeDay]: daySlots }));
  };

  const onDragEnd = () => {
    setDraggedIndex(null);
  };

  const generateTypeScriptCode = useCallback(() => {
    const formatDetail = (d: LessonDetail) => {
      const parts = [
        `name: '${d.name.replace(/'/g, "\\'")}'`,
        `type: '${d.type}'`,
        `location: '${d.location.replace(/'/g, "\\'")}'`,
      ];
      if (d.instructor) parts.push(`instructor: '${d.instructor.replace(/'/g, "\\'")}'`);
      if (d.startDate) parts.push(`startDate: '${d.startDate}'`);
      return `{ ${parts.join(", ")} }`;
    };

    let code = `import { Schedule, WeekType } from './types';\n\n`;
    code += `export const ${scheduleName}: Schedule = {\n`;

    DAYS_OF_WEEK.forEach((day) => {
      const slots = schedule[day.key];
      if (slots && slots.length > 0) {
        code += `    ${day.key}: [\n`;
        slots.forEach((slot) => {
          code += `        {\n`;
          code += `            time: '${slot.time}',\n`;
          if (slot.details) {
            code += `            details: ${formatDetail(slot.details)}\n`;
          } else if (slot.weeks) {
            code += `            weeks: {\n`;
            if (slot.weeks[WeekType.FIRST]) {
              code += `                [WeekType.FIRST]: ${formatDetail(slot.weeks[WeekType.FIRST]!)},\n`;
            }
            if (slot.weeks[WeekType.SECOND]) {
              code += `                [WeekType.SECOND]: ${formatDetail(slot.weeks[WeekType.SECOND]!)},\n`;
            }
            code += `            },\n`;
          }
          code += `        },\n`;
        });
        code += `    ],\n`;
      }
    });

    code += `};\n`;
    return code;
  }, [schedule, scheduleName]);

  const copyToClipboard = () => navigator.clipboard.writeText(generateTypeScriptCode());

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([generateTypeScriptCode()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${scheduleName}.ts`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const currentSlots = schedule[activeDay] || [];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden text-sm">
      <datalist id="instructors-datalist">
        {DEFAULT_INSTRUCTORS.map((i) => (
          <option key={i} value={i} />
        ))}
      </datalist>

      <aside className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0 shadow-sm z-10">
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-200">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight">ScheduleGen</h1>
            <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Редактор расписания</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
          <section>
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Settings className="w-3.5 h-3.5" />
              <label className="text-[10px] font-bold uppercase tracking-wider">Настройки</label>
            </div>
            <input
              type="text"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              placeholder="Имя переменной..."
            />
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-slate-400">
                <BookOpen className="w-3.5 h-3.5" />
                <label className="text-[10px] font-bold uppercase tracking-wider">Дисциплины</label>
              </div>
            </div>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newDiscipline}
                onChange={(e) => setNewDiscipline(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addDiscipline()}
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-slate-50 focus:bg-white transition-all placeholder:text-slate-400"
                placeholder="Новый предмет..."
              />
              <button
                onClick={addDiscipline}
                className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {disciplines.map((d) => (
                <div
                  key={d.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl relative group hover:border-slate-300"
                >
                  <button
                    onClick={() => removeDiscipline(d.id)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-xs font-bold text-slate-700 mb-2 truncate pr-6">{d.name}</p>
                  <div className="space-y-1.5">
                    {["Лекция", "Лабораторная"].map((type) => (
                      <div key={type} className="relative">
                        <input
                          list="instructors-datalist"
                          type="text"
                          placeholder={`${type}: Преподаватель...`}
                          value={d.instructors[type] || ""}
                          onChange={(e) => updateInstructor(d.id, type, e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1.5 text-[11px] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3 text-slate-400">
              <MapPin className="w-3.5 h-3.5" />
              <label className="text-[10px] font-bold uppercase tracking-wider">Аудитории</label>
            </div>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addLocation()}
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-slate-50 placeholder:text-slate-400"
                placeholder="Номер аудитории..."
              />
              <button onClick={() => addLocation()} className="p-2 bg-slate-800 text-white rounded-lg">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {locations.map((loc) => (
                <span
                  key={loc}
                  className="px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded-md text-xs font-medium flex items-center gap-1.5 hover:border-slate-300 cursor-default"
                >
                  {loc}
                  <button
                    onClick={() => setLocations((prev) => prev.filter((l) => l !== loc))}
                    className="text-slate-300 hover:text-red-500"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </section>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-slate-50 min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm z-0">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
            {DAYS_OF_WEEK.map((day) => (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeDay === day.key
                    ? "bg-slate-800 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>

          <button
            onClick={addSlot}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 ml-4 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <div className="w-[90%] mx-auto space-y-4 pb-20">
            {currentSlots.length === 0 ? (
              <div className="py-32 flex flex-col items-center justify-center text-slate-300 gap-4 border-2 border-dashed border-slate-200 rounded-3xl">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                  <Clock className="w-8 h-8 text-slate-200" />
                </div>
                <p className="text-sm font-medium">Нет пар в этот день</p>
              </div>
            ) : (
              currentSlots.map((slot, index) => (
                <div
                  key={slot.id}
                  draggable
                  onDragStart={() => onDragStart(index)}
                  onDragOver={(e) => onDragOver(e, index)}
                  onDragEnd={onDragEnd}
                  className={`bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all p-5 relative group/card border-l-4 border-l-blue-500 cursor-default ${draggedIndex === index ? "opacity-40" : ""}`}
                >
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 p-1 bg-white border border-slate-200 rounded shadow-sm cursor-grab active:cursor-grabbing text-slate-400 hover:text-blue-500 transition-colors opacity-0 group-hover/card:opacity-100 z-10">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  <button
                    onClick={() => removeSlot(activeDay, slot.id)}
                    className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover/card:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-48 shrink-0 lg:border-r border-slate-100 lg:pr-6">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Время
                      </label>
                      <div className="relative">
                        <select
                          value={slot.time}
                          onChange={(e) => updateSlot(activeDay, slot.id, { time: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-50 outline-none transition-all appearance-none cursor-pointer"
                        >
                          {DEFAULT_TIMES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1 mb-4 bg-slate-100 p-1 rounded-lg w-fit">
                        {[
                          { id: "weekly", label: "Еженедельно" },
                          { id: "week1", label: "1-я неделя" },
                          { id: "week2", label: "2-я неделя" },
                          { id: "both", label: "Разные" },
                        ].map((mode) => {
                          const isActive =
                            mode.id === "weekly"
                              ? !!slot.details
                              : mode.id === "week1"
                                ? slot.weeks && slot.weeks[WeekType.FIRST] && !slot.weeks[WeekType.SECOND]
                                : mode.id === "week2"
                                  ? slot.weeks && !slot.weeks[WeekType.FIRST] && slot.weeks[WeekType.SECOND]
                                  : slot.weeks && slot.weeks[WeekType.FIRST] && slot.weeks[WeekType.SECOND];

                          return (
                            <button
                              key={mode.id}
                              onClick={() => {
                                if (mode.id === "weekly") {
                                  updateSlot(activeDay, slot.id, {
                                    details: { name: "", type: "Лекция", location: "" },
                                    weeks: undefined,
                                  });
                                } else if (mode.id === "week1") {
                                  updateSlot(activeDay, slot.id, {
                                    weeks: { [WeekType.FIRST]: { name: "", type: "Лекция", location: "" } },
                                    details: undefined,
                                  });
                                } else if (mode.id === "week2") {
                                  updateSlot(activeDay, slot.id, {
                                    weeks: { [WeekType.SECOND]: { name: "", type: "Лекция", location: "" } },
                                    details: undefined,
                                  });
                                } else {
                                  updateSlot(activeDay, slot.id, {
                                    weeks: {
                                      [WeekType.FIRST]: { name: "", type: "Лекция", location: "" },
                                      [WeekType.SECOND]: { name: "", type: "Лекция", location: "" },
                                    },
                                    details: undefined,
                                  });
                                }
                              }}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                                isActive ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              {mode.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {slot.details && (
                          <LessonForm
                            detail={slot.details}
                            onChange={(u) => updateSlot(activeDay, slot.id, { details: { ...slot.details!, ...u } })}
                            disciplines={disciplines}
                            locations={locations}
                            onAddLocation={addLocation}
                            className="bg-slate-50 p-4 rounded-xl border border-slate-100"
                          />
                        )}
                        {slot.weeks && (
                          <div
                            className={`grid gap-4 ${slot.weeks[WeekType.FIRST] && slot.weeks[WeekType.SECOND] ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
                          >
                            {slot.weeks[WeekType.FIRST] && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full w-fit border border-blue-100">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                                    1-я неделя (Нечетная)
                                  </span>
                                </div>
                                <LessonForm
                                  detail={slot.weeks[WeekType.FIRST]!}
                                  onChange={(u) =>
                                    updateSlot(activeDay, slot.id, {
                                      weeks: {
                                        ...slot.weeks!,
                                        [WeekType.FIRST]: { ...slot.weeks![WeekType.FIRST]!, ...u },
                                      },
                                    })
                                  }
                                  disciplines={disciplines}
                                  locations={locations}
                                  onAddLocation={addLocation}
                                  className="bg-white p-4 rounded-xl border border-slate-200"
                                />
                              </div>
                            )}
                            {slot.weeks[WeekType.SECOND] && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full w-fit border border-amber-100">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                                    2-я неделя (Четная)
                                  </span>
                                </div>
                                <LessonForm
                                  detail={slot.weeks[WeekType.SECOND]!}
                                  onChange={(u) =>
                                    updateSlot(activeDay, slot.id, {
                                      weeks: {
                                        ...slot.weeks!,
                                        [WeekType.SECOND]: { ...slot.weeks![WeekType.SECOND]!, ...u },
                                      },
                                    })
                                  }
                                  disciplines={disciplines}
                                  locations={locations}
                                  onAddLocation={addLocation}
                                  className="bg-white p-4 rounded-xl border border-slate-200"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <aside className="w-[420px] border-l border-slate-200 bg-slate-50 flex flex-col shrink-0">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Код (TypeScript)</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Копировать"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={downloadFile}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Скачать"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-5 font-mono text-xs leading-relaxed scrollbar-thin bg-slate-900 text-slate-300">
          <pre>
            <code>{generateTypeScriptCode()}</code>
          </pre>
        </div>
      </aside>
    </div>
  );
};

interface LessonFormProps {
  detail: LessonDetail;
  onChange: (update: Partial<LessonDetail>) => void;
  disciplines: Discipline[];
  locations: string[];
  onAddLocation: (loc: string) => void;
  className?: string;
}

const LessonForm: React.FC<LessonFormProps> = ({
  detail,
  onChange,
  disciplines,
  locations,
  onAddLocation,
  className = "",
}) => {
  const [isAddingLoc, setIsAddingLoc] = useState(false);
  const [newLocInput, setNewLocInput] = useState("");

  const handleSubjectChange = (name: string) => {
    const disc = disciplines.find((d) => d.name === name);
    const instructor = detail.type === "Лекция" ? disc?.instructors["Лекция"] || "" : "";
    let location = detail.location;
    if (detail.type === "Лекция") {
      location = "200-3а";
    }
    onChange({ name, instructor, location });
  };

  const handleTypeChange = (type: string) => {
    const disc = disciplines.find((d) => d.name === detail.name);
    const instructor = type === "Лекция" ? disc?.instructors["Лекция"] || "" : "";
    const location = type === "Лекция" ? "200-3а" : "";
    onChange({ type, instructor, location });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-8">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Предмет</label>
          <div className="relative">
            <select
              value={detail.name}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 appearance-none cursor-pointer truncate pr-8"
            >
              <option value="">Выберите предмет...</option>
              {disciplines.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 rotate-90 pointer-events-none" />
          </div>
        </div>
        <div className="col-span-4">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Тип</label>
          <div className="relative">
            <select
              value={detail.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 appearance-none cursor-pointer"
            >
              {["Лекция", "Лабораторная", "Семинар"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 rotate-90 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
            Преподаватель
          </label>
          <div className="relative flex items-center group/field">
            <User className="absolute left-3 w-4 h-4 text-slate-300 group-focus-within/field:text-blue-400 transition-all" />
            <input
              list="instructors-datalist"
              type="text"
              value={detail.instructor || ""}
              onChange={(e) => onChange({ instructor: e.target.value })}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-slate-300"
              placeholder="ФИО..."
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Аудитория</label>
          <div className="flex gap-2">
            {!isAddingLoc ? (
              <div className="relative flex-1">
                <select
                  value={detail.location}
                  onChange={(e) => {
                    if (e.target.value === "NEW") {
                      setIsAddingLoc(true);
                    } else {
                      onChange({ location: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 appearance-none cursor-pointer"
                >
                  <option value="">Номер...</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                  <option value="NEW" className="font-bold text-blue-600">
                    + Создать
                  </option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 rotate-90 pointer-events-none" />
              </div>
            ) : (
              <div className="flex flex-1 gap-2 animate-in slide-in-from-right-4 duration-300">
                <input
                  autoFocus
                  type="text"
                  value={newLocInput}
                  onChange={(e) => setNewLocInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      onAddLocation(newLocInput);
                      onChange({ location: newLocInput });
                      setNewLocInput("");
                      setIsAddingLoc(false);
                    }
                  }}
                  className="flex-1 px-3 py-2 border-2 border-blue-200 rounded-lg text-sm outline-none bg-blue-50/20"
                  placeholder="204-1..."
                />
                <button
                  onClick={() => setIsAddingLoc(false)}
                  className="px-2 bg-slate-100 rounded-lg text-slate-500 hover:bg-slate-200 transition-all"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
          Даты / Примечание
        </label>
        <div className="relative flex items-center group/field">
          <Calendar className="absolute left-3 w-4 h-4 text-slate-300 group-focus-within/field:text-blue-400 transition-all" />
          <input
            type="text"
            value={detail.startDate || ""}
            onChange={(e) => onChange({ startDate: e.target.value })}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 placeholder:text-slate-300"
            placeholder="Например: с 15.09"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
