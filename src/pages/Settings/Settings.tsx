import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@/context/ThemeContext';
import { HEADER_COLORS } from '@/types/theme';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { headerColor, setAppHeaderColor } = useAppTheme();

  // Determine current selection: if localStorage has a value, use it; otherwise 'system'
  const currentSelection = localStorage.getItem('i18nextLng') || 'system';

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    if (value === 'system') {
      localStorage.removeItem('i18nextLng');
      // Reload to re-detect from navigator
      window.location.reload();
    } else {
      localStorage.setItem('i18nextLng', value);
      i18n.changeLanguage(value);
    }
  };

  const handleColorChange = (color: string) => {
    setAppHeaderColor(color);
  };

  return (
    <Box p={2} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h4">{t('menu.settings')}</Typography>

      {/* Language */}
      <FormControl fullWidth>
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={currentSelection}
          label="Language"
          onChange={handleLanguageChange}
        >
          <MenuItem value="system">Device default</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="hu">Magyar</MenuItem>
          <MenuItem value="de">Deutsch</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
        </Select>
      </FormControl>

      {/* Header Color */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Header Color</Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {Object.entries(HEADER_COLORS).map(([name, color]) => (
            <Button
              key={name}
              onClick={() => handleColorChange(color)}
              variant={headerColor === color ? 'outlined' : 'text'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textTransform: 'none',
                color: 'text.primary',
                borderColor: 'text.primary',
                borderWidth: headerColor === color ? 2 : 0,
                '&:hover': {
                  borderWidth: headerColor === color ? 2 : 1,
                  borderColor: 'text.primary',
                },
              }}
            >
              <Box sx={{ width: 24, height: 24, bgcolor: color, borderRadius: 1, border: '1px solid rgba(0,0,0,0.1)' }} />
              <Typography>{name}</Typography>
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
