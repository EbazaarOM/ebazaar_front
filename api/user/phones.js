import { getMany, post, del } from '@/api/dataProvider';
import { host } from '@/api/host';
import { config } from './config';

export const getPhones = (options = { take: -1 }) => {
  return getMany(host.USERS, config.phones, options);
};

export const addPhone = (payload) => {
  return post(host.USERS, config.add_phone, payload);
};

export const confirmPhone = (payload) => {
  return post(host.USERS, config.confirm_phone, payload);
};

export const deletePhone = (id) => {
  return del(host.USERS, config.phones, id);
};

export const selectMainPhone = (id) => {
  return post(host.USERS, `${config.phones}/select/${id}`);
};
