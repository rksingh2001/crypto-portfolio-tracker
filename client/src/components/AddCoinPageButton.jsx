import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { CoinContext, DialogContext } from '../App';

const AddCoinPageButton = ({ coinData }) => {
  const {setCoin} = useContext(CoinContext);
  const {setIsDialogOpen} = useContext(DialogContext);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    if (coinData)
      console.log(typeof(setCoin), coinData);
      setCoin(coinData);
  }

  return (
    <IconButton onClick={handleDialogOpen} style={{ border: "1px solid lightgray", width: "40px", height: "40px" }}>
      <AddIcon size="large" />
    </IconButton>
  )
}

export default AddCoinPageButton;