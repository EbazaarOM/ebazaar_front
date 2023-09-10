import { getBlob, getMany, getOne } from '@/api/dataProvider';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

export const getOrders = (options) => {
  return getMany(host.ORDERS, config.orders, options);
};

export const getOrderById = (id) => {
  return getOne(host.ORDERS, config.order_get_by_id, id, true);
};

export const getOrderByCode = (code) => {
  return getOne(host.ORDERS, config.order_get_by_code, code, true);
};

export const getInvoice = (code) => {
  return getBlob(host.ORDERS, `${config.invoice}${buildQuery({ key: code })}`);
};
