import Cookies from 'js-cookie';
import { ebazaarUserRefreshToken, ebazaarUserToken } from './constants/cookieNames';

export const removeAuthTokens = () => {
  Cookies.remove(ebazaarUserToken);
  Cookies.remove(ebazaarUserRefreshToken);
};
