import React, { useState } from 'react';
import { Avatar, Button, TextField, Grid, Typography } from '@mui/material';
import searchApi from '../api/search';
import AddCoinButton from './AddCoinButton';

const Search = () => {
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const search = async () => {
        const response = await searchApi.get("/",{
          params: {
            query: query
          }
        });
        
        setCoins(response?.data?.coins)
      } 
      search();
    } catch (error) {
      console.log(error);
    }
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
      {coins.map(coin => (
        <Button color="secondary" fullWidth>
          <Grid container key={coin.uuid} style={{  }} >
            <Grid item sx={{}} display="flex" flexDirection="row" justifyContent="left" xs={1}>
              <Avatar sx={{ width: "30px", height: "30px" }} src={coin.iconUrl} />
            </Grid>
            <Grid item sx={{}} display="flex" flexDirection="row" justifyContent="left" xs={10}>
              <Typography variant="h6" color="initial">{coin.name}</Typography>
            </Grid>
            <Grid item>
              <AddCoinButton coinData={coin}/>
            </Grid>
          </Grid>
        </Button>
      ))}
    </>
  )
}

export default Search;
