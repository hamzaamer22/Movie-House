// context/ThemeContext.js
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext({ toggle: () => {} });

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeContextProvider({ children }) {
  // 1️⃣ initialize from localStorage (or default to 'light')
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('themeMode') || 'light';
    }
    return 'light';
  });

  // 2️⃣ memoize toggle function
  const contextValue = useMemo(() => ({
    toggle: () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }), []);

  // 3️⃣ whenever mode changes, write it back to localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // 4️⃣ build a MUI theme based on mode
  const muiTheme = useMemo(() => createTheme({
    palette: { mode }
  }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={muiTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}