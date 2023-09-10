import { Checkmark } from '@/components/Vectors/Checkmark';
import { keyEventHandler } from '@/utils/keyEventHandler';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { SVG } from '../SVG';

const sizeSet = {
  sm: { box: 'md:w-1-8 md:h-1-8 w-3-3 h-3-3', icon: 'md:w-1-0 w-1-8' },
  md: { box: 'md:w-2-2 md:h-2-2 w-3-3 h-3-3', icon: 'md:w-1-2 w-1-8' }
};

const Checkbox = ({ value, className, onClick, size }) => {
  return (
    <div
      className={clsx(className, sizeSet[size].box, 'flex items-center justify-center border border-grey-200', {
        'border-yellow bg-yellow': value
      })}
      role="button"
      onClick={onClick}
      tabIndex="0"
      onKeyPress={keyEventHandler(onClick)}
    >
      {value && <SVG src={Checkmark} className={clsx(sizeSet[size].icon, 'text-white')} />}
    </div>
  );
};

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(sizeSet))
};

Checkbox.defaultProps = {
  className: '',
  onClick: () => {},
  size: 'md'
};

export default Checkbox;
