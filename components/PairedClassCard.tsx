import React from 'react';
import type { ClassDetailsData, AlternatingClasses, WeekType } from '../types';
import ClassDetails from './ClassDetails';

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
}> = ({ weekLabel, details, isCurrent }) => (
  <div className={`p-4 transition-colors duration-300 ${isCurrent ? 'bg-indigo-50 rounded-lg' : ''}`}>
    <p className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-indigo-700' : 'text-slate-500'}`}>
      {weekLabel}
    </p>
    <div className="mt-2">
      <ClassDetails details={details} />
    </div>
  </div>
);

const PairedClassCard: React.FC<PairedClassCardProps> = ({
  time,
  sessions,
  commonDetails,
  currentAcademicWeek,
}) => {
  const sessionFirst = sessions.first;
  const sessionSecond = sessions.second;
  const hasBothAlternating = sessionFirst && sessionSecond;

  return (
    <div className="custom-card shadow-sm">
      <div className="w-2 bg-indigo-500"></div>
      <div className="p-5 flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
        <div className="w-full md:w-1/4">
          <p className="text-lg font-bold text-indigo-700">{time}</p>
        </div>
        <div className="w-full md:w-3/4 space-y-2">
          {/* Render common details if they exist */}
          {commonDetails && (
              <div className="p-4">
                  <ClassDetails details={commonDetails}/>
              </div>
          )}
          {/* Divider if there are both common AND alternating classes */}
          {commonDetails && (sessionFirst || sessionSecond) && (
              <div className="border-t border-slate-200 mx-4"></div>
          )}
          
          {sessionFirst && (
            <WeekRow
              weekLabel="1-ая неделя"
              details={sessionFirst}
              isCurrent={currentAcademicWeek === 'first'}
            />
          )}
          {hasBothAlternating && (
            <div className="border-t border-slate-200 mx-4"></div>
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