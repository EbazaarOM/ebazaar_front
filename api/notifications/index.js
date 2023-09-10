import { get, post } from '@/api/dataProvider';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

export const getNotificationsByUser = (options) => {
  return get(host.USERS, `${config.notifications_by_user}${buildQuery(options)}`);
};

export const getNotification = (id) => {
  return get(host.USERS, `${config.notifications}/${id}`);
};

export const setNotificationSeen = (id) => {
  return post(host.USERS, `${config.notifications_seen}/${id}`);
};
