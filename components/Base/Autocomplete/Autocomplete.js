import PropTypes from 'prop-types';
import clsx from 'clsx';
import { XIcon } from '@/components/Vectors/XIcon';
import { IconButton } from '../IconButton';
import { SVG } from '../SVG';

const sizeSet = {
  primary: 'h-6-0',
  big: 'h-7-0'
};

const Autocomplete = (props) => {
  const { items, className, displayKey, placeholder, onSelect, onChange, value, disabled, size, label, withClearIcon } =
    props;
  const [expanded, setExpanded] = React.useState(false);

  const containerRef = React.useRef(null);

  const selectHandler = (obj) => {
    setExpanded(false);
    onSelect(obj);
  };
  const handleFocus = ({ target: { classList } }) => {
    if (!classList.contains('clear-selection')) {
      setExpanded(true);
    }
  };
  const handleBlur = () => {
    setExpanded(false);
  };

  const clearHandler = () => {
    onSelect(null);
  };

  const listElems = (
    <div className="absolute w-full">
      <div
        className={clsx(
          [expanded ? '-translate-y-0-1 pointer-events-auto' : '-translate-y-1-0 opacity-0 pointer-events-none'],
          'absolute z-1 w-full duration-200 transform wc-transform'
        )}
      >
        {items && items.length > 0 && (
          <ul
            className="overflow-auto bg-white border border-blue border-t-0 custom-scrollbar"
            style={{ maxHeight: '30rem' }}
          >
            {items.map((x) => (
              <li
                onClick={() => selectHandler(x)}
                tabIndex="0"
                role="menuitem"
                onKeyPress={(e) => e.key === '13' && selectHandler(x)}
                className="px-2-0 h-6-0 flex items-center cursor-default hover:bg-body-bg"
                key={x.id ? x.id : x[displayKey]}
              >
                <div>{x[displayKey]}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className={clsx(className, 'md:text-1-8 text-2-6 font-rm')}>
      {label && <div className="mb-2-0 text-grey-600">{label}</div>}
      <div
        ref={containerRef}
        tabIndex="0"
        role="button"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx({ 'pointer-events-none text-grey-500': disabled }, 'relative z-2')}
      >
        <div
          className={clsx(
            sizeSet[size],
            'border-solid border px-2-0 duration-200 border-grey-200 flex items-center relative hover:border-blue',
            {
              'border-blue text-blue': expanded
            }
          )}
        >
          <input
            type="text"
            className={clsx('bg-transparent flex-1 w-full h-full')}
            onChange={({ target: { value } }) => onChange(value)}
            value={value}
            placeholder={placeholder}
          />
          <div className="flex items-center">
            {withClearIcon && value.length > 0 && (
              <IconButton
                component="button"
                onClick={clearHandler}
                className="clear-selection opacity-50 hover:opacity-100 pointer-events-auto ml-1-0"
              >
                <SVG src={XIcon} className="w-2-0 md:w-1-0 text-secondary-main transform duration-200" />
              </IconButton>
            )}
          </div>
        </div>
        {items.length > 0 && !!value && listElems}
      </div>
    </div>
  );
};

Autocomplete.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string,
  displayKey: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  withClearIcon: PropTypes.bool,
  size: PropTypes.string,
  label: PropTypes.string
};

Autocomplete.defaultProps = {
  className: '',
  displayKey: '',
  placeholder: '',
  onSelect: () => {},
  onChange: () => {},
  value: '',
  disabled: false,
  withClearIcon: false,
  size: 'primary',
  label: ''
};

export default Autocomplete;
