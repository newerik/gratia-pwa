import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../context/ThemeContext';

const drawerWidth = 240;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { headerColor } = useAppTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: t('menu.journal'), icon: <EditCalendarIcon />, path: '/' },
    { text: t('menu.prayerList'), icon: <VolunteerActivismIcon />, path: '/prayer-list' },
    { text: t('menu.settings'), icon: <SettingsIcon />, path: '/settings' },
  ];

  // Simple title logic
  let currentTitle = t('appTitle');
  const activeItem = menuItems.find((item) => item.path === location.pathname);
  if (activeItem) {
    currentTitle = activeItem.text;
  }

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: headerColor,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {currentTitle}
          </Typography>
          <IconButton color="inherit">
            {/* Placeholder for user icon logic */}
            <Avatar sx={{ bgcolor: 'transparent' }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, overflow: 'hidden', minHeight: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
