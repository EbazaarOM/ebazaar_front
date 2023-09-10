import PropTypes from 'prop-types';
import Image from 'next/image';
import { generateFullAddress } from '@/utils/generateFullAddress';
import { StarIcon } from '@/components/Vectors/StarIcon';
import { SVG } from '@/components/Base/SVG';
import { RouterLink } from '@/components/Base/RouterLink';

const Farmer = ({ className, farmer }) => {
  const fullName = farmer.commercialName || `${farmer.firstName} ${farmer.lastName}`;
  const fullAddress = generateFullAddress(farmer.address);
  return (
    <div className={className}>
      <RouterLink href={`/farmers/${farmer.id}`} className="flex">
        <div className="w-35-percent relative">
          <Image
            src={process.env.STATIC_RESOURCES_URL.concat(farmer.profileImage)}
            alt={farmer.title}
            width={126}
            height={158}
            loading="eager"
            objectFit="cover"
            layout="responsive"
          />
        </div>
        <div className="md:ml-2-0 ml-3-0 flex-1">
          <div className="font-md md:text-2-0 text-2-8">{fullName}</div>
          <div className="font-rm md:text-1-6 text-2-6 mt-1-0">{fullAddress}</div>
          {!!farmer.rating && (
            <div className="font-md md:text-1-6 text-2-6 mt-1-0">
              <SVG src={StarIcon} className="inline md:w-1-3 w-3-0 mr-1-3 text-yellow" />
              {farmer.rating}
            </div>
          )}
        </div>
      </RouterLink>
    </div>
  );
};

Farmer.propTypes = {
  farmer: PropTypes.object,
  className: PropTypes.string
};

Farmer.defaultProps = {
  farmer: {},
  className: ''
};

export default Farmer;
