import React from 'react';
import { Button, Box } from '@mui/material';
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CurrencySelector = () => {
  const [selectHover, setSelectHover] = useState(false);

  return (
    <Button variant="outlined" size="medium" color="inherit">
      <div class="dropdown" style={{
        position: "relative",
        display: "inline-block"
      }}
        onMouseOver={() => setSelectHover(true)}
        onMouseOut={() => setSelectHover(false)}
      >
        {/* <Box style={{ margin: "0px", padding: "0px", display: "flex", justifyContent: "left" }}> */}
        <Box style={{
          margin: "0px",
          padding: "0px",
          display: "flex",
          justifyContent: "left"
        }}>
          USD
          <ArrowDropDownIcon style={{ height: "20px" }} />
        </Box>
        <div class="dropdown-content" style={{
          display: selectHover ? "block" : "none",
          position: "absolute",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
          padding: "12px 16px",
          zIndex: 100,
          color: "black",
        }}>
          <Button color="secondary">USD</Button>
          <Button color="secondary">INR</Button>
        </div>
      </div>
    </Button>
  )
}

export default CurrencySelector;