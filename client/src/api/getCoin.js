import axios from 'axios';

const API_URL = "https://coinranking1.p.rapidapi.com/coin";
const { REACT_APP_X_RAPIDAPI_KEY, REACT_APP_X_RAPIDAPI_HOST } = process.env;

export default axios.create({
  baseURL: API_URL,
  headers: {
    'x-rapidapi-host': REACT_APP_X_RAPIDAPI_HOST,
    'x-rapidapi-key': REACT_APP_X_RAPIDAPI_KEY
  }
})