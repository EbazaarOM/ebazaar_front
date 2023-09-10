import PropTypes from 'prop-types';
import clsx from 'clsx';

const CardHeader = (props) => {
  const { title, action, className, icon, px } = props;

  return (
    <div
      className={clsx(
        className,
        px,
        'md:h-9-0 h-10-0 flex items-center justify-between border-b border-grey-200 border-solid px-4-0 font-md md:text-2-0 text-3-0'
      )}
    >
      <div className="flex items-center mr-2-0 flex-1">
        {icon && <div className="mr-2-0">{icon}</div>}
        {title && <div>{title}</div>}
      </div>
      {action}
    </div>
  );
};

CardHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  action: PropTypes.node,
  icon: PropTypes.node,
  className: PropTypes.string,
  px: PropTypes.string
};

CardHeader.defaultProps = {
  action: null,
  icon: null,
  title: null,
  className: '',
  px: 'px-5-0'
};

export default CardHeader;
