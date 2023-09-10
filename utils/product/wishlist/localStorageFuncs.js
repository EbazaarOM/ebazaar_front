import { WISHLIST_KEY } from '@/utils/constants/localStorageKeys';

const getWishlist = () => JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
const setWishlist = (items) => localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));

export const getWishlistCodesFromLocalStorage = () => {
  return getWishlist();
};

export const removeWishlistItemFromLocalStorage = (code) => {
  const items = getWishlist();
  setWishlist(items.filter((x) => x !== code));
};

export const addWishlistItemToLocalStorage = (code) => {
  const items = getWishlist();
  const exists = items.indexOf(code) > -1;
  if (!exists) setWishlist([code, ...items]);
};

export const clearWishlistLocalStorage = () => {
  setWishlist([]);
};
