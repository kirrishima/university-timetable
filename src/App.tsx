
import React from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useSchedule } from './hooks/useSchedule';
import SetupScreen from './screens/SetupScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import { ALL_SCHEDULES } from './data/schedules';
import type { ScheduleEntry } from './types';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const { selectedSchedule, saveSchedule, clearSchedule } = useSchedule();

  const handleScheduleSelect = (schedule: ScheduleEntry) => {
    const { faculty, facultyShort, course, group, subgroup } = schedule;
    saveSchedule({ faculty, facultyShort, course, group, subgroup });
  };

  const scheduleData = selectedSchedule 
    ? ALL_SCHEDULES.find(
        s => 
          s.faculty === selectedSchedule.faculty &&
          s.course === selectedSchedule.course &&
          s.group === selectedSchedule.group &&
          s.subgroup === selectedSchedule.subgroup
      )
    : null;

  return (
    <div className={`min-h-screen font-sans ${theme.colors.mainBg} ${theme.colors.mainText} transition-colors duration-300`}>
      {scheduleData ? (
        <ScheduleScreen scheduleData={scheduleData} onReset={clearSchedule} />
      ) : (
        <SetupScreen onScheduleSelect={handleScheduleSelect} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
