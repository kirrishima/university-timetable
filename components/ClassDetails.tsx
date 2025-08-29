import React from 'react';
import type { ClassDetailsData } from '../types';

interface ClassDetailsProps {
  details: ClassDetailsData;
}

const getTypeColor = (type: ClassDetailsData['type']): string => {
  switch (type) {
    case 'Лекция': return 'bg-blue-100 text-blue-800';
    case 'Семинар': return 'bg-green-100 text-green-800';
    case 'Лабораторная': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const InstructorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const ClassDetails: React.FC<ClassDetailsProps> = ({ details }) => {
    return (
        <div className="space-y-2">
            <div className="flex flex-col items-start gap-y-1.5 sm:flex-row sm:items-center sm:gap-x-2">
              <h3 className="text-xl font-semibold text-slate-900">{details.name}</h3>
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getTypeColor(details.type)}`}>
                {details.type}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row text-sm text-slate-600 gap-x-4 gap-y-1">
              <p className="flex items-center">
                <LocationIcon />
                {details.location}
              </p>
              <p className="flex items-center">
                <InstructorIcon />
                {details.instructor}
              </p>
            </div>
        </div>
    );
};

export default ClassDetails;