import React, { createContext, useState, useCallback } from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  DefaultTheme,
} from 'styled-components';

import { dark, light } from '../styles/themes';

export interface ThemeContextType {
  changeTheme(themeTitle: 'light' | 'dark'): void;
  toggleTheme(): void;
  theme: DefaultTheme;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storageTheme = localStorage.getItem('@Opina:theme');

    if (storageTheme) {
      return storageTheme === 'dark' ? dark : light;
    }

    return light;
  });

  const changeTheme = useCallback((themeTitle: 'light' | 'dark') => {
    setTheme(themeTitle === 'dark' ? dark : light);
    localStorage.setItem('@Opina:theme', themeTitle);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'dark' ? light : dark);
    localStorage.setItem(
      '@Opina:theme',
      theme.title === 'dark' ? 'light' : 'dark',
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
