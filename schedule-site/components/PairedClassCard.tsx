import React from 'react';
import type { ClassDetailsData, AlternatingClasses, WeekType } from '../types';
import ClassDetails from './ClassDetails';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';

interface PairedClassCardProps {
  time: string;
  sessions: AlternatingClasses;
  commonDetails?: ClassDetailsData;
  currentAcademicWeek: WeekType;
  status: "past" | "current" | "future";
}

const WeekRow: React.FC<{
  weekLabel: string;
  details: ClassDetailsData;
  isCurrent: boolean;
}> = ({ weekLabel, details, isCurrent }) => {
  const { theme } = useTheme();
  const isElective = !!details.isElective;

  return (
    <div
      className={`p-4 transition-colors duration-300 rounded-lg ${
        isCurrent ? theme.colors.primaryLightestBg : ''
      } ${isElective ? `border-2 border-dashed ${theme.colors.primaryBorder}` : ''}`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-wider ${
          isCurrent
            ? theme.colors.primaryMuted
            : theme.colors.mutedText
        }`}
      >
        {weekLabel}
      </p>

      <div className="mt-2">
        <ClassDetails details={details} />
      </div>
    </div>
  );
};

const PairedClassCard: React.FC<PairedClassCardProps> = ({
  time,
  sessions,
  commonDetails,
  currentAcademicWeek,
  status
}) => {
  const { theme } = useTheme();
  const { settings } = useSettings();

  const sessionFirst = sessions.first;
  const sessionSecond = sessions.second;
  const hasBothAlternating = sessionFirst && sessionSecond;

  const pastDimStyle: React.CSSProperties =
    status === "past" && settings.pastClassDimmingEnabled
      ? { opacity: Math.max(0.15, 1 - settings.pastClassDimmingPercent / 100) }
      : {};

  const statusClasses = {
    past: "",
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
        style={pastDimStyle}
      >
        <div className={`w-2 ${theme.colors.primaryAccent}`}></div>

        <div className="p-5 flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
          <div className="w-full md:w-1/6">
            <p className={`text-lg font-bold ${theme.colors.primaryMuted}`}>
              {time}
            </p>
          </div>

          <div className="w-full md:w-5/6 space-y-2">
            {commonDetails && (
              <div className="p-4">
                <ClassDetails details={commonDetails} />
              </div>
            )}

            {commonDetails && (sessionFirst || sessionSecond) && (
              <div
                className={`border-t ${theme.colors.divider} mx-4`}
              ></div>
            )}

            {sessionFirst && (
              <WeekRow
                weekLabel="1-ая неделя"
                details={sessionFirst}
                isCurrent={currentAcademicWeek === 'first'}
              />
            )}

            {hasBothAlternating && (
              <div
                className={`border-t ${theme.colors.divider} mx-4`}
              ></div>
            )}

            {sessionSecond && (
              <WeekRow
                weekLabel="2-ая неделя"
                details={sessionSecond}
                isCurrent={currentAcademicWeek === 'second'}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PairedClassCard;