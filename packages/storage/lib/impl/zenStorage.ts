import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

interface ZenSettings {
  sessions: number;
  focusMinutes: number;
  breakMinutes: number;
  blockedApps: string[];
}

type ZenStorage = BaseStorage<ZenSettings> & {
  updateSessions: (sessions: number) => Promise<void>;
  updateFocusMinutes: (minutes: number) => Promise<void>;
  updateBreakMinutes: (minutes: number) => Promise<void>;
  addBlockedApp: (appName: string) => Promise<void>;
  removeBlockedApp: (appName: string) => Promise<void>;
};

const defaultSettings: ZenSettings = {
  sessions: 0,
  focusMinutes: 0,
  breakMinutes: 0,
  blockedApps: [],
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
}; 