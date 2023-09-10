import { StarIcon } from '@/components/Vectors/StarIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { SVG } from '../SVG';

const Score = ({ className, score }) => {
  return (
    <div className={clsx(className, 'flex rounded-4-0 bg-white py-0-8 text-black')}>
      <div className="border-r border-opacity-10 border-black pl-1-2 pr-1-0 flex items-center">
        <SVG src={StarIcon} className="w-1-4 text-yellow" />
      </div>
      <div className="flex items-center pl-2-0 pr-2-3 font-md text-1-6 transform translate-y-0-1">
        {score.toFixed(1)}
      </div>
    </div>
  );
};

Score.propTypes = {
  className: PropTypes.string,
  score: PropTypes.number
};

Score.defaultProps = {
  className: '',
  score: 0
};

export default Score;
