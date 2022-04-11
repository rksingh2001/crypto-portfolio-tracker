import React, { useState, useContext } from 'react';
import millify from 'millify';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import { CoinContext } from './App';
// import { portfoliosRef } from '../firebase/firebase.js';
// import { doc, setDoc } from 'firebase/firestore';

const re = /^[0-9\b]+$/;

const AddCoinModal = () => {
  const [value, setValue] = useState(0);
  const {coin} = useContext(CoinContext);
  const [price, setPrice] = useState(Math.floor(coin.price));

  const handlePriceChange = (event) => {
    if (event.target.value === '' || re.test(event.target.value)) {
      setPrice(event.target.value);
    }
  }

  const handleValueChange = (event) => {
    if (event.target.value === '' || re.test(event.target.value)) {
      setValue(event.target.value);
    }
  }

  const handleSave = async () => {
    // Add a new document in collection "portfolios"
    setPrice("");
    setValue("");
  }

  return (
    <Grid style={{ alignItems: "center" }} container spacing={3}>
      <Grid item xs={1}>
        <Avatar src={coin.iconUrl} alt={coin.name} />
      </Grid>
      <Grid item xs={11}>
        <Typography variant="h5">{coin.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography> Price: {"$"+millify(coin.price)} </Typography>
        {coin.marketCap && <Typography> Marketcap: {"$"+millify(coin.marketCap)} </Typography>}
        {coin["24hVolume"] && <Typography> Current Volumne: {"$"+millify(coin["24hVolume"])} </Typography>}
      </Grid>
      <Grid item xs={12}>
        <TextField onChange={handlePriceChange} value={price} size="small" label="Buy Price (ex. $20)" variant="outlined" color="secondary" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField onChange={handleValueChange} value={value} size="small" label="Total Bought (ex. $20)" variant="outlined" color="secondary" fullWidth />
      </Grid>
      <Grid item style={{ display:"flex", justifyContent: "center"}} xs={12}>
        <Button onClick={handleSave} size="medium" color="secondary" variant="outlined">Save</Button>
      </Grid>
    </Grid>
  )
}

export default AddCoinModal;