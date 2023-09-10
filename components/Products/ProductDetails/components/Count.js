import clsx from 'clsx';
import PropTypes from 'prop-types';

const dashClassSet =
  'md:w-1-4 w-2-4 md:h-0-2 h-0-3 bg-grey group-hover:bg-black absolute top-50-percent left-50-percent transform -translate-y-50-percent -translate-x-50-percent duration-150';

const variantsSet = {
  primary: {
    container: 'md:h-7-0 h-12-0',
    box: 'md:w-9-2 w-24-2'
  },
  secondary: {
    container: 'md:h-7-0 h-10-0',
    box: 'md:w-9-2 w-10-0'
  }
};

const Count = ({ className, count, onChange, max, variant, disabled }) => {
  const increment = () => {
    if (count < max) onChange(count + 1);
  };

  const decrement = () => {
    if (count > 1) onChange(count - 1);
  };

  return (
    <div
      className={clsx(
        className,
        variantsSet[variant].container,
        { 'pointer-events-none': disabled },
        'flex bg-white w-mc border border-grey-200'
      )}
    >
      <button type="button" onClick={decrement} className="md:w-7-0 w-13-2 border-r border-grey-200 relative group">
        <div className={dashClassSet} />
      </button>
      <div
        className={clsx(
          variantsSet[variant].box,
          'flex items-center justify-center border-r border-grey-200 md:text-2-0 text-3-0'
        )}
      >
        {count}
      </div>
      <button type="button" onClick={increment} className="md:w-7-0 w-13-2 relative text-grey hover:text-black group">
        <div className={dashClassSet} />
        <div className={clsx(dashClassSet, 'rotate-90')} />
      </button>
    </div>
  );
};

Count.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  onChange: PropTypes.func,
  max: PropTypes.number,
  variant: PropTypes.string,
  disabled: PropTypes.bool
};

Count.defaultProps = {
  className: '',
  count: 1,
  onChange: () => {},
  max: 0,
  variant: 'primary',
  disabled: false
};

export default Count;
