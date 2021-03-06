import axios from 'axios';

// const API_URL = "https://coinranking1.p.rapidapi.com/coins";
// const { REACT_APP_X_RAPIDAPI_KEY, REACT_APP_X_RAPIDAPI_HOST } = process.env;

// CORS proxy server
const COINRANKING_API_URL = "http://localhost:8080"

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/coins",
})

// export default axios.create({
//   baseURL: API_URL,
//   params: {
//     limit: 12,
//   },
//   headers: {
//     'x-rapidapi-host': REACT_APP_X_RAPIDAPI_HOST,
//     'x-rapidapi-key': REACT_APP_X_RAPIDAPI_KEY
//   }
// })