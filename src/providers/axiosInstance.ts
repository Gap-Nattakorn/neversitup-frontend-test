import axios from 'axios';
import { localStorageLoad } from '../utils/localStorage';

const axiosInstance = axios.create({
  baseURL: `https://candidate.neversitup.com/todo`,
  headers: { Accept: 'application/json' },
});

axiosInstance.interceptors.request.use(async config => {
  const token = localStorageLoad('token');

  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
