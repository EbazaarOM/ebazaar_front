import clsx from 'clsx';
import PropTypes from 'prop-types';

const SaleBadge = ({ percent, className }) => {
  return (
    <div
      className={clsx(
        className,
        'w-8-5 h-9-6 rounded-b-60-0 bg-red text-white font-bd text-2-4 flex items-center justify-center'
      )}
    >
      {`- ${percent}%`}
    </div>
  );
};

SaleBadge.propTypes = {
  percent: PropTypes.number.isRequired,
  className: PropTypes.string
};

SaleBadge.defaultProps = {
  className: ''
};

export default SaleBadge;
