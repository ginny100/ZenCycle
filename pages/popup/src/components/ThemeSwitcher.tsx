import { useStorage } from '@extension/shared';
import { themeStorage } from '@extension/storage';

const ThemeSwitcher = () => {
  const theme = useStorage(themeStorage);
  const isLight = theme === 'light';

  return (
    <div className="mb-8 flex justify-end">
      <button
        onClick={themeStorage.toggle}
        className={`relative flex h-6 w-12 cursor-pointer items-center rounded-full ${
          isLight ? 'bg-blue-500' : 'bg-[#1B2A49]'
        }`}>
        <div
          className={`absolute size-4 rounded-full bg-white transition-transform ${
            isLight ? 'translate-x-1' : 'translate-x-7'
          }`}
        />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
