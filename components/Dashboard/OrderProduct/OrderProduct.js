import PropTypes from 'prop-types';
import Image from 'next/image';
import { FarmerIcon } from '@/components/Vectors/FarmerIcon';
import { SVG } from '@/components/Base/SVG';
import clsx from 'clsx';
import { useTranslations } from '@/next-intl/useTranslations';
import { Button } from '@/components/Base/Button';
import { Popup } from '@/components/Base/Popup';
import { ReviewPopup } from './components';

const OrderProduct = ({ className, product, orderCode, canWriteReview }) => {
  const totalCount = product.quantity * product.pieces;

  const isSaled = product.unitCost !== product.saleCost;

  const t = useTranslations(['order', 'reviews']);

  const writeReviewPopup = React.useRef(null);

  const reviewWriteClickHandler = () => {
    writeReviewPopup.current.open();
  };

  return (
    <div className={clsx(className, 'px-3-0 pt-3-0 pb-4-0')}>
      <div className="singleorder-custom-grid font-md md:text-1-6 text-2-6">
        <div className="md:col-span-3 col-span-2 mt-3-0">
          <div className="flex product">
            <div className="md:w-1/4 w-30-percent bg-black">
              {product.image && (
                <Image
                  src={process.env.STATIC_RESOURCES_URL.concat(product.image)}
                  alt={product.productTitle}
                  width={124}
                  height={76}
                  loading="eager"
                  objectFit="cover"
                  layout="responsive"
                />
              )}
            </div>
            <div className="md:ml-1-8 ml-3-0">
              <div>{product.productTitle}</div>
              <div className="font-lt mt-1-6">
                <SVG src={FarmerIcon} className="md:w-1-7 w-2-3 inline mr-1-4" />
                {product.farmerFullName}
              </div>
            </div>
          </div>
        </div>
        <div className="md:mt-0 mt-3-0">
          <div>{t('quantity')}</div>
          <div className="p-1-2 bg-body-bg w-mc rounded-4-0 md:text-1-8 text-2-6 mt-2-0">{`${totalCount} ${product.unitTitle}`}</div>
        </div>
        <div className="md:mt-0 mt-3-0">
          <div>{t('price')}</div>
          <div className="md:text-2-0 text-2-6 mt-2-5">
            <p className={clsx({ 'line-through text-1-8 text-grey': isSaled })}>
              {(product.quantity * product.unitCost)?.toFixed(2)} ₾
            </p>
            {isSaled && <p className="text-red">{(product.quantity * product.saleCost)?.toFixed(2)} ₾</p>}
          </div>
        </div>
      </div>
      {canWriteReview && (
        <Button
          size="custom"
          className="md:h-5-0 h-7-0 bg-lightblue text-blue md:ml-auto md:w-mc w-full hover:opacity-80 duration-150 mr-5-0 md:mt-0 mt-3-0 md:text-1-6 text-2-6"
          onClick={reviewWriteClickHandler}
        >
          {t('reviews.writeReview')}
        </Button>
      )}
      <Popup ref={writeReviewPopup} className="md:w-76-5 md:h-90-percent w-full h-full">
        <ReviewPopup onClose={() => writeReviewPopup.current.close()} product={product} orderCode={orderCode} />
      </Popup>
    </div>
  );
};

OrderProduct.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string,
  orderCode: PropTypes.string.isRequired,
  canWriteReview: PropTypes.bool
};

OrderProduct.defaultProps = {
  product: {},
  className: '',
  canWriteReview: false
};

export default OrderProduct;
