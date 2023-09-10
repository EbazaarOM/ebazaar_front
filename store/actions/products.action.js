import { deleteCartitem, fetchCart } from '@/utils/product/cart';
import { deleteWishListItem, fetchWishlist } from '@/utils/product/wishlist';

export const SET_PRODUCT_PREVIEW = 'SET_PRODUCT_PREVIEW';
export const SET_CART_PREVIEW = 'SET_CART_PREVIEW';
export const SET_WISHLIST_PREVIEW = 'SET_WISHLIST_PREVIEW';

let timeout = null;

export const setCartPreview = (payload) => {
  return {
    type: SET_CART_PREVIEW,
    value: payload
  };
};

export const setWishlistPreview = (payload) => {
  return {
    type: SET_WISHLIST_PREVIEW,
    value: payload
  };
};

export const setProductPreviewState = (payload) => {
  return {
    type: SET_PRODUCT_PREVIEW,
    value: payload
  };
};

export const setProductPreview = (val) => (dispatch) => {
  dispatch(setProductPreviewState(val));

  if (val && window?.innerWidth > 768) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(setProductPreviewState(null));
    }, 3000);
  }
};

export const loadCartPreview = (isSignedIn) => async (dispatch) => {
  const data = await fetchCart(isSignedIn, { take: 10 });
  dispatch(setCartPreview(data));
};

export const deleteCartItemAction = (isSignedIn, code) => async (dispatch) => {
  await deleteCartitem(isSignedIn, code);
  dispatch(loadCartPreview(isSignedIn));
};

export const loadWishlistPreview = (isSignedIn) => async (dispatch) => {
  const data = await fetchWishlist(isSignedIn, { take: 10 });
  dispatch(setWishlistPreview(data));
};

export const deleteWishlistItemAction = (isSignedIn, code) => async (dispatch) => {
  await deleteWishListItem(isSignedIn, code);
  dispatch(loadWishlistPreview(isSignedIn));
};
