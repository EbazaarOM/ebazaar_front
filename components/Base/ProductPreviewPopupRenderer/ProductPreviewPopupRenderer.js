import PropTypes from 'prop-types';
import Image from 'next/image';
import { XIcon } from '@/components/Vectors/XIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import { Button } from '../Button';
import { RouterLink } from '../RouterLink';
import { SVG } from '../SVG';

const ProductPreviewPopupRenderer = ({ product, onClose }) => {
  const t = useTranslations();
  return (
    <div className="bg-white modal">
      <div className="md:pt-0 pt-5-0 md:px-0 px-5-0 md:absolute top-2-0 right-2-0">
        <SVG
          src={XIcon}
          className="md:w-2-0 w-3-4 cursor-pointer transform hover:rotate-90 duration-200 ml-auto"
          onClick={onClose}
        />
      </div>
      <div className="px-5-0 md:py-3-0 py-4-0 text-center border-b border-grey-200">
        <div className="md:w-40-percent w-70-percent m-auto">
          <Image
            src={process.env.STATIC_RESOURCES_URL.concat(product.image)}
            alt={product.title}
            width={244}
            height={151}
            loading="eager"
            objectFit="cover"
            layout="responsive"
          />
        </div>
        <div className="md:mt-2-0 mt-4-0 font-rm md:text-1-8 text-2-8">{product.title}</div>
      </div>
      <div className="px-5-0 pt-4-0 md:pb-5-0 pb-6-7 flex flex-col items-center">
        <div className="font-md md:text-2-0 text-3-0">{t('productSuccessfullyAdded')}</div>
        <RouterLink href={product.isCart ? '/cart' : '/wishlist'} className="block md:mt-2-0 mt-4-0">
          <Button
            px="px-7-0"
            size="md"
            className="bg-blue hover:bg-white text-white hover:text-blue border border-blue"
          >
            {product.isCart ? t('seeCart') : t('seeWishlist')}
          </Button>
        </RouterLink>
      </div>
      <style jsx>{`
        .modal {
          box-shadow: 0px 4px 44px rgba(167, 167, 167, 0.22);
          width: 56rem;
        }
        @media only screen and (max-width: 768px) {
          .modal {
            width: calc(100vw - 10rem);
          }
        }
      `}</style>
    </div>
  );
};

ProductPreviewPopupRenderer.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func
};

ProductPreviewPopupRenderer.defaultProps = {
  product: {},
  onClose: () => {}
};

export default ProductPreviewPopupRenderer;
