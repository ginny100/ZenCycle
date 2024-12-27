import { useStorage } from '@extension/shared';
import { themeStorage } from '@extension/storage';
import ThemeSwitcher from './components/ThemeSwitcher';
import { useEffect, useState } from 'react';
import { zenStorage } from '@extension/storage';

interface TimerProps {
  onBack: () => void;
  sessions: number;
  focusMinutes: number;
  breakMinutes: number;
}

type TimerState = 'focus' | 'break';

const Timer = ({ onBack, sessions, focusMinutes, breakMinutes }: TimerProps) => {
  const theme = useStorage(themeStorage);
  const zenSettings = useStorage(zenStorage);
  const isLight = theme === 'light';

  // Initialize state from storage or props
  const [currentSession, setCurrentSession] = useState(() => 
    zenSettings.timerActive ? zenSettings.currentSession : 1
  );
  const [timerState, setTimerState] = useState<TimerState>(() => 
    zenSettings.timerActive ? zenSettings.timerState : 'focus'
  );
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!zenSettings.timerActive) return focusMinutes * 60;
    
    // Calculate elapsed time since last update
    const elapsedSeconds = Math.floor((Date.now() - zenSettings.lastTimestamp) / 1000);
    return Math.max(0, zenSettings.timeLeft - elapsedSeconds);
  });
  const [isRunning, setIsRunning] = useState(zenSettings.timerActive);

  // Persist timer state changes
  useEffect(() => {
    zenStorage.updateTimerState({
      timerActive: isRunning,
      currentSession,
      timerState,
      timeLeft,
    });
  }, [isRunning, currentSession, timerState, timeLeft]);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerState === 'focus') {
            if (currentSession < sessions) {
              setTimerState('break');
              return breakMinutes * 60;
            } else {
              setIsRunning(false);
              return 0;
            }
          } else {
            setTimerState('focus');
            setCurrentSession(prev => prev + 1);
            return focusMinutes * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timerState, currentSession, sessions, focusMinutes, breakMinutes]);

  // Calculate progress for circle animation (0 to 100)
  const totalSeconds = timerState === 'focus' ? focusMinutes * 60 : breakMinutes * 60;
  const progress = ((1 - timeLeft / totalSeconds) * 100); // Calculate elapsed time percentage

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBackClick = () => {
    if (isRunning) {
      if (window.confirm('Timer is still running. Are you sure you want to go back?')) {
        zenStorage.updateTimerState({
          timerActive: false,
          currentSession: 1,
          timerState: 'focus',
          timeLeft: 0
        });
        onBack();
      }
    } else {
      zenStorage.updateTimerState({
        timerActive: false,
        currentSession: 1,
        timerState: 'focus',
        timeLeft: 0
      });
      onBack();
    }
  };

  return (
    <div className={`App size-full overflow-hidden p-2 transition-colors ${
      isLight ? 'bg-[#CDE8F6]' : 'bg-[#364E68]'
    }`}>
      <ThemeSwitcher />

      {/* Box Wrapper */}
      <div className={`mx-8 my-9 rounded-xl p-4 shadow-lg shadow-black/20 ${
        isLight ? 'bg-[#F8FAFC]' : 'bg-[#27374D]'
      }`}>
        <div className="flex flex-col items-center justify-between">
          <h1 className={`text-4xl font-['Agbalumo'] ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            Focus Time
          </h1>

          {/* Timer Circle */}
          <div className="my-9 relative flex size-64 items-center justify-center">
            {/* SVG Circle */}
            <svg className="absolute size-full -rotate-90">
              {/* Background Circle - White */}
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="white"
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
            <div className={`z-10 font-['Inria_Sans'] text-7xl font-normal ${
              isLight ? 'text-[#1E1E1E]' : 'text-[#F8FAFC]'
            }`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Lotus Icons */}
          <div className="flex gap-4">
            {Array(sessions).fill('🪷').map((lotus, index) => (
              <span 
                key={index} 
                role="img" 
                aria-label="lotus" 
                className="text-4xl"
                style={{ 
                  filter: 'saturate(1.5) brightness(1.1)',
                  transform: 'scale(1.2)',
                  opacity: index < currentSession ? 0.4 : 1
                }}
              >
                {lotus}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleBackClick}
          className={`rounded-full px-8 py-2 text-xl font-bold shadow-lg shadow-black/20 transition-colors ${
            isLight 
              ? 'bg-[#39A2DB] hover:bg-[#769FCD] text-[#1E1E1E]' 
              : 'bg-[#91C8E4] hover:bg-[#B9D7EA] text-[#F8FAFC]'
          }`}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Timer; 