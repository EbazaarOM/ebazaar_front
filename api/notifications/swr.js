import useSWR from 'swr';
import { fetcher } from '@/api/fetcher';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

const defaultSwrOptions = { fallbackData: {} };

export const useNotifications = (options, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(
    `${host.USERS}/${config.notifications_by_user}${buildQuery(options)}`,
    fetcher,
    swrOptions
  );

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};
