import React from 'react';
import millify from 'millify';

import { Avatar, Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';
import AddCoinButton from './AddCoinButton';

const CoinCard = ({ coin }) => {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <div className="custom-header" style={{
          display: "flex",
          justifyContent:"center",
          alignItems:"center"
        }}>
          <CardHeader
            title={coin.name}
            subheader={"$" + millify(coin.price)}
            avatar={
              <Avatar src={coin.iconUrl} />
            }
            style={{width: "60%"}}
          />  
          <AddCoinButton coin={coin} />
        </div>
        <CardContent>
          <Typography color="gray" variant="subtitle1">
            {"Market Cap: $" + millify(coin.marketCap)}
          </Typography>
          <Typography color="gray" variant="subtitle1">
            {"Current Volume: $" + millify(coin["24hVolume"])}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CoinCard;
