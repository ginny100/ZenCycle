import { useStorage } from '@extension/shared';
import { themeStorage } from '@extension/storage';
import ThemeSwitcher from './components/ThemeSwitcher';

interface TimerProps {
  onBack: () => void;
}

const Timer = ({ onBack }: TimerProps) => {
  const theme = useStorage(themeStorage);
  const isLight = theme === 'light';

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
          <h1 className={`text-4xl font-bold italic ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            Focus Time
          </h1>

          {/* Timer Circle */}
          <div className="my-9 relative flex size-64 items-center justify-center">
            <div className="absolute size-full rounded-full border-8 border-[#91C8E4] opacity-30" />
            <div className="text-7xl font-bold">
              00:00
            </div>
          </div>

          {/* Lotus Icons */}
          <div className="flex gap-2">
            {'🪷'.repeat(6).split('').map((lotus, index) => (
              <span key={index} role="img" aria-label="lotus" className="text-3xl">
                {lotus}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button - Outside the white box */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={onBack}
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