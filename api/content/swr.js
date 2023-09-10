import useSWR from 'swr';
import { fetcher } from '@/api/fetcher';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

const defaultSwrOptions = { fallbackData: {} };

export const useNavigationPages = (swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(`${host.CONTENT}/${config.pages}${buildQuery({ take: -1 })}`, fetcher, swrOptions);

  const { data = [] } = result;
  return { data };
};
