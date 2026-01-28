import { useState } from 'react';
import { Box, Checkbox, IconButton, InputBase, Paper } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { alpha, useTheme } from '@mui/material/styles';
import type { PrayerItem as PrayerItemType } from './types';

interface PrayerItemProps {
  item: PrayerItemType;
  onChange: (id: string, text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isArchivedView?: boolean;
  // Drag and drop props
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const PrayerItem = ({
  item,
  onChange,
  onToggle,
  onDelete,
  isArchivedView = false,
  onDragStart,
  onDragOver,
  onDrop,
}: PrayerItemProps) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper
      elevation={isFocused ? 2 : 0}
      draggable={!isArchivedView} // Only active items are draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: isFocused ? 'background.paper' : 'transparent',
        transition: 'background-color 0.2s, box-shadow 0.2s',
        '&:hover': {
          bgcolor: isFocused ? 'background.paper' : alpha(theme.palette.text.primary, 0.04),
        },
        cursor: !isArchivedView ? 'grab' : 'default',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isArchivedView && (
        <Box
          sx={{
            color: 'text.disabled',
            display: 'flex',
            alignItems: 'center',
            cursor: 'grab',
            touchAction: 'none',
            visibility: isHovered || isFocused ? 'visible' : 'hidden',
            '@media (hover: none)': {
                visibility: 'visible', // Always show on touch devices
            }
          }}
        >
          <DragIndicatorIcon fontSize="small" />
        </Box>
      )}

      <Checkbox
        checked={item.isArchived}
        onChange={() => onToggle(item.id)}
        color="primary"
        sx={{ p: 0.5 }}
      />

      <InputBase
        fullWidth
        multiline
        value={item.text}
        onChange={(e) => onChange(item.id, e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          textDecoration: item.isArchived ? 'line-through' : 'none',
          color: item.isArchived ? 'text.secondary' : 'text.primary',
        }}
      />

      {(isFocused || isHovered) && (
        <IconButton size="small" onClick={() => onDelete(item.id)} aria-label="delete">
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      )}
    </Paper>
  );
};

export default PrayerItem;
