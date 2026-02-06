
import React, { useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface GlobalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
}

const GlobalModal: React.FC<GlobalModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  onConfirm,
}) => {
  const { theme } = useTheme();

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-md p-6 rounded-2xl shadow-2xl transform transition-all scale-100 ${theme.colors.cardBg} border ${theme.colors.divider}`}
        role="dialog"
        aria-modal="true"
      >
        <h3 className={`text-xl font-bold mb-4 ${theme.colors.cardHeader}`}>
          {title}
        </h3>
        <div className={`mb-8 text-base ${theme.colors.secondaryText}`}>
          {children}
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-colors duration-200 ${theme.colors.secondaryText} hover:bg-black/5 dark:hover:bg-white/10`}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-5 py-2.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${theme.colors.primary} ${theme.colors.primaryText}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
