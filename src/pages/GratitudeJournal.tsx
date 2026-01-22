import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const GratitudeJournal = () => {
  const { t } = useTranslation();
  return (
    <Box p={2}>
      <Typography variant="h4">{t('menu.journal')}</Typography>
      <Typography>Calendar and entries will go here.</Typography>
    </Box>
  );
};

export default GratitudeJournal;