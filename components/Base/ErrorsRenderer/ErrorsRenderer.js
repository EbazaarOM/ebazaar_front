import PropTypes from 'prop-types';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';

const ErrorsRenderer = (props) => {
  const { errors, className } = props;

  const t = useTranslations(['common', 'errors']);

  const getErrText = (errKeys) => errKeys?.map((x) => t(`errors.${x?.toLowerCase()}`)).join(', ');

  return (
    errors &&
    errors.length > 0 && (
      <ul className={clsx(className, 'font-rm text-red')}>
        {errors.map((x) => (
          <li key={x.key}>{`${
            x.key === 'custom' ? getErrText(x.errKeys) : `${t(`common.${x.key}`)} - ${getErrText(x.errKeys)}`
          }`}</li>
        ))}
      </ul>
    )
  );
};

ErrorsRenderer.propTypes = {
  errors: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string
};

ErrorsRenderer.defaultProps = {
  className: ''
};

export default ErrorsRenderer;
