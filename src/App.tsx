import React from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useSchedule } from './hooks/useSchedule';
import SetupScreen from './screens/SetupScreen';
import { ALL_SCHEDULES } from './data/schedules';
import type { ScheduleEntry } from './types';
import AppTabs from './components/AppTabs';
import { ALL_PROFESSORS } from './data/professors';

const AppContent: React.FC = () => {
    const { theme } = useTheme();
    const { selectedSchedule, saveSchedule, clearSchedule } = useSchedule();

    const scheduleData: ScheduleEntry | undefined = React.useMemo(() => {
        if (!selectedSchedule) return undefined;
        return ALL_SCHEDULES.find(s =>
            s.faculty === selectedSchedule.faculty &&
            s.course === selectedSchedule.course &&
            s.group === selectedSchedule.group &&
            s.subgroup === selectedSchedule.subgroup &&
            s.universityName === selectedSchedule.universityName
        );
    }, [selectedSchedule]);

    const professorsData = React.useMemo(() => {
        if (!scheduleData) return [];
        return ALL_PROFESSORS.find(p => p.faculty === scheduleData.faculty)?.professors || [];
    }, [scheduleData]);

    const handleScheduleSelect = (schedule: ScheduleEntry) => {
        const { schedule: _, ...identifier } = schedule;
        saveSchedule(identifier);
    };

    const handleReset = () => {
        clearSchedule();
    };

    return (
        <div className={`min-h-screen ${theme.colors.mainBg} ${theme.colors.mainText}`}>
            {scheduleData ? (
                <AppTabs
                    scheduleData={scheduleData}
                    professorsData={professorsData}
                    onReset={handleReset}
                />
            ) : (
                <SetupScreen onScheduleSelect={handleScheduleSelect} />
            )}
        </div>
    );
};


const App: React.FC = () => (
    <ThemeProvider>
        <AppContent />
    </ThemeProvider>
);

export default App;
