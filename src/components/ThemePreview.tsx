import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import Button from "./ui/Button";

const ThemePreview: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Demo Class Card */}
      <div>
        <h3 className={`text-lg font-semibold mb-3 ${theme.colors.cardHeader}`}>Пример карточки занятия</h3>
        <div className={`custom-card shadow-sm ${theme.colors.cardBg} border ${theme.colors.divider}`}>
          <div className={`w-2 ${theme.colors.primaryAccent}`}></div>
          <div className="p-5 flex items-center gap-4 w-full">
            <div className="w-1/6">
              <p className={`text-lg font-bold ${theme.colors.primaryMuted}`}>11:25</p>
            </div>
            <div className="w-5/6 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className={`text-xl font-semibold ${theme.colors.cardHeader}`}>Базы данных</h3>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${theme.colors.classType.lecture}`}>
                  Лекция
                </span>
              </div>
              <p className={`text-sm ${theme.colors.secondaryText}`}>Корпус 3а, ауд. 100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo UI Elements */}
      <div>
        <h3 className={`text-lg font-semibold mb-3 ${theme.colors.cardHeader}`}>Пример элементов UI</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-full sm:w-auto sm:max-w-xs">
            <Button>Основная кнопка</Button>
          </div>
          <div className="space-x-2">
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${theme.colors.classType.lecture}`}>
              Лекция
            </span>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${theme.colors.classType.seminar}`}>
              Семинар
            </span>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${theme.colors.classType.lab}`}>
              Лабораторная
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
