import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { useState } from 'react';
import { availableApps, type App } from './constants/apps';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  const [sessions, setSessions] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [blockedApps, setBlockedApps] = useState<string[]>([]);
  const [newBlockedApp, setNewBlockedApp] = useState('');
  const [searchResults, setSearchResults] = useState<App[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setNewBlockedApp(searchTerm);
    
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = availableApps.filter(app => 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !blockedApps.includes(app.name)
    );
    setSearchResults(filtered);
  };

  const handleAddApp = (appName: string) => {
    if (!blockedApps.includes(appName)) {
      setBlockedApps([...blockedApps, appName]);
      setNewBlockedApp('');
      setSearchResults([]);
    }
  };

  const handleRemoveBlockedApp = (appToRemove: string) => {
    setBlockedApps(blockedApps.filter(app => app !== appToRemove));
  };

  return (
    <div className={`App size-full overflow-hidden p-2 transition-colors ${isLight ? 'bg-[#CDE8F6]' : 'bg-[#364E68]'}`}>
      {/* Theme Toggle Switch Row */}
      <div className="mb-8 flex justify-end">
        <button
          onClick={exampleThemeStorage.toggle}
          className={`relative flex h-6 w-12 cursor-pointer items-center rounded-full ${
            isLight ? 'bg-blue-500' : 'bg-[#1B2A49]'
          }`}
        >
          <div 
            className={`absolute size-4 rounded-full bg-white transition-transform ${
              isLight ? 'translate-x-1' : 'translate-x-7'
            }`}
          />
        </button>
      </div>

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
                onChange={setSessions}
                suffix="sessions"
                isLight={isLight}
              />
              
              <div className="flex w-full justify-center py-1">
                <span role="img" aria-label="lotus" className="text-3xl">🪷</span>
              </div>
              
              <NumberInput
                label="Focus:"
                value={focusMinutes}
                onChange={setFocusMinutes}
                suffix="minutes"
                isLight={isLight}
              />
              
              <div className="flex w-full justify-center py-1">
                <span role="img" aria-label="lotus" className="text-3xl">🪷</span>
              </div>
              
              <NumberInput
                label="Break:"
                value={breakMinutes}
                onChange={setBreakMinutes}
                suffix="minutes"
                isLight={isLight}
              />
            </div>
          </div>

          {/* Block List Column */}
          <div className="w-9/12">
            <h2 className="mb-3 text-left text-xl font-bold">Block List</h2>
            <div className="relative">
              <div className={`mb-4 flex items-center rounded-lg ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#27374D]'}`}>
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#024CAA]">
                  <span role="img" aria-label="search" className="text-2xl">🔍</span>
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
                <div className={`absolute z-10 w-full rounded-lg ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#27374D]'} shadow-lg`}>
                  {searchResults.map((app) => (
                    <button
                      key={app.name}
                      onClick={() => handleAddApp(app.name)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddApp(app.name)}
                      tabIndex={0}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100 ${
                        isLight ? 'hover:bg-gray-100' : 'hover:bg-[#1B2A49]'
                      }`}
                    >
                      <span className="text-xl">{app.icon}</span>
                      <span>{app.name}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Blocked Apps List */}
              <div className={`rounded-lg p-3 ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#27374D]'}`}>
                <div className="max-h-[300px] space-y-3 overflow-y-auto pr-2">
                  {blockedApps.length === 0 ? (
                    <div className="flex flex-col items-center py-12 text-center">
                      <h3 className="mb-2 text-2xl font-bold">No blocked sites yet</h3>
                      <p className="text-gray-500">When you add sites to block, you will see them here.</p>
                    </div>
                  ) : (
                    blockedApps.map((appName) => {
                      const app = availableApps.find(a => a.name === appName);
                      return (
                        <div 
                          key={appName} 
                          className={`flex items-center justify-between rounded-lg px-4 py-6 ${
                            isLight ? 'bg-[#DDE6ED]' : 'bg-[#526D82]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{app?.icon}</span>
                            <span>{appName}</span>
                          </div>
                          <button 
                            onClick={() => handleRemoveBlockedApp(appName)}
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

        {/* Start Button - Reduced margin-top */}
        <div className="mt-2 flex justify-center">
          <button
            className={`rounded-full px-8 py-2 text-xl font-bold ${
              isLight ? 'bg-[#39A2DB] text-[#1E1E1E]' : 'bg-[#91C8E4] text-[#F8FAFC]'
            }`}>
            Start
          </button>
        </div>
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
}

const NumberInput = ({ label, value, onChange, suffix, isLight }: NumberInputProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xl font-bold">{label}</span>
      <div className="flex flex-col items-center">
        <button 
          onClick={() => onChange(value + 1)}
          className="text-2xl">▲</button>
        <div className={`flex size-10 items-center justify-center rounded-lg text-2xl ${
          isLight ? 'bg-[#F8FAFC] text-black' : 'bg-[#27374D] text-white'
        }`}>
          {value.toString().padStart(2, '0')}
        </div>
        <button 
          onClick={() => onChange(Math.max(0, value - 1))}
          className="text-2xl">▼</button>
      </div>
      <span className="text-xl font-bold">{suffix}</span>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
