import axios from 'axios';

const customHeaders = {
  'Access-Control-Allow-Origin': '*',
  origin: 'mad9rev3pgf4qwz-FNQ',
};

const customAxios = axios.create({
  headers: customHeaders,
});

export default customAxios;
