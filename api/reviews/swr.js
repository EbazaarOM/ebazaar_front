import useSWR from 'swr';
import { fetcher } from '@/api/fetcher';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

const defaultSwrOptions = { fallbackData: {} };

export const useReviews = (options, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(`${host.PRODUCTS}/${config.reviews}${buildQuery(options)}`, fetcher, swrOptions);

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};
