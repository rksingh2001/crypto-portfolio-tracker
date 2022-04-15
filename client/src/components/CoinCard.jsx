import React, { useState } from 'react';
import millify from 'millify';
import { Avatar, Box, Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCoinButton from './AddCoinButton';
import { NavLink } from 'react-router-dom';

const CoinCard = ({ coin, userData }) => {
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
            justifyContent: "center",
            alignItems: "center"
          }}>
            <CardHeader
              title={coin.name}
              subheader={"$" + millify(coin.price)}
              avatar={
                <Avatar src={coin.iconUrl} />
              }
              style={{ width: "60%" }}
            />
            <AddCoinButton setLinkAllowance={setLinkAllowance} coinData={coin} />
          </div>
          <CardContent>
            <Box style={{margin: "0px", padding: "0px", display: "flex", justifyContent: "left"}}>
              <Typography color="gray" variant="subtitle1">
                {userData ? "You Own: $" + millify(coin.price*userData.totalBought) : "You Own: $0"}
              </Typography>
              {userData && <>
                {userData.buyPrice < coin.price ? 
                <>
                  <ArrowDropUpIcon color="success" fontSize="medium" />
                  <Typography color="gray" variant="subtitle2">{"(" + ((coin.price-userData.buyPrice)/userData.buyPrice*100).toFixed(2) + "%)"}</Typography>
                </>
                :
                <>
                  <ArrowDropDownIcon color="error" style={{ marginTop: "1px" }} fontSize="medium" />
                  <Typography color="gray" variant="subtitle2">{"(" + ((coin.price-userData.buyPrice)/userData.buyPrice*100).toFixed(2) + "%)"}</Typography>
                </>}
              </>}
            </Box>
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
