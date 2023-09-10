import { User } from '@/models/User';
import { signInStatus } from '@/utils/constants/signInStatus';
import { mergeCart } from '@/utils/product/cart';
import { mergeWishlist } from '@/utils/product/wishlist';
import { setAuthTokens } from '@/utils/setAuthTokens';
import { loadNotificationsPreview } from './notifications.action';

export const SET_USER = 'SET_USER';
export const SET_USER_SIGN_IN_STATUS = 'SET_USER_SIGN_IN_STATUS';

export const setUser = (payload) => {
  return {
    type: SET_USER,
    value: payload
  };
};

export const setUserSignInStatus = (payload) => {
  return {
    type: SET_USER_SIGN_IN_STATUS,
    value: payload
  };
};

const mergeCartAndWishlist = () => Promise.all([mergeCart(), mergeWishlist()]);

export const logInUser = (tokenResponse) => async (dispatch) => {
  setAuthTokens(tokenResponse.token, tokenResponse.refreshToken);
  await mergeCartAndWishlist();
  dispatch(setUser(new User(tokenResponse.token)));
  dispatch(setUserSignInStatus(signInStatus.SIGNED_IN));
  dispatch(loadNotificationsPreview());
};

export const updateTokenInfo = (tokenResponse) => async (dispatch) => {
  setAuthTokens(tokenResponse.token, tokenResponse.refreshToken);
  dispatch(setUser(new User(tokenResponse.token)));
};
