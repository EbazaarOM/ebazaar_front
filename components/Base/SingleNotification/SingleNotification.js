import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { CalendarIcon } from '@/components/Vectors/CalendarIcon';
import { ClockIcon } from '@/components/Vectors/ClockIcon';
import clsx from 'clsx';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { RouterLink } from '../RouterLink';
import { SVG } from '../SVG';

const SingleNotification = ({ className, item, isPage }) => {
  return (
    <RouterLink
      className={clsx(
        className,
        'pt-3-2 flex items-center cursor-pointer hover:bg-lightblue-300 duration-150 group',
        { 'text-blue': !item.seen },
        [isPage ? 'md:px-8-0 px-4-0 md:pb-3-0 pb-3-2' : 'px-3-0 pb-2-0']
      )}
      href={`/account/notifications/${item.id}`}
    >
      <div className="mr-2-0 flex-1">
        <div className="flex items-center">
          <div className="md:w-2-6 md:h-2-6 w-5-0 h-5-0 bg-grey-200 rounded-full mr-1-7" />
          <div className="font-md md:text-1-6 text-2-6">ebazaar</div>
          <div
            className={clsx(
              [isPage ? 'ml-auto' : 'ml-5-8'],
              [item.seen ? 'text-grey-300' : 'text-blue'],
              'flex items-center font-rm md:text-1-4 text-2-4'
            )}
          >
            <div className="flex items-center md:mr-1-1 mr-4-0">
              <SVG src={CalendarIcon} className="md:w-1-8 w-2-6 md:mr-1-0 mr-1-4" />
              <span>{dayjs(item.createDate).format('DD.MM.YYYY')}</span>
            </div>
            <div className="flex items-center">
              <SVG src={ClockIcon} className="md:w-1-9 w-2-6 md:mr-1-0 mr-1-4" />
              <span>{dayjs(item.createDate).format('hh:mm')}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between md:mt-2-0 mt-4-0">
          <div
            className={clsx('md:text-1-6 text-2-6 line-clamp-2', [item.seen ? 'font-lt' : 'font-md'])}
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
          {isPage && (
            <SVG
              src={ArrowDownIcon}
              className="md:block hidden w-1-8 text-blue ml-3-0 transform group-hover:translate-x-0 -translate-x-1-0 opacity-0 group-hover:opacity-100 duration-150 -rotate-90"
            />
          )}
        </div>
      </div>
      {!isPage && <SVG src={ArrowDownIcon} className="w-1-2 text-grey transform -rotate-90 md:block hidden" />}
    </RouterLink>
  );
};

SingleNotification.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
  isPage: PropTypes.bool
};

SingleNotification.defaultProps = {
  className: '',
  item: {},
  isPage: false
};

export default SingleNotification;
