import { SVG } from '@/components/Base/SVG';
import { StarIcon } from '@/components/Vectors/StarIcon';
import PropTypes from 'prop-types';
import Image from 'next/image';
import clsx from 'clsx';
import { generateFullAddress } from '@/utils/generateFullAddress';
import { RouterLink } from '../RouterLink';

const SingleFarmer = ({ item, className }) => {
  const fullName = item.commercialName || `${item.firstName} ${item.lastName}`;

  const fullAddress = generateFullAddress(item.address);

  return (
    <RouterLink href={`/farmers/${item.id}`} className={clsx(className, 'block group')}>
      <div className="text-white relative">
        <Image
          src={process.env.STATIC_RESOURCES_URL.concat(item.profileImage)}
          alt={fullName}
          width={367}
          height={462}
          loading="eager"
          objectFit="cover"
          layout="responsive"
        />
        <div className="absolute bottom-0 left-0 right-0 ">
          <div className="relative z-1 px-3-0 pb-3-0 pt-3-6">
            <div className="flex md:items-center md:justify-between md:flex-row flex-col">
              <p className="font-md md:text-2-0 text-2-8 upper md:mr-2-0 md:order-1 order-2 md:mt-0 mt-2-0">
                {fullName}
              </p>
              {!!item.rating && (
                <div className="flex items-center md:order-2 order-1">
                  <SVG src={StarIcon} className="md:w-1-4 w-3-0 text-yellow md:mr-1-2 mr-2-0" />
                  <span className="md:text-1-6 text-2-6 font-md">{item.rating?.toFixed(1)}</span>
                </div>
              )}
            </div>
            <p className="mt-1-0 md:text-1-6 text-2-6 font-rm">{fullAddress}</p>
          </div>
          <div className="absolute h-full w-full top-0 left-0 bg-blue transform scale-y-0 group-hover:scale-y-100 duration-200 origin-bottom" />
        </div>
      </div>
    </RouterLink>
  );
};

SingleFarmer.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string
};

SingleFarmer.defaultProps = {
  item: {},
  className: ''
};

export default SingleFarmer;
