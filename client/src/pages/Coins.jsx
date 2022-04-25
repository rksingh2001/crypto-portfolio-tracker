import React from 'react';
import millify from 'millify';
import { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, Pagination, Typography } from '@mui/material';

import getCoinsApi from '../api/getCoins';

import CoinCard from '../components/CoinCard';

const Portfolio = () => {
  const [coinsStats, setCoinsStats] = useState({
    total: 0,
    totalMarkets: 0,
    total24hVolume: 0,
    totalExchanges: 0,
    totalMarketCap: 0
  });
  const [coinsData, setCoinsData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      const getCoins = async () => {
        const response = await getCoinsApi.get("/", {
          params: {
            limit: 12,
            offset: 12 * (page - 1)
          }
        });
        setCoinsData(response?.data?.coins);
        setCoinsStats(response?.data?.stats);
      }
      getCoins();
    } catch (error) {
      console.log(error);
    }
  }, [page])

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  return (
    <>
      <Box height="100px" />
      <Container className="portfolio">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader
                title={<Typography variant="h4" color="secondary">Cryptocurrencies</Typography>}
              />
              <Divider />
              <CardContent>
                <Typography variant="subtitle1" color="inherit">
                  Total Coins: {millify(coinsStats.total)}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  Total MarketCap: {"$" + millify(coinsStats.totalMarketCap)}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  Total Markets: {millify(coinsStats.totalMarkets)}
                </Typography>
                <Typography variant="subtitle1" color="inherit" >
                  Total Last 24 hr Volume: {"$" + millify(coinsStats.total24hVolume)}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  Total Exchanges: {millify(coinsStats.totalExchanges)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {coinsData.map(coin => (
            <Grid key={coin.uuid} className="coin" item xs={6} md={4} lg={3}>
              <CoinCard coin={coin} userData={null} />
            </Grid>
          ))}
          <Grid display="flex" justifyContent="center" item xs={12}>
            <Pagination onChange={handlePageChange} color="secondary" count={10} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Portfolio;