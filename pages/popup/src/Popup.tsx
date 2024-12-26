import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { useState } from 'react';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  const [sessions, setSessions] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);

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
            <div className={`mb-4 flex items-center rounded-lg ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#27374D]'}`}>
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#024CAA]">
                <span role="img" aria-label="search" className="text-2xl">🔎</span>
              </div>
              <input
                type="text"
                placeholder="Search for apps and websites to block during focus time"
                className={`w-full bg-transparent p-2 outline-none ${isLight ? 'text-gray-900' : 'text-white'}`}
              />
            </div>
            
            {/* Scrollable container with background */}
            <div className={`rounded-lg p-2 ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#27374D]'}`}>
              <div className="max-h-[300px] space-y-3 overflow-y-auto pr-4">
                {['App 1', 'App 2', 'App 3', 'App 4', 'App 5', 'App 6', 'App 7', 'App 8', 'App 9', 'App 10'].map((app) => (
                  <div 
                    key={app} 
                    className={`flex items-center justify-between rounded-lg p-4 ${
                      isLight ? 'bg-[#DDE6ED]' : 'bg-[#526D82]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-3 rounded-full bg-red-500" />
                      <span>{app}</span>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      🗑️
                    </button>
                  </div>
                ))}
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
