import useSWR from 'swr';
import { fetcher } from '@/api/fetcher';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

const defaultSwrOptions = { fallbackData: {} };

export const useNextBlogs = (id) => {
  const { data } = useSWR(`${host.CONTENT}/${config.blogs}/${id}/next`, fetcher, { fallbackData: [] });

  return { data };
};

export const useBlogs = (options, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(`${host.CONTENT}/${config.blogs}${buildQuery(options)}`, fetcher, swrOptions);

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};
