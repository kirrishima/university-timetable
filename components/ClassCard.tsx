
import React from "react";
import type { ClassDetailsData } from "../types";
import ClassDetails from "./ClassDetails";
import useIsMobile from "../hooks/useIsMobile";
import { useTheme } from "../contexts/ThemeContext";

interface ClassCardProps {
  details: ClassDetailsData;
  time: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ details, time }) => {
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  return (
    <div className={`custom-card shadow-sm ${theme.colors.cardBg}`}>
      <div className={`w-2 ${theme.colors.primaryAccent}`}></div>
      <div className={`p-5 flex flex-col md:flex-row items-start md:items-center gap-${isMobile ? "1" : "4"} w-full`}>
        <div className="w-full md:w-1/6">
          <p className={`text-lg font-bold ${theme.colors.primaryMuted}`}>{time}</p>
        </div>
        <div className="w-full md:w-5/6">
          <ClassDetails details={details} />
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
