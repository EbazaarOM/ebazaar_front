import buildQuery from '@/utils/buildQuery';

import { get, post, put } from '@/api/dataProvider';
import { host } from '@/api/host';
import { config } from './config';

export const register = (payload) => {
  return post(host.USERS, config.register, payload);
};

export const requestCode = (payload, type) => {
  return post(host.USERS, `${config.request_code}${buildQuery({ type })}`, payload);
};

export const confirmCode = (payload) => {
  return post(host.USERS, config.confirm_code, payload);
};

export const resetPassword = (payload) => {
  return post(host.USERS, config.reset_password, payload);
};

export const createPassword = (payload) => {
  return post(host.USERS, config.create_password, payload);
};

export const confirmUser = (payload) => {
  return post(host.USERS, config.confirm_client, payload);
};

export const login = (payload) => {
  return post(host.USERS, config.login, payload);
};

export const externalLogin = (payload) => {
  return post(host.USERS, config.external_login, payload);
};

export const refreshToken = (payload) => {
  return post(host.USERS, `${config.refresh_token}${buildQuery(payload)}`, payload);
};

export const getUserProfile = () => {
  return get(host.USERS, config.profile, true);
};

export const updateUserProfile = (payload) => {
  return put(host.USERS, config.profile_update, payload);
};

export const addEmail = (payload) => {
  return post(host.USERS, config.add_email, payload);
};

export const confirmEmail = (payload) => {
  return post(host.USERS, config.confirm_email, payload);
};

export const changePassword = (payload) => {
  return put(host.USERS, config.change_password, payload);
};
