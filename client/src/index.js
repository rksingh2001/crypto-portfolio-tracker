import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: indigo
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);