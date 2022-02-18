import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

const AddCoin = () => {
  return (
    <IconButton style={{ width: "40px", height: "40px" }}>
      <AddIcon size="large" />
    </IconButton>
  )
}

export default AddCoin;