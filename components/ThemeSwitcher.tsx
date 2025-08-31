import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../themes';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-center items-center gap-3">
      {Object.values(themes).map((themeOption) => (
        <div key={themeOption.name} className="relative">
          <button
            onClick={() => setTheme(themeOption.name.toLowerCase())}
            className={`w-8 h-8 rounded-full transition-transform duration-200 ease-in-out transform hover:scale-110 focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2 ${themeOption.colors.ring} ${themeOption.colors.primary}`}
            aria-label={`Switch to ${themeOption.name} theme`}
            style={{ backgroundColor: themeOption.colors.primary.startsWith('bg-') ? '' : themeOption.colors.primary }} // Use style for non-tailwind colors
          >
            {theme.name === themeOption.name && (
              <span className={`absolute inset-0 flex items-center justify-center`}>
                <svg
                  className={`w-5 h-5 ${themeOption.colors.primaryText}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
