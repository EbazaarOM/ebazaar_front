import { AnimatedImage } from '@/components/Base/AnimatedImage';
import { RouterLink } from '@/components/Base/RouterLink';
import { SVG } from '@/components/Base/SVG';
import { StarIcon } from '@/components/Vectors/StarIcon';
import { generateFullAddress } from '@/utils/generateFullAddress';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';

const OtherFarmer = ({ item, className }) => {
  const fullName = item.commercialName || `${item.firstName} ${item.lastName}`;
  const fullAddress = generateFullAddress(item.address);

  return (
    <RouterLink href={`/farmers/${item.id}`} className={clsx(className, 'block group')}>
      <div className="h-full text-white relative">
        <div className="absolute w-full h-full top-0 left-0">
          <AnimatedImage itemKey={item.id} src={process.env.STATIC_RESOURCES_URL.concat(item.profileImage)} />
        </div>
        <div className="h-full flex flex-col justify-end z-1 relative">
          <AnimatePresence>
            <motion.div
              className="w-full relative p-3-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, position: 'absolute' }}
              key={item.id}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-blue -z-1 transform scale-y-0 group-hover:scale-y-100 duration-200 origin-bottom" />
              <div className="flex items-start justify-between">
                <p className="font-md text-2-0 upper mr-2-0"> {fullName}</p>
                {!!item.rating && (
                  <div className="flex items-center">
                    <SVG src={StarIcon} className="w-1-4 text-yellow mr-1-2" />
                    <span className="text-1-6 font-md">{item.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              <p className="mt-1-0 text-1-6 font-rm">{fullAddress}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </RouterLink>
  );
};

OtherFarmer.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string
};

OtherFarmer.defaultProps = {
  item: {},
  className: ''
};

export default OtherFarmer;
