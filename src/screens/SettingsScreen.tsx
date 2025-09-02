import React from "react";
import Header from "../components/Header";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useUniversityWeek } from "../hooks/useUniversityWeek";
import type { ScheduleEntry } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import ThemePreview from "../components/ThemePreview";
import Button from "../components/ui/Button";

interface SettingsScreenProps {
  scheduleData: ScheduleEntry;
  onReset: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onReset }) => {
  const { formattedDate, weekTypeString } = useUniversityWeek();
  const { theme } = useTheme();

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <Header formattedDate={formattedDate} weekTypeString={weekTypeString} scheduleTitle="Настройки" />
      <main className="mt-8 space-y-8">
        <div className={`p-6 rounded-2xl shadow-md ${theme.colors.cardBg}`}>
          <h2 className={`text-xl font-bold mb-4 ${theme.colors.cardHeader}`}>Управление расписанием</h2>
          <p className={`mb-6 text-sm ${theme.colors.secondaryText}`}>
            Нажмите, чтобы вернуться к экрану выбора факультета, курса и группы.
          </p>
          <div className="w-full max-w-xs">
            <Button onClick={onReset}>Сменить расписание</Button>
          </div>
        </div>

        <div className={`p-6 rounded-2xl shadow-md ${theme.colors.cardBg}`}>
          <div>
            <h2 className={`text-xl font-bold mb-4 ${theme.colors.cardHeader}`}>Выбор темы</h2>
            <p className={`mb-6 text-sm ${theme.colors.secondaryText}`}>
              Выберите цветовую схему для интерфейса. Изменения применятся мгновенно.
            </p>
            <ThemeSwitcher />
          </div>

          <div className="mt-8">
            <h2
              className={`text-xl font-bold mb-4 border-t pt-6 ${theme.colors.divider} ${theme.colors.secondaryText}`}
            >
              Предпросмотр
            </h2>
            <ThemePreview />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen;
