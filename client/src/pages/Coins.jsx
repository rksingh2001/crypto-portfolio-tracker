import React from 'react';
import millify from 'millify';
import { useState, useEffect, useContext } from 'react';
import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, Pagination, Typography } from '@mui/material';

import getCoinsApi from '../api/getCoins';

import CoinCard from '../components/CoinCard';

import { ConversionRateContext } from '../App';
import { CurrencySymbolContext } from '../App';

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
  const { conversionRate } = useContext(ConversionRateContext);
  const { currencySymbol } = useContext(CurrencySymbolContext);

  useEffect(() => {
    try {
      const convertStatsCurrency = (stats) => {
        stats.totalMarketCap = conversionRate*stats.totalMarketCap;
        stats.total24hVolume = conversionRate*stats.total24hVolume;
      }
      const convertCoinsCurrencies = (currencies) => {
        currencies.forEach(curr => {
          curr["24hVolume"] = conversionRate*curr["24hVolume"];
          curr.price = conversionRate*curr.price;
          curr.marketCap = conversionRate*curr.marketCap;
        })
      }
      const getCoins = async () => {
        let response = await getCoinsApi.get("/", {
          params: {
            limit: 12,
            offset: 12 * (page - 1)
          }
        });
        convertStatsCurrency(response?.data?.stats);
        convertCoinsCurrencies(response?.data?.coins);
        setCoinsData(response?.data?.coins);
        setCoinsStats(response?.data?.stats);
      }
      getCoins();
    } catch (error) {
      console.log(error);
    }
  }, [conversionRate, page])

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
                  Total Coins: {coinsStats.total}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  Total MarketCap: {currencySymbol + millify(coinsStats.totalMarketCap)}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  Total Markets: {millify(coinsStats.totalMarkets)}
                </Typography>
                <Typography variant="subtitle1" color="inherit" >
                  Total Last 24 hr Volume: {currencySymbol + millify(coinsStats.total24hVolume)}
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
