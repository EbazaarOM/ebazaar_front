import { del, getMany, post } from '@/api/dataProvider';
import { host } from '@/api/host';
import { config } from './config';

export const getWishlistItems = (options) => {
  return getMany(host.ORDERS, config.wishlist, options);
};

export const getWishlistCodes = (options) => {
  return getMany(host.ORDERS, config.wishlist_codes, options);
};

export const addWishlistItem = (payload) => {
  return post(host.ORDERS, config.wishlist_add, payload);
};

export const addMultipleWishlistItem = (payload) => {
  return post(host.ORDERS, config.wishlist_add_multiple, payload);
};

export const removeWishlistItem = (code) => {
  return del(host.ORDERS, config.wishlist_remove, code);
};
