import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import type { ZenSettings } from '@extension/storage';
import { themeStorage, zenStorage } from '@extension/storage';
import { useState } from 'react';
import { availableApps, type App } from '@extension/storage/lib/constants/apps';
import Timer from './Timer';
import ThemeSwitcher from './components/ThemeSwitcher';

const Popup = ({ zenSettings }: { zenSettings: ZenSettings }) => {
  const theme = useStorage(themeStorage);

  console.log('zenSettings loaded is ', zenSettings);
  const isLight = theme === 'light';

  const [sessions, setSessions] = useState(zenSettings.sessions ?? 4);
  const [focusMinutes, setFocusMinutes] = useState(zenSettings.focusMinutes ?? 25);
  const [breakMinutes, setBreakMinutes] = useState(zenSettings.breakMinutes ?? 5);
  const [blockedApps, setBlockedApps] = useState(zenSettings.blockedApps ?? []);
  const [newBlockedApp, setNewBlockedApp] = useState('');
  const [searchResults, setSearchResults] = useState<App[]>([]);
  const shouldShowTimer = zenSettings.timerActive || zenSettings.currentSession === zenSettings.sessions + 1; // Show timer when timer is active or when the last session is done

  // Add new function to format and validate URLs
  const formatUrl = (input: string): string | null => {
    try {
      // Add protocol if missing
      if (!input.match(/^https?:\/\//)) {
        input = 'https://' + input;
      }
      const url = new URL(input);
      return url.origin;
    } catch {
      return null;
    }
  };

  // Add function to fetch favicon
  const getFavicon = async (url: string): Promise<string> => {
    try {
      const domain = new URL(url).origin;
      // Fallback to Google's favicon service if none of the above work
      return `https://www.google.com/s2/favicons?domain=${domain}&size=32`;
    } catch {
      return 'default-favicon.ico'; // You should add a default favicon
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setNewBlockedApp(searchTerm);

    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    // First, check predefined apps
    const filteredApps = availableApps.filter(
      app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !blockedApps.some(blockedApp => blockedApp.url === app.url),
    );

    // Then, check if input might be a URL
    const formattedUrl = formatUrl(searchTerm); // TODO: this check is not working
    if (formattedUrl && !filteredApps.some(app => app.url === formattedUrl)) {
      const favicon = await getFavicon(formattedUrl);
      const customApp: App = {
        name: new URL(formattedUrl).hostname,
        icon: favicon,
        url: formattedUrl,
      };
      setSearchResults([...filteredApps, customApp]);
    } else {
      setSearchResults(filteredApps);
    }
  };

  const handleAddApp = async (url: string) => {
    const defaultApp = availableApps.find(app => app.url === url);
    if (defaultApp) {
      const formattedUrl = formatUrl(defaultApp.url);
      if (formattedUrl && !blockedApps.some(app => app.url === formattedUrl)) {
        zenStorage.addBlockedApp({ ...defaultApp });
        setBlockedApps([...blockedApps, defaultApp]);
      }
    } else {
      const formattedUrl = formatUrl(newBlockedApp);
      if (formattedUrl) {
        const favicon = await getFavicon(formattedUrl);
        const isAdded = await zenStorage.addBlockedApp({ name: formattedUrl, icon: favicon, url: formattedUrl });
        if (isAdded) {
          setBlockedApps([...blockedApps, { name: formattedUrl, icon: favicon, url: formattedUrl }]);
        }
      }
    }
    setNewBlockedApp('');
    setSearchResults([]);
  };

  const handleRemoveBlockedApp = (appUrl: string) => {
    zenStorage.removeBlockedApp(appUrl);
    setBlockedApps(blockedApps.filter(app => app.url !== appUrl));
  };

  // Show timer view if timer is active or explicitly set
  if (shouldShowTimer) {
    return (
      <>
        {zenSettings && (
          <Timer
            onBack={() => {
              // trigger background script
              chrome.runtime.sendMessage({ type: 'STOP_TIMER' }, () => {
                console.log('🛑 Trigger time stop');
              });
            }}
            zenSettings={zenSettings}
          />
        )}
      </>
    );
  }

  const triggerStartTimer = () => {
    // trigger background script
    chrome.runtime.sendMessage(
      { type: 'START_TIMER', payload: { focusMinutes, breakMinutes, sessions, blockedApps } },
      () => {
        console.log('🚀 Trigger time start');
      },
    );
  };

  return (
    <div className={`App size-full overflow-hidden p-2 transition-colors ${isLight ? 'bg-[#CDE8F6]' : 'bg-[#364E68]'}`}>
      <ThemeSwitcher />

      {/* Main Content */}
      <div className={`text-center transition-colors ${isLight ? 'text-gray-900' : 'text-white'}`}>
        <div className="flex gap-0">
          {/* Timer Settings Column */}
          <div className="w-7/12 space-y-2">
            <h1 className="mb-2 text-left font-['Agbalumo'] text-4xl font-normal">Timer setting</h1>
            {/* Center the number inputs */}
            <div className="flex flex-col items-center space-y-1">
              <NumberInput
                label="Let's do"
                value={sessions}
                onChange={value => {
                  setSessions(value);
                  zenStorage.updateSessions(value);
                }}
                suffix="sessions"
                isLight={isLight}
                type="sessions"
              />

              <div className="flex w-full justify-center py-1">
                <span role="img" aria-label="lotus" className="text-3xl">
                  🪷
                </span>
              </div>

              <NumberInput
                label="Focus:"
                value={focusMinutes}
                onChange={value => {
                  setFocusMinutes(value);
                  zenStorage.updateFocusMinutes(value);
                }}
                suffix="minutes"
                isLight={isLight}
                type="focus"
              />

              <div className="flex w-full justify-center py-1">
                <span role="img" aria-label="lotus" className="text-3xl">
                  🪷
                </span>
              </div>

              <NumberInput
                label="Break:"
                value={breakMinutes}
                onChange={value => {
                  setBreakMinutes(value);
                  zenStorage.updateBreakMinutes(value);
                }}
                suffix="minutes"
                isLight={isLight}
                type="break"
              />
            </div>
          </div>

          {/* Block List Column */}
          <div className="w-9/12">
            <h2 className="mb-3 text-left text-xl font-bold">Block List</h2>
            <div className="relative">
              {/* Search Bar */}
              <div
                className={`mb-4 flex items-center rounded-lg shadow-lg shadow-black/20 ${
                  isLight ? 'bg-[#F8FAFC]' : 'bg-[#27374D]'
                }`}>
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#024CAA]">
                  <span role="img" aria-label="search" className="text-2xl">
                    🔎
                  </span>
                </div>
                <input
                  type="text"
                  value={newBlockedApp}
                  onChange={handleSearch}
                  placeholder="Search for apps and websites to block during focus time"
                  className={`w-full bg-transparent p-2 outline-none ${isLight ? 'text-gray-900' : 'text-white'}`}
                />
              </div>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div
                  className={`absolute z-10 w-full rounded-lg shadow-lg shadow-black/20 ${
                    isLight ? 'bg-[#F8FAFC]' : 'bg-[#27374D]'
                  }`}>
                  <div className="m-2 max-h-48 overflow-y-auto pr-2">
                    {searchResults.map(app => (
                      // TODO: state.blockApps should contain the urls
                      <button
                        key={app.name}
                        onClick={() => handleAddApp(app.url)}
                        onKeyDown={e => e.key === 'Enter' && handleAddApp(app.url)}
                        tabIndex={0}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 ${
                          isLight ? 'hover:bg-[#BCCCDC]' : 'hover:bg-[#9DB2BF]'
                        }`}>
                        <img src={app.icon} alt={`${app.name} icon`} className="size-4 align-middle" />
                        <span>{app.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Blocked Apps List */}
              <div className={`rounded-lg p-3 shadow-lg shadow-black/20 ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#27374D]'}`}>
                <div className="max-h-[300px] space-y-3 overflow-y-auto pr-2">
                  {blockedApps.length === 0 ? (
                    <div className="flex flex-col items-center py-12 text-center">
                      <h3 className="mb-2 text-2xl font-bold">No blocked sites yet</h3>
                      <p className="text-gray-500">When you add sites to block, you will see them here.</p>
                    </div>
                  ) : (
                    blockedApps.map(app => {
                      return (
                        <div
                          key={app.name}
                          className={`flex items-center justify-between rounded-lg px-4 py-6 ${
                            isLight ? 'bg-[#DDE6ED]' : 'bg-[#526D82]'
                          }`}>
                          <div className="flex items-center gap-3">
                            <img src={app?.icon} alt={`${app?.name} icon`} className="size-4 align-middle" />
                            <span>{app.name}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveBlockedApp(app.url)}
                            className="text-gray-400 hover:text-gray-600">
                            ➖
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => {
            triggerStartTimer();
          }}
          className={`rounded-full px-8 py-2 text-xl font-bold shadow-lg shadow-black/20 transition-colors ${
            isLight
              ? 'bg-[#39A2DB] text-[#1E1E1E] hover:bg-[#769FCD]'
              : 'bg-[#91C8E4] text-[#F8FAFC] hover:bg-[#B9D7EA]'
          }`}>
          Start
        </button>
      </div>
    </div>
  );
};

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  suffix: string;
  isLight: boolean;
  type: 'sessions' | 'focus' | 'break';
}

const NumberInput = ({ label, value, onChange, suffix, isLight, type }: NumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    const focusValues = [25, 50, 100, 200]; // Human Comments: For testing, set to [1,2,3], otherwise set to [25, 50, 100, 200]
    const breakValues = [5, 10, 20, 40]; // Human Comments: For testing, set to [1,2,3], otherwise set to [5, 10, 20, 40]
    let closestValue;

    switch (type) {
      case 'sessions':
        onChange(Math.min(Math.max(0, newValue), 12));
        break;
      case 'focus':
        if (newValue === 0) {
          onChange(0);
          break;
        }
        closestValue = focusValues.reduce((prev, curr) =>
          Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev,
        );
        onChange(closestValue);
        break;
      case 'break':
        if (newValue === 0) {
          onChange(0);
          break;
        }
        closestValue = breakValues.reduce((prev, curr) =>
          Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev,
        );
        onChange(closestValue);
        break;
    }
  };

  const handleIncrement = () => {
    const focusValues = [25, 50, 100, 200]; // Human Comments: For testing, set to [1,2,3], otherwise set to [25, 50, 100, 200]
    const breakValues = [5, 10, 20, 40]; // Human Comments: For testing, set to [1,2,3], otherwise set to [5, 10, 20, 40]
    let nextValue;

    switch (type) {
      case 'sessions':
        onChange(Math.min(value + 1, 12));
        break;
      case 'focus':
        if (value === 0) {
          onChange(25);
          break;
        }
        nextValue = focusValues.find(v => v > value) ?? 200;
        onChange(nextValue);
        break;
      case 'break':
        if (value === 0) {
          onChange(5);
          break;
        }
        nextValue = breakValues.find(v => v > value) ?? 40;
        onChange(nextValue);
        break;
    }
  };

  const handleDecrement = () => {
    const focusValues = [0, 25, 50, 100, 200]; // Human Comments: For testing, set to [0, 1, 2, 3], otherwise set to [0, 25, 50, 100, 200]
    const breakValues = [0, 5, 10, 20, 40]; // Human Comments: For testing, set to [0, 1, 2, 3], otherwise set to [0, 5, 10, 20, 40]
    let prevValue;

    switch (type) {
      case 'sessions':
        onChange(Math.max(0, value - 1));
        break;
      case 'focus':
        prevValue = focusValues.reverse().find(v => v < value) ?? 0;
        onChange(prevValue);
        break;
      case 'break':
        prevValue = breakValues.reverse().find(v => v < value) ?? 0;
        onChange(prevValue);
        break;
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-xl font-bold">{label}</span>
      <div className="flex flex-col items-center">
        <button onClick={handleIncrement} className="text-2xl">
          ▲
        </button>
        <input
          type="number"
          value={value.toString().padStart(2, '0')}
          onChange={handleChange}
          className={`size-10 rounded-lg text-center text-xl font-medium shadow-lg shadow-black/20 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
            isLight ? 'bg-[#F8FAFC] text-gray-900' : 'bg-[#27374D] text-white'
          }`}
        />
        <button onClick={handleDecrement} className="text-2xl">
          ▼
        </button>
      </div>
      <span className="text-xl font-bold">{suffix}</span>
    </div>
  );
};

const PopupWrapper = () => {
  const zenSettings = useStorage(zenStorage);

  return <>{zenSettings && <Popup zenSettings={zenSettings} />}</>;
};
export default withErrorBoundary(withSuspense(PopupWrapper, <div> Loading ... </div>), <div> Error Occur </div>);
