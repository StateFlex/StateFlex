import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#def8ff',
      main: '#61d8f9',
      dark: '#12a6c6',
      contrastText: '#000000'
    },
    secondary: {
      light: '#c7badb',
      main: '#764abc',
      dark: '#441e8b',
      contrastText: '#ffffff'
    },
  }
});

export default theme;
