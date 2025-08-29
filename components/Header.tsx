
import React from 'react';

interface HeaderProps {
  formattedDate: string;
  weekTypeString: string;
}

const Header: React.FC<HeaderProps> = ({ formattedDate, weekTypeString }) => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
        Расписание занятий
      </h1>
      <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-slate-600">
        <p className="capitalize">{formattedDate}</p>
        <span className="hidden sm:inline">•</span>
        <p className="font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full text-sm">
          {weekTypeString}
        </p>
      </div>
    </header>
  );
};

export default Header;
