import { del, get, post } from '@/api/dataProvider';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

export const getCartItems = (options) => {
  return get(host.ORDERS, `${config.cart}${buildQuery(options)}`, true);
};

export const addCartItem = (payload) => {
  return post(host.ORDERS, config.cart_add, payload);
};

export const addMultipleCartItem = (payload) => {
  return post(host.ORDERS, config.cart_add_multiple, payload);
};

export const removeCartItem = (id) => {
  return del(host.ORDERS, config.cart_remove, id);
};

export const setQuantity = (id, payload) => {
  return post(host.ORDERS, `${config.cart_set_quantity}/${id}${buildQuery(payload)}`);
};
