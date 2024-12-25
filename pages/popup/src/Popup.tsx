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
    <div className={`App size-full p-8 transition-colors ${isLight ? 'bg-[#e8f4ff]' : 'bg-[#1a2b3c]'}`}>
      {/* Theme Toggle Switch Row */}
      <div className="mb-8 flex justify-end">
        <button
          onClick={exampleThemeStorage.toggle}
          className="relative flex h-6 w-12 cursor-pointer items-center rounded-full bg-blue-500"
        >
          <div 
            className={`absolute size-5 rounded-full bg-white transition-transform ${
              isLight ? 'translate-x-1' : 'translate-x-6'
            }`}
          />
        </button>
      </div>

      {/* Main Content */}
      <div className={`text-center transition-colors ${isLight ? 'text-gray-900' : 'text-white'}`}>
        <div className="flex gap-0">
          {/* Timer Settings Column */}
          <div className="w-7/12 space-y-2">
            <h1 className="mb-2 text-left font-[\'Agbalumo\'] text-4xl font-normal">Timer setting</h1>
            {/* Center the number inputs */}
            <div className="flex flex-col items-center space-y-1">
              <NumberInput
                label="Let's do"
                value={sessions}
                onChange={setSessions}
                suffix="sessions"
                isLight={isLight}
              />
              
              <div className="flex justify-center py-1">
                <span role="img" aria-label="lotus" className="text-3xl">🪷</span>
              </div>
              
              <NumberInput
                label="Focus:"
                value={focusMinutes}
                onChange={setFocusMinutes}
                suffix="minutes"
                isLight={isLight}
              />
              
              <div className="flex justify-center py-1">
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
            <div className={`mb-4 flex items-center rounded-lg p-2 ${isLight ? 'bg-white' : 'bg-[#2a3b4c]'}`}>
              <div className="rounded-lg bg-blue-500 p-2">
                <span role="img" aria-label="search">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search"
                className={`w-full bg-transparent p-2 outline-none ${isLight ? 'text-gray-900' : 'text-white'}`}
              />
            </div>
            
            {/* Scrollable container with background */}
            <div className={`rounded-lg p-3 ${isLight ? 'bg-white/50' : 'bg-[#2a3b4c]/50'}`}>
              <div className="max-h-[300px] space-y-1 overflow-y-auto pr-2">
                {['App 1', 'App 2', 'App 3', 'App 4', 'App 5'].map((app) => (
                  <div 
                    key={app} 
                    className={`flex items-center justify-between rounded-lg p-3 ${
                      isLight ? 'bg-gray-200' : 'bg-[#3a4b5c]'
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
            className={`rounded-lg px-8 py-2 text-white ${
              isLight ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
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
          isLight ? 'bg-white text-black' : 'bg-[#2a3b4c] text-white'
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
