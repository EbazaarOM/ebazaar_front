import { AnimatedImage } from '@/components/Base/AnimatedImage';
import { RouterLink } from '@/components/Base/RouterLink';
import { Score } from '@/components/Base/Score';
import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import { generateFullAddress } from '@/utils/generateFullAddress';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';

const FirstFarmer = ({ item, className }) => {
  const fullName = item.commercialName || `${item.firstName} ${item.lastName}`;
  const t = useTranslations();

  const fullAddress = generateFullAddress(item.address);

  return (
    <RouterLink href={`/farmers/${item.id}`} className={clsx(className, 'block group homepage-first-farmer')}>
      <div className="image-wrapper">
        <AnimatedImage itemKey={item.id} src={process.env.STATIC_RESOURCES_URL.concat(item.profileImage)} />
      </div>
      <div className="bg-blue p-3-0 text-white">
        <div className="relative">
          <AnimatePresence>
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, position: 'absolute' }}
              key={item.id}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center justify-between w-full">
                <p className="font-md text-2-0 upper mr-2-0">{fullName}</p>
                {!!item.rating && <Score score={item.rating} />}
              </div>
              <p className="mt-1-0 font-rm text-1-6 opacity-50 line-clamp-1">{fullAddress}</p>
              <div className="mt-1-5 flex items-center">
                <p className="mr-1-7 font-bd text-1-6">{t('seeFull')}</p>
                <div className={clsx('duration-300 transform group-hover:translate-x-1-0 wc-transform w-4-8 h-4-8')}>
                  <SVG
                    src={ArrowDownIcon}
                    className="transform -rotate-90 w-1-0 absolute top-50-percent left-50-percent -translate-y-50-percent -translate-x-50-percent"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 112 112"
                    className="absolute top-0 left-0 w-full h-full"
                  >
                    <circle className="circle" cx="55" cy="55" r="52" stroke="currentColor" strokeWidth="2" />
                    <circle className="opacity-50" cx="55" cy="55" r="52" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <style jsx>{`
        .image-wrapper {
          height: 45rem;
        }
      `}</style>
    </RouterLink>
  );
};

FirstFarmer.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string
};

FirstFarmer.defaultProps = {
  item: {},
  className: ''
};

export default FirstFarmer;
