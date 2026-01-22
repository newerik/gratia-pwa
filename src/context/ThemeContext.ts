import { createContext, useContext } from 'react';
import type { PaletteMode } from '@mui/material';
import { HEADER_COLORS } from '@/types/theme';

interface ThemeContextType {
  mode: PaletteMode;
  headerColor: string;
  toggleColorMode: () => void;
  setAppHeaderColor: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  headerColor: HEADER_COLORS.Violet,
  toggleColorMode: () => {},
  setAppHeaderColor: () => {},
});

export const useAppTheme = () => useContext(ThemeContext);
