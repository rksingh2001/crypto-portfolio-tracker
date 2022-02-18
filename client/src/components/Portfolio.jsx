import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Container, Grid, Paper, Typography } from '@mui/material';
import getCoinApi from '../api/getCoin';
import CoinCard from './CoinCard';

const Portfolio = () => {

  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const coinsID = ["Qwsogvtv82FCd", "qzawljRxB5bYu"];

    const getCoin = () => {
      coinsID.map(async (coinID) => {
        const response = await getCoinApi.get("/" + coinID);
        setPortfolio(prevPortfolio => ([...prevPortfolio, response?.data?.coin]))
      });
    }

    try {
      getCoin();
    } catch (error) {
      console.log("error in CoinCard getCoin function", error);
    }
  }, []);

  return (
    <>
      <Box height="100px" />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={0} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", border: "1px solid", borderColor: "lightgray" }}>
              <Typography width="40%" variant="h4" color="secondary">Portfolio</Typography>
            </Paper>
          </Grid>
          {portfolio.length ? portfolio.map(coin => (
            <Grid key={coin.uuid} className="coin" item xs={6} md={4} lg={3}>
              <CoinCard coin={coin} />
            </Grid>
          )) : null}
        </Grid>
      </Container>
    </>
  )
}

export default Portfolio;
