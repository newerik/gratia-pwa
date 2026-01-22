import { Switch, styled, Box } from '@mui/material';
import { useAppTheme } from '@/context/ThemeContext';
import SunIcon from '@/assets/icons/sun.svg';
import MoonIcon from '@/assets/icons/moon.svg';

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
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1a1d24',
      },
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

// --- Sub-Components Defined Outside to Prevent Re-renders & Focus Loss ---

const StyledIcon = ({ src, alt, bg }: { src: string; alt: string; bg: string }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: '50%',
      backgroundColor: bg,
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    }}
  >
    <img src={src} alt={alt} style={{ width: 22, height: 22 }} />
  </Box>
);

const DarkModeSwitch = () => {
  const { mode, toggleColorMode } = useAppTheme();

  return (
    <ThemeSwitch
      checked={mode === 'dark'}
      onChange={toggleColorMode}
      icon={<StyledIcon src={SunIcon} alt="sun" bg="#ffdb10" />}
      checkedIcon={<StyledIcon src={MoonIcon} alt="moon" bg="#2e3344" />}
      slotProps={{ input: { 'aria-label': 'theme switch' } }}
    />
  );
};

export default DarkModeSwitch;
