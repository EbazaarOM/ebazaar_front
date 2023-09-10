import { SVG } from '@/components/Base/SVG';
import { DeleteIcon } from '@/components/Vectors/DeleteIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  const { className, title, checked, onChange, onDelete } = props;

  return (
    <div className={clsx(className, 'group relative')}>
      <div
        className="pl-3-0 pr-4-0 py-2-2 flex items-start border border-grey-200 hover:border-yellow cursor-pointer duration-150"
        onClick={onChange}
        aria-hidden
      >
        <div
          className={clsx(
            [checked ? 'border-yellow' : 'border-grey-200'],
            'rounded-full md:w-2-5 md:h-2-5 w-3-0 h-3-0 mr-3-0 border relative bg-yellow md:mt-0 mt-0-5'
          )}
        >
          <div
            className={clsx({ 'scale-50': checked }, 'absolute inset-0 bg-white rounded-full transform duration-200')}
          />
        </div>
        <div className="font-rm md:text-1-6 text-2-8 flex-1">{title}</div>
      </div>
      {onDelete && (
        <SVG
          src={DeleteIcon}
          className="md:w-2-0 w-2-8 opacity-50 hover:opacity-100 duration-150 absolute right-2-0 top-50-percent transform -translate-y-50-percent cursor-pointer"
          onClick={onDelete}
        />
      )}
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onDelete: PropTypes.func
};

Checkbox.defaultProps = {
  className: '',
  title: '',
  checked: false,
  onChange: () => {},
  onDelete: null
};

export default Checkbox;
