import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Avatar, Container, Grid, Card, CardContent, CardHeader, Typography, Divider, CardActionArea } from '@mui/material';
import getNewsSearchApi from '../api/getNewsSearch';
import NewsCard from '../components/NewsCard';

const News = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("cryptocurrencies");
  if (news[0])
    console.log(news[0].image.thumbnail.contentUrl)

  useEffect(() => {
    const getNewsSearch = async () => {
      const response = await getNewsSearchApi.get("/", {
        params: {
          query: query
        }
      });
      console.log(response.data.value);
      setNews(response.data.value);
    }
    getNewsSearch();
  }, [])

  return (
    <>
      <Box height="100px" />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Card variant="outlined">
              <CardHeader
                title={<Typography variant="h4" color="secondary">News</Typography>}
              />
              <Divider />
            </Card>
          </Grid>
          {news.map((news, idx) => (
            <Grid key={idx} item xs={12}>
              <Card variant="outlined">
                <CardActionArea>
                  <CardHeader 
                    title={<Typography variant="h5" color="secondary">{news.name}</Typography>}
                  />
                  <CardContent>
                    <Typography>{news.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default News;
