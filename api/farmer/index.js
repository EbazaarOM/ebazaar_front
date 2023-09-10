import { getMany, getOne, post } from '@/api/dataProvider';
import { host } from '@/api/host';
import { config } from './config';

export const sendFarmerLead = (payload) => {
  return post(host.USERS, config.farmer_lead, payload);
};

export const getSingleFarmer = (id) => {
  return getOne(host.USERS, config.farmer, id, true);
};

export const getFarmers = (options) => {
  return getMany(host.PRODUCTS, config.farmer, options);
};

export const getFarmerReviews = (farmerId, options = {}) => {
  return getMany(host.PRODUCTS, `${config.farmer_reviews}/${farmerId}`, options);
};
