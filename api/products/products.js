import { getMany, get, post } from '@/api/dataProvider';
import { host } from '@/api/host';
import { config } from './config';

export const getProducts = (options) => {
  return getMany(host.PRODUCTS, config.products, options);
};

export const getSingleProduct = (code) => {
  return get(host.PRODUCTS, `${config.products_by_code}/${code}`, true);
};

export const getWishlistProductsByCodes = (codes = [], options) => {
  return post(host.PRODUCTS, config.wishlist_products, { codes, ...options });
};

export const getCartProductsByCodes = (products = [], options) => {
  return post(host.PRODUCTS, config.cart_products, { products, ...options });
};
