import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Card, CardContent, CardHeader, Divider, Container, Grid, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import getCoinApi from '../api/getCoin';
import CoinCard from '../components/CoinCard';
import { auth, getDocument } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import millify from 'millify';

import { portfolioValue } from '../utils/portfolioValue.js';
import { profitPercentage } from '../utils/profitPercentage.js';
import { mostProfitableCoin } from '../utils/mostProfitableCoin.js';
import { leastProfitableCoin } from '../utils/leastProfitableCoin.js';
import { coinProfit } from '../utils/coinProfit.js';

let userCoinsData = {};

// userCoinsData
// {
//   coinID: {
//       totalBought: Number,
//       buyPrice: Number
//   }
// }


// portfolio
// {
//   coinID: {
//      price: Number
//      other details about the price 
//    }
// }

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState({});
  const mostProfitable = mostProfitableCoin(userCoinsData, portfolio);
  const leastProfitable = leastProfitableCoin(userCoinsData, portfolio);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        userCoinsData = await getDocument(uid);
        // Promise.all creates an array of promises and returns it once they all are fulfilled
        // Before Setting the portfolio we convert array into object with coinID as the key
        if (userCoinsData) {
          const coins = await Promise.all(Object.keys(userCoinsData).map(coinID => getCoinApi.get("/" + coinID).then(res => res?.data?.coin)));
          setPortfolio(coins.reduce((obj, coin) => {
            return {
              ...obj,
              [coin["uuid"]]: coin,
            };
          }, {}))
        }
      } else {
        // User is signed out
        setPortfolio({});
      }
    });
  }, []);

  return (
    <>
      <Box height="100px" />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Card variant="outlined">
              <CardHeader
                title={<Typography variant="h4" color="secondary">Portfolio</Typography>}
              />
              <Divider />
              <CardContent>
                <Typography variant="subtitle1" color="inherit">
                  Number of Coins Owned: {userCoinsData ? Object.keys(userCoinsData).length : 0}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  Total Portfolio Value: ${userCoinsData ? millify(portfolioValue(userCoinsData, portfolio)) : 0}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  Overall Profit: {userCoinsData ? (profitPercentage(userCoinsData, portfolio)).toFixed(2) : 0}%
                </Typography>
                <Box style={{ margin: "0px", padding: "0px", display: "flex", justifyContent: "left" }}>
                  <Typography variant="subtitle1" color="inherit" >
                    Most Profitable Coin: {userCoinsData ? portfolio[mostProfitable]?.name : "None"}
                  </Typography>
                  {mostProfitable && <>
                    {userCoinsData[mostProfitable].buyPrice < portfolio[mostProfitable].price ?
                      <ArrowDropUpIcon color="success" fontSize="medium" />
                      :
                      <ArrowDropDownIcon color="error" fontSize="medium" />
                    }
                  </>}
                  <Typography variant="subtitle1" color="inherit">
                    ({userCoinsData ? coinProfit(portfolio[mostProfitable], userCoinsData[mostProfitable]) : 0}%)
                  </Typography>
                </Box>
                <Box style={{ margin: "0px", padding: "0px", display: "flex", justifyContent: "left" }}>
                  <Typography variant="subtitle1" color="inherit" >
                    Least Profitable Coin: {portfolio[leastProfitable]?.name}
                  </Typography>
                  {leastProfitable && <>
                    {userCoinsData[leastProfitable].buyPrice < portfolio[leastProfitable].price ?
                      <ArrowDropUpIcon color="success" fontSize="medium" />
                      :
                      <ArrowDropDownIcon color="error" fontSize="medium" />
                    }
                  </>}
                  <Typography variant="subtitle1" color="inherit">
                    ({userCoinsData ? coinProfit(portfolio[leastProfitable], userCoinsData[leastProfitable]) : 0}%)
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          {Object.keys(portfolio).length ? Object.keys(portfolio).map(coin =>
          (<Grid key={coin} className="coin" item xs={6} md={4} lg={3}>
            <CoinCard coin={portfolio[coin]} userData={userCoinsData[coin]} />
          </Grid>)
          ) : null}
        </Grid>
      </Container>
    </>
  )
}

export default Portfolio;
