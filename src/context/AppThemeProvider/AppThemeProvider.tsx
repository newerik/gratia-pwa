import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import type { PaletteMode } from '@mui/material';
import { HEADER_COLORS } from '../../types/theme';
import { ThemeContext } from '../ThemeContext';

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from local storage or default
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as PaletteMode) || 'light';
  });

  const [headerColor, setHeaderColorState] = useState<string>(() => {
    const savedColor = localStorage.getItem('headerColor');
    return savedColor || HEADER_COLORS.Violet;
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
      setAppHeaderColor: (color: string) => {
        setHeaderColorState(color);
        localStorage.setItem('headerColor', color);
      },
      mode,
      headerColor,
    }),
    [mode, headerColor]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: headerColor,
          },
        },
      }),
    [mode, headerColor]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
