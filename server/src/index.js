import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const COINRANKING_API_URL = "https://api.coinranking.com/v2/";
const { COINRANKING_API_KEY, X_RAPID_API_KEY } = process.env;

const app = express();

const coinrankingAPI = axios.create({
  baseURL: COINRANKING_API_URL,
  headers: {
    'x-access-token': COINRANKING_API_KEY
  },
});


app.use(cors());

app.get("/ping", (req, res) => {
  res.send("pong");
})

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
});

app.get("/coin/:uuid", async (req, res) => {
  try {
    const response = await coinrankingAPI.get(req.path, {
      params: req.query
    })
    res.send(response?.data?.data);
  } catch (error) {
    console.log("error on fetching /coin/:uuid", error);
  }
});

// For some reason Bing News Search API doesn't work
// properly with axios.create() and get() methods

const bingNewsSearchOptions = {
  method: 'GET',
  url: 'https://bing-news-search1.p.rapidapi.com/news/search',
  params: { safeSearch: 'Off', textFormat: 'Raw', freshness: 'Day' },
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': X_RAPID_API_KEY
  }
};

app.get("/news-search", async (req, res) => {
  try {
    const options = bingNewsSearchOptions;
    options.params.q = req.query.query;
    options.params.count = req.query.count;
    options.params.offset = req.query.offset;
    axios.request(options).then(function (response) {
      res.send(response.data);
    }).catch(function (error) {
      console.error("error on axios request of bingNewsSearchAPI", error);
    });
  } catch (error) {
    console.log("error on fetching /news/search", error);
  }
});

const options = {
  method: 'GET',
  url: 'https://currency-converter18.p.rapidapi.com/api/v1/convert',
  params: { from: 'USD', to: 'USD', amount: '1' },
  headers: {
    'X-RapidAPI-Key': X_RAPID_API_KEY,
    'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
  }
};

app.get("/convert-currency", async (req, res) => {
  options.params.to = req.query.to;
  axios.request(options).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log("error on axios request of /convert-currency", error);
  });
})

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Listening on Port 8080");
});