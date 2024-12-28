import { useStorage } from '@extension/shared';
import type { ZenSettings } from '@extension/storage';
import { themeStorage, ZenTimerState } from '@extension/storage';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useState } from 'react';
import ConfirmDialog from './components/ConfirmDialog';

interface TimerProps {
  onBack: () => void;
  // sessions: number;
  // focusMinutes: number;
  // breakMinutes: number;
  zenSettings: ZenSettings;
}

const Timer = ({ onBack, zenSettings }: TimerProps) => {
  const theme = useStorage(themeStorage);
  const isLight = theme === 'light';

  // Initialize state from storage or props
  const currentSession = zenSettings.currentSession; // 1-based index of the current session
  const timerState = zenSettings.timerState;
  const timeLeft = zenSettings.timeLeft;
  const isRunning = zenSettings.timerActive;
  const [showConfirm, setShowConfirm] = useState(false);

  // Calculate progress for circle animation (0 to 100)
  const totalSeconds =
    timerState === ZenTimerState.Focus ? zenSettings.focusMinutes * 60 : zenSettings.breakMinutes * 60;
  const progress = (1 - timeLeft / totalSeconds) * 100; // Calculate elapsed time percentage

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBackClick = () => {
    if (isRunning) {
      setShowConfirm(true);
    } else {
      onBack();
    }
  };

  const handleConfirm = () => {
    onBack();
  };

  return (
    <>
      <div
        className={`App size-full overflow-hidden p-2 transition-colors ${isLight ? 'bg-[#CDE8F6]' : 'bg-[#364E68]'}`}>
        <ThemeSwitcher />

        {/* Box Wrapper */}
        <div
          className={`mx-8 my-9 rounded-xl p-4 shadow-lg shadow-black/20 ${isLight ? 'bg-[#F8FAFC]' : 'bg-[#27374D]'}`}>
          <div className="flex flex-col items-center justify-between">
            <h1 className={`font-['Agbalumo'] text-4xl transition-all ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {timerState === ZenTimerState.Focus ? 'Focus Time' : 'Break Time'}
            </h1>

            {/* Timer Circle */}
            <div className="relative my-9 flex size-64 items-center justify-center">
              {/* SVG Circle */}
              <svg className="absolute size-full -rotate-90">
                {/* Background Circle - White */}
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke={isLight ? '#F8FAFC' : '#27374D'}
                  strokeWidth="12"
                />
                {/* Progress Circle - Blue */}
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke={isLight ? '#769FCD' : '#B9D7EA'}
                  strokeWidth="12"
                  strokeDasharray={`${progress * 7.54} 754`}
                  strokeLinecap="round"
                  className="transition-all"
                />
              </svg>

              {/* Timer Display */}
              <div
                className={`z-10 font-['Inria_Sans'] text-7xl font-normal ${
                  isLight ? 'text-[#1E1E1E]' : 'text-[#F8FAFC]'
                }`}>
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Lotus Icons */}
            <div className="flex gap-4">
              {Array(zenSettings.sessions)
                .fill('🪷')
                .map((lotus, index) => {
                  const one_based_idx = index + 1;
                  return (
                    <span
                      key={index}
                      role="img"
                      aria-label="lotus"
                      className="text-4xl"
                      style={{
                        filter: 'saturate(1.5) brightness(1.1)',
                        transform: 'scale(1.2)',
                        opacity: one_based_idx < currentSession ? 1 : 0.4,
                      }}>
                      {lotus}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleBackClick}
            className={`rounded-full px-8 py-2 text-xl font-bold shadow-lg shadow-black/20 transition-colors ${
              isLight
                ? 'bg-[#39A2DB] text-[#1E1E1E] hover:bg-[#769FCD]'
                : 'bg-[#91C8E4] text-[#F8FAFC] hover:bg-[#B9D7EA]'
            }`}>
            Back
          </button>
        </div>
      </div>
      <ConfirmDialog isOpen={showConfirm} onConfirm={handleConfirm} onCancel={() => setShowConfirm(false)} />
    </>
  );
};

export default Timer;
