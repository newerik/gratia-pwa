import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppTheme, HEADER_COLORS } from '../context/ThemeContext';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { mode, toggleColorMode, headerColor, setAppHeaderColor } = useAppTheme();

  // i18next might return something like 'en-US', so we might need to normalize or just handle 'en' and 'hu'
  const currentLanguage = i18n.language.startsWith('hu') ? 'hu' : 'en';

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value as string);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setAppHeaderColor(event.target.value as string);
  };

  return (
    <Box p={2} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h4">{t('menu.settings')}</Typography>
      
      {/* Language */}
      <FormControl fullWidth>
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={currentLanguage}
          label="Language"
          onChange={handleLanguageChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hu">Magyar</MenuItem>
        </Select>
      </FormControl>

      {/* Dark Mode */}
      <FormControlLabel
        control={<Switch checked={mode === 'dark'} onChange={toggleColorMode} />}
        label="Dark Mode"
      />

      {/* Header Color */}
      <FormControl fullWidth>
        <InputLabel id="header-color-select-label">Header Color</InputLabel>
        <Select
            labelId="header-color-select-label"
            value={headerColor}
            label="Header Color"
            onChange={handleColorChange}
        >
            {Object.entries(HEADER_COLORS).map(([name, color]) => (
                <MenuItem key={name} value={color} sx={{ color: color, fontWeight: 'bold' }}>
                    {name}
                </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Settings;