import React, { useState, createContext } from 'react';

import { Box, Dialog, DialogContent } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header';
import Portfolio from './Portfolio';
import Coins from './Coins';
import News from './News';
import Coin from './Coin';
import AddCoinModal from './AddCoinModal';

export const CoinContext = createContext({});
export const DialogContext = createContext({});

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [coin, setCoin] = useState([]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

  return (
    <DialogContext.Provider
      value={{isDialogOpen, setIsDialogOpen}}
    >
      <CoinContext.Provider
          value={{coin, setCoin}}
        >
      <Box className="App">
        <Header />
          <Routes>
            <Route path="/" element={<Navigate replace to="/Coins" />} />
            <Route path="/Portfolio" element={<Portfolio />} />
            <Route path="/Coins" element={<Coins />} />
            <Route path="/Coins/:CoinUUID" element={<Coin />} />
            <Route path="/News" element={<News />} />
          </Routes>
          <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth>
            <DialogContent>
              <AddCoinModal />
            </DialogContent>
          </Dialog>
      </Box>
      </CoinContext.Provider>
    </DialogContext.Provider>
  )
}

export default App;
