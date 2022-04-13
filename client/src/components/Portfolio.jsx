import React, { useState, useEffect, Profiler } from 'react';
import { Box } from '@mui/system';
import { Container, Grid, Paper, Typography } from '@mui/material';
import getCoinApi from '../api/getCoin';
import CoinCard from './CoinCard';
import { auth, getDocument } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  
  // console.log("render")
  console.log(portfolio)
  
  useEffect(() => {
    let coinsID = [];
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Signed IN")
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        coinsID = await getDocument(uid)
        // Calling an asynchronous function inside another asynchrous function
        // A better approach would be to use Promise.all
        // let coins = await Promise.all(
        // Object.keys(coinIds).map(cid => getCoinApi.get(...).then(res => res.data.coin))
        // )
        // setCoins(coins)
        if (coinsID)
            getCoin();
      } else {
        // User is signed out
        console.log("Signed Out");
        setPortfolio([]);
      }
    });

    // Gets the coin data from the coinraking api
    const getCoin = () => {
      let coinsData = [];
      Object.keys(coinsID).map(async (coinID) => {
        console.log(coinID)
        const response = await getCoinApi.get("/" + coinID);
        setPortfolio(prevPortfolio => ([...prevPortfolio, response?.data?.coin])) 
      });
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
          {portfolio.length ? portfolio.map(coin => 
            (<Grid key={coin.uuid} className="coin" item xs={6} md={4} lg={3}>
              <CoinCard coin={coin} />
            </Grid>)
            ) : null}
        </Grid>
      </Container>
    </>
  )
}

export default Portfolio;
