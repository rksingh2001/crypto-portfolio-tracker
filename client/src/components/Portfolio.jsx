import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Card, CardContent, CardHeader, Divider, Container, Grid, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import getCoinApi from '../api/getCoin';
import CoinCard from './CoinCard';
import { auth, getDocument } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import millify from 'millify';

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

// Should return the current value of the holings
const portfolioValue = (userCoinsData, portfolio) => {
  let value = 0;

  Object.keys(userCoinsData).forEach(coinID => {
    value += userCoinsData[coinID].totalBought * portfolio[coinID].price;
  })

  return value;
}

// Should the return value of the holding at the time they were bought
const portfolioCost = (userCoinsData) => {
  let cost = 0;

  Object.values(userCoinsData).forEach(({ totalBought, buyPrice }) => {
    cost += totalBought * buyPrice;
  })

  return cost;
}

// Should return the aggregrate profit percentage 
const profitPercentage = (userCoinsData, portfolio) => {
  const buyPrice = portfolioCost(userCoinsData);
  const curr_val = portfolioValue(userCoinsData, portfolio);
  const profit = ((curr_val - buyPrice) / buyPrice) * 100;

  if (isNaN(profit)) return 0;
  return profit;
}

// Returns the ID of the emost profitable coin
const mostProfitableCoin = (userCoinsData, portfolio) => {
  let profitable_coin = "";
  let profit = Number.MIN_VALUE;

  Object.keys(userCoinsData).forEach(coinID => {
    const curr = portfolio[coinID].price;
    const buyPrice = userCoinsData[coinID].buyPrice;

    const temp = ((curr - buyPrice) / curr) * 100;
    if (temp > profit) {
      profit = temp;
      profitable_coin = coinID;
    }
  })

  return profitable_coin;
}

// Returns the ID of the emost profitable coin
const leastProfitableCoin = (userCoinsData, portfolio) => {
  let profitable_coin = "";
  let profit = Number.MAX_VALUE;

  Object.keys(userCoinsData).forEach(coinID => {
    const curr = portfolio[coinID].price;
    const buyPrice = userCoinsData[coinID].buyPrice;

    const temp = ((curr - buyPrice) / curr) * 100;
    if (temp < profit) {
      profit = temp;
      profitable_coin = coinID;
    }
  })

  return profitable_coin;
}

// Returns profit or loss of a particular Coin
const coinProfit = (coinData, userData) => {
  if (coinData === undefined || userData === undefined) return 0;
  return ((coinData.price - userData.buyPrice) / userData.buyPrice * 100).toFixed(2);
}


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
        const coins = await Promise.all(Object.keys(userCoinsData).map(coinID => getCoinApi.get("/" + coinID).then(res => res?.data?.coin)));
        setPortfolio(coins.reduce((obj, coin) => {
          return {
            ...obj,
            [coin["uuid"]]: coin,
          };
        }, {}))
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
                  Number of Coins Owned: {Object.keys(userCoinsData).length}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  Total Portfolio Value: ${millify(portfolioValue(userCoinsData, portfolio))}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  Overall Profit: {(profitPercentage(userCoinsData, portfolio)).toFixed(2)}%
                </Typography>
                <Box style={{ margin: "0px", padding: "0px", display: "flex", justifyContent: "left" }}>
                  <Typography variant="subtitle1" color="inherit" >
                    Most Profitable Coin: {portfolio[mostProfitable]?.name}
                  </Typography>
                  {mostProfitable && <>
                    {userCoinsData[mostProfitable].buyPrice < portfolio[mostProfitable].price ?
                      <ArrowDropUpIcon color="success" fontSize="medium" />
                      :
                      <ArrowDropDownIcon color="error" fontSize="medium" />
                    }
                  </>}
                  <Typography variant="subtitle1" color="inherit">
                    ({coinProfit(portfolio[mostProfitable], userCoinsData[mostProfitable])}%)
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
                    ({coinProfit(portfolio[leastProfitable], userCoinsData[leastProfitable])}%)
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
