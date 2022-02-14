import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const COINRANKING_API_URL="https://api.coinranking.com/v2/"
const { COINRANKING_API_KEY } = process.env

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
    const response = await coinrankingAPI.get(req.path)
    res.send(response?.data?.data);
  } catch (error) {
    console.log("error on fetching /coin/:uuid", error);
  }
})

app.listen(8080, () => {
  console.log("Listening on Port 8080");
})