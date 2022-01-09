import React from 'react';

import { Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header';
import Portfolio from './Portfolio';
import Coins from './Coins';
import News from './News';

const App = () => {
  return (
    <Box className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/Coins" />} />
        <Route path="/Portfolio" element={<Portfolio />} />
        <Route path="/Coins" element={<Coins />} />
        <Route path="/News" element={<News />} />
      </Routes>
    </Box>
  )
}

export default App;
