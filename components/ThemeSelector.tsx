import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { themeName, setThemeName, themes } = useTheme();

  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <p className="text-sm font-medium text-[var(--color-text-secondary)]">Тема:</p>
      <div className="flex justify-center gap-2">
        {themes.map(theme => (
          <button
            key={theme.name}
            onClick={() => setThemeName(theme.name)}
            className={`w-7 h-7 rounded-full cursor-pointer transition-all duration-200 transform-gpu focus:outline-none 
            ${themeName === theme.name 
              ? 'ring-2 ring-offset-2 ring-[var(--color-primary)] scale-110' 
              : 'lg:hover:scale-110'
            }`}
            style={{
              background: `linear-gradient(135deg, ${theme.colors['--color-primary']} 50%, ${theme.colors['--color-secondary-for-selector']} 50%)`
            }}
            aria-label={`Select ${theme.name} theme`}
            title={theme.name}
            aria-pressed={themeName === theme.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
