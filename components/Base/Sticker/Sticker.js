import PropTypes from 'prop-types';
import Image from 'next/image';
import clsx from 'clsx';

const Sticker = ({ sticker, className, ...rest }) => {
  return (
    <div
      key={sticker.id}
      className={clsx(className, 'relative pointer-events-auto')}
      aria-hidden
      title={sticker.title}
      {...rest}
    >
      <div className="pb-100-percent relative">
        <Image
          src={process.env.STATIC_RESOURCES_URL.concat(sticker.image)}
          alt={sticker.title}
          loading="eager"
          layout="fill"
        />
      </div>
    </div>
  );
};

Sticker.propTypes = {
  sticker: PropTypes.object,
  className: PropTypes.string
};

Sticker.defaultProps = {
  sticker: {},
  className: ''
};

export default Sticker;
