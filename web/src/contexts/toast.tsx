import React, { createContext, useCallback, useState } from 'react';
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  title?: string;
  description?: string;
}

export interface ToastContextType {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, description, type }: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString(36).substr(2, 9);

      const toast = {
        id,
        title,
        description,
        type,
      };

      setMessages((state) => [...state, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer messages={messages} />
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
