import PropTypes from 'prop-types';
import clsx from 'clsx';

const CardContent = (props) => {
  const { children, className, px, ...rest } = props;

  return (
    <div className={clsx(className, px)} {...rest}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  px: PropTypes.string
};
CardContent.defaultProps = {
  children: null,
  className: '',
  px: 'px-5-0'
};

export default CardContent;
