import PropTypes from 'prop-types';
import clsx from 'clsx';
import { XIcon } from '@/components/Vectors/XIcon';
import { EyeIcon } from '@/components/Vectors/EyeIcon';
import { EyeSplashedIcon } from '@/components/Vectors/EyeSplashedIcon';
import { IconButton } from '../IconButton';
import { SVG } from '../SVG';

const variantsSet = {
  md: 'md:h-7-0 h-8-0',
  sm: 'md:h-6-0 h-8-0'
};

const TextField = (props) => {
  const {
    onChange,
    action,
    className,
    placeholder,
    type,
    fullWidth,
    disabled,
    value,
    withClearIcon,
    label,
    errored,
    errorMessage,
    variant,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = React.useState(false);

  const clearHandler = () => {
    onChange('');
  };

  const [inputType, setInputType] = React.useState(type);

  React.useEffect(() => {
    setInputType(type);
  }, [type]);

  return (
    <div className={clsx({ 'w-full': fullWidth }, 'md:text-1-8 text-2-8 font-rm', className)}>
      {label && <div className="text-grey-600 mb-2-5 md:mb-2-0">{label}</div>}

      <div
        className={clsx(
          'border-solid border px-2-0 duration-200 border-grey-200 flex items-center relative',
          { 'border-blue text-blue': isFocused, 'text-grey-600 pointer-events-none': disabled },
          errored || errorMessage ? 'border-red text-red' : 'hover:border-blue hover:text-blue',
          variantsSet[variant]
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {errorMessage && (
          <div className="md:h-2-0 h-2-5 md:text-1-4 text-1-8 text-red absolute w-full top-0 left-0 transform -translate-y-100-percent">
            *{errorMessage}
          </div>
        )}
        <input
          type={inputType}
          className={clsx('bg-transparent flex-1 w-full h-full placeholder-grey-300')}
          onChange={({ target: { value } }) => onChange(value)}
          value={value}
          placeholder={placeholder}
          {...rest}
          disabled={disabled}
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
          {action && <div className="ml-1-0 flex">{action}</div>}
          {type === 'password' && (
            <SVG
              onClick={() => setInputType(inputType === 'password' ? 'text' : 'password')}
              src={inputType === 'password' ? EyeIcon : EyeSplashedIcon}
              className="w-3-0 md:w-2-0 opacity-50 hover:opacity-100 ml-1-0 cursor-pointer"
            />
          )}
        </div>
      </div>
      <style jsx>{`
        input {
          text-overflow: ellipsis;
        }

        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

TextField.propTypes = {
  onChange: PropTypes.func,
  action: PropTypes.node,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  withClearIcon: PropTypes.bool,
  errored: PropTypes.bool,
  errorMessage: PropTypes.string,
  variant: PropTypes.string
};

TextField.defaultProps = {
  onChange: () => {},
  action: null,
  className: '',
  placeholder: '',
  label: '',
  type: 'text',
  fullWidth: false,
  value: '',
  disabled: false,
  withClearIcon: false,
  errored: false,
  errorMessage: '',
  variant: 'md'
};

export default TextField;
