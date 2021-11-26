import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Header = () => {
  return (
    <Box className="header">
      <AppBar sx={{ justifyContent: "center", alignItems: "center", height: "90px" }} position="fixed" color="secondary">
        <Toolbar variant="regular">
          <AccountBalanceIcon sx={{ marginRight: "10px" }} color="inherit" />
          <Typography variant="h5" color="inherit" >
            Crypto Portfolio Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header;
