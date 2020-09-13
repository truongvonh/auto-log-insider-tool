import axios from 'axios';

const apiRequest = axios.create({
  baseURL: `${process.env.INSIDER_ENDPOINT}/`,
});

export default apiRequest;
