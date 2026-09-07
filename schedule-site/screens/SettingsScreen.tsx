import React, { useState } from "react";
import Header from "../components/Header";
import ThemeSwitcher from "../components/ThemeSwitcher";
import type { ScheduleEntry } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import { useModal } from "../contexts/ModalContext";
import { useSettings } from "../contexts/SettingsContext";
import ThemePreview from "../components/ThemePreview";
import Button from "../components/ui/Button";

const ToggleSwitch: React.FC<{
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ id, checked, onChange }) => {
  const { theme } = useTheme();
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2 ${theme.colors.ring}
      ${checked ? theme.colors.primary : theme.colors.button.disabledBg}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
        ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
};

interface SettingsScreenProps {
  scheduleData: ScheduleEntry;
  onReset: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onReset }) => {
  const { theme } = useTheme();
  const { showConfirm } = useModal();
  const {
    settings,
    setPastClassDimmingEnabled,
    setPastClassDimmingPercent,
    setShowElectiveClasses,
  } = useSettings();
  const [isClearing, setIsClearing] = useState(false);

  const performClearCache = async () => {
    setIsClearing(true);

    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }

      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }

      window.location.reload();
    } catch (error) {
      console.error("Ошибка при очистке кеша:", error);
      alert("Не удалось полностью очистить кеш. Попробуйте обновить страницу вручную.");
      setIsClearing(false);
    }
  };

  const handleUpdateClick = () => {
    showConfirm({
      title: "Подтверждение обновления",
      content:
        "Это действие удалит сохраненную офлайн-версию приложения и перезагрузит страницу для получения свежих данных. Вы уверены?",
      confirmText: "Обновить",
      cancelText: "Отмена",
      onConfirm: performClearCache,
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl">
      <Header scheduleTitle="Настройки" />
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
          <h2 className={`text-xl font-bold mb-4 ${theme.colors.cardHeader}`}>Обновление данных</h2>
          <p className={`mb-6 text-sm ${theme.colors.secondaryText}`}>
            Если вы не видите последних изменений в расписании, нажмите кнопку ниже. Это очистит внутренний кеш
            приложения и перезагрузит страницу.
          </p>
          <div className="w-full max-w-xs">
            <Button onClick={handleUpdateClick} disabled={isClearing}>
              {isClearing ? "Очистка..." : "Обновить приложение"}
            </Button>
          </div>
        </div>

        <div className={`p-6 rounded-2xl shadow-md ${theme.colors.cardBg}`}>
          <h2 className={`text-xl font-bold mb-4 ${theme.colors.cardHeader}`}>Отображение расписания</h2>

          <div className="flex items-center justify-between gap-4 py-2">
            <div>
              <label htmlFor="past-dimming-toggle" className={`text-sm font-medium ${theme.colors.mainText}`}>
                Затемнять прошедшие занятия
              </label>
              <p className={`text-xs mt-0.5 ${theme.colors.mutedText}`}>
                Пары текущего дня, которые уже закончились, будут визуально приглушены.
              </p>
            </div>
            <ToggleSwitch
              id="past-dimming-toggle"
              checked={settings.pastClassDimmingEnabled}
              onChange={setPastClassDimmingEnabled}
            />
          </div>

          <div
            className={`py-3 ${!settings.pastClassDimmingEnabled ? "opacity-50 pointer-events-none" : ""} transition-opacity duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="past-dimming-percent" className={`text-sm font-medium ${theme.colors.mainText}`}>
                Степень затемнения
              </label>
              <span className={`text-sm font-semibold ${theme.colors.primaryMuted}`}>
                {settings.pastClassDimmingPercent}%
              </span>
            </div>
            <input
              id="past-dimming-percent"
              type="range"
              min={0}
              max={100}
              step={5}
              value={settings.pastClassDimmingPercent}
              onChange={(e) => setPastClassDimmingPercent(Number(e.target.value))}
              disabled={!settings.pastClassDimmingEnabled}
              className="w-full accent-current cursor-pointer"
            />
          </div>

          <div className={`flex items-center justify-between gap-4 py-2 border-t ${theme.colors.divider}`}>
            <div>
              <label htmlFor="electives-toggle" className={`text-sm font-medium ${theme.colors.mainText}`}>
                Показывать факультативные занятия
              </label>
              <p className={`text-xs mt-0.5 ${theme.colors.mutedText}`}>
                Факультативы отмечены пунктирной рамкой и меткой «Необязательно к посещению». Можно скрыть их из
                расписания полностью.
              </p>
            </div>
            <ToggleSwitch
              id="electives-toggle"
              checked={settings.showElectiveClasses}
              onChange={setShowElectiveClasses}
            />
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
