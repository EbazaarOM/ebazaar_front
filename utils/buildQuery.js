import queryString from 'query-string';

const buildQuery = (options, startWithSlash = true) => {
  const notEmptyObjects = Object.entries(options).reduce((acc, val) => {
    const [objKey, objValue] = val;
    return objValue ? { [objKey]: objValue, ...acc } : acc;
  }, {});

  const optionsStringify = queryString.stringify(notEmptyObjects);
  // eslint-disable-next-line no-nested-ternary
  return optionsStringify ? (startWithSlash ? `/?${optionsStringify}` : `?${optionsStringify}`) : '';
};

export default buildQuery;
