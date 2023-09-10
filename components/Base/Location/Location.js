import { LocationPinIcon } from '@/components/Vectors/LocationPinIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { SVG } from '../SVG';

const Location = ({ className, address }) => {
  return (
    <div className={clsx(className, 'flex items-start')}>
      <SVG src={LocationPinIcon} className="md:w-2-0 w-3-1 md:mr-1-4 mr-2-2 h-auto mt-0-5" />
      <div className="md:text-2-0 text-2-6 font-lt flex-1">{address}</div>
    </div>
  );
};

Location.propTypes = {
  className: PropTypes.string,
  address: PropTypes.string
};

Location.defaultProps = {
  className: '',
  address: ''
};

export default Location;
