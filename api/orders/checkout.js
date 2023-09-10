import { post } from '@/api/dataProvider';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

export const checkoutSingle = (payload = {}) => {
  return post(host.ORDERS, `${config.checkout_single}${buildQuery(payload)}`);
};

export const checkoutCart = (payload = {}) => {
  return post(host.ORDERS, `${config.checkout_cart}${buildQuery(payload)}`);
};
