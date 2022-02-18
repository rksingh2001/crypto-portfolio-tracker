import React, { useState } from 'react';
import { Avatar, Box, TextField, Grid, Typography } from '@mui/material';
import searchApi from '../api/search';
import AddCoinButton from './AddCoinButton';

const Search = () => {
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);
  console.log(coins[0])

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
      <Box style={{ displaye:"flex", justifyContent:"space-between", padding: "5px"}}>
        {coins.map(coin => (
          <Grid container key={coin.uuid} style={{ marginBottom: "2px", marginTop:"1px" }} >
            <Grid item sx={{}} display="flex" flexDirection="row" justifyContent="left" xs={1}>
              <Avatar sx={{ width: "30px", height: "30px" }} src={coin.iconUrl} />
            </Grid>
            <Grid item sx={{}} display="flex" flexDirection="row" justifyContent="left" xs={10}>
              <Typography variant="h5" color="initial">{coin.name}</Typography>
            </Grid>
            <Grid item>
              <AddCoinButton coin={coin}/>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  )
}

export default Search;
