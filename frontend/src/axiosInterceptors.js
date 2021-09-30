import axios from 'axios'
import { store } from './redux/store'
import { forceLogout, selectToken } from './redux/auth/authSlice'
import { API_SERVER } from './settings'

export const axiosRequestInterceptor = axios.interceptors.request.use(config => {
  config.baseURL = API_SERVER;
  config.headers = {
    "Content-Type": "application/json",
    'Authorization': `Token ${store.getState().auth.token}`
  }
  return config
})

const badResponseCodes = [401, 403] // unauthorized, forbidden
export const axiosResponseInterceptor = axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    if (badResponseCodes.includes(status)) {
      store.dispatch(forceLogout());
    }
    return Promise.reject(error);
  }
);