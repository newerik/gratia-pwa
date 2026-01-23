import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material';
import {
  Editor,
  EditorProvider,
  Toolbar as EditorToolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnBulletList,
  BtnClearFormatting,
  BtnUndo,
  BtnRedo,
} from 'react-simple-wysiwyg';
import type { ContentEditableEvent } from 'react-simple-wysiwyg';

export interface TextEditorProps {
  content: string;
  onChange: (e: ContentEditableEvent) => void;
  theme: Theme;
}

const TextEditor = ({ content, onChange, theme }: TextEditorProps) => (
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
        <BtnUndo />
        <BtnRedo />
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

export default TextEditor;
