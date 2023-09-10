/* eslint-disable no-underscore-dangle */
import { refreshToken } from '@/api/user/account';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ebazaarUserRefreshToken, ebazaarUserToken } from './constants/cookieNames';
import { setAuthTokens } from './setAuthTokens';

const axiosRemote = axios.create();

const setToken = (request, token) => {
  request.headers.Authorization = `Bearer ${token}`;
};

axiosRemote.interceptors.request.use((config) => {
  const token = Cookies.get(ebazaarUserToken);
  if (token) {
    setToken(config, token);
  }
  return config;
});

export const enableResponseInterceptors = ({ handleUnauthorized }) => {
  axiosRemote.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401) {
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const { token } = await refreshToken({ refreshToken: Cookies.get(ebazaarUserRefreshToken) });
            if (token) {
              setAuthTokens(token.token, token.refreshToken);
              setToken(originalRequest, token.token);
            } else {
              handleUnauthorized();
              return Promise.reject(error);
            }
          } catch {
            handleUnauthorized();
            return Promise.reject(error);
          }
          return axiosRemote(originalRequest);
        }
        handleUnauthorized();
      }

      return Promise.reject(error);
    }
  );
};

export { axiosRemote };
