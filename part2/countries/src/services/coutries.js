import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1/all';
// const baseUrl = 'https://restcountries.com/v3.1/name/';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default {
  getAll,
};
