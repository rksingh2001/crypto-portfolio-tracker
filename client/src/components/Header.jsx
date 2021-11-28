import React from 'react';

import { NavLink } from 'react-router-dom';

import { Button, Box, AppBar, Toolbar, Typography, Grid, Container } from '@mui/material';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Header = () => {
  return (
    <Box className="header">
      <AppBar sx={{ justifyContent: "center", alignItems: "center", height: "90px" }} position="fixed" color="secondary">
        {/* <Toolbar variant="regular" width="100%" disableGutters={true}> */}
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
        {/* </Toolbar>  */}
      </AppBar>
    </Box>
  )
}

export default Header;
