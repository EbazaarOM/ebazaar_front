import clsx from 'clsx';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { XIcon } from '@/components/Vectors/XIcon';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { SVG } from '../SVG';
import { Popup } from '../Popup';
import { DynamicContent } from '../DynamicContent';

const SingleFeature = ({ item, className }) => {
  const popupRef = React.useRef(null);

  return (
    <>
      <div
        className={clsx(
          className,
          'md:px-4-0 px-3-0 md:pt-4-0 pt-4-2 md:pb-3-0 pb-4-5 bg-white h-full cursor-pointer hover:shadow-md duration-150 group'
        )}
        aria-hidden
        onClick={() => popupRef.current.open()}
      >
        <div className="flex items-start justify-between">
          <div className="md:w-4-8 md:h-4-8 w-8-2 h-8-2 relative">
            <Image
              src={process.env.STATIC_RESOURCES_URL.concat(item.image)}
              alt={item.title}
              layout="fill"
              objectFit="contain"
              loading="eager"
            />
          </div>
          <div className="h-auto md:block hidden">
            <SVG
              src={ArrowDownIcon}
              className="w-1-3 transform -rotate-90 opacity-0 -translate-x-1-0 group-hover:opacity-100 group-hover:translate-x-0 duration-150"
            />
          </div>
        </div>
        <div className="md:text-1-6 text-2-8 font-bd mt-3-0">{item.title}</div>
      </div>
      <Popup ref={popupRef} className="md:w-76-5 w-90-percent">
        <div className="w-full bg-white px-4-5 pt-5-0 pb-8-0">
          <SVG
            src={XIcon}
            className="md:w-2-0 w-3-4 cursor-pointer transform hover:rotate-90 duration-200 ml-auto"
            onClick={() => popupRef.current.close()}
          />
          <div className="flex items-center mt-1-5">
            <div className="md:w-6-0 md:h-6-0 w-10-0 h-10-0 relative">
              <Image
                src={process.env.STATIC_RESOURCES_URL.concat(item.image)}
                alt={item.title}
                layout="fill"
                objectFit="contain"
                loading="eager"
              />
            </div>
            <div className="ml-2-2 font-bd upper md:text-2-0 text-3-0 md:w-50-percent w-70-percent">{item.title}</div>
          </div>
          <DynamicContent className="mt-4-0" description={item.description} />
        </div>
      </Popup>
    </>
  );
};

SingleFeature.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string
};

SingleFeature.defaultProps = {
  item: {},
  className: ''
};

export default SingleFeature;
