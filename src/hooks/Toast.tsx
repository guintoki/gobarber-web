/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useCallback } from 'react';

import ToastContainer from '../components/ToastContainer';

interface ToastData {
  addToast(): void;
  removeToast(): void;
}

const Toast = createContext<ToastData>({} as ToastData);

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('Toast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  return (
    <Toast.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
    </Toast.Provider>
  );
};

function useToast(): ToastData {
  const context = useContext(Toast);

  if (!context) {
    throw new Error('useToast must be used with a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
