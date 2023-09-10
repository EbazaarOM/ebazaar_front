import PropTypes from 'prop-types';
import ReactSlider from 'react-slider';

const PriceRange = ({ min, max, onChange, priceRange, className, label }) => {
  const [value, setValue] = React.useState(priceRange);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (mounted) onChange(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return (
    <div className={className}>
      <div className="whitespace-nowrap">
        <span className="md:pr-1-0 pr-3-0 font-md md:text-1-8 text-3-0">{label}</span>
        <span className="text-grey-600 font-lt md:text-1-4 text-2-6">
          {value.min} ₾ - {value.max} ₾
        </span>
      </div>
      <div className="flex items-center justify-between font-lt md:text-1-4 text-2-4 md:mb-0-5 mb-1-5 whitespace-nowrap md:mt-1-1 mt-4-0">
        <span>{min} ₾</span>
        <span>{max} ₾</span>
      </div>
      <ReactSlider
        className="price-range"
        thumbClassName="price-range__thumb"
        trackClassName="price-range__track"
        defaultValue={[value.min, value.max]}
        min={min}
        max={max}
        pearling
        onChange={([min, max]) => setValue({ min, max })}
        minDistance={1}
      />
    </div>
  );
};

PriceRange.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  priceRange: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string
};

PriceRange.defaultProps = {
  className: '',
  label: ''
};

export default PriceRange;
