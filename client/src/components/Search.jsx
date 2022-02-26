import React, { useState, useContext } from 'react';
import millify from 'millify';
import { NavLink } from 'react-router-dom';
import { Avatar, Button, Card, CardActionArea, TextField, Grid, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon, CardHeader } from '@mui/material';
import searchApi from '../api/search';
import AddCoinButton from './AddCoinButton';
import { DialogContext } from './App';

const Search = ({ setIsSearchOpen }) => {
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);
  // This state is used to see if the mouse is on the AddCoinButton
  // or not as in that case we disable NavLink because we want the
  // Modal to open instead of the Coin Page to open
  const [isLinkAllowed, setLinkAllowance] = useState(true);
  const { setIsDialogOpen } = useContext(DialogContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const search = async () => {
        const response = await searchApi.get("/", {
          params: {
            query: query
          }
        });
        console.log(response?.data?.coins)
        setCoins(response?.data?.coins)
      }
      search();
    } catch (error) {
      console.log(error);
    }
  }

  const handleLinkClick = () => {
    setIsSearchOpen(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search..."
          fullWidth
          color="secondary"
          variant="outlined"
          autoFocus
        />
      </form>
      {coins[0] && <br />}
      {coins.map((coin, idx) => (
        <NavLink onClick={handleLinkClick} style={{ textDecoration: "none" }} to={isLinkAllowed ? `/Coins/${coin.uuid}` : ""} >
          <Card elevation={0}>
            <CardActionArea>
              <div className="custom-header" style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center"
              }}>
                <CardHeader
                  title={coin.name}
                  subheader={"$" + millify(coin.price)}
                  avatar={
                    <Avatar sx={{ height: "30px", width: "30px" }} src={coin.iconUrl} />
                  }
                  style={{ width: "83%" }}
                />
                <AddCoinButton setLinkAllowance={setLinkAllowance} coinData={coin} />
              </div>
            </CardActionArea>
          </Card>
        </NavLink>
      ))}
    </>
  )
}

export default Search;
