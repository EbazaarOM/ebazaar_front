import PropTypes from 'prop-types';
import clsx from 'clsx';

const Card = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <div ref={ref} {...rest} className={clsx(className, 'overflow-hidden bg-white')}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

Card.defaultProps = {
  className: '',
  children: null
};

export default Card;
