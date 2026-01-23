import { Box } from '@mui/material';
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
} from '@mui/icons-material';

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
        </EditorToolbar>
        <Editor
          value={content}
          onChange={onChange}
          containerProps={{ style: { height: '100%', overflowY: 'auto' } }}
        />
      </EditorProvider>
    </Box>
  );
};

export default TextEditor;
