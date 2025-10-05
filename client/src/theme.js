import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#39FF14',
      light: '#7FFF6E',
      dark: '#2BBF0F',
    },
    secondary: {
      main: '#14FFE5',
      light: '#75FFF2',
      dark: '#0EBFAC',
    },
    background: {
      default: '#0A0A0A',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0, 0, 0, 0.4)',
    '0 4px 8px rgba(0, 0, 0, 0.5)',
    '0 8px 16px rgba(0, 0, 0, 0.6)',
    '0 12px 24px rgba(0, 0, 0, 0.7)',
    '0 16px 32px rgba(57, 255, 20, 0.15)',
    '0 20px 40px rgba(57, 255, 20, 0.2)',
    '0 24px 48px rgba(57, 255, 20, 0.25)',
    ...Array(17).fill('0 2px 4px rgba(0, 0, 0, 0.4)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: '0.95rem',
        },
        contained: {
          boxShadow: '0 4px 14px rgba(57, 255, 20, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(57, 255, 20, 0.4)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'linear-gradient(145deg, #1A1A1A 0%, #151515 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            transition: 'all 0.3s ease',
            '&:hover': {
              '& > fieldset': {
                borderColor: '#39FF14',
              },
            },
            '&.Mui-focused': {
              '& > fieldset': {
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          transition: 'all 0.2s ease',
        },
      },
    },
  },
});

export default theme;
