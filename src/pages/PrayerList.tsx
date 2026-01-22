import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PrayerList = () => {
  const { t } = useTranslation();
  return (
    <Box p={2}>
      <Typography variant="h4">{t('menu.prayerList')}</Typography>
      <Typography>Prayer list items will go here.</Typography>
    </Box>
  );
};

export default PrayerList;
