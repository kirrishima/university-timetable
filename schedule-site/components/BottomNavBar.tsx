import React from "react";
import { TAB_ITEMS } from "../constants";
import NavItem from "./NavItem";
import { useTheme } from "../contexts/ThemeContext";

interface BottomNavBarProps {
  activeTab: string;
  onTabClick: (id: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabClick }) => {
  const { theme } = useTheme();

  return (
    <nav className={`w-full ${theme.colors.navBarBg} backdrop-blur-lg border-t ${theme.colors.divider}`}>
      <div className="flex justify-around items-center h-16">
        {TAB_ITEMS.map((item) => (
          <NavItem key={item.id} item={item} isActive={activeTab === item.id} onClick={() => onTabClick(item.id)} />
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;
