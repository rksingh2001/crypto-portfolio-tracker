import axios from 'axios';

const API_URL = "http://localhost:8080/news-search";

export default axios.create({
  baseURL: API_URL,
})