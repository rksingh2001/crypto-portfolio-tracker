import axios from 'axios';

// const API_URL = "http://localhost:8080";

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/search-suggestions"
})