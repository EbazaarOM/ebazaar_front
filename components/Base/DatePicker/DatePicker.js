import PropTypes from 'prop-types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { XIcon } from '@/components/Vectors/XIcon';
import { CalendarIcon } from '@/components/Vectors/CalendarIcon';
import { useRouter } from 'next/router';
import { Calendar } from './components';
import { SVG } from '../SVG';
import { IconButton } from '../IconButton';

const sizeSet = {
  primary: 'md:h-6-0 h-8-0',
  big: 'md:h-7-0 h-8-0'
};

const DatePicker = (props) => {
  const {
    className,
    date,
    dateRange,
    format,
    onSelect,
    size,
    withClearIcon,
    placeholder,
    disabled,
    label,
    errored,
    errorMessage
  } = props;

  const isError = errored || errorMessage;

  const { locale } = useRouter();

  const [opened, setOpened] = React.useState(false);

  const handleDateSelect = (date) => {
    if (dateRange) {
      const [from, to] = date;
      onSelect({ from: from.toISOString(), to: to.toISOString() });
    } else {
      onSelect(date.toISOString());
    }
    setOpened(false);
  };

  const displayText = dateRange
    ? `${dayjs(dateRange.from).format(format)} - ${dayjs(dateRange.to).format(format)}`
    : dayjs(date).format(format);

  // eslint-disable-next-line no-nested-ternary
  const selectedDate = dateRange
    ? dateRange.from && dateRange.to
      ? [new Date(dateRange.from), new Date(dateRange.to)]
      : null
    : date
    ? new Date(date)
    : null;

  const handleFocus = ({ target: { classList } }) => {
    if (!classList.contains('clear-selection')) {
      setOpened(true);
    }
  };
  const handleBlur = () => {
    setOpened(false);
  };

  const dateRangeClearHandler = () => {
    if (dateRange) {
      onSelect({});
    } else {
      onSelect('');
    }
  };

  const placeholderIsVisible = !(date || (dateRange && dateRange.from && dateRange.to));

  const elem = (
    <div className="absolute md:w-33-6 w-full">
      <div
        tabIndex="0"
        role="grid"
        className={clsx(
          [
            opened
              ? 'md:translate-y-1-0 translate-y-3-0 pointer-events-auto cursor-default'
              : 'opacity-0 pointer-events-none'
          ],
          'absolute w-full z-2 top-100-percent transform duration-200 wc-transform'
        )}
      >
        <div className="border border-grey-200 bg-white">
          <Calendar selectRange={!!dateRange} value={selectedDate} onChange={handleDateSelect} locale={locale} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={clsx(className, 'md:text-1-8 text-2-6 font-rm')}>
      {label && <div className="text-grey-600 md:mb-2-0 mb-2-5">{label}</div>}
      <div
        role="button"
        tabIndex="0"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx(
          className,
          {
            'pointer-events-none': opened,
            'text-grey-600 pointer-events-none': disabled
          },
          'relative select-none'
        )}
      >
        {errorMessage && (
          <div className="md:h-2-0 h-2-5 md:text-1-4 text-1-8 text-red absolute w-full top-0 left-0 transform -translate-y-100-percent">
            *{errorMessage}
          </div>
        )}
        <div
          className={clsx(
            [sizeSet[size]],
            { 'border-red text-red': isError && !opened },
            { 'border-blue text-blue': opened },
            { 'border-grey-200 hover:border-blue': !opened && !isError },
            'flex items-center relative border duration-200 w-full cursor-pointer px-3-0 group'
          )}
        >
          <div className="mr-2-1 whitespace-no-wrap text-black">
            {placeholderIsVisible && placeholder ? placeholder : displayText}
          </div>
          <div className="ml-auto flex items-center">
            {withClearIcon && ((dateRange && (dateRange.from || dateRange.to)) || date) && (
              <IconButton
                component="button"
                onClick={dateRangeClearHandler}
                className="clear-selection opacity-50 hover:opacity-100 pointer-events-auto ml-1-0"
              >
                <SVG src={XIcon} className="w-2-0 md:w-1-0 duration-200" />
              </IconButton>
            )}
            <SVG src={CalendarIcon} className={clsx('w-2-4 ml-2-0')} />
          </div>
        </div>
        {elem}
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  className: PropTypes.string,
  errored: PropTypes.bool,
  date: PropTypes.string,
  dateRange: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string
  }),
  format: PropTypes.string,
  onSelect: PropTypes.func,
  size: PropTypes.oneOf(Object.keys(sizeSet)),
  withClearIcon: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  errorMessage: PropTypes.string
};

DatePicker.defaultProps = {
  className: '',
  errored: false,
  date: '',
  dateRange: null,
  format: '',
  onSelect: () => {},
  size: 'primary',
  withClearIcon: false,
  placeholder: '',
  disabled: false,
  label: '',
  errorMessage: ''
};

export default DatePicker;
