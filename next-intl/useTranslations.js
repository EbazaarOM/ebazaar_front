import { useTranslations as translatorProvider } from 'use-intl';

export const useTranslations = (namespaces = ['common']) => {
  const arrT = namespaces.map((ns) => ({ ns, t: translatorProvider(ns) }));

  const t = (val, ...args) => {
    if (!val) return '';
    const index = val.indexOf('.');
    if (index > -1) {
      const ns = val.substr(0, index);
      const path = val.substr(index + 1);
      const found = arrT.find((x) => x.ns === ns);
      if (found) {
        return found.t(path, ...args);
      }
    }
    return arrT[0].t(val, ...args);
  };

  return t;
};
