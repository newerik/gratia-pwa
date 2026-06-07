import { Box, Button, Typography, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { isContentEmpty } from '@/utils/textUtils';

export interface JournalViewProps {
  content: string;
  noEntriesText: string;
  editHintText: string;
  onEdit: () => void;
}

const JournalView = ({ content, noEntriesText, editHintText, onEdit }: JournalViewProps) => {
  const theme = useTheme();
  const isEmpty = isContentEmpty(content);

  if (isEmpty) {
    return (
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          pt: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={onEdit}
          sx={{ color: 'white' }}
        >
          {noEntriesText}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      onClick={onEdit}
      sx={{
        position: 'relative',
        height: '100%',
        overflowY: 'auto',
        cursor: 'pointer',
        borderRadius: 1,
        p: 1,
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: 'block',
          mb: 2,
          fontStyle: 'italic',
          textAlign: 'center',
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 0.5,
        }}
      >
        {editHintText}
      </Typography>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          fontFamily: theme.typography.fontFamily,
          lineHeight: 1.6,
        }}
      />
    </Box>
  );
};

export default JournalView;
