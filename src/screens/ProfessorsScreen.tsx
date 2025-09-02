import React, { useState, useMemo } from "react";
import type { Professor, ScheduleEntry } from "../types";
import ProfessorCard from "../components/ProfessorCard";
import { useTheme } from "../contexts/ThemeContext";
import Header from "../components/Header";
import { useUniversityWeek } from "../hooks/useUniversityWeek";
import useIsMobile from "../hooks/useIsMobile";

interface ProfessorsScreenProps {
  professors: Professor[];
  scheduleData: ScheduleEntry;
  onReset: () => void;
}

const ProfessorsScreen: React.FC<ProfessorsScreenProps> = ({ professors, scheduleData }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const { formattedDate, weekTypeString } = useUniversityWeek();
  const isMobile = useIsMobile(460);

  const facultyPart = isMobile ? scheduleData.facultyShort : scheduleData.faculty;
  const scheduleTitle = `${facultyPart}, преподаватели`;

  const normalizedSearchTerm = useMemo(() => searchTerm.toLowerCase(), [searchTerm]);

  const hasVisibleProfessors = useMemo(() => {
    if (!normalizedSearchTerm) return professors.length > 0;
    return professors.some((p) => p.fullName.toLowerCase().includes(normalizedSearchTerm));
  }, [professors, normalizedSearchTerm]);

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <Header formattedDate={formattedDate} weekTypeString={weekTypeString} scheduleTitle={scheduleTitle} />
      <main className="mt-8">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Поиск по имени..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 pl-10 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 
                        ${theme.colors.cardBg} ${theme.colors.mainText} ${theme.colors.primaryBorder} ${theme.colors.ring}`}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${theme.colors.mutedText}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {hasVisibleProfessors ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {professors.map((professor) => {
              const isVisible = professor.fullName.toLowerCase().includes(normalizedSearchTerm);
              return (
                <div key={professor.fullName} className={!isVisible ? "hidden" : ""}>
                  <ProfessorCard professor={professor} universityName={scheduleData.universityName} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`mt-6 text-center ${theme.colors.cardBg} p-8 rounded-xl shadow-sm`}>
            <h3 className={`mt-2 text-lg font-medium ${theme.colors.cardHeader}`}>Преподаватели не найдены</h3>
            <p className={`mt-1 text-sm ${theme.colors.mutedText}`}>
              {searchTerm
                ? "Попробуйте изменить поисковой запрос."
                : "Для этого факультета нет данных о преподавателях."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfessorsScreen;
