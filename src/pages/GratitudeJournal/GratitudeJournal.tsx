import { useState, useEffect } from 'react';
import { Typography, Box, Button, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';
import type { Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { format, isToday } from 'date-fns';
import { hu, enUS } from 'date-fns/locale';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Editor,
  EditorProvider,
  Toolbar as EditorToolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnBulletList,
  BtnClearFormatting,
} from 'react-simple-wysiwyg';
import type { ContentEditableEvent } from 'react-simple-wysiwyg';

// --- Sub-Components Defined Outside to Prevent Re-renders & Focus Loss ---

interface JournalEditorProps {
  content: string;
  onChange: (e: ContentEditableEvent) => void;
  theme: Theme;
}

const JournalEditor = ({ content, onChange, theme }: JournalEditorProps) => (
  <Box
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left', // Fix alignment
      '& .rsw-editor': {
        flexGrow: 1,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '0 0 4px 4px',
        minHeight: '200px', // Minimum height but can grow
        outline: 'none',
        fontFamily: theme.typography.fontFamily,
        fontSize: '1rem',
        padding: '1rem',
      },
      '& .rsw-toolbar': {
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderBottom: 'none',
        borderRadius: '4px 4px 0 0',
        '& .rsw-btn': {
          color: theme.palette.text.primary,
          '&:hover': {
            background: theme.palette.action.hover,
          },
        },
      },
    }}
  >
    <EditorProvider>
      <EditorToolbar>
        <BtnBold />
        <BtnItalic />
        <BtnUnderline />
        <BtnBulletList />
        <BtnClearFormatting />
      </EditorToolbar>
      <Editor
        value={content}
        onChange={onChange}
        containerProps={{ style: { height: '100%', overflowY: 'auto' } }}
      />
    </EditorProvider>
  </Box>
);

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

// --- Main Component ---

const GratitudeJournal = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Date State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Content State
  const [content, setContent] = useState('');

  // Editing Mode (Mobile mainly)
  const [isEditing, setIsEditing] = useState(false);

  // Helper to get storage key
  const getStorageKey = (date: Date) => `gratia_entries_${format(date, 'yyyy-MM-dd')}`;

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
  };

  const handleDateChange = (value: Date | null) => {
    if (value) {
      setSelectedDate(value);
      setIsEditing(false);
    }
  };

  // Locale for date-fns
  const dateLocale = i18n.language.startsWith('hu') ? hu : enUS;

  // Title formatting
  const dateTitle = format(selectedDate, 'PPP', { locale: dateLocale });
  const displayTitle = isToday(selectedDate)
    ? `${dateTitle} (${t('common.today', 'Today')})`
    : dateTitle;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={dateLocale}>
      <Box display="flex" flexDirection={isDesktop ? 'row' : 'column'} height="100%" gap={3}>
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
              <JournalEditor content={content} onChange={handleContentChange} theme={theme} />
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
