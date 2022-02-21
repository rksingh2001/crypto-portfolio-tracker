import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { CoinContext, DialogContext } from './App';

const AddCoin = ({ coinData, setLinkAllowance }) => {
  const {setCoin} = useContext(CoinContext)
  const {setIsDialogOpen} = useContext(DialogContext);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    setCoin(coinData);
  }

  const handleMouseEnter = () => {
    setLinkAllowance(false);
  }

  const handleMouseLeave = () => {
    setLinkAllowance(true)
  }

  return (
    <>
      <IconButton onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} onClick={handleDialogOpen} style={{ width: "40px", height: "40px" }}>
        <AddIcon size="large" />
      </IconButton>
    </>
  )
}

export default AddCoin;