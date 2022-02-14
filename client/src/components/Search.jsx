import React, { useState } from 'react';
import { Avatar, Container, TextField, Grid, Typography } from '@mui/material';
import searchApi from '../api/search';

const Search = () => {
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);

    try {
      const search = async () => {
        const response = await searchApi.get("/",{
          params: {
            query: query
          }
        });
        
        setCoins(response?.data?.coins)
        console.log(response?.data?.coins)
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
      <Container>
        {coins.map(coin => (
          <Grid sx={{padding: '6px'}} container key={coin.uuid}>
            <Grid item xs={2}><Avatar src={coin.iconUrl} /></Grid>
            <Grid item xs={10}><Typography variant="h5" color="initial">{coin.name}</Typography></Grid>
          </Grid>
        ))}
      </Container>
    </>
  )
}

export default Search;
