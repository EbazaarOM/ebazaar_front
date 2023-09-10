import { StarIcon } from '@/components/Vectors/StarIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { SVG } from '../SVG';

const Rating = ({ className, value }) => {
  return (
    <div className={clsx(className, 'flex items-center')}>
      <SVG src={StarIcon} className="md:w-2-2 w-3-0 text-yellow md:mr-0-7 mr-1-0" />
      <span className="md:text-2-0 text-3-0 font-md">{value}</span>
    </div>
  );
};

Rating.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Rating.defaultProps = {
  className: '',
  value: ''
};

export default Rating;
