import { keyEventHandler } from '@/utils/keyEventHandler';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const sizeSet = {
  xxl: 'md:h-7-0 h-12-0 md:text-2-0 text-4-0',
  xl: 'md:h-7-0 h-11-0 md:text-2-0 text-3-0',
  md: 'md:h-6-0 h-9-0 md:text-1-8 text-2-8',
  sm: 'md:h-6-0 h-8-0 md:text-1-8 text-2-6',
  custom: ''
};

const fontVariant = {
  lt: 'font-lt',
  md: 'font-md',
  rm: 'font-rm'
};

const Button = ({ className, px, children, onClick, size, disabled, type, font }) => {
  const paddingX = px || 'px-2-5';

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      role="button"
      onClick={onClick}
      tabIndex="0"
      className={clsx(
        className,
        paddingX,
        sizeSet[size],
        fontVariant[font],
        'relative md:rounded-40-0 rounded-150-0 flex items-center justify-center wc-transform tpnt select-none',
        { 'pointer-events-none opacity-60': disabled }
      )}
      onKeyPress={keyEventHandler(onClick)}
      type={type}
    >
      {children}
    </motion.button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  px: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(sizeSet)),
  disabled: PropTypes.bool,
  type: PropTypes.string,
  font: PropTypes.oneOf(Object.keys(fontVariant))
};

Button.defaultProps = {
  className: '',
  children: null,
  onClick: () => {},
  px: '',
  size: 'md',
  disabled: false,
  type: 'button',
  font: 'rm'
};

export default Button;
