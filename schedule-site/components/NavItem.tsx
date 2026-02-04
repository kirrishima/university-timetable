import React from "react";
import type { NavItemType } from "../types";
import { useTheme } from "../contexts/ThemeContext";

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive, onClick }) => {
  const { theme } = useTheme();
  const iconClasses = `w-6 h-6 transition-colors duration-200 ${
    isActive ? theme.colors.primaryText : theme.colors.mutedText
  } `;

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center justify-start
        h-12 px-3 rounded-full 
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${isActive ? `w-40 ${theme.colors.primary}` : `w-12 bg-transparent ${theme.colors.button.hoverBg}`}
      `}
      aria-label={item.label}
    >
      {/* Icon */}
      <div className="flex-shrink-0">{React.cloneElement(item.icon, { className: iconClasses })}</div>

      {/* Label */}
      <span
        className={`
          ml-3 text-sm font-semibold whitespace-nowrap ${theme.colors.primaryText}
          transition-opacity duration-200 delay-100
          ${isActive ? "opacity-100" : "opacity-0"}
        `}
      >
        {item.label}
      </span>
    </button>
  );
};

export default NavItem;
