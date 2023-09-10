import { Button } from '@/components/Base/Button';
import { IconButton } from '@/components/Base/IconButton';
import { RouterLink } from '@/components/Base/RouterLink';
import { SingleProduct } from '@/components/Base/SingleProduct';
import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation]);
const variantsSet = ['primary', 'big'];

const arrowClassSet = 'bg-white md:w-6-0 md:h-6-0 h-7-0 w-7-0 hover:bg-green hover:text-white duration-150';

const ProductsSection = React.memo(
  ({ className, products, title, uniqueName, productsPerView, variant, url, onAddCartClick }) => {
    const prevElSelector = `${uniqueName}-swiper-button-prev`;
    const nextElSelector = `${uniqueName}-swiper-button-next`;

    const swiperNavigation = {
      nextEl: `.products-section .${nextElSelector}`,
      prevEl: `.products-section .${prevElSelector}`
    };

    const t = useTranslations();

    return (
      <div className={clsx(className, 'products-section')}>
        <div className="flex items-center justify-between">
          <RouterLink
            href={url}
            className={clsx('flex items-center w-mc mr-3-0 group', { 'pointer-events-none': !url })}
          >
            <h3 className="text-3-0 font-md upper md:tracking-normal tracking-tight mr-2-0">{title}</h3>
            <SVG
              src={ArrowDownIcon}
              className="w-2-0 transform -rotate-90 group-hover:translate-x-1-0 group-hover:opacity-100 opacity-0 duration-150"
            />
          </RouterLink>
          <div className="flex items-center">
            <IconButton aria-label="Prev" className={clsx(prevElSelector, arrowClassSet, 'md:mr-1-2 mr-3-0')}>
              <SVG src={ArrowDownIcon} className="w-2-0 transform rotate-90 -translate-x-0-1" />
            </IconButton>
            <IconButton aria-label="Next" className={clsx(nextElSelector, arrowClassSet)}>
              <SVG src={ArrowDownIcon} className="w-2-0 transform -rotate-90 translate-x-0-1" />
            </IconButton>
          </div>
        </div>
        <Swiper
          slidesPerView={1.8}
          breakpoints={{ 769: { slidesPerView: productsPerView } }}
          spaceBetween={30}
          navigation={swiperNavigation}
          className="md:mt-3-8 mt-6-0"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id || item.code} style={{ height: 'auto' }}>
              <div className="pt-1-7 pb-1-0 h-full">
                <SingleProduct variant={variant} product={item} onAddCartClick={onAddCartClick} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {url && (
          <RouterLink href={url} className="ml-auto block w-mc">
            <Button
              className="bg-white hover:bg-green hover:text-white md:mt-6-4 mt-6-0 duration-150"
              px="md:px-2-5 px-4-0"
            >
              {t('seeMore')}
            </Button>
          </RouterLink>
        )}
      </div>
    );
  }
);

ProductsSection.displayName = 'ProductsSection';

ProductsSection.propTypes = {
  className: PropTypes.string,
  products: PropTypes.instanceOf(Array),
  title: PropTypes.string,
  uniqueName: PropTypes.string.isRequired,
  productsPerView: PropTypes.number,
  variant: PropTypes.oneOf(variantsSet),
  url: PropTypes.string,
  onAddCartClick: PropTypes.func
};

ProductsSection.defaultProps = {
  className: '',
  products: [],
  title: '',
  productsPerView: 3,
  variant: 'primary',
  url: '',
  onAddCartClick: () => {}
};
export default ProductsSection;
