import { useSyncExternalStore } from 'react';
import type { BaseStorage } from '@extension/storage/lib/base/types';

export function useStorage<Data>(storage: BaseStorage<Data>): Data | null {
  const data = useSyncExternalStore<Data | null>(storage.subscribe, storage.getSnapshot);
  return data;
}
