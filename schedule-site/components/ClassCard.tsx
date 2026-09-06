import React from "react";
import type { ClassDetailsData } from "../types";
import ClassDetails from "./ClassDetails";
import useIsMobile from "../hooks/useIsMobile";
import { useTheme } from "../contexts/ThemeContext";

interface ClassCardProps {
  details: ClassDetailsData;
  time: string;
  status: "past" | "current" | "future";
}

const ClassCard: React.FC<ClassCardProps> = ({
  details,
  time,
  status,
}) => {
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  const statusClasses = {
    past: "opacity-70",
    current: `${theme.colors.primaryLightestBg} current-class-glow`,
    future: "",
  }[status];

  return (
    <>
      <style>
        {`
          @keyframes current-class-glow {
            0%, 100% {
              box-shadow: 0 0 6px ${theme.themeColorHex}66;
            }

            50% {
              box-shadow: 0 0 20px ${theme.themeColorHex}aa;
            }
          }

          .current-class-glow {
            animation: current-class-glow 3s ease-in-out infinite;
          }
        `}
      </style>

      <div
        className={`custom-card shadow-sm ${theme.colors.cardBg} ${statusClasses} transition-all duration-300`}
      >
        <div className={`w-2 ${theme.colors.primaryAccent}`}></div>

        <div
          className={`p-5 flex flex-col md:flex-row items-start md:items-center gap-${
            isMobile ? "1" : "4"
          } w-full`}
        >
          <div className="w-full md:w-1/6">
            <p
              className={`text-lg font-bold ${theme.colors.primaryMuted}`}
            >
              {time}
            </p>
          </div>

          <div className="w-full md:w-5/6">
            <ClassDetails details={details} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassCard;