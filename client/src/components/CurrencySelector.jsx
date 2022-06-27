import React, { useState } from 'react';
import { Button, Box, Divider } from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import currencyList from "../assets/currency-list.json";

const CurrencySelector = () => {
  const [selectHover, setSelectHover] = useState(false);
  const [currency, setCurrency] = useState("USD")

  const handleClickAway = () => {
    setSelectHover(false);
  }

  const handleSelect = (curr) => {
    setCurrency(curr);
    setSelectHover(false);
    console.log(selectHover);
  }

  const handleOptionsOpen = () => {
    if (selectHover === false)
      setSelectHover(true);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Button onClick={() => {handleOptionsOpen()}} variant="outlined" size="medium" color="inherit">
        <Box style={{
          margin: "0px",
          padding: "0px",
          display: "flex",
          justifyContent: "center"
        }}>
          {currency}
          <ArrowDropDownIcon style={{ height: "20px" }} />
        </Box>
        <div class="dropdown-content" style={{
          display: selectHover ? "block" : "none",
          position: "absolute",
          backgroundColor: "#f9f9f9",
          width: "90px",
          zIndex: 1,
          color: "black",
          maxHeight: "80px",
          overflow: "scroll",
          borderRadius: "4px"
        }}>
          <Button onClick={() => {handleSelect("INR")}} sx={{ width: "90px" }} color="secondary">INR</Button>
          <Button onClick={() => {handleSelect("USD")}} sx={{ width: "90px" }} color="secondary">USD</Button>
          <Divider />
          {Object.keys(currencyList).map(curr => (
            <Button onClick={() => {handleSelect(curr)}} key={curr} sx={{ width: "90px" }} color="secondary">{curr}</Button>
          ))}
        </div>
      </Button>
    </ClickAwayListener>
  )
}

export default CurrencySelector;