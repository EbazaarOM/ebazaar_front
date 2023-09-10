import { getMany } from '@/api/dataProvider';
import { host } from '@/api/host';
import { config } from './config';

export const getSlider = (options) => {
  return getMany(host.CONTENT, config.slider, options);
};
