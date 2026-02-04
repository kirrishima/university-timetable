import React from "react";
import { ENABLE_STUDY_WEEKS } from "../constants";
import { useTheme } from "../contexts/ThemeContext";

interface HeaderProps {
  formattedDate?: string;
  weekTypeString?: string;
  scheduleTitle: string;
}

const Header: React.FC<HeaderProps> = ({ formattedDate, weekTypeString, scheduleTitle }) => {
  const { theme } = useTheme();

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 md:gap-x-4">
      <div />
      <div className="text-center">
        <h1 className={`text-2xl md:text-4xl font-bold ${theme.colors.cardHeader} tracking-tight`}>{scheduleTitle}</h1>
        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          {formattedDate && <p className={`capitalize ${theme.colors.secondaryText} text-md`}>{formattedDate}</p>}
          {ENABLE_STUDY_WEEKS && weekTypeString && (
            <>
              <span className={`hidden sm:inline ${theme.colors.mutedText}`}>•</span>
              <p
                className={`font-semibold ${theme.colors.primaryMuted} ${theme.colors.primaryMutedBg} px-3 py-1 rounded-full text-sm`}
              >
                {weekTypeString}
              </p>
            </>
          )}
        </div>
      </div>
      <div />
    </header>
  );
};

export default Header;
