import useSWR from 'swr';
import { fetcher } from '@/api/fetcher';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

const defaultSwrOptions = { fallbackData: {} };

export const useFarmers = (options, shouldFetch = true) => {
  const { data: result } = useSWR(
    shouldFetch ? `${host.PRODUCTS}/${config.farmer}${buildQuery(options)}` : null,
    fetcher,
    defaultSwrOptions
  );

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};

export const useTopRatedFarmers = (options) => {
  const { data: result } = useSWR(
    `${host.PRODUCTS}/${config.top_rated_farmers}${buildQuery(options)}`,
    fetcher,
    defaultSwrOptions
  );

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};
