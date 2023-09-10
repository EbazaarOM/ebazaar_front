import clsx from 'clsx';
import PropTypes from 'prop-types';

const roundedTypes = ['top', 'bottom', 'left', 'right', 'full'];

const CircleIcon = ({ className, children, rounded, ...rest }) => {
  return (
    <div
      {...rest}
      className={clsx(className, 'flex items-center justify-center', {
        'rounded-full': rounded === 'full',
        'rounded-t-full': rounded === 'top',
        'rounded-b-full': rounded === 'bottom',
        'rounded-l-full': rounded === 'left',
        'rounded-r-full': rounded === 'right'
      })}
    >
      {children}
    </div>
  );
};

CircleIcon.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  rounded: PropTypes.oneOf(roundedTypes)
};

CircleIcon.defaultProps = {
  className: '',
  children: null,
  rounded: 'full'
};

export default CircleIcon;
