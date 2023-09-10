import clsx from 'clsx';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Location } from '@/components/Base/Location';
import { Rating } from '@/components/Base/Rating';
import { generateFullAddress } from '@/utils/generateFullAddress';

const Cover = ({ className, info }) => {
  const fullName = info.commercialName || `${info.firstName} ${info.lastName}`;
  const fullAddress = generateFullAddress(info.location);
  return (
    <div className={clsx(className, '')}>
      <div className="md:mx-0 -mx-5-0 relative h-30-0">
        <Image
          src={process.env.STATIC_RESOURCES_URL.concat(info.coverImage)}
          alt={fullName}
          loading="eager"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="flex">
        <div className="mr-3-0 md:w-23-5-percent w-50-percent relative">
          <div className="bg-white py-2-2 px-2-0 absolute right-0 bottom-0 rounded-10-0 transform md:translate-y-14-2 md:w-33-1">
            <Image
              src={process.env.STATIC_RESOURCES_URL.concat(info.profileImage)}
              alt={fullName}
              loading="eager"
              objectFit="cover"
              width={291}
              height={366}
            />
          </div>
        </div>
        <div className="flex-1 md:pt-2-0 pt-3-7 md:pb-0 pb-8-8 w-50-percent">
          <div className="grid grid-flow-col-dense items-center justify-between md:gap-1-1 gap-2-0 w-full">
            <div className="font-md md:text-2-4 text-3-0 upper word-break">{fullName}</div>
            {!!info.rating && <Rating value={info.rating?.toFixed(1)} className="md:col-start-1 md:row-start-2" />}
            <Location
              address={fullAddress}
              className="md:col-start-auto md:row-start-auto col-start-1 row-start-2 md:col-span-1 col-span-2 word-break"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Cover.propTypes = {
  className: PropTypes.string,
  info: PropTypes.object
};

Cover.defaultProps = {
  className: '',
  info: {}
};

export default Cover;
