
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import GlobalModal from '../components/ui/GlobalModal';

interface ModalOptions {
  title: string;
  content: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface ModalContextType {
  showConfirm: (options: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const showConfirm = useCallback((options: ModalOptions) => {
    setModalOptions(options);
  }, []);

  const closeModal = useCallback(() => {
    setModalOptions(null);
  }, []);

  return (
    <ModalContext.Provider value={{ showConfirm, closeModal }}>
      {children}
      {modalOptions && (
        <GlobalModal
          isOpen={!!modalOptions}
          onClose={() => {
            if (modalOptions.onCancel) modalOptions.onCancel();
            closeModal();
          }}
          title={modalOptions.title}
          confirmText={modalOptions.confirmText}
          cancelText={modalOptions.cancelText}
          onConfirm={modalOptions.onConfirm}
        >
          {modalOptions.content}
        </GlobalModal>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};
