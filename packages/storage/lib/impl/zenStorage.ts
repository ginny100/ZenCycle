import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

interface ZenSettings {
  sessions: number;
  focusMinutes: number;
  breakMinutes: number;
  blockedApps: string[];
  timerActive: boolean;
  currentSession: number;
  timerState: 'focus' | 'break';
  timeLeft: number;
  lastTimestamp: number;
}

type ZenStorage = BaseStorage<ZenSettings> & {
  updateSessions: (sessions: number) => Promise<void>;
  updateFocusMinutes: (minutes: number) => Promise<void>;
  updateBreakMinutes: (minutes: number) => Promise<void>;
  addBlockedApp: (appName: string) => Promise<void>;
  removeBlockedApp: (appName: string) => Promise<void>;
  updateTimerState: (timerState: Partial<Pick<ZenSettings, 'timerActive' | 'currentSession' | 'timerState' | 'timeLeft'>>) => Promise<void>;
};

const defaultSettings: ZenSettings = {
  sessions: 1,
  focusMinutes: 3, // Human Comments: For testing, set to 3, otherwise set to 25
  breakMinutes: 2, // Human Comments: For testing, set to 2, otherwise set to 5
  blockedApps: [],
  timerActive: false,
  currentSession: 1,
  timerState: 'focus',
  timeLeft: 0,
  lastTimestamp: 0,
};

const storage = createStorage<ZenSettings>('zen-storage-key', defaultSettings, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const zenStorage: ZenStorage = {
  ...storage,
  updateSessions: async (sessions: number) => {
    await storage.set(current => ({
      ...current,
      sessions,
    }));
  },
  updateFocusMinutes: async (minutes: number) => {
    await storage.set(current => ({
      ...current,
      focusMinutes: minutes,
    }));
  },
  updateBreakMinutes: async (minutes: number) => {
    await storage.set(current => ({
      ...current,
      breakMinutes: minutes,
    }));
  },
  addBlockedApp: async (appName: string) => {
    await storage.set(current => ({
      ...current,
      blockedApps: [...current.blockedApps, appName],
    }));
  },
  removeBlockedApp: async (appName: string) => {
    await storage.set(current => ({
      ...current,
      blockedApps: current.blockedApps.filter(app => app !== appName),
    }));
  },
  updateTimerState: async (timerState: Partial<Pick<ZenSettings, 'timerActive' | 'currentSession' | 'timerState' | 'timeLeft'>>) => {
    await storage.set(current => ({
      ...current,
      ...timerState,
      lastTimestamp: Date.now(),
    }));
  },
}; 