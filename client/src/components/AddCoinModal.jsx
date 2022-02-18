import React, { useState } from 'react';
import millify from 'millify';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';

const re = /^[0-9\b]+$/;

const AddCoinModal = ({ coin }) => {
  const [price, setPrice] = useState(Math.floor(coin.price));
  const [value, setValue] = useState(0);

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

  const handleSave = () => {
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
        {coin["24hVoume"] && <Typography> Current Volumne: {"$"+millify(coin["24hVolume"])} </Typography>}
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