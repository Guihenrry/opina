import { useContext } from 'react';
import { ToastContext, ToastContextType } from '../contexts/toast';

function useToast(): ToastContextType {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast mous be used within an ToastProvider');
  }

  return context;
}

export default useToast;
