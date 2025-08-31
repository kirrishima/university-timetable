import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { themes } from "../themes";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themeEntries = Object.entries(themes);

  // Group themes into light and dark
  const lightThemes = themeEntries.filter(([key]) => !key.includes("dark") && key !== "slate");
  const darkThemes = themeEntries.filter(([key]) => key.includes("dark") || key === "slate");

  const sortedThemes = [...lightThemes, ...darkThemes];

  return (
    <div className="flex justify-center items-center gap-3 flex-wrap">
      {sortedThemes.map(([key, themeOption]) => (
        <div key={key} className="relative group">
          <button
            onClick={() => setTheme(key)}
            className={`relative w-8 h-8 rounded-full overflow-hidden transition-transform duration-200 ease-in-out transform hover:scale-110 focus:outline-none lg:focus:ring-2 lg:focus:ring-offset-2 ${themeOption.colors.ring}`}
            aria-label={`Switch to ${themeOption.name} theme`}
          >
            <div className={`absolute top-0 left-0 w-1/2 h-full ${themeOption.colors.primary}`}></div>
            <div className={`absolute top-0 right-0 w-1/2 h-full ${themeOption.colors.mainBg}`}></div>
            {theme.name === themeOption.name && (
              <span className={`absolute inset-0 flex items-center justify-center`}>
                <svg
                  className={`w-5 h-5 ${themeOption.colors.mainText}`}
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
