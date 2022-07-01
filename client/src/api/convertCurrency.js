import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + "/convert-currency";
// const { REACT_APP_X_RAPIDAPI_KEY, REACT_APP_X_RAPIDAPI_HOST } = process.env;

export default axios.create({
  baseURL: API_URL,
})