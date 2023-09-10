import {
  addCartItem as addCartItemAPI,
  addMultipleCartItem,
  getCartItems,
  removeCartItem,
  setQuantity
} from '@/api/orders/cart';
import { getCartProductsByCodes } from '@/api/products/products';
import {
  addCartItemToLocalStorage,
  clearCartLocalStorage,
  getCartFromLocalStorage,
  removeCartItemFromLocalStorage,
  setCartItemQuantityToLocalStorage
} from './localStorageFuncs';

// helper func
const fetchCartByCodes = async (options = {}) => {
  const products = getCartFromLocalStorage();
  try {
    const res = await getCartProductsByCodes(products, options);
    return res;
  } catch (error) {
    return { items: [], meta: {} };
  }
};

export const fetchCart = async (isSignedIn, options) => {
  try {
    const res = isSignedIn ? await getCartItems(options) : await fetchCartByCodes(options);
    return { items: res.data || [], meta: res.meta || {} };
  } catch (error) {
    if (options.promoCode) {
      throw error;
    } else {
      return { items: [], meta: {} };
    }
  }
};

export const deleteCartitem = async (isSignedIn, code) => {
  try {
    if (isSignedIn) {
      await removeCartItem(code);
    } else {
      removeCartItemFromLocalStorage(code);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCartProductQuantity = async (isSignedIn, code, quantity) => {
  try {
    if (isSignedIn) {
      await setQuantity(code, { quantity });
    } else {
      setCartItemQuantityToLocalStorage(code, quantity);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addCartItem = async (isSignedIn, code, quantity = 1) => {
  try {
    if (isSignedIn) {
      await addCartItemAPI({ code, quantity });
    } else {
      addCartItemToLocalStorage(code, quantity);
    }
  } catch (error) {
    console.log(error);
  }
};

export const mergeCart = async () => {
  const codes = getCartFromLocalStorage();
  try {
    if (codes.length > 0) {
      await addMultipleCartItem(codes.map((x) => ({ code: x.code, quantity: x.quantity || 1 })));
      clearCartLocalStorage();
    }
  } catch (error) {
    console.log(error);
  }
};
