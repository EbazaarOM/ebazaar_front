import { Button } from '@/components/Base/Button';
import { IconButton } from '@/components/Base/IconButton';
import { RouterLink } from '@/components/Base/RouterLink';
import { SingleFarmer } from '@/components/Base/SingleFarmer';
import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FirstFarmer, OtherFarmer } from './components';

SwiperCore.use([Navigation, Pagination]);

const swiperOptions = {
  slidesPerView: 2,
  spaceBetween: 30,
  navigation: { nextEl: '.farmers-nav-next', prevEl: '.farmers-nav-prev' },
  breakpoints: { 769: { navigation: { nextEl: '.farmers-nav-next', prevEl: '.farmers-nav-prev' } } }
};

const arrowClassSet = 'bg-white md:w-6-0 md:h-6-0 h-7-0 w-7-0 hover:bg-green hover:text-white duration-150';
const PopularFarmers = ({ className, items }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isBlocked, setIsBlocked] = React.useState(false);

  const first = items[activeIndex];
  const second = items[(activeIndex + 1) % items.length];
  const third = items[(activeIndex + 2) % items.length];
  const fourth = items[(activeIndex + 3) % items.length];

  const blockNavigation = () => {
    setIsBlocked(true);
    setTimeout(() => {
      setIsBlocked(false);
    }, 900);
  };

  const prevClickHandler = () => {
    if (window.innerWidth > 768) {
      setActiveIndex((items.length + activeIndex - 1) % items.length);
      blockNavigation();
    }
  };

  const nextClickHandler = () => {
    if (window.innerWidth > 768) {
      setActiveIndex((activeIndex + 1) % items.length);
      blockNavigation();
    }
  };

  const t = useTranslations();

  return (
    <div className={className}>
      <div className="md:grid grid-cols-10 farmer-carousel">
        <FirstFarmer className="col-span-3 md:block hidden" item={first} />
        <div className="col-span-7 flex flex-col md:ml-3-0">
          <div className="flex justify-between md:items-start items-center">
            <RouterLink href="/farmers" className="flex items-center w-mc mr-3-0 group">
              <h3 className="text-3-0 font-md upper md:tracking-normal tracking-tight mr-2-0">{t('farmers')}</h3>
              <SVG
                src={ArrowDownIcon}
                className="w-2-0 transform -rotate-90 group-hover:translate-x-1-0 group-hover:opacity-100 opacity-0 duration-150"
              />
            </RouterLink>
            <div className="relative">
              <div className="flex items-center">
                <IconButton
                  aria-label="Prev"
                  className={clsx(
                    { 'md:pointer-events-none': isBlocked },
                    arrowClassSet,
                    'farmers-nav-prev',
                    'md:mr-1-2 mr-3-0'
                  )}
                  onClick={prevClickHandler}
                >
                  <SVG src={ArrowDownIcon} className="w-2-0 transform rotate-90 -translate-x-0-1" />
                </IconButton>
                <IconButton
                  aria-label="Next"
                  className={clsx(arrowClassSet, { 'md:pointer-events-none': isBlocked }, 'farmers-nav-next')}
                  onClick={nextClickHandler}
                >
                  <SVG src={ArrowDownIcon} className="w-2-0 transform -rotate-90 translate-x-0-1" />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="flex-1 mt-8-3 relative md:grid hidden grid-cols-3 gap-3-0">
            {second && <OtherFarmer item={second} className="h-full" />}
            {third && <OtherFarmer item={third} className="h-full" />}
            {fourth && <OtherFarmer item={fourth} className="h-full" />}
          </div>
          <div className="md:hidden mt-5-2">
            <Swiper {...swiperOptions}>
              {items.map((item) => (
                <SwiperSlide key={item.id} style={{ height: 'auto' }}>
                  <div className="pt-1-7 pb-1-0">
                    <SingleFarmer item={item} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <RouterLink href="/farmers" className="ml-auto block w-mc">
        <Button
          className="bg-white hover:bg-green hover:text-white w-mc md:mt-6-4 mt-6-0 duration-150"
          px="md:px-2-5 px-4-0"
        >
          {t('seeMore')}
        </Button>
      </RouterLink>
    </div>
  );
};

PopularFarmers.propTypes = {
  className: PropTypes.string,
  items: PropTypes.instanceOf(Array)
};

PopularFarmers.defaultProps = {
  className: '',
  items: []
};

export default PopularFarmers;
