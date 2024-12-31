import { useStorage } from '@extension/shared';
import { zenStorage, ZenTimerState } from '@extension/storage';
import { useEffect, useMemo } from 'react';
import BlockView from './BlockView';

export default function App() {
  const zenSettings = useStorage(zenStorage);

  useEffect(() => {
    console.log('content-ui: 🎭 App component loaded ');
  }, []);

  const normalizeUrl = (url: string) => {
    return url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .toLowerCase();
  };

  const shouldBlock = useMemo(() => {
    const currentOrigin = window.location.origin;
    const rootOrigin = new URL(currentOrigin).hostname.split('.').slice(-2).join('.');
    const origins = [rootOrigin, currentOrigin];

    return origins.some(origin => {
      const normalizedOrigin = normalizeUrl(origin);
      return (
        zenSettings?.timerState === ZenTimerState.Focus &&
        zenSettings?.blockedApps.some(app => {
          const normalizedAppUrl = normalizeUrl(app.url);
          return normalizedAppUrl === normalizedOrigin;
        })
      );
    });
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
