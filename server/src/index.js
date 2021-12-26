import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const COINRANKING_API_URL="https://api.coinranking.com/v2/"
const { COINRANKING_API_KEY } = process.env

const app = express();
app.use(cors());

const searchApi = axios.create({
  baseURL: COINRANKING_API_URL + "/search-suggestions",
  headers: {
    'x-access-token': COINRANKING_API_KEY
  },
})

app.get("/", async (req, res) => {
  try {
    const response = await searchApi.get("/", {
      params: {
        query: req.query.query,
      }
    });
    res.send(response?.data?.data);
  } catch (error) {
    console.log(error);
  }
})

app.listen(8080, () => {
  console.log("Listening on Port 8080");
})