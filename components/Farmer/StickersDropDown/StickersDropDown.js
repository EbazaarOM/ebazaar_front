import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { XIcon } from '@/components/Vectors/XIcon';
import { SVG } from '@/components/Base/SVG';
import { IconButton } from '@/components/Base/IconButton';
import Image from 'next/image';
import { Checkbox } from '@/components/Base/Checkbox';

const StickersDropDown = (props) => {
  const { stickers, className, placeholder, onSelect, selectedStickerIds } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleFocus = ({ target: { classList } }) => {
    if (!classList.contains('clear-selection')) {
      setExpanded(true);
    }
  };
  const handleBlur = () => {
    setExpanded(false);
  };

  const clearHandler = () => {
    onSelect([]);
  };

  const selectHandler = (id) => {
    if (selectedStickerIds.indexOf(id) > -1) {
      onSelect(selectedStickerIds.filter((selectedStickerId) => selectedStickerId !== id));
    } else {
      onSelect([...selectedStickerIds, id]);
    }
  };

  const listElems = (
    <div className="absolute w-full z-10 pointer-events-auto">
      <div
        className={clsx(
          [expanded ? '-translate-y-0-1 pointer-events-auto' : '-translate-y-1-0 opacity-0 pointer-events-none'],
          'absolute z-1 w-full duration-200 transform wc-transform border border-blue border-t-0'
        )}
      >
        {stickers && stickers.length > 0 && (
          <ul
            className="overflow-auto bg-white border-grey-200 border-t custom-scrollbar"
            style={{ maxHeight: '30rem' }}
          >
            {stickers.map((x) => (
              <li
                onClick={() => selectHandler(x.id)}
                tabIndex="0"
                role="menuitem"
                onKeyPress={(e) => e.key === '13' && selectHandler(x.id)}
                className="md:px-2-0 px-3-0 md:h-6-0 h-7-0 flex items-center cursor-default hover:bg-body-bg justify-between border-b border-grey-200"
                key={x.id}
                title={x.title}
              >
                <div className="flex items-center flex-1 overflow-x-hidden">
                  <div className="w-3-3 h-3-3 relative">
                    <Image
                      src={process.env.STATIC_RESOURCES_URL.concat(x.image)}
                      alt={x.title}
                      loading="eager"
                      layout="fill"
                    />
                  </div>
                  <div className="ml-2-0 line-clamp-1 flex-1 break-all">{x.title}</div>
                </div>
                <Checkbox value={selectedStickerIds?.indexOf(x.id) > -1} className="pointer-events-none" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className={clsx(className, 'md:text-1-8 text-2-6 font-rm')}>
      <div
        tabIndex="0"
        role="button"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx({ 'pointer-events-none': expanded }, 'relative')}
      >
        <div
          className={clsx(
            { 'border-blue text-blue pointer-events-none': expanded },
            { 'border-grey-200 hover:border-blue': !expanded },
            'border duration-200 rounded-base flex items-center cursor-pointer relative md:px-2-0 px-3-0 md:h-6-0 h-8-0'
          )}
        >
          <div className={clsx([selectedStickerIds.length > 0 ? 'text-black' : 'text-grey-300'], 'relative flex-1')}>
            {placeholder}
          </div>
          <div className="flex items-center">
            {selectedStickerIds.length > 0 && (
              <IconButton
                component="button"
                onClick={clearHandler}
                className="clear-selection opacity-50 hover:opacity-100 pointer-events-auto ml-1-0 mr-1-0"
              >
                <SVG src={XIcon} className="w-2-0 md:w-1-1 duration-200" />
              </IconButton>
            )}
            <SVG
              src={ArrowDownIcon}
              className={clsx({ 'rotate-180': expanded }, 'md:w-1-5 w-2-2 ml-1-0 text-grey-500 transform duration-200')}
            />
          </div>
        </div>
        {listElems}
      </div>
    </div>
  );
};

StickersDropDown.propTypes = {
  stickers: PropTypes.instanceOf(Array).isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  selectedStickerIds: PropTypes.array
};

StickersDropDown.defaultProps = {
  className: '',
  placeholder: '',
  onSelect: () => {},
  selectedStickerIds: []
};

export default StickersDropDown;
