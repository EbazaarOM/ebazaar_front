import { keyEventHandler } from '@/utils/keyEventHandler';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const classSet = 'absolute left-0 w-full h-0-2 bg-black duration-300 wc-transform';

const Burger = ({ className, isOpened, onClick }) => {
  return (
    <div
      aria-label="Burger Menu"
      role="button"
      onClick={onClick}
      tabIndex="0"
      className={clsx(className, 'relative h-1-6 w-2-5 burger')}
      onKeyPress={keyEventHandler(onClick)}
    >
      <span className={clsx(classSet, { 'opacity-0 scale-x-0 translate-y-0-4': isOpened }, 'transform top-0')} />
      <span className={clsx(classSet, { 'rotate-45': isOpened }, 'top-50-percent transform')} />
      <span className={clsx(classSet, { '-rotate-45': isOpened }, 'top-50-percent transform')} />
      <span
        className={clsx(classSet, { 'opacity-0 scale-x-0 -translate-y-0-4': isOpened }, 'transform top-100-percent')}
      />
    </div>
  );
};

Burger.propTypes = {
  className: PropTypes.string,
  isOpened: PropTypes.bool,
  onClick: PropTypes.func
};

Burger.defaultProps = {
  className: '',
  isOpened: false,
  onClick: () => {}
};

export default Burger;
