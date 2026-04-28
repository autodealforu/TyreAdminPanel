import axios from 'axios';
import store from '../store/store';
import { URI } from './constant';
import { logout } from '../store/actions/auth';

// Create an instance of axios
const api = axios.create({
  baseURL: `${URI}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

export default api;
