import useIsMobile from "../hooks/useIsMobile";
import React from "react";
import { ENABLE_STUDY_WEEKS } from "../constants";

interface HeaderProps {
  formattedDate: string;
  weekTypeString: string;
}

const Header: React.FC<HeaderProps> = ({ formattedDate, weekTypeString }) => {
  const isMobile = useIsMobile(480);

  return (
    <header className="text-center">
      {isMobile || <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Расписание занятий</h1>}
      <div
        className={`mt-${isMobile ? "2" : "4"} flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4`}
      >
        <p className={`capitalize ${isMobile ? "text-lg text-slate-900" : "text-slate-600"}`}>{formattedDate}</p>
        {ENABLE_STUDY_WEEKS && (
          <>
            <span className="hidden sm:inline">•</span>
            <p className="font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full text-sm">
              {weekTypeString}
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
