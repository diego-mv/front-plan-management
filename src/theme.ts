import { createTheme } from '@mui/material';
import type {} from '@mui/lab/themeAugmentation';
import '@mui/lab/themeAugmentation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#191716',
    },
    secondary: {
      main: '#e6af2e',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontWeightLight: 200,
    fontSize: 14,
    fontWeightRegular: 400,
  },
});

export default theme;