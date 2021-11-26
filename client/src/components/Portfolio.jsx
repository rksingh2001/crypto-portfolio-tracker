import React from 'react';
import { useEffect } from 'react';
import { Box, Card, CardHeader } from '@mui/material';

import coinrankingApi from '../api/coinrankingApi';

const Portfolio = () => {
  useEffect(() => {
    try {
        const getCoins = async () => {
        const response = await coinrankingApi.get();
        await console.log(response);
        }
        getCoins();
    } catch (error) {
        console.log(error)
    }
  }, [])

  return (
    <>
      <Box height="90px" />
      <Box className="portfolio">
        
      </Box>
    </>
  )
}

export default Portfolio;
