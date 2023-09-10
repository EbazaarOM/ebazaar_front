import useSWR from 'swr';
import { fetcher } from '@/api/fetcher';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

const defaultSwrOptions = { fallbackData: {} };

export const useOrders = (options, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(`${host.ORDERS}/${config.orders}${buildQuery(options)}`, fetcher, swrOptions);

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};

export const useMyFarmers = (options, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(`${host.ORDERS}/${config.farmers}${buildQuery(options)}`, fetcher, swrOptions);

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};

export const useRelatedProducts = (options, shouldFetch = true, swrOptions = defaultSwrOptions) => {
  const { data: result, mutate } = useSWR(
    shouldFetch ? `${host.ORDERS}/${config.cart_related}${buildQuery(options)}` : null,
    fetcher,
    swrOptions
  );

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total, mutate };
};
