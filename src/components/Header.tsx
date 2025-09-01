
import React from "react";
import { ENABLE_STUDY_WEEKS } from "../constants";
import { useTheme } from "../contexts/ThemeContext";
import { ChangeIcon } from "./icons/ScheduleIcons";

interface HeaderProps {
  formattedDate: string;
  weekTypeString: string;
  scheduleTitle: string;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ formattedDate, weekTypeString, scheduleTitle, onReset }) => {
  const { theme } = useTheme();

  return (
    <header className="relative text-center">
      <h1 className="text-2xl md:text-4xl font-bold  ${theme.colors.cardHeader}  tracking-tight">{scheduleTitle}</h1>
      <div
        className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4"
      >
        <p className={`capitalize ${theme.colors.secondaryText} text-lg`}>{formattedDate}</p>
        {ENABLE_STUDY_WEEKS && (
          <>
            <span className={`hidden sm:inline ${theme.colors.mutedText}`}>•</span>
            <p className={`font-semibold ${theme.colors.primaryMuted} ${theme.colors.primaryMutedBg} px-3 py-1 rounded-full text-sm`}>
              {weekTypeString}
            </p>
          </>
        )}
      </div>
       <button 
        onClick={onReset}
        title="Сменить расписание"
        className={`absolute top-0 right-0 p-2 rounded-full transition-colors duration-200 ${theme.colors.secondaryText} ${theme.colors.button.hoverBg} focus:outline-none ${theme.colors.ring}`}
      >
        <ChangeIcon />
      </button>
    </header>
  );
};

export default Header;
