import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { Button, Box, AppBar, Typography, Grid, Container, Dialog, DialogContent, DialogActions, TextField } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchOpen = () => {
    setIsDialogOpen(true);
  }

  const handleSearchClose = () => {
    setIsDialogOpen(false);
  }

  return (
    <Box className="header">
      <AppBar sx={{ justifyContent: "center", alignItems: "center", height: "90px" }} position="fixed" color="secondary">
        <Container>
          <Grid container width="100%" spacing={1}>
            <Grid item xs={6}>
              <Container sx={{ display: "flex", flexDirection: "row" }}>
                <AccountBalanceIcon sx={{ marginRight: "10px", paddingTop: "3px" }} color="inherit" />
                <Typography variant="h6" color="inherit" >
                  Crypto Portfolio Tracker
                </Typography>
              </Container>
            </Grid>
            <Grid xs={2} item>
            </Grid>
            <Grid item>
              <Button onClick={handleSearchOpen} size="medium" variant="outlined" color="inherit"><SearchIcon color="inherit" /></Button>
            </Grid>
            <Grid item>
              <Button component={NavLink} to="/Portfolio" size="medium" variant="outlined" color="inherit">Portfolio</Button>
            </Grid>
            <Grid item>
              <Button component={NavLink} to="/Coins" size="medium" variant="outlined" color="inherit">Coins</Button>
            </Grid>
            <Grid item>
              <Button component={NavLink} to="/News" size="medium" variant="outlined" color="inherit">News</Button>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
      <Dialog open={isDialogOpen} onClose={handleSearchClose} fullWidth>
        <DialogContent>
          <TextField placeholder="Search..." fullWidth color="secondary" variant="outlined" autoFocus></TextField>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Header;
