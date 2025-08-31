
import React from "react";
import useIsMobile from "../hooks/useIsMobile";
import { ENABLE_STUDY_WEEKS } from "../constants";
import { useTheme } from "../contexts/ThemeContext";

interface HeaderProps {
  formattedDate: string;
  weekTypeString: string;
}

const Header: React.FC<HeaderProps> = ({ formattedDate, weekTypeString }) => {
  const isMobile = useIsMobile(480);
  const { theme } = useTheme();

  return (
    <header className="text-center">
      {isMobile || <h1 className={`text-4xl md:text-5xl font-bold ${theme.colors.cardHeader} tracking-tight`}>Расписание занятий</h1>}
      <div
        className={`mt-${isMobile ? "2" : "4"} flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4`}
      >
        <p className={`capitalize ${isMobile ? theme.colors.cardHeader : theme.colors.secondaryText} text-lg`}>{formattedDate}</p>
        {ENABLE_STUDY_WEEKS && (
          <>
            <span className={`hidden sm:inline ${theme.colors.mutedText}`}>•</span>
            <p className={`font-semibold ${theme.colors.primaryMuted} ${theme.colors.primaryMutedBg} px-3 py-1 rounded-full text-sm`}>
              {weekTypeString}
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
