import { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import type { PaletteMode } from '@mui/material';

// Rainbow colors per concept
export const HEADER_COLORS = {
  Red: '#f44336',
  Orange: '#ff9800',
  Yellow: '#ffeb3b',
  Green: '#4caf50',
  Blue: '#2196f3',
  Indigo: '#3f51b5',
  Violet: '#9c27b0', // Default
};

export type HeaderColorKey = keyof typeof HEADER_COLORS;

interface ThemeContextType {
  mode: PaletteMode;
  headerColor: string;
  toggleColorMode: () => void;
  setAppHeaderColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  headerColor: HEADER_COLORS.Violet,
  toggleColorMode: () => {},
  setAppHeaderColor: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
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
