import { getMany, post, del } from '@/api/dataProvider';
import { host } from '@/api/host';
import { config } from './config';

export const getAddresses = (options = { take: -1 }) => {
  return getMany(host.USERS, config.addresses, options);
};

export const addAddress = (payload) => {
  return post(host.USERS, config.addresses, payload);
};

export const deleteAddress = (id) => {
  return del(host.USERS, config.addresses, id);
};

export const selectMainAddress = (id) => {
  return post(host.USERS, `${config.addresses}/select/${id}`);
};
