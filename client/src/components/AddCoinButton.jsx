import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import AddCoinModal from './AddCoinModal';

const AddCoin = ({ coin }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

  return (
    <>
      <IconButton onClick={handleDialogOpen} style={{ width: "40px", height: "40px" }}>
        <AddIcon size="large" />
      </IconButton>
      <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth>
        <DialogContent>
          <AddCoinModal coin={coin} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddCoin;