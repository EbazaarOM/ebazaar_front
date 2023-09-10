import { get, getOne } from '@/api/dataProvider';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

export const getCategoriesTree = (options = {}) => {
  return get(host.PRODUCTS, `${config.categories_tree}${buildQuery(options)}`);
};

export const getSingleCategory = (categoryId) => {
  return getOne(host.PRODUCTS, config.categories, categoryId);
};

export const getSingleSubCategory = (subCategoryId) => {
  return getOne(host.PRODUCTS, config.subcategories, subCategoryId);
};
