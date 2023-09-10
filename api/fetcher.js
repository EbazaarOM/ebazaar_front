import { axiosRemote as axios } from '@/utils/axios';

export const fetcher = (url) => axios.get(url).then((res) => res.data);
