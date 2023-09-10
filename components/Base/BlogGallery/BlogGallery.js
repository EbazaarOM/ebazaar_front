/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { IconButton } from '../IconButton';
import { SVG } from '../SVG';
import { Popup } from '../Popup';

SwiperCore.use([Navigation, Pagination]);

const swiperOptions = {
  spaceBetween: 50,
  slidesPerView: 1,
  loop: true,
  loopedSlides: 2,
  pagination: { clickable: true },
  navigation: { nextEl: '.blog-gallery .swiper-button-next', prevEl: '.blog-gallery .swiper-button-prev' }
};

const popupSwiperOptions = {
  spaceBetween: 50,
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.popup-blog-gallery .popup-swiper-button-next',
    prevEl: '.popup-blog-gallery .popup-swiper-button-prev'
  }
};

const ArrowButton = ({ isLeft, className, isPopup }) => {
  return (
    <div className={className}>
      <IconButton className="md:w-10-0 md:h-10-0 w-7-0 h-7-0 overflow-hidden relative group">
        <div
          className={clsx(
            [isPopup ? 'group-hover:opacity-60' : 'opacity-20 group-hover:opacity-40'],
            'absolute inset-0 bg-white duration-200'
          )}
        />
        <SVG
          src={ArrowDownIcon}
          className={clsx(
            [isLeft ? 'rotate-90' : '-rotate-90'],
            [isPopup ? 'text-black' : 'text-white'],
            'w-2-0 transform'
          )}
        />
      </IconButton>
    </div>
  );
};

const swiperArrowClassSet = 'md:absolute md:top-50-percent transform md:-translate-y-50-percent z-1';

const ArticleTools = ({ className, items }) => {
  const popupRef = React.useRef(null);
  return (
    <div className={clsx(className, 'blog-gallery overflow-hidden relative')}>
      <div className="overflow-visible">
        <Swiper {...swiperOptions} className="h-full">
          {items?.map((e, i) => (
            <SwiperSlide key={e.concat('-', i)}>
              <Image
                src={process.env.STATIC_RESOURCES_URL.concat(e)}
                alt="Gallery"
                width={766}
                height={447}
                loading="eager"
                objectFit="cover"
                layout="responsive"
                onClick={() => popupRef.current.open()}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ArrowButton isLeft className={clsx('swiper-button-prev left-5-0 md:block hidden', swiperArrowClassSet)} />
      <ArrowButton className={clsx('swiper-button-next right-5-0 md:block hidden', swiperArrowClassSet)} />
      <Popup className="md:w-80-percent w-full md:px-0 px-5-0" ref={popupRef}>
        <div className="w-full h-full popup-blog-gallery relative">
          <div className="flex ml-auto w-mc">
            <ArrowButton isLeft isPopup className={clsx('popup-swiper-button-prev left-0', swiperArrowClassSet)} />
            <ArrowButton isPopup className={clsx('popup-swiper-button-next right-0 ml-3-0', swiperArrowClassSet)} />
          </div>
          <div className="md:px-15-0 md:mt-0 mt-4-2">
            <Swiper {...popupSwiperOptions} className="flex-1 h-full">
              {items?.map((e, i) => (
                <SwiperSlide key={e.concat('-', i)}>
                  <Image
                    src={process.env.STATIC_RESOURCES_URL.concat(e)}
                    alt="Gallery"
                    width={1295}
                    height={756}
                    loading="eager"
                    layout="responsive"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Popup>
    </div>
  );
};

ArticleTools.propTypes = {
  className: PropTypes.string,
  items: PropTypes.instanceOf(Array)
};

ArticleTools.defaultProps = {
  className: '',
  items: []
};

export default ArticleTools;
