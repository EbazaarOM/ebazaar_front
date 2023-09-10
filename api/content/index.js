import { get, getMany, getOneTranslated } from '@/api/dataProvider';
import { host } from '@/api/host';
import buildQuery from '@/utils/buildQuery';
import { config } from './config';

export const getAboutContent = () => {
  return get(host.CONTENT, config.about);
};

export const getCareerContent = () => {
  return get(host.CONTENT, config.careet_content);
};

export const getTeamMembers = (options) => {
  return getMany(host.CONTENT, config.teammembers, options);
};

export const getVacancies = (options) => {
  return getMany(host.CONTENT, config.vacancies, options);
};

export const getFaqContent = () => {
  return get(host.CONTENT, config.faqcontent);
};

export const getFaq = (options) => {
  return getMany(host.CONTENT, config.faq, options);
};

export const getTermsAndConditions = () => {
  return get(host.CONTENT, config.terms_and_conditions);
};

export const getSinglePage = (slug) => {
  return getOneTranslated(host.CONTENT, config.pages, slug);
};

export const getPageOpenGraphs = (localPath) => {
  return get(host.CONTENT, `${config.opengraph}${buildQuery({ localPath })}`);
};
