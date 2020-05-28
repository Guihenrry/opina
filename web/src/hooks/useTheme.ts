import { useContext } from 'react';
import { ThemeContextType, ThemeContext } from '../contexts/theme';

function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme mous be used within an ThemeProvider');
  }

  return context;
}

export default useTheme;
