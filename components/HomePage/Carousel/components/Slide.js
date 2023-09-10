import { Button } from '@/components/Base/Button';
import { useTranslations } from '@/next-intl/useTranslations';
import Image from 'next/image';
import PropTypes from 'prop-types';

const Slide = ({ item, preloadImage }) => {
  const t = useTranslations();

  return (
    <a className="relative h-full block group" href={item.link || null} target="_blank" rel="noreferrer">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src={process.env.STATIC_RESOURCES_URL.concat(item.image)}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            priority={preloadImage}
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-10 z-1" />
      </div>
      <div className="relative z-1 flex flex-col items-center md:pt-9-6 pt-5-0">
        <h2 className="text-white md:text-5-0 text-4-0 font-md w-70-percent text-center line-clamp-3 upper">
          {item.title}
        </h2>
      </div>
      {item.link && (
        <div className="absolute md:bottom-15-0 bottom-12-0 left-50-percent transform -translate-x-50-percent z-1">
          <Button className="border border-white text-white w-mc hover:bg-green hover:border-green group-hover:bg-green group-hover:border-green duration-200">
            {t('seeMore')}
          </Button>
        </div>
      )}
    </a>
  );
};

Slide.propTypes = {
  item: PropTypes.object,
  preloadImage: PropTypes.bool
};

Slide.defaultProps = {
  item: {},
  preloadImage: false
};
export default Slide;
