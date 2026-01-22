import { Switch, styled } from '@mui/material';
import { useAppTheme } from '@/context/ThemeContext';

const ThemeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb': {
        backgroundColor: '#2e3344',
      },
      '& .MuiSwitch-thumb:before': {
        content: "'🌜'",
        fontSize: '18px',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1a1d24',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#ffdb10',
    width: 32,
    height: 32,
    transition: theme.transitions.create(['background-color'], {
      duration: 200,
    }),
    '&::before': {
      content: "'🌞'",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: 'white',
    borderRadius: 20 / 2,
    transition: theme.transitions.create(['background-color'], {
      duration: 200,
    }),
  },
}));

const DarkModeSwitch = () => {
  const { mode, toggleColorMode } = useAppTheme();

  return (
    <ThemeSwitch
      checked={mode === 'dark'}
      onChange={toggleColorMode}
      slotProps={{ input: { 'aria-label': 'theme switch' } }}
    />
  );
};

export default DarkModeSwitch;
