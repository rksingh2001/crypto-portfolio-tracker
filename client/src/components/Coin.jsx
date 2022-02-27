import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import getCoinApi from '../api/getCoin';
import { Avatar, Typography, Grid, Card, Divider, CardContent, CardHeader, Link } from '@mui/material';

const Coin = () => {
  const { CoinUUID } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const getCoin = async () => {
      const response = await getCoinApi.get("/" + CoinUUID);
      setCoin(response?.data?.coin);
      console.log(response?.data?.coin?.links);
      };
    try {
      getCoin();
    } catch (error) {
      console.log("error in CoinCard getCoin function", error);
    }
  }, [CoinUUID]);

  return (
    <>
      <Box height="100px" />
      {coin ? <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardHeader
              title={<Typography variant="h4" color="secondary">{coin.name}</Typography>}
              avatar={
                <Avatar src={coin.iconUrl} />
              }
            />
            <Divider />
            <CardContent>
              <Typography variant="subtitle1">Rank: ${coin.rank}</Typography>
              <Typography variant="subtitle1">Price: ${parseFloat(coin.price).toFixed(2)}</Typography>
              <Typography variant="subtitle1">MarketCap: ${millify(coin.marketCap)}</Typography>
              <Typography variant="subtitle1">Current Volume: ${millify(coin["24hVolume"])}</Typography>
              <Link underline="hover" variant="subtitle1" href={coin.websiteUrl}>Website Link</Link>
              <br />
              <Divider />
              {/* We are getting html elements from the backend in the description
                these classNames are similar to of Typography with variant body1
                !! Might or not work in the build version, if not custom styles will
                be needed to be created using devtools */}
              <div class="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root" dangerouslySetInnerHTML={{ __html: coin.description }} />
              <Divider />
              <br />
              <Typography variant="h5">Helpful Links</Typography>
              <br />
              {coin.links.map((link, idx) => (
                <>
                  <Link key={idx} underline="hover" variant="subtitle1" href={link.url}>{link.name}</Link>
                  <br />
                </>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid> : null}
    </>
  )
}

export default Coin;