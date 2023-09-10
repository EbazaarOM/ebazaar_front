import useSWR from 'swr';
import { fetcher } from '@/api/fetcher';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

const defaultSwrOptions = { fallbackData: {} };

const pathBuilder = (shouldFetch, host, path, options) => {
  return shouldFetch ? `${host}/${path}${buildQuery(options)}` : null;
};

export const useRegions = (options, shouldFetch = true, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(pathBuilder(shouldFetch, host.USERS, config.regions, options), fetcher, swrOptions);

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};

export const useMunicipalities = (options, shouldFetch = true, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(
    pathBuilder(shouldFetch, host.USERS, config.municipalities, options),
    fetcher,
    swrOptions
  );

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};

export const useVillages = (options, shouldFetch = true, swrOptions = defaultSwrOptions) => {
  const { data: result } = useSWR(pathBuilder(shouldFetch, host.USERS, config.villages, options), fetcher, swrOptions);

  const { data: items = [], meta: { total = 0 } = {} } = result;

  return { items, total };
};

export const useContact = (swrOptions = defaultSwrOptions) => {
  const { data } = useSWR(`${host.CONTENT}/${config.contact}`, fetcher, swrOptions);

  return { data };
};

export const useSocialLinks = (swrOptions = defaultSwrOptions) => {
  const { data } = useSWR(`${host.CONTENT}/${config.sociallinks}`, fetcher, swrOptions);

  return { data };
};

export const useHeaderPhone = (swrOptions = defaultSwrOptions) => {
  const { data } = useSWR(`${host.CONTENT}/${config.headerphone}`, fetcher, swrOptions);

  return { data: data || {} };
};
