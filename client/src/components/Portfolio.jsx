import React from 'react';
import millify from 'millify';
import { useState, useEffect } from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, Container, Grid, Typography } from '@mui/material';

import coinrankingApi from '../api/coinrankingApi';

const Portfolio = () => {
  const [coinStats, setCoinStats] = useState([]);
  const [coinsData, setCoinsData] = useState([]);

  useEffect(() => {
    try {
      const getCoins = async () => {
        const response = await coinrankingApi.get();
        await console.log(response?.data?.data);
        await setCoinsData(response?.data?.data?.coins);
        await setCoinStats(response?.data?.data?.stats);
      }
      getCoins();
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <>
      <Box height="100px" />
      <Container className="portfolio">
        <Grid container spacing={3}>
          {coinsData.map(coin => (
            <Grid key={coin.uuid} className="coin" item xs={6} md={4} lg={3}>
              <Card color="primary">
                <CardHeader
                  title={coin.name}
                  subheader={"$" + millify(coin.price)}
                  avatar={
                    <Avatar src={coin.iconUrl} />
                  }
                />
                <CardContent>
                  <Typography color="gray" variant="subtitle1">
                    {"Market Cap: $" + millify(coin.marketCap)}
                  </Typography>
                  <Typography color="gray" variant="subtitle1">
                    {"Volume: $" + millify(coin.volume)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Portfolio;
