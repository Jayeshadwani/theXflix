import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette:{
    primary : {
      main : "#141414",
      contrastText : "#ffffff"
    },
    // secondary : {
    //   main  : "",
    // }
  },
  typography : {
    fontFamily: 'Lato, sans-serif'
  }
});


export default theme;