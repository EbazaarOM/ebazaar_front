import Cookies from 'js-cookie';
import { ebazaarUserRefreshToken, ebazaarUserToken } from './constants/cookieNames';

export const setAuthTokens = (token, refreshToken) => {
  Cookies.set(ebazaarUserToken, token);
  Cookies.set(ebazaarUserRefreshToken, refreshToken);
};
