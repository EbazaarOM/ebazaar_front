import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { XIcon } from '@/components/Vectors/XIcon';
import { SVG } from '../SVG';
import { IconButton } from '../IconButton';

const sizeSet = {
  primary: 'md:h-6-0 h-8-0',
  big: 'md:h-7-0 h-8-0'
};

const DropDown = (props) => {
  const {
    items,
    className,
    displayKey,
    placeholder,
    onSelect,
    value,
    disabled,
    size,
    label,
    withClearIcon,
    errored,
    withInput,
    errorMessage
  } = props;
  const [expanded, setExpanded] = React.useState(false);

  const isError = errored || errorMessage;

  const [searchValue, setSearchValue] = React.useState('');

  const selectHandler = (obj) => {
    setExpanded(false);
    setSearchValue('');
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
    if (searchValue) setSearchValue('');
    else onSelect(null);
  };

  const visibleItems = React.useMemo(
    () => (searchValue ? items.filter((x) => x[displayKey].indexOf(searchValue) > -1) : items),
    [searchValue, items]
  );

  const listElems = (
    <div className="absolute w-full z-10">
      <div
        className={clsx(
          [expanded ? '-translate-y-0-1 pointer-events-auto' : '-translate-y-1-0 opacity-0 pointer-events-none'],
          'absolute z-1 w-full duration-200 transform wc-transform'
        )}
      >
        {visibleItems && visibleItems.length > 0 && (
          <ul
            className="overflow-auto bg-white border border-blue border-t-0 custom-scrollbar"
            style={{ maxHeight: '30rem' }}
          >
            {visibleItems.map((x) => (
              <li
                onClick={() => selectHandler(x)}
                tabIndex="0"
                role="menuitem"
                onKeyPress={(e) => e.key === '13' && selectHandler(x)}
                className="li md:px-2-0 px-3-0 py-1-0 flex items-center cursor-default hover:bg-body-bg"
                key={x.id ? x.id : x[displayKey]}
              >
                <div>{x[displayKey]}</div>
              </li>
            ))}
            <style jsx>{`
              .li {
                min-height: 6rem;
              }
              @media (max-width: 768px) {
                .li {
                  min-height: 7rem;
                }
              }
            `}</style>
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className={clsx(className, 'md:text-1-8 text-2-6 font-rm')}>
      {label && <div className="text-grey-600 md:mb-2-0 mb-2-0">{label}</div>}
      <div
        tabIndex="0"
        role="button"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx({ 'pointer-events-none text-grey-600': disabled, 'pointer-events-none': expanded }, 'relative')}
      >
        {errorMessage && (
          <div className="md:h-2-0 h-2-5 md:text-1-4 text-1-8 text-red absolute w-full top-0 left-0 transform -translate-y-100-percent">
            *{errorMessage}
          </div>
        )}
        <div
          className={clsx(
            sizeSet[size],
            { 'border-red text-red': isError && !expanded },
            { 'border-blue text-blue': expanded },
            { 'border-grey-200 hover:border-blue': !expanded && !isError },
            'border duration-200 rounded-base flex items-center cursor-pointer relative md:px-2-0 px-3-0 wc-transform'
          )}
        >
          <div className="relative flex-1">
            {withInput && (
              <input
                type="text"
                className={clsx('bg-transparent flex-1 w-full h-full', { 'pointer-events-auto': !disabled })}
                onChange={({ target: { value } }) => setSearchValue(value)}
                value={searchValue}
                disabled={disabled}
              />
            )}
            {!searchValue && (
              <div
                className={clsx(
                  { 'text-grey-300': expanded || !value },
                  'absolute inset-0 flex items-center pointer-events-none'
                )}
              >
                <div className="line-clamp-2">{value || placeholder}</div>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {withClearIcon && (searchValue.length > 0 || value.length > 0) && (
              <IconButton
                component="button"
                onClick={clearHandler}
                className="clear-selection opacity-50 hover:opacity-100 pointer-events-auto ml-1-0 mr-1-0"
              >
                <SVG src={XIcon} className="w-2-0 md:w-1-1 duration-200" />
              </IconButton>
            )}
            <SVG
              src={ArrowDownIcon}
              className={clsx({ 'rotate-180': expanded }, 'md:w-1-5 w-2-2 ml-1-0 text-grey-500 transform duration-200')}
            />
          </div>
        </div>
        {listElems}
      </div>
    </div>
  );
};

DropDown.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
  errored: PropTypes.bool,
  className: PropTypes.string,
  displayKey: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  label: PropTypes.string,
  withClearIcon: PropTypes.bool,
  withInput: PropTypes.bool,
  errorMessage: PropTypes.string
};

DropDown.defaultProps = {
  className: '',
  errored: false,
  displayKey: '',
  placeholder: '',
  onSelect: () => {},
  value: '',
  disabled: false,
  size: 'primary',
  label: '',
  withClearIcon: false,
  withInput: true,
  errorMessage: ''
};

export default DropDown;
