import React from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, FormControlLabel } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { useTheme as useTheme } from '../providers/ThemeProvider.jsx';

const drawerWidth = 240;
const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Heroes', path: '/heroes', icon: <PeopleIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
]

const AppLayout = () => {
  const location = useLocation();
  const { colors, toggleTheme, theme } = useTheme();

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: colors.background }}>
      <Drawer 
        variant="permanent" 
        sx={{
            width: drawerWidth, 
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
                width: drawerWidth, 
                boxSizing: 'border-box',
                backgroundColor: colors.sidebarBg, 
                color: colors.text,
                borderRight: `1px solid ${colors.borderColor}`
            },
        }}
      >
        <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                    component={Link} 
                    to={item.path} 
                    selected={location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))}
                >
                <ListItemIcon sx={{ color: colors.text }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                </ListItemButton>
          </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ p: 0.5, borderTop: `1px solid ${colors.borderColor}` }}>
           <FormControlLabel
               control={<Switch checked={theme === 'dark'} onChange={toggleTheme} />}
               label="Change Theme"
           />
        </Box>
      </Drawer>
      <Box component="main" sx={{ 
          flexGrow: 1, 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          bgcolor: colors.background, 
          color: colors.text 
       }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
