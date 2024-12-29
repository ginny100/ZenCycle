import { availableApps } from '@extension/shared/lib/constants/apps';
import { useStorage } from '@extension/shared';
import { zenStorage, ZenTimerState } from '@extension/storage';
import { useEffect, useMemo } from 'react';
import BlockView from './BlockView';

export default function App() {
  const zenSettings = useStorage(zenStorage);

  useEffect(() => {
    console.log('content-ui: 🎭 App component loaded ');
  }, []);

  const shouldBlock = useMemo(() => {
    const currentAppName = availableApps.find(app => app.url === window.location.origin)?.name;
    if (!currentAppName) return false;
    console.log('content-ui: 🎭 current App Name is ', currentAppName);
    console.log('content-ui: 🎭 blockedApps = ', zenSettings?.blockedApps);
    return zenSettings?.timerState === ZenTimerState.Focus && zenSettings?.blockedApps.includes(currentAppName);
  }, [zenSettings]);

  useEffect(() => {
    if (shouldBlock) {
      document.documentElement.style.setProperty('overflow', 'hidden', 'important');
    } else {
      document.documentElement.style.setProperty('overflow', 'auto', 'important');
    }

    // Cleanup when component unmounts
    return () => {
      document.documentElement.style.setProperty('overflow', 'auto', 'important');
    };
  }, [shouldBlock]);

  return <div>{shouldBlock && <BlockView />}</div>;
}
