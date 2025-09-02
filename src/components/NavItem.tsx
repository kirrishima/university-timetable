import React from 'react';
import type { NavItemType } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive, onClick }) => {
  const { theme } = useTheme();
  const iconClasses = `w-6 h-6 transition-colors duration-200 ${isActive ? theme.colors.primaryText : theme.colors.mutedText} group-hover:${isActive ? theme.colors.primaryText : theme.colors.primaryMuted}`;

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center justify-start
        h-12 px-3 rounded-full 
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${isActive ? `w-36 ${theme.colors.primary}` : `w-12 bg-transparent hover:${theme.colors.button.hoverBg}`}
      `}
      aria-label={item.label}
    >
      <div className="flex-shrink-0">
        {React.cloneElement(item.icon, { className: iconClasses })}
      </div>
      <span
        className={`
          ml-3 text-sm font-semibold whitespace-nowrap
          transition-opacity duration-200 delay-100
          ${isActive ? `opacity-100 ${theme.colors.primaryText}` : 'opacity-0'}
        `}
      >
        {item.label}
      </span>
    </button>
  );
};

export default NavItem;