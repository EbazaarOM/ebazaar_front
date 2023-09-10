import { post } from '@/api/dataProvider';
import { host } from '@/api/host';
import { config } from './config';

export const createReview = (options) => {
  return post(host.PRODUCTS, config.reviews, options);
};

export const createComment = (options) => {
  return post(host.PRODUCTS, config.comments, options);
};
