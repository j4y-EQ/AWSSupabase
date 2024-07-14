import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#337799',
    },
    secondary: {
      main: '#559977',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'white', // Ensuring the input text color is white
        },
      },
    },
  },
});
