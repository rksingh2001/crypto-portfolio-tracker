import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Card, CardHeader, Container, Typography } from '@mui/material';

import getCoinApi from '../api/getCoin';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  // const [coinsID, setCoinsID] = useState([]);
  useEffect(() => {
    const coinsID = [3,5,6];
    const responses = portfolio;
    try {
      const getCoin = async () => {
        coinsID.map( async (coinID) => {
          const response = await getCoinApi.get("/" + coinID);
          await responses.push(response?.data?.data?.coin);
        })
        await setPortfolio(responses);
        await console.log(portfolio);
      }

      getCoin();
    } catch(error) {
      console.log(error);
    }
  }, [])

  return (
    <>
      <Box height="100px" />
      <Container>
        <Card variant="outlined">
          <CardHeader
            title={<Typography variant="h4" color="secondary">Portfolio</Typography>}
          />
          {/* <Grid container spacing={3}>
            {portfolio.map(coinId => (
              <Grid item xs={6} md={4} lg={3}>

              </Grid>)
            )}
          </Grid> */}
        </Card>
      </Container>
    </>
  )
}

export default Portfolio;
