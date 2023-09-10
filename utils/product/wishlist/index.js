import {
  addMultipleWishlistItem,
  addWishlistItem as addWishlistItemToAPI,
  getWishlistItems,
  removeWishlistItem
} from '@/api/orders/wishlist';
import { getWishlistProductsByCodes } from '@/api/products/products';
import {
  addWishlistItemToLocalStorage,
  clearWishlistLocalStorage,
  getWishlistCodesFromLocalStorage,
  removeWishlistItemFromLocalStorage
} from './localStorageFuncs';

// helper func
const fetchWishlistByCodes = async (options = {}) => {
  const codes = getWishlistCodesFromLocalStorage();
  try {
    const { data: items = [], meta = {} } = await getWishlistProductsByCodes(codes, options);
    return { items, total: meta.total };
  } catch (error) {
    return { items: [], total: 0 };
  }
};

export const fetchWishlist = async (isSignedIn, options) => {
  try {
    const data = isSignedIn ? await getWishlistItems(options) : await fetchWishlistByCodes(options);
    return data;
  } catch (error) {
    console.log(error);
    return { items: [], total: [] };
  }
};

export const deleteWishListItem = async (isSignedIn, code) => {
  try {
    if (isSignedIn) {
      await removeWishlistItem(code);
    } else {
      removeWishlistItemFromLocalStorage(code);
    }
  } catch (error) {
    console.log(error);
  }
};
export const addWishlistItem = async (isSignedIn, code) => {
  try {
    if (isSignedIn) {
      await addWishlistItemToAPI({ code });
    } else {
      addWishlistItemToLocalStorage(code);
    }
  } catch (error) {
    console.log(error);
  }
};

export const mergeWishlist = async () => {
  const codes = getWishlistCodesFromLocalStorage();
  try {
    if (codes.length > 0) {
      await addMultipleWishlistItem(codes.map((code) => ({ code })));
      clearWishlistLocalStorage();
    }
  } catch (error) {
    console.log(error);
  }
};
