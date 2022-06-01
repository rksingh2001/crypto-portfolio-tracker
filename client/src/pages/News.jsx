import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Avatar, Container, Grid, Card, CardContent, CardHeader, Link, Typography, Divider, CardActionArea } from '@mui/material';
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
            <Grid key={idx} item xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardActionArea>
                  <CardHeader
                    avatar={news.image && <Avatar sx={{width: "60px", height: "60px"}} src={news.image.thumbnail.contentUrl} />}
                    title={<Typography variant="h6" color="secondary">{news.name}</Typography>}
                  />
                  <CardContent>
                    <Typography color="darkgray">{news.description}</Typography>
                    <Link target="_blank" underline="hover" variant="subtitle1" href={news.url}>{news.provider[0].name}</Link>
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
