import clsx from 'clsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { keyEventHandler } from '@/utils/keyEventHandler';

const roundedTypes = ['top', 'bottom', 'left', 'right', 'full'];

const IconButton = ({ className, children, onClick, rounded, ...rest }) => {
  return (
    <motion.div
      {...rest}
      role="button"
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      tabIndex="0"
      className={clsx(className, 'flex items-center justify-center wc-transform tpnt', {
        'rounded-full': rounded === 'full',
        'rounded-t-full': rounded === 'top',
        'rounded-b-full': rounded === 'bottom',
        'rounded-l-full': rounded === 'left',
        'rounded-r-full': rounded === 'right'
      })}
      onKeyPress={keyEventHandler(onClick)}
    >
      {children}
    </motion.div>
  );
};

IconButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  rounded: PropTypes.oneOf(roundedTypes)
};

IconButton.defaultProps = {
  className: '',
  children: null,
  onClick: () => {},
  rounded: 'full'
};

export default IconButton;
