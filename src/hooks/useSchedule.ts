
import { useState, useEffect } from 'react';
import type { ScheduleIdentifier } from '../types';

const SCHEDULE_STORAGE_KEY = 'university-schedule-selection';

export const useSchedule = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleIdentifier | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedScheduleJSON = localStorage.getItem(SCHEDULE_STORAGE_KEY);
      if (savedScheduleJSON) {
        setSelectedSchedule(JSON.parse(savedScheduleJSON));
      }
    } catch (error) {
      console.error("Failed to load schedule from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const saveSchedule = (schedule: ScheduleIdentifier) => {
    try {
      localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(schedule));
      setSelectedSchedule(schedule);
    } catch (error) {
      console.error("Failed to save schedule to localStorage", error);
    }
  };

  const clearSchedule = () => {
    try {
      localStorage.removeItem(SCHEDULE_STORAGE_KEY);
      setSelectedSchedule(null);
    } catch (error) {
      console.error("Failed to clear schedule from localStorage", error);
    }
  };

  return { selectedSchedule: isLoaded ? selectedSchedule : undefined, saveSchedule, clearSchedule };
};
