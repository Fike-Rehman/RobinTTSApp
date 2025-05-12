import { createTheme } from '@mui/material/styles';

// Extend the MUI theme type to include DataGrid styles
declare module '@mui/material/styles' {
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: React.CSSProperties;
        columnHeaders?: React.CSSProperties;
        row?: React.CSSProperties;
        cell?: React.CSSProperties;
      };
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark', // Enables dark mode
    primary: {
      main: '#ff9800', // Orange shade
    },
    background: {
      default: '#121212', // Dark grey background
      paper: '#1e1e1e', // Slightly lighter dark grey for contrast
    },
    text: {
      primary: '#ffb74d', // Lighter orange text
      secondary: '#ffa726', // Secondary orange shade
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1c1c1c, #2b2b2b)', // Dark grey gradient
          color: '#ffb74d', // Orange text color
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(255, 152, 0, 0.2)', // Soft orange glow
          border: '1px solid #ff9800',
        },
        columnHeaders: {
          backgroundColor: '#333', // Darker header
          color: '#ff9800', // Orange header text
          fontSize: '16px',
        },
        cell: {
          fontSize: '14px',
          padding: '10px',
          borderBottom: '1px solid #ff9800',
        },
      },
    },
  },
});

export default theme;
