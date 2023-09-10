import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { SVG } from '@/components/Base/SVG';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import ReactCalendar from 'react-calendar';

const formatter = (locale, date, format) => dayjs(date).locale(locale).format(format);
const formatMonth = (...args) => formatter(...args, 'MMMM');
const formatMonthYear = (...args) => formatter(...args, 'MMMM YYYY');
const formatShortWeekday = (...args) => formatter(...args, 'ddd');

const Calendar = (props) => {
  const { value, onChange, locale, selectRange } = props;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return (
    <div className="calendar-wrapper m-auto">
      {mounted && (
        <ReactCalendar
          onChange={onChange}
          value={value}
          selectRange={selectRange}
          prevLabel={<SVG src={ArrowDownIcon} className="md:w-1-0 w-3-0 transform rotate-90 text-secondary-main" />}
          nextLabel={<SVG src={ArrowDownIcon} className="md:w-1-0 w-3-0 transform -rotate-90 text-secondary-main" />}
          next2Label={null}
          prev2Label={null}
          formatMonth={formatMonth}
          formatMonthYear={formatMonthYear}
          formatShortWeekday={formatShortWeekday}
          locale={locale}
        />
      )}
    </div>
  );
};

Calendar.propTypes = {
  selectRange: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Array), PropTypes.instanceOf(Date)]),
  onChange: PropTypes.func,
  locale: PropTypes.string
};

Calendar.defaultProps = {
  selectRange: false,
  value: new Date(),
  onChange: () => {},
  locale: 'ka'
};

export default Calendar;
