import React from "react";
import type { ClassDetailsData, ClassType } from "../types";
import { useTheme } from "../contexts/ThemeContext";
// FIX: Import the `themes` object to resolve the 'Cannot find name' error.
import { themes } from "../themes";

interface ClassDetailsProps {
  details: ClassDetailsData;
}

const typeKeyMap: Record<ClassType, keyof typeof themes.indigo.colors.classType> = {
  'Лекция': 'lecture',
  'Семинар': 'seminar',
  'Лабораторная': 'lab'
};

const LocationIcon: React.FC = () => {
  const { theme } = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 mr-1.5 ${theme.colors.mutedText}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

const InstructorIcon: React.FC = () => {
  const { theme } = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 mr-1.5 ${theme.colors.mutedText}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  )
};

const ClassDetails: React.FC<ClassDetailsProps> = ({ details }) => {
  const { theme } = useTheme();
  const typeKey = typeKeyMap[details.type] || 'lab';
  const typeColor = theme.colors.classType[typeKey];

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2">
        <h3 className={`text-xl font-semibold ${theme.colors.cardHeader}`}>{details.name}</h3>
        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${typeColor}`}>
          {details.type}
        </span>
      </div>
      <div className={`flex flex-col sm:flex-row text-sm ${theme.colors.secondaryText} gap-x-4 gap-y-1`}>
        {details.location && details.location !== "" && (
          <p className="flex items-center">
            <LocationIcon />
            {details.location}
          </p>
        )}
        {details.instructor && details.instructor !== "" && (
          <p className="flex items-center">
            <InstructorIcon />
            {details.instructor}
          </p>
        )}
      </div>
    </div>
  );
};

export default ClassDetails;