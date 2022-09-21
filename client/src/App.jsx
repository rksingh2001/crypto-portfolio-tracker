import React, { useState, createContext, useEffect } from 'react';

import { Box, Dialog, DialogContent } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

import Portfolio from './pages/Portfolio';
import Coins from './pages/Coins';
import News from './pages/News';
import Coin from './pages/Coin';
import Header from './components/Header';
import AddCoinModal from './components/AddCoinModal';

import { getCurrencyExchangeRate } from './utils/getCurrencyExchangeRate';

import CurrencyList from "../src/assets/currency-list.json";

export const CoinContext = createContext({});
export const DialogContext = createContext({});
export const CurrencyContext = createContext({});
export const ConversionRateContext = createContext({});
export const CurrencySymbolContext = createContext({});

const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [coin, setCoin] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [conversionRate, setConversionRate] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState("$");

  useEffect(() => {
    setCurrencySymbol(CurrencyList[currency]["symbol"]);
    const getConversionRate = async () => {
      const rate = await getCurrencyExchangeRate(currency);
      setConversionRate(rate);
    }
    getConversionRate();  
  }, [currency]);
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

  return (
    <DialogContext.Provider
      value={{ isDialogOpen, setIsDialogOpen }}
    >
      <CoinContext.Provider
        value={{ coin, setCoin }}
      >
        <CurrencyContext.Provider
          value={{ currency, setCurrency }}
        >
          <ConversionRateContext.Provider
            value={{ conversionRate, setConversionRate }}
          >
            <CurrencySymbolContext.Provider
              value ={{ currencySymbol }}
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
            </CurrencySymbolContext.Provider>
          </ConversionRateContext.Provider>
        </CurrencyContext.Provider>
      </CoinContext.Provider>
    </DialogContext.Provider>
  )
}

export default App;
