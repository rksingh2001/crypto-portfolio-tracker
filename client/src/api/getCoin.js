import axios from 'axios';

const API_URL = "http://localhost:8080/coin";
// const { REACT_APP_X_RAPIDAPI_KEY, REACT_APP_X_RAPIDAPI_HOST } = process.env;

export default axios.create({
  baseURL: API_URL,
})