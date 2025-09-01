
import React, { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

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
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className={theme.colors.mutedText}>{icon}</span>
        </div>
        <select
          {...props}
          className={`
            block w-full pl-10 pr-10 py-2.5 text-base border rounded-md
            transition duration-150 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2 ${theme.colors.ring}
            ${theme.colors.cardBg} ${theme.colors.mainText} ${theme.colors.primaryBorder}
            disabled:cursor-not-allowed disabled:opacity-50
          `}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
