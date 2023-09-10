/* eslint-disable import/no-dynamic-require */

export const getLocaleNamespaces = (locale, ns) => {
  if (Array.isArray(ns)) {
    return ns.reduce((acc, curNs) => ({ ...acc, [curNs]: { ...require(`@/locales/${locale}/${curNs}.json`) } }), {});
  }
  return { [ns]: require(`@/locales/${locale}/${ns}.json`) };
};
