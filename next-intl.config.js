import { IntlErrorCode } from 'next-intl';

const onError = (error) => {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    console.error(error.originalMessage);
  } else {
    console.error(error);
  }
};

const getMessageFallback = ({ namespace, key, error }) => {
  const path = [namespace, key].filter((part) => part != null).join('.');

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return `404(${path})`;
  }
  return `Error at message: ${path}`;
};

const config = { onError, getMessageFallback };

export default config;
