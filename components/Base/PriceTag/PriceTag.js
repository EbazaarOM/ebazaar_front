import { TagIcon } from '@/components/Vectors/TagIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { SVG } from '../SVG';

const sizeSet = {
  md: {
    textBase: 'md:text-2-0 text-2-4 font-rm',
    iconBase: 'md:w-1-4 w-1-9 mr-1-0',
    textSaled: 'md:text-2-4 text-3-0 font-bd',
    iconSaled: 'md:w-1-7 w-2-3 mr-1-0'
  },
  xl: {
    textBase: 'md:text-2-4 text-3-4 font-rm',
    iconBase: 'md:w-1-9 w-2-4 mr-1-0',
    textSaled: 'md:text-3-2 text-4-2 font-bd',
    iconSaled: 'md:w-2-4 w-3-2 mr-1-0'
  }
};

const PriceTag = ({ className, value, saleCost, size }) => {
  return (
    <div className={clsx(className, 'flex items-center')}>
      <div className={clsx({ 'line-through text-grey': saleCost }, 'flex items-center')}>
        <SVG src={TagIcon} className={sizeSet[size].iconBase} />
        <span className={sizeSet[size].textBase}>{value.toFixed(2)} ₾</span>
      </div>
      {saleCost && (
        <div className="flex items-center md:ml-3-0 ml-2-0 text-red">
          <SVG src={TagIcon} className={sizeSet[size].iconSaled} />
          <span className={sizeSet[size].textSaled}>{saleCost.toFixed(2)} ₾</span>
        </div>
      )}
    </div>
  );
};

PriceTag.propTypes = {
  className: PropTypes.string,
  saleCost: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(Object.keys(sizeSet))
};

PriceTag.defaultProps = {
  className: '',
  saleCost: null,
  value: '',
  size: 'md'
};

export default PriceTag;
