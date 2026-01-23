import { useState, useEffect } from 'react';
import { Typography, Box, Button, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';
import type { Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format, isToday } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { ContentEditableEvent } from 'react-simple-wysiwyg';
import TextEditor from '@/components/TextEditor';
import DayWithDot from '@/components/DayWithDot';
import type { DayWithDotProps } from '@/components/DayWithDot';
import { useDateLocale } from '@/hooks';

// --- Sub-Components Defined Outside to Prevent Re-renders & Focus Loss ---

interface ReadOnlyViewProps {
  content: string;
  theme: Theme;
  noEntriesText: string;
}

const ReadOnlyView = ({ content, theme, noEntriesText }: ReadOnlyViewProps) => (
  <Box sx={{ textAlign: 'left', height: '100%', overflowY: 'auto' }}>
    {content ? (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          fontFamily: theme.typography.fontFamily,
          lineHeight: 1.6,
        }}
      />
    ) : (
      <Typography color="text.secondary" fontStyle="italic">
        {noEntriesText}
      </Typography>
    )}
  </Box>
);

// Helper to determine if content is actually empty (ignoring HTML tags and common entities)
const isContentEmpty = (html: string | null) => {
  if (!html) return true;
  // Basic HTML tag stripping and entity cleaning
  const plainText = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&zwnj;/g, '')
    .trim();
  return plainText === '';
};

// --- Main Component ---

const GratitudeJournal = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Date State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Content State
  const [content, setContent] = useState('');

  // Highlighted Days State
  const [highlightedDays, setHighlightedDays] = useState<Set<string>>(new Set());

  // Editing Mode (Mobile mainly)
  const [isEditing, setIsEditing] = useState(false);

  // Helper to get storage key
  const getStorageKey = (date: Date) => `gratia_entries_${format(date, 'yyyy-MM-dd')}`;

  // Load highlighted days on mount
  useEffect(() => {
    const days = new Set<string>();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('gratia_entries_')) {
        const dateStr = key.replace('gratia_entries_', '');
        const storedContent = localStorage.getItem(key);
        if (!isContentEmpty(storedContent)) {
          days.add(dateStr);
        }
      }
    }
    setHighlightedDays(days);
  }, []);

  // Load content when date changes
  useEffect(() => {
    const key = getStorageKey(selectedDate);
    const savedContent = localStorage.getItem(key);
    setContent(savedContent || '');
  }, [selectedDate]);

  // Save content logic
  const handleContentChange = (e: ContentEditableEvent) => {
    const newContent = e.target.value;
    setContent(newContent);
    // Auto-save
    const key = getStorageKey(selectedDate);
    localStorage.setItem(key, newContent);

    // Update highlighted days
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    setHighlightedDays((prev) => {
      const newSet = new Set(prev);
      if (!isContentEmpty(newContent)) {
        newSet.add(dateStr);
      } else {
        newSet.delete(dateStr);
      }
      return newSet;
    });
  };

  const handleDateChange = (value: Date | null) => {
    if (value) {
      setSelectedDate(value);
      setIsEditing(false);
    }
  };

  // Locale for date-fns
  const dateLocale = useDateLocale();

  // Title formatting
  const dateTitle = format(selectedDate, 'PPP', { locale: dateLocale });
  const displayTitle = isToday(selectedDate)
    ? `${dateTitle} (${t('common.today', 'Today')})`
    : dateTitle;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={dateLocale}>
      <Box
        display="flex"
        flexDirection={isDesktop ? 'row' : 'column'}
        height={isDesktop ? '100%' : 'auto'}
        gap={3}
      >
        {/* LEFT / TOP: Content Area */}
        <Box
          flexGrow={1}
          order={isDesktop ? 1 : 2}
          display="flex"
          flexDirection="column"
          gap={2}
          height="100%" // Ensure it takes full height available
        >
          {/* Header for Day */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: isEditing ? 'background.default' : 'background.paper',
              borderBottom: `1px solid ${theme.palette.divider}`,
              flexShrink: 0, // Prevent shrinking
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              {isEditing && (
                <IconButton onClick={() => setIsEditing(false)} size="small">
                  <ArrowBackIcon />
                </IconButton>
              )}
              <Typography variant="h6" component="h2">
                {displayTitle}
              </Typography>
            </Box>

            {!isEditing && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                sx={{ color: 'white' }}
              >
                {t('common.edit', 'Edit')}
              </Button>
            )}
          </Paper>

          {/* Content Area */}
          <Paper
            elevation={1}
            sx={{
              p: 2,
              flexGrow: 1,
              minHeight: 0, // Allow flex scroll
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden', // Container handles overflow, children scroll
            }}
          >
            {isEditing ? (
              <TextEditor content={content} onChange={handleContentChange} theme={theme} />
            ) : (
              <ReadOnlyView
                content={content}
                theme={theme}
                noEntriesText={t('journal.noEntries', 'No entries for this day.')}
              />
            )}
          </Paper>
        </Box>

        {/* RIGHT / TOP: Calendar */}
        <Box
          width={isDesktop ? '350px' : '100%'}
          order={isDesktop ? 2 : 1}
          sx={{ display: isEditing && !isDesktop ? 'none' : 'block' }}
        >
          <Paper elevation={2} sx={{ p: 0, overflow: 'hidden' }}>
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              slots={{
                day: DayWithDot,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                } as DayWithDotProps,
              }}
            />
          </Paper>

          {isDesktop && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2, display: 'block', textAlign: 'center' }}
            >
              {t('journal.calendarHelp', 'Select a date to view or edit entries.')}
            </Typography>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default GratitudeJournal;
