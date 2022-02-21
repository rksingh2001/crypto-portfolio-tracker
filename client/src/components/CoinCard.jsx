import React, { useState } from 'react';
import millify from 'millify';

import { Avatar, Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';
import AddCoinButton from './AddCoinButton';
import { NavLink } from 'react-router-dom';

const CoinCard = ({ coin }) => {
  // This state is used to see if the mouse is on the AddCoinButton
  // or not as in that case we disable NavLink because we want the
  // Modal to open instead of the Coin Page to open
  const [isLinkAllowed, setLinkAllowance] = useState(true);

  return (
    <NavLink style={{ textDecoration: "none" }} to={isLinkAllowed ? `/Coins/${coin.uuid}` : ""} >
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
            <AddCoinButton setLinkAllowance={setLinkAllowance} coinData={coin} />
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
    </NavLink>
  )
}

export default CoinCard;
