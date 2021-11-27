import React from 'react';
import { Box } from '@mui/material';

import Header from './Header';
import Coins from './Coins';

const App = () => {
  return (
    <Box className="App">
      <Header />
      <Coins />
    </Box>
  )
}

export default App;
