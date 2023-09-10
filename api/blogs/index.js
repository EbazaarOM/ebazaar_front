import { getMany, getOneTranslated } from '@/api/dataProvider';
import { host } from '@/api/host';
import { config } from './config';

export const getBlogs = (options) => {
  return getMany(host.CONTENT, config.blogs, options);
};

export const getSingleBlog = (slug) => {
  return getOneTranslated(host.CONTENT, config.blogs, slug);
};
