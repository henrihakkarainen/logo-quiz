import axios from 'axios';

const instance = axios.create({
  baseURL: '/api'
});

instance.defaults.headers.common['Accept'] = 'application/json'

export default instance;