import React from "react";
import type { ClassDetailsData } from "../types";
import ClassDetails from "./ClassDetails";

interface ClassCardProps {
  details: ClassDetailsData;
  time: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ details, time }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex transition-all duration-300 ease-in-out  lg:hover:shadow-lg lg:hover:-translate-y-1">
      <div className="w-2 bg-indigo-500"></div>
      <div className="p-5 flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
        <div className="w-full md:w-1/4">
          <p className="text-lg font-bold text-indigo-700">{time}</p>
        </div>
        <div className="w-full md:w-3/4">
          <ClassDetails details={details} />
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
