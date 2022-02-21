import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import getCoinApi from '../api/getCoin';

const Coin = () => {
  const { CoinUUID } = useParams();
  const [coin, setCoin] = useState({});

  useEffect(() => {
    const getCoin = async () => {
      const response = await getCoinApi.get("/" + CoinUUID);
      setCoin(response?.data?.coin);
      };

    try {
      getCoin();
    } catch (error) {
      console.log("error in CoinCard getCoin function", error);
    }
  }, [CoinUUID]);

  return (
    <>
      <Box height="100px" />
      <div>Coin : {coin?.name}</div>
    </>
  )
}

export default Coin;