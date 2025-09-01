
import React from 'react';
import type { ClassDetailsData, AlternatingClasses, WeekType } from '../types';
import ClassDetails from './ClassDetails';
import { useTheme } from '../contexts/ThemeContext';

interface PairedClassCardProps {
  time: string;
  sessions: AlternatingClasses;
  commonDetails?: ClassDetailsData;
  currentAcademicWeek: WeekType;
}

const WeekRow: React.FC<{
  weekLabel: string;
  details: ClassDetailsData;
  isCurrent: boolean;
}> = ({ weekLabel, details, isCurrent }) => {
    const { theme } = useTheme();
    return (
        <div className={`p-4 transition-colors duration-300 ${isCurrent ? `${theme.colors.primaryLightestBg} rounded-lg` : ''}`}>
            <p className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? theme.colors.primaryMuted : theme.colors.mutedText}`}>
              {weekLabel}
            </p>
            <div className="mt-2">
              <ClassDetails details={details} />
            </div>
        </div>
    )
};

const PairedClassCard: React.FC<PairedClassCardProps> = ({
  time,
  sessions,
  commonDetails,
  currentAcademicWeek,
}) => {
  const { theme } = useTheme();
  const sessionFirst = sessions.first;
  const sessionSecond = sessions.second;
  const hasBothAlternating = sessionFirst && sessionSecond;

  return (
    <div className={`custom-card shadow-sm ${theme.colors.cardBg}`}>
      <div className={`w-2 ${theme.colors.primaryAccent}`}></div>
      <div className="p-5 flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
        <div className="w-full md:w-1/6">
          <p className={`text-lg font-bold ${theme.colors.primaryMuted}`}>{time}</p>
        </div>
        <div className="w-full md:w-5/6 space-y-2">
          {commonDetails && (
              <div className="p-4">
                  <ClassDetails details={commonDetails}/>
              </div>
          )}
          {commonDetails && (sessionFirst || sessionSecond) && (
              <div className={`border-t ${theme.colors.divider} mx-4`}></div>
          )}
          
          {sessionFirst && (
            <WeekRow
              weekLabel="1-ая неделя"
              details={sessionFirst}
              isCurrent={currentAcademicWeek === 'first'}
            />
          )}
          {hasBothAlternating && (
            <div className={`border-t ${theme.colors.divider} mx-4`}></div>
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
  );
};

export default PairedClassCard;
