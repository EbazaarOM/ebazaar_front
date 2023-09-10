import { get } from '@/api/dataProvider';
import { host } from '@/api/host';
import { config } from './config';

export const getOpenGraph = () => {
  return get(host.CONTENT, config.opengraph);
};

export const getContact = () => {
  return get(host.CONTENT, config.contact);
};

export const getAnalytics = () => {
  return get(host.CONTENT, config.analytics);
};
