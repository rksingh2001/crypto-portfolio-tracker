import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import getCoinApi from '../api/getCoin';
import { Avatar, Typography, Grid, Card, Divider, CardContent, CardHeader, Container, Link } from '@mui/material';
import LineChart from '../components/LineChart';
import AddCoinButton from '../components/AddCoinPageButton';

// const chartData = {
//   labels: [1, 2],
//   datasets: [{
//     label: "Users Gained",
//     data: [100, 200],
//     backgroundColor: "blue"
//   }]
// }

const Coin = () => {
  const { CoinUUID } = useParams();
  const [coin, setCoin] = useState(null);
  const [timePeriod, setTimePeriod] = useState("24h");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: "",
      data: []
    }]
  })

  const setTime = (time) => {
    console.log(time)
    setTimePeriod(time);
  }

  useEffect(() => {
    const getCoin = async () => {
      const response = await getCoinApi.get("/" + CoinUUID, {
        params: {
          timePeriod: timePeriod
        }
      });
      setCoin(response?.data?.coin);
      const sparklineData = response?.data?.coin?.sparkline;
      const lineData = {
        labels: sparklineData.map((value, id) => (id)),
        datasets: [{
          label: "Price",
          data: sparklineData.map((value, id) => (parseFloat(value))),
          backgroundColor: "blue"
        }]
      }
      setChartData(lineData);
    };
    try {
      getCoin();
    } catch (error) {
      console.log("error in CoinCard getCoin function", error);
    }
  }, [CoinUUID, timePeriod]);

  return (
    <Container className="coin-page">
      <Box height="100px" />
      {coin ? <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <div className="custom-header" style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "10px",
              paddingRight: "30px",
              alignItems: "center"
            }}>
              <CardHeader
                title={<Typography variant="h4" color="secondary">{coin.name}</Typography>}
                style={{ width: "60%" }}
                avatar={
                  <Avatar src={coin.iconUrl} />
                }
              />
              <AddCoinButton coinData={coin} />
            </div>
            <Divider />
            <CardContent>
              <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Rank: ${coin.rank}</Typography>
                  <Typography variant="subtitle1">Price: ${parseFloat(coin.price).toFixed(2)}</Typography>
                  <Typography variant="subtitle1">MarketCap: ${millify(coin.marketCap)}</Typography>
                  <Typography variant="subtitle1">Current Volume: ${millify(coin["24hVolume"])}</Typography>
                  <Link underline="hover" variant="subtitle1" href={coin.websiteUrl}>Website Link</Link>
                </Grid>
                <Grid item xs={7}>
                  <LineChart chartData={chartData} setTime={setTime} />
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
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
    </Container>
  )
}

export default Coin;