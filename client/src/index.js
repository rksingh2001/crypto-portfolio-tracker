import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { BrowserRouter } from 'react-router-dom';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal, indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: indigo
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);