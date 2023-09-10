/* eslint-disable no-nested-ternary */
import { ErrorComponent } from '@/components/Base/ErrorComponent';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const message = {
  ka: {
    pageNotFound: 'სამწუხაროდ, გვერდი არ მოიძებნა!',
    error: 'დაფიქსირდა შეცდომა!'
  },
  en: {
    pageNotFound: 'Page not found!',
    error: 'Error occured!'
  }
};

const Error = ({ statusCode }) => {
  const { locale } = useRouter();
  return (
    <ErrorComponent
      statusCode={statusCode}
      message={statusCode === 404 ? message[locale].pageNotFound : message[locale].error}
    />
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = err ? err.status : res ? res.statusCode : 500;
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number.isRequired
};

export default Error;
