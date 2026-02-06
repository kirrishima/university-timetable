import React, { useState } from "react";
import Header from "../components/Header";
import ThemeSwitcher from "../components/ThemeSwitcher";
import type { ScheduleEntry } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import { useModal } from "../contexts/ModalContext";
import ThemePreview from "../components/ThemePreview";
import Button from "../components/ui/Button";

interface SettingsScreenProps {
  scheduleData: ScheduleEntry;
  onReset: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onReset }) => {
  const { theme } = useTheme();
  const { showConfirm } = useModal();
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
