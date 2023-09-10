import PropTypes from 'prop-types';
import clsx from 'clsx';
import { StarIcon } from '@/components/Vectors/StarIcon';
import React from 'react';
import { SVG } from '../SVG';

const sizeSet = {
  sm: 'md:w-1-9 w-3-0',
  md: 'md:w-3-0 w-4-0'
};

// eslint-disable-next-line react/prop-types
const Star = ({ filled, className, size, ...rest }) => {
  return (
    <SVG
      src={StarIcon}
      className={clsx(className, [filled ? 'text-yellow' : 'text-grey-200'], sizeSet[size], 'cursor-pointer')}
      {...rest}
    />
  );
};

const StarRating = (props) => {
  const { className, rating, onRate, size, editable } = props;

  const [newRating, setNewRating] = React.useState(rating);

  React.useEffect(() => {
    setNewRating(rating);
  }, [rating]);

  return (
    <div className={clsx(className, 'flex items-center')} onMouseLeave={() => editable && setNewRating(rating)}>
      {Array(5)
        .fill(undefined)
        .map((_x, index) => (
          <Star
            className="mr-1-0"
            filled={newRating >= index + 1}
            key={JSON.stringify(index)}
            onMouseEnter={() => editable && setNewRating(index + 1)}
            onClick={() => editable && onRate(index + 1)}
            size={size}
          />
        ))}
    </div>
  );
};

StarRating.propTypes = {
  className: PropTypes.string,
  rating: PropTypes.number,
  onRate: PropTypes.func,
  editable: PropTypes.bool,
  size: PropTypes.string
};

StarRating.defaultProps = {
  className: '',
  rating: 0,
  onRate: () => {},
  editable: false,
  size: 'md'
};

export default StarRating;
