/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { linkReg } from '@/utils/regex';
import ReactPlayer from 'react-player';
import { PlayIcon } from '@/components/Vectors/PlayIcon';
import { SVG } from '@/components/Base/SVG';
import { Popup } from '@/components/Base/Popup';
import { VideoPlayer } from '@/components/Base/VideoPlayer';
import { IconButton } from '@/components/Base/IconButton';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';

SwiperCore.use([Navigation, Thumbs]);

const swiperOptions = {
  spaceBetween: 50,
  slidesPerView: 1,
  navigation: {
    nextEl: '.products-inner-swiper .swiper-button-next',
    prevEl: '.products-inner-swiper .swiper-button-prev'
  }
};

const swiperArrowClassSet = 'absolute top-50-percent transform -translate-y-50-percent z-1';

const ProductImages = ({ className, images, videoLink }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  const [mounted, setMounted] = React.useState(false);

  const isValidVideoLink = videoLink && linkReg.test(videoLink);
  const slideCount = isValidVideoLink ? images.length + 1 : images.length;

  const videoPopupRef = React.useRef(null);

  const baseReactPlayerOptions = {
    height: '100%',
    width: '100%',
    url: videoLink,
    controls: false,
    light: true,
    className: 'pointer-events-none'
  };

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className={clsx(className, 'products-inner-swiper md:mx-0 -mx-5-0')}>
      <div className="relative">
        <Swiper {...swiperOptions} thumbs={{ swiper: thumbsSwiper }}>
          {images &&
            images.map((e) => (
              <SwiperSlide key={e.id}>
                <img src={process.env.STATIC_RESOURCES_URL.concat(e.name)} alt={e.title} />
                {/* <Image
                  width={766}
                  src={process.env.STATIC_RESOURCES_URL.concat(e.name)}
                  alt={e.title}
                  height={474}
                  loading="eager"
                  objectFit="cover"
                  layout="responsive"
                /> */}
              </SwiperSlide>
            ))}
          {isValidVideoLink && (
            <SwiperSlide style={{ height: 'auto' }}>
              <div
                className="absolute inset-0 group cursor-pointer"
                onClick={() => videoPopupRef.current.open()}
                aria-hidden
              >
                <ReactPlayer
                  {...baseReactPlayerOptions}
                  playIcon={
                    <SVG src={PlayIcon} className="w-8-0 text-white group-hover:scale-110 transform duration-150" />
                  }
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        {slideCount > 1 && (
          <>
            <div className={clsx('swiper-button-prev left-5-0', swiperArrowClassSet)}>
              <IconButton className="w-6-0 h-6-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 duration-200" />
                <SVG src={ArrowDownIcon} className="w-1-1 transform rotate-90 text-white" />
              </IconButton>
            </div>
            <div className={clsx('swiper-button-next right-5-0', swiperArrowClassSet)}>
              <IconButton className="w-6-0 h-6-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 duration-200" />
                <SVG src={ArrowDownIcon} className="w-1-1 transform -rotate-90 text-white" />
              </IconButton>
            </div>
          </>
        )}
      </div>
      {mounted && (
        <div className="mt-3-0 md:block hidden">
          <Swiper onSwiper={setThumbsSwiper} spaceBetween={30} slidesPerView={6} freeMode watchSlidesProgress>
            {images &&
              images.map((e) => (
                <SwiperSlide key={e.id}>
                  <Image
                    src={process.env.STATIC_RESOURCES_URL.concat(e.name)}
                    alt={e.title}
                    width={103}
                    height={64}
                    loading="eager"
                    objectFit="cover"
                    layout="responsive"
                  />
                </SwiperSlide>
              ))}
            {isValidVideoLink && (
              <SwiperSlide style={{ height: 'auto' }}>
                <ReactPlayer
                  {...baseReactPlayerOptions}
                  playIcon={<SVG src={PlayIcon} className="w-3-6 text-white" />}
                />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      )}
      <Popup ref={videoPopupRef} className="w-60-percent">
        <div className="w-full">
          <VideoPlayer url={videoLink} playing />
        </div>
      </Popup>
    </div>
  );
};

ProductImages.propTypes = {
  className: PropTypes.string,
  images: PropTypes.instanceOf(Array),
  videoLink: PropTypes.string,
  stickers: PropTypes.instanceOf(Array)
};

ProductImages.defaultProps = {
  className: '',
  images: [],
  videoLink: 'https://www.youtube.com/watch?v=6huoy3PrZ7c',
  stickers: []
};

export default ProductImages;
