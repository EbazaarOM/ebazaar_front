import { IconButton } from '@/components/Base/IconButton';
import { SingleFeature } from '@/components/Base/SingleFeature';
import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation]);

const swiperOptins = {
  slidesPerView: 1.4,
  spaceBetween: 30,
  navigation: {
    nextEl: `.features-section .next`,
    prevEl: `.features-section .prev`
  }
};

const arrowClassSet = 'bg-white h-7-0 w-7-0 hover:bg-green hover:text-white duration-150';
const FeaturesSection = React.memo(({ className, features }) => {
  const t = useTranslations(['homePage']);

  const breakpoints = { 769: { slidesPerView: features.length, allowTouchMove: false } };

  return (
    <div className={clsx(className, 'features-section')}>
      <div className="flex items-center justify-between">
        <h3 className="text-3-0 font-md upper mr-3-0">{t('ourFeatures')}</h3>
        <div className="flex items-center md:hidden">
          <IconButton className={clsx(arrowClassSet, 'prev md:mr-1-2 mr-3-0')}>
            <SVG src={ArrowDownIcon} className="w-2-0 transform rotate-90 -translate-x-0-1" />
          </IconButton>
          <IconButton className={clsx(arrowClassSet, 'next')}>
            <SVG src={ArrowDownIcon} className="w-2-0 transform -rotate-90 translate-x-0-1" />
          </IconButton>
        </div>
      </div>
      <Swiper key={features.length} {...swiperOptins} breakpoints={breakpoints} className="md:mt-3-8 mt-6-0 -mb-3-0">
        {features &&
          features.map((x) => (
            <SwiperSlide key={x.id} style={{ height: 'auto' }} className="pb-3-0">
              <SingleFeature className="mr-3-0 last:mr-0" key={x.id} item={x} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

FeaturesSection.propTypes = {
  className: PropTypes.string,
  features: PropTypes.instanceOf(Array)
};

FeaturesSection.defaultProps = {
  className: '',
  features: []
};
export default FeaturesSection;
