import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Theme context to manage and persist mode
const ColorModeContext = createContext({ toggleColorMode: () => {} });
export function useColorModeContext() {
  return useContext(ColorModeContext);
}

// Provider wrapping the app with MUI theme and localStorage persistence
export function AppThemeProvider({ children }) {
  // Initialize mode from localStorage or default to 'light'
  const [mode, setMode] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('themeMode');
      if (storedMode === 'light' || storedMode === 'dark') {
        setMode(storedMode);
      }
    }
  }, []);

  // Persist mode changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
      }
    }), []
  );

  // Create MUI theme based on the mode
  const theme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// Layout component with header, nav, and color mode toggle
export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const colorMode = useColorModeContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>Movie House</Typography>
      <List>
        {['Home', 'Movies', 'Genres', 'Directors', 'Help'].map(text => (
          <ListItem
            key={text}
            component={Link}
            href={text === 'Home' ? '/' : `/${text.toLowerCase()}`}
            button
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Movie House
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {['Home', 'Movies', 'Genres', 'Director', 'Help'].map(text => (
              <Button
                key={text}
                component={Link}
                href={ text === 'Home' ? '/' : `/${text.toLowerCase()}` }
                sx={{ color: '#fff' }}
              >
                {text}
              </Button>
            ))}
          </Box>

          {/* Dark/Light mode toggle button */}
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}