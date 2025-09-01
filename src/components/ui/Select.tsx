import React, { ReactNode } from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon: ReactNode;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ label, icon, options, placeholder, ...props }) => {
  const { theme } = useTheme();

  return (
    <div>
      <label className={`block text-sm font-medium ${theme.colors.secondaryText} mb-1`}>{label}</label>
      <div className={`relative transition-opacity duration-150 ${props.disabled ? "opacity-50" : "opacity-100"}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 z-10">
          <span className={theme.colors.mutedText}>{icon}</span>
        </div>
        <div className="relative">
          <select
            {...props}
            className={`
              block w-full pl-10 pr-10 py-2.5 text-base border-2 rounded-md
              transition-colors duration-150 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.colors.ring}
              ${theme.colors.cardBg} ${theme.colors.mainText} ${theme.colors.primaryBorder}
              disabled:cursor-not-allowed appearance-none truncate whitespace-nowrap
              relative z-0
            `}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value} className="whitespace-nowrap">
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 7l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
