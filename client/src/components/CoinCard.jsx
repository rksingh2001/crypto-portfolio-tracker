import React from 'react';
import millify from 'millify';

import { Avatar, Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from '@mui/material';

const CoinCard = ({ coin }) => {
  return (

    <Card variant="outlined">
      <CardActionArea>
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
            {"Current Volume: $" + millify(coin.volume)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CoinCard;
