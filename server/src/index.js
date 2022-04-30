import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const COINRANKING_API_URL="https://api.coinranking.com/v2/";
const { COINRANKING_API_KEY } = process.env;
const X_RAPID_API_KEY = '56feb89c5dmshe38c40aa429a5a0p17fbc9jsnff8cc27381de';

const app = express();

const coinrankingAPI = axios.create({
  baseURL: COINRANKING_API_URL,
  headers: {
    'x-access-token': COINRANKING_API_KEY
  },
})


app.use(cors());

app.get("/coins", async (req, res) => {
  try {
    const response = await coinrankingAPI.get(req.path, {
      params: req?.query
    });
    res.send(response?.data?.data);
  } catch (error) {
    console.log("error on fetching /coins", error);
  }
})

app.get("/search-suggestions", async (req, res) => {
  try {
    const response = await coinrankingAPI.get(req.path, {
      params: req.query
    }); 
    res.send(response?.data?.data);
  } catch (error) {
    console.log("error on fetching /search-suggestions", error);
  }
})

app.get("/coin/:uuid", async (req, res) => {
  try {
    const response = await coinrankingAPI.get(req.path, {
      params: req.query
    })
    res.send(response?.data?.data);
  } catch (error) {
    console.log("error on fetching /coin/:uuid", error);
  }
})

const bingNewsOptions = {
  method: 'GET',
  url: 'https://bing-news-search1.p.rapidapi.com/news',
  params: {textFormat: 'Raw', safeSearch: 'Off'},
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': X_RAPID_API_KEY
  }
};

// For some reason Bing News Search API doesn't work
// properly with axios.create() and get() methods

app.get("/news", async (req, res) => {
  try {
    axios.request(bingNewsOptions).then(function (response) {
      res.send(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  } catch (error) {
    console.log("error on fetching /news", error);
  }
})

const bingNewsSearchOptions = {
  method: 'GET',
  url: 'https://bing-news-search1.p.rapidapi.com/news/search',
  params: {safeSearch: 'Off', textFormat: 'Raw', freshness: 'Day'},
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '56feb89c5dmshe38c40aa429a5a0p17fbc9jsnff8cc27381de'
  }
};

app.get("/news-search", async (req, res) => {
  try {
    const options = bingNewsSearchOptions;
    options.params.q = req.query.query
    axios.request(options).then(function (response) {
      res.send(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  } catch (error) {
    console.log("error on fetching /news/search", error);
  }
})

app.listen(8080, () => {
  console.log("Listening on Port 8080");
})