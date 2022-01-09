import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';

import getCoinApi from '../api/getCoin';

import CoinCard from './CoinCard';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  useEffect(() => {
    const coinsID = [1, 2, 5 ,11];
    const getCoin = () => {
      coinsID.map(async (coinID) => {
        const response = await getCoinApi.get("/" + coinID);
        setPortfolio(prevPortfolio => ([...prevPortfolio, response?.data?.data?.coin]))
      });
    }
    getCoin();
  }, []);

  return (
    <>
      <Box height="100px" />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader
                title={<Typography variant="h4" color="secondary">Portfolio</Typography>}
              />
            </Card>
          </Grid>
          {portfolio.map(coin => (
            <Grid key={coin.uuid} className="coin" item xs={6} md={4} lg={3}>
              <CoinCard coin={coin} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Portfolio;
