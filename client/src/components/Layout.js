import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { Home, Person, AdminPanelSettings } from '@mui/icons-material';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HideOnScroll>
        <AppBar
          position="sticky"
          elevation={scrolled ? 4 : 0}
          sx={{
            background: scrolled
              ? 'rgba(26, 26, 26, 0.95)'
              : 'linear-gradient(145deg, rgba(26, 26, 26, 0.9), rgba(21, 21, 21, 0.9))',
            backdropFilter: 'blur(20px)',
            borderBottom: scrolled ? '1px solid rgba(57, 255, 20, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ px: { xs: 0 }, justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="home"
                  onClick={() => navigate('/')}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(57, 255, 20, 0.1)',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Home />
                </IconButton>

                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #39FF14, #14FFE5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    transition: 'all 0.3s ease',
                    display: { xs: 'none', sm: 'block' },
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => navigate('/')}
                >
                  DevGeeks Internship Portal
                </Typography>

                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #39FF14, #14FFE5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    transition: 'all 0.3s ease',
                    display: { xs: 'block', sm: 'none' },
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => navigate('/')}
                >
                  DevGeeks
                </Typography>
              </Box>

              {!isAdmin ? (
                <Button
                  color="inherit"
                  startIcon={<AdminPanelSettings />}
                  onClick={() => navigate('/admin')}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    border: '1px solid rgba(57, 255, 20, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(57, 255, 20, 0.1)',
                      borderColor: '#39FF14',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>Admin Login</Box>
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>Admin</Box>
                </Button>
              ) : (
                <Button
                  color="inherit"
                  startIcon={<Home />}
                  onClick={() => navigate('/')}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    border: '1px solid rgba(20, 255, 229, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(20, 255, 229, 0.1)',
                      borderColor: '#14FFE5',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>Back to Home</Box>
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>Home</Box>
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          pt: { xs: 3, sm: 4, md: 6 },
          pb: { xs: 4, sm: 6, md: 8 },
        }}
      >
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 4,
          px: 2,
          mt: 'auto',
          background: 'linear-gradient(180deg, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 0.8) 50%, #1A1A1A 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: { xs: 'center', sm: 'left' } }}
            >
              © {new Date().getFullYear()} DevGeeks Community. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                Terms of Service
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
