import { createTheme } from '@material-ui/core';

export const themeDark = createTheme({
  palette: {
    primary: {
      main: 'rgba(0, 10, 0, 0.8)',
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(0, 0, 0, 0.8)',
    },
    secondary: {
      main: 'rgba(255, 255, 255, 0.8)',
      light: 'rgba(0, 0, 0, 0.7)',
      dark: 'rgba(255, 255, 255, 1)',
    },
    background: {
      paper: 'rgba(221, 221, 221, 0.8)',
    },
  },
});

export const themeLight = createTheme({
  palette: {
    primary: {
      main: 'rgba(255, 105, 180, 0.8)',
      light: 'rgba(0, 0, 0, 0.1)',
      dark: 'rgba(0, 0, 0, 0.1)',
    },
    secondary: {
      main: 'rgba(250, 250, 250, 1)',
      light: 'rgba(0, 0, 0, 0.2)',
      dark: 'rgba(0, 0, 0, 0.1)',
    },
    background: {
      paper: 'rgba(129, 184, 235, 0.6)',
    },
  },
});
