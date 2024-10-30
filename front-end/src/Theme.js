import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
    a: {
        main: '#000000'
    },
    b: {
        main: '#453452'
    }
  },
});

export default theme;
