import { PaletteOptions } from '@mui/material';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
const paletteDark: PaletteOptions = {
  primary: {
    main: '#4db5f9',
    light: '#757ce8'
  },
  // error: {
  //   main: '#d63031'
  // },
  secondary: {
    main: '#ff3040'
  },
  common: {
    black: '#ffffff',
    white: '#262626'
  },
  text: {
    primary: '#7c7d7c'
  }
};
const paletteLight: PaletteOptions = {
  primary: {
    main: '#4db5f9',
    light: '#757ce8'
  },

  // error: {
  //   main: '#d63031'
  // },
  secondary: {
    main: '#ff3040'
  },

  common: {
    black: '#262626',
    white: '#ffffff'
  },
  text: {
    primary: 'rgb(38,38,38)'
  }
};

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: paletteLight
    },
    dark: {
      palette: paletteDark
    }
  },
  typography: {}
});

export default theme;
