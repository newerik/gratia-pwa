import { useState, useRef } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Popover,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Editor,
  EditorProvider,
  Toolbar as EditorToolbar,
  Separator,
  createButton,
} from 'react-simple-wysiwyg';
import type { ContentEditableEvent } from 'react-simple-wysiwyg';
import {
  Undo,
  Redo,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatClear,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatIndentDecrease,
  FormatIndentIncrease,
  MoreVert,
  SentimentSatisfiedAlt,
} from '@mui/icons-material';
import { EMOJIS } from './emojis';

export interface TextEditorProps {
  content: string;
  onChange: (e: ContentEditableEvent) => void;
  theme: Theme;
}

// Create custom buttons with MUI icons
const CustomBtnUndo = createButton('Undo', <Undo />, 'undo');
const CustomBtnRedo = createButton('Redo', <Redo />, 'redo');
const CustomBtnBold = createButton('Bold', <FormatBold />, 'bold');
const CustomBtnItalic = createButton('Italic', <FormatItalic />, 'italic');
const CustomBtnUnderline = createButton('Underline', <FormatUnderlined />, 'underline');
const CustomBtnAlignLeft = createButton('Align left', <FormatAlignLeft />, 'justifyLeft');
const CustomBtnAlignCenter = createButton('Align center', <FormatAlignCenter />, 'justifyCenter');
const CustomBtnAlignRight = createButton('Align right', <FormatAlignRight />, 'justifyRight');
const CustomBtnBulletList = createButton(
  'Bullet list',
  <FormatListBulleted />,
  'insertUnorderedList'
);
const CustomBtnNumberedList = createButton(
  'Numbered list',
  <FormatListNumbered />,
  'insertOrderedList'
);
const CustomBtnOutdent = createButton('Outdent', <FormatIndentDecrease />, 'outdent');
const CustomBtnIndent = createButton('Indent', <FormatIndentIncrease />, 'indent');
const CustomBtnClearFormatting = createButton('Clear formatting', <FormatClear />, 'removeFormat');

const TextEditor = ({ content, onChange, theme }: TextEditorProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Selection state to restore focus
  const savedSelection = useRef<Range | null>(null);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelection.current = selection.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    if (savedSelection.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelection.current);
      }
    }
  };

  // Mobile Menu State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    saveSelection(); // Save selection before opening menu
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    restoreSelection(); // Restore selection when menu closes (optional, but good practice)
  };

  // Emoji Popover State
  const [anchorElEmoji, setAnchorElEmoji] = useState<null | HTMLElement>(null);
  const openEmoji = Boolean(anchorElEmoji);
  const handleEmojiClick = (event: React.MouseEvent<HTMLElement>) => {
    saveSelection(); // Save selection before opening emoji picker
    setAnchorElEmoji(event.currentTarget);
  };
  const handleEmojiClose = () => {
    setAnchorElEmoji(null);
    restoreSelection(); // Restore selection when picker closes
  };

  const execCmd = (cmd: string, arg?: string) => {
    restoreSelection(); // Restore selection before executing command
    document.execCommand(cmd, false, arg);
    handleMenuClose();
  };

  const insertEmoji = (emoji: string) => {
    restoreSelection(); // Restore selection before inserting text
    document.execCommand('insertText', false, emoji);
    setAnchorElEmoji(null); // Close popover without restoring old selection again
  };

  return (
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
          background: 'transparent',
        },
        '& .rsw-toolbar': {
          background: alpha(theme.palette.background.paper, 0.3),
          border: `1px solid ${theme.palette.divider}`,
          borderBottom: 'none',
          borderRadius: '4px 4px 0 0',
          display: 'flex',
          flexWrap: 'wrap', // Wrap buttons on smaller screens
          padding: '4px',
          '& .rsw-btn': {
            color: theme.palette.text.primary,
            margin: '2px', // Space between buttons when wrapped
            width: '32px', // Fixed width
            height: '32px', // Fixed height
            minWidth: '32px', // Ensure it doesn't shrink
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0, // Remove default padding
            '&:hover': {
              background: theme.palette.action.hover,
            },
          },
          '& .rsw-separator': {
            backgroundColor: theme.palette.divider,
            margin: '4px 8px',
          },
        },
      }}
    >
      <EditorProvider>
        <EditorToolbar>
          <CustomBtnUndo title={t('editor.undo')} />
          <CustomBtnRedo title={t('editor.redo')} />
          <Separator />
          <CustomBtnBold title={t('editor.bold')} />
          <CustomBtnItalic title={t('editor.italic')} />

          {!isMobile ? (
            <>
              <CustomBtnUnderline title={t('editor.underline')} />
              <Separator />
              <CustomBtnAlignLeft title={t('editor.alignLeft')} />
              <CustomBtnAlignCenter title={t('editor.alignCenter')} />
              <CustomBtnAlignRight title={t('editor.alignRight')} />
              <Separator />
              <CustomBtnBulletList title={t('editor.bulletList')} />
              <CustomBtnNumberedList title={t('editor.numberedList')} />
              <CustomBtnOutdent title={t('editor.outdent')} />
              <CustomBtnIndent title={t('editor.indent')} />
              <Separator />
              <CustomBtnClearFormatting title={t('editor.clearFormatting')} />
              <Separator />
              <IconButton
                onClick={handleEmojiClick}
                className="rsw-btn"
                sx={{ width: '32px', height: '32px', padding: 0 }}
                title="Emoji"
              >
                <SentimentSatisfiedAlt fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <CustomBtnUnderline title={t('editor.underline')} />
              <CustomBtnBulletList title={t('editor.bulletList')} />
              <IconButton
                onClick={handleEmojiClick}
                className="rsw-btn"
                sx={{ width: '32px', height: '32px', padding: 0 }}
                title="Emoji"
              >
                <SentimentSatisfiedAlt fontSize="small" />
              </IconButton>
              <IconButton
                onClick={handleMenuClick}
                className="rsw-btn"
                sx={{ width: '32px', height: '32px', padding: 0 }}
              >
                <MoreVert fontSize="small" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} disableAutoFocusItem>
                <MenuItem onClick={() => execCmd('insertOrderedList')}>
                  <ListItemIcon>
                    <FormatListNumbered fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('editor.numberedList')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => execCmd('justifyLeft')}>
                  <ListItemIcon>
                    <FormatAlignLeft fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('editor.alignLeft')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => execCmd('justifyCenter')}>
                  <ListItemIcon>
                    <FormatAlignCenter fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('editor.alignCenter')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => execCmd('justifyRight')}>
                  <ListItemIcon>
                    <FormatAlignRight fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('editor.alignRight')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => execCmd('outdent')}>
                  <ListItemIcon>
                    <FormatIndentDecrease fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('editor.outdent')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => execCmd('indent')}>
                  <ListItemIcon>
                    <FormatIndentIncrease fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('editor.indent')}</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => execCmd('removeFormat')}>
                  <ListItemIcon>
                    <FormatClear fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t('editor.clearFormatting')}</ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </EditorToolbar>
        <Editor
          value={content}
          onChange={onChange}
          containerProps={{ style: { flexGrow: 1, overflowY: 'auto', minHeight: 0 } }}
        />
        <Popover
          open={openEmoji}
          anchorEl={anchorElEmoji}
          onClose={handleEmojiClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 1, maxWidth: 300, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {EMOJIS.map((emoji) => (
              <IconButton key={emoji} onClick={() => insertEmoji(emoji)} size="small">
                {emoji}
              </IconButton>
            ))}
          </Box>
        </Popover>
      </EditorProvider>
    </Box>
  );
};

export default TextEditor;
