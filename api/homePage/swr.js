import useSWR from 'swr';
import { fetcher } from '@/api/fetcher';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

const defaultSwrOptions = { fallbackData: {} };

export const useBanners = (swrOptions = defaultSwrOptions) => {
  const { data } = useSWR(`${host.CONTENT}/${config.banners}`, fetcher, swrOptions);

  return { data };
};

export const useFeatures = (options, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(`${host.CONTENT}/${config.features}${buildQuery(options)}`, fetcher, swrOptions);
  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};
