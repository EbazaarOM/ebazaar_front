import useSWR from 'swr';
import { fetcher } from '@/api/fetcher';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

const defaultSwrOptions = { fallbackData: {} };

export const useCategories = (options, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(`${host.PRODUCTS}/${config.categories}${buildQuery(options)}`, fetcher, swrOptions);

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};

export const useCategoriesTree = (options = {}) => {
  const { data } = useSWR(`${host.PRODUCTS}/${config.categories_tree}${buildQuery(options)}`, fetcher, {
    fallbackData: []
  });

  return { data };
};

export const useSpecifications = (subCategoryId) => {
  const { data } = useSWR(
    subCategoryId ? `${host.PRODUCTS}/${config.specification_categories_tree}/${subCategoryId}` : null,
    fetcher,
    {
      fallbackData: []
    }
  );

  return { data };
};

export const useStickers = (options, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(`${host.PRODUCTS}/${config.stickers}${buildQuery(options)}`, fetcher, swrOptions);

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};

export const useProducts = (options, shouldFetch = true) => {
  const { data: result, isValidating } = useSWR(
    shouldFetch ? `${host.PRODUCTS}/${config.products}${buildQuery({ ...options, full: false })}` : null,
    fetcher,
    defaultSwrOptions
  );

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total, isValidating };
};

export const useProductByCode = (code, swrOptions = defaultSwrOptions) => {
  const { data, isValidating } = useSWR(
    code ? `${host.PRODUCTS}/${config.products_by_code}/${code}` : null,
    fetcher,
    swrOptions
  );

  return { data, isValidating };
};

export const useSimilarProducts = (productId, options, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(
    `${host.PRODUCTS}/${config.products_similar}/${productId}${buildQuery(options)}`,
    fetcher,
    swrOptions
  );

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};
