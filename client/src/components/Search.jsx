import React, { useState } from 'react';
import { Dialog, DialogContent, TextField } from '@mui/material';
import searchApi from '../api/search';

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);

    try {
      console.log("1");
      const search = async () => {
        console.log("this")
        const response = await searchApi.get("/",{
          params: {
            query: query
          }
        });

        console.log(response?.data?.coins)
      } 
      search();
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
  )
}

export default Search;
