import { createMuiTheme } from '@material-ui/core/styles';

export const theme = (type: "dark" | "light") => createMuiTheme({
  palette: {
    type: type,
    primary: {
      main: "#3498db", 
      contrastText: "#fff" 
    },
    secondary: {
      main: "#ffaa00", 
      contrastText: "#fff" 
    },
  },
});