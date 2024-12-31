import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';
import { type App } from '../constants/apps';

export enum ZenTimerState {
  Focus = 'focus',
  Break = 'break',
  None = 'none',
}

export enum ZenEvent {
  StartTimer = 'START_TIMER',
  StopTimer = 'STOP_TIMER',
}

export interface ZenSettings {
  sessions: number;
  focusMinutes: number;
  breakMinutes: number;
  blockedApps: App[];
  timerActive: boolean;
  currentSession: number;
  timerState: ZenTimerState;
  timeLeft: number;
  lastTimestamp: number;
}

export type ZenStorage = BaseStorage<ZenSettings> & {
  updateSessions: (sessions: number) => Promise<void>;
  updateFocusMinutes: (minutes: number) => Promise<void>;
  updateBreakMinutes: (minutes: number) => Promise<void>;
  addBlockedApp: (app: App) => Promise<boolean>;
  removeBlockedApp: (appUrl: string) => Promise<void>;
  updateTimerState: (
    timerState: Partial<Pick<ZenSettings, 'timerActive' | 'currentSession' | 'timerState' | 'timeLeft'>>,
  ) => Promise<void>;
};

const defaultSettings: ZenSettings = {
  sessions: 1,
  focusMinutes: 25, // Human Comments: For testing, set to 3, otherwise set to 25
  breakMinutes: 5, // Human Comments: For testing, set to 2, otherwise set to 5
  blockedApps: [],
  timerActive: false,
  currentSession: 1,
  timerState: ZenTimerState.None,
  timeLeft: 0,
  lastTimestamp: 0,
};

const storage: BaseStorage<ZenSettings> = createStorage<ZenSettings>('zen-storage-key', defaultSettings, {
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
  addBlockedApp: async (app: App) => {
    // only add if not in blockedApps
    const alreadyExists = (await storage.get()).blockedApps.some(blockedApp => blockedApp.url === app.url);
    if (!alreadyExists) {
      await storage.set(current => ({
        ...current,
        blockedApps: [...current.blockedApps, app],
      }));
      return true;
    } else {
      return false;
    }
  },
  removeBlockedApp: async (appUrl: string) => {
    await storage.set(current => ({
      ...current,
      blockedApps: current.blockedApps.filter(app => app.url !== appUrl),
    }));
  },
  updateTimerState: async (
    timerState: Partial<Pick<ZenSettings, 'timerActive' | 'currentSession' | 'timerState' | 'timeLeft'>>,
  ) => {
    await storage.set(current => ({
      ...current,
      ...timerState,
      lastTimestamp: Date.now(),
    }));
  },
};
