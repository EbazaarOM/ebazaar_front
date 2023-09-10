import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IconButton } from '@/components/Base/IconButton';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { SVG } from '@/components/Base/SVG';
import { Slide } from './components';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const swiperOptions = {
  spaceBetween: 50,
  slidesPerView: 1,
  className: 'h-full',
  pagination: { clickable: true },
  navigation: { nextEl: '.home-page-carousel .swiper-button-next', prevEl: '.home-page-carousel .swiper-button-prev' },
  autoplay: { delay: 7000 }
};

const swiperArrowClassSet = 'absolute top-50-percent transform -translate-y-50-percent z-1';

const Carousel = ({ elems }) => {
  return (
    <div className="home-page-carousel relative">
      <Swiper {...swiperOptions}>
        {elems &&
          elems.map((e, i) => (
            <SwiperSlide className="h-full" key={e.id}>
              <Slide item={e} preloadImage={i === 0} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className={clsx('swiper-button-prev left-5-0', swiperArrowClassSet)}>
        <IconButton className="w-10-0 h-10-0 overflow-hidden relative group" aria-label="Prev">
          <div className="absolute inset-0 bg-white opacity-20 group-hover:opacity-40 duration-200" />
          <SVG src={ArrowDownIcon} className="w-2-0 transform rotate-90 text-white" />
        </IconButton>
      </div>
      <div className={clsx('swiper-button-next right-5-0', swiperArrowClassSet)}>
        <IconButton className="w-10-0 h-10-0 overflow-hidden relative group" aria-label="Next">
          <div className="absolute inset-0 bg-white opacity-20 group-hover:opacity-40 duration-200" />
          <SVG src={ArrowDownIcon} className="w-2-0 transform -rotate-90 text-white" />
        </IconButton>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  elems: PropTypes.instanceOf(Array)
};

Carousel.defaultProps = {
  elems: []
};

export default Carousel;
