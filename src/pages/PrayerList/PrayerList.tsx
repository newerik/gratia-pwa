import { useState, useEffect } from 'react';
import { Typography, Box, IconButton, Button, TextField, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import type { PrayerItem as PrayerItemType } from './types';
import PrayerItem from './PrayerItem';

const STORAGE_KEY = 'gratia_prayer_items';

const PrayerList = () => {
  const { t } = useTranslation();

  const [items, setItems] = useState<PrayerItemType[]>([]);
  const [showArchivedView, setShowArchivedView] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    const storedItems = localStorage.getItem(STORAGE_KEY);
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems));
      } catch (error) {
        console.error('Failed to parse prayer items:', error);
      }
    }
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const activeItems = items.filter(i => !i.isArchived);
  const archivedItems = items.filter(i => i.isArchived);

  const handleAddItem = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: PrayerItemType = {
        id: uuidv4(),
        text: newItemText,
        isArchived: false,
        order: items.length,
        createdAt: Date.now(),
    };

    setItems([...items, newItem]);
    setNewItemText('');
  };

  const handleToggle = (id: string) => {
    setItems(items.map(item =>
        item.id === id ? { ...item, isArchived: !item.isArchived } : item
    ));
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleTextChange = (id: string, text: string) => {
    setItems(items.map(item =>
        item.id === id ? { ...item, text } : item
    ));
  };

  // DnD Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (!draggedItemId || draggedItemId === targetId) return;

    const sourceIndex = items.findIndex(i => i.id === draggedItemId);
    const targetIndex = items.findIndex(i => i.id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const newItems = [...items];
    const [movedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, movedItem);
    setItems(newItems);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDraggedItemId(null);
  };

  return (
    <Box p={2} maxWidth="md" mx="auto">
        {showArchivedView ? (
            // Archived View
            <Box>
                <Box display="flex" alignItems="center" mb={2}>
                    <IconButton onClick={() => setShowArchivedView(false)} edge="start">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" ml={1}>{t('prayerList.archivedItems')}</Typography>
                </Box>

                {archivedItems.length === 0 ? (
                    <Typography color="text.secondary" align="center" mt={4}>
                        {t('prayerList.emptyArchived')}
                    </Typography>
                ) : (
                    <Box display="flex" flexDirection="column" gap={1}>
                        {archivedItems.map(item => (
                            <PrayerItem
                                key={item.id}
                                item={item}
                                onChange={handleTextChange}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                                isArchivedView={true}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        ) : (
            // Main View
            <Box>
                {/* Add Item Input */}
                <Paper component="form" onSubmit={handleAddItem} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 3 }}>
                     <TextField
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={t('prayerList.placeholder')}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                     />
                     <Button type="submit" disabled={!newItemText.trim()}>{t('prayerList.addItem')}</Button>
                </Paper>

                {/* Active Items List */}
                <Box display="flex" flexDirection="column" gap={1} mb={3}>
                    {activeItems.map(item => (
                        <PrayerItem
                            key={item.id}
                            item={item}
                            onChange={handleTextChange}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragOver={(e) => handleDragOver(e, item.id)}
                            onDrop={handleDrop}
                        />
                    ))}
                    {activeItems.length === 0 && (
                        <Typography color="text.secondary" align="center" mt={2}>
                            {t('prayerList.emptyActive')}
                        </Typography>
                    )}
                </Box>

                {/* Show Archived Button */}
                {archivedItems.length > 0 && (
                     <Button
                        onClick={() => setShowArchivedView(true)}
                        color="inherit"
                        sx={{ textTransform: 'none', color: 'text.secondary' }}
                     >
                        {t('prayerList.showArchived')}
                     </Button>
                )}
            </Box>
        )}
    </Box>
  );
};

export default PrayerList;
