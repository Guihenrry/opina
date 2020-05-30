import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../contexts/auth';

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth mous be used within an AuthProvider');
  }

  return context;
}

export default useAuth;
