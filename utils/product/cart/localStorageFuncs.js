import { CART_KEY } from '@/utils/constants/localStorageKeys';

const getCart = () => JSON.parse(localStorage.getItem(CART_KEY)) || [];
const setCart = (items) => localStorage.setItem(CART_KEY, JSON.stringify(items));

export const getCartFromLocalStorage = () => {
  return getCart();
};

export const removeCartItemFromLocalStorage = (code) => {
  const items = getCart();
  setCart(items.filter((x) => x.code !== code));
};

export const addCartItemToLocalStorage = (code, quantity) => {
  const items = getCart();
  const found = items.find((x) => x.code === code);
  if (found) {
    found.quantity += quantity;
    setCart(items);
  } else {
    setCart([{ code, quantity }, ...items]);
  }
};

export const setCartItemQuantityToLocalStorage = (code, quantity) => {
  const items = getCart();
  const found = items.find((x) => x.code === code);
  if (found) {
    found.quantity = quantity;
    setCart(items);
  }
};

export const clearCartLocalStorage = () => {
  setCart([]);
};
