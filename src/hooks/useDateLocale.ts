import { useTranslation } from 'react-i18next';
import { enUS, hu } from 'date-fns/locale';
import type { Locale } from 'date-fns';

const useDateLocale = (): Locale => {
  const { i18n } = useTranslation();

  // Centralized logic for mapping i18n language to date-fns locale
  // Defaults to enUS if no match found
  if (i18n.language?.startsWith('hu')) {
    return hu;
  }

  return enUS;
};

export default useDateLocale;
