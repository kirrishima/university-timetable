import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const { theme } = useTheme();

  return (
    <button
      {...props}
      className={`
        w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm
        text-base font-medium transition duration-150 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        ${theme.colors.ring}
        ${
          props.disabled
            ? `${theme.colors.button.disabledBg} ${theme.colors.button.disabledText} cursor-not-allowed`
            : `${theme.colors.primary} ${theme.colors.primaryText} md:hover:opacity-90`
        }
      `}
    >
      {children}
    </button>
  );
};

export default Button;
