import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { Container } from '@mui/material';
import getNewsSearchApi from '../api/getNewsSearch';

const News = () => {
  useEffect(() => {
    const getNewsSearch = async () => {
      const response = await getNewsSearchApi.get("/", {
        params: {
          query: "cardano"
        }
      });
      console.log(response);
    }
    getNewsSearch();
  }, [])

  return (
    <>
      <Box height="100px" />
      <Container>

      </Container>
    </>
  )
}

export default News;
