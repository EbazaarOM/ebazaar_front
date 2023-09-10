import PropTypes from 'prop-types';
import Image from 'next/image';
import { Checkmark } from '@/components/Vectors/Checkmark';
import clsx from 'clsx';
import { SVG } from '../SVG';

const StickersSelector = ({ stickers, selectedStickerIds, onSelect }) => {
  const clickHandler = (id) => {
    if (selectedStickerIds.indexOf(id) > -1) {
      onSelect(selectedStickerIds.filter((selectedStickerId) => selectedStickerId !== id));
    } else {
      onSelect([...selectedStickerIds, id]);
    }
  };

  return (
    <>
      {stickers?.map((x) =>
        ((isSelected) => (
          <div
            key={x.id}
            className="md:w-4-4 md:h-4-4 w-13-0 h-13-0 rounded-full relative cursor-pointer"
            onClick={() => clickHandler(x.id)}
            aria-hidden
            title={x.title}
          >
            <div className={clsx({ 'opacity-60': isSelected }, 'md:hover:opacity-80 relative w-full h-full relative')}>
              {x.image && (
                <Image
                  src={process.env.STATIC_RESOURCES_URL.concat(x.image)}
                  alt={x.title}
                  loading="eager"
                  layout="fill"
                />
              )}
            </div>
            {isSelected && (
              <div className="md:w-2-0 md:h-2-0 w-4-1 h-4-1 bg-black flex items-center justify-center rounded-full absolute top-0 right-0 transform translate-x-0-3 -translate-y-0-3">
                <SVG src={Checkmark} className="md:w-1-1 w-2-0 text-white" />
              </div>
            )}
          </div>
        ))(selectedStickerIds?.indexOf(x.id) > -1)
      )}
    </>
  );
};

StickersSelector.propTypes = {
  stickers: PropTypes.instanceOf(Array),
  selectedStickerIds: PropTypes.instanceOf(Array),
  onSelect: PropTypes.func
};

StickersSelector.defaultProps = {
  stickers: [],
  selectedStickerIds: [],
  onSelect: () => {}
};

export default StickersSelector;
