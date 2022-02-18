import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Button, Box, AppBar, Typography, Grid, Container, Dialog, DialogContent, IconButton, Popover } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SearchIcon from '@mui/icons-material/Search';
import Search from './Search';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setImageURL(user.photoURL)
      } else {
        console.log("user is signed out")
      }
    })
  }, [])

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  }

  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((user) => {
      console.log(user)
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleSignOut = () => {
    auth.signOut();
    setImageURL("");
    setAnchorEl(null);
  }

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false);
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
            <Grid xs={1} item>
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
            <Grid item>
              {imageURL ?
                <>
                <IconButton style={{ height: "40px", width:"40px" }} onClick={handlePopoverClick}>
                  <Avatar alt="userprofile" src={imageURL} onCLick={handlePopoverClick} />
                </IconButton>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Button onClick={handleSignOut} size="medium" variant="outlined" color="inherit"> Sign Out</Button>
                </Popover>
                </>
              : 
                <Button onClick={handleSignIn} size="medium" variant="outlined" color="inherit">
                  Sign In
                </Button>
              } 
            </Grid>
          </Grid>
        </Container>
      </AppBar>
      <Dialog open={isSearchOpen} onClose={handleSearchClose} fullWidth>
        <DialogContent>
          <Search />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default Header;
