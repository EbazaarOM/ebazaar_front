import { DeleteIcon } from '@/components/Vectors/DeleteIcon';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FarmerIcon } from '@/components/Vectors/FarmerIcon';
import { Count } from '@/components/Products/ProductDetails/components';
import { useTranslations } from '@/next-intl/useTranslations';
import { SVG } from '../SVG';

const SingleCartItem = ({ className, product, onQuantityUpdate, onDeleteClick }) => {
  const t = useTranslations(['common', 'order']);

  const [loading, setLoading] = React.useState(false);

  const totalCount = (product.quantity * product.pieces).toFixed(2);

  const delIcon = (
    <SVG
      src={DeleteIcon}
      className="md:w-1-9 w-2-6 text-grey hover:text-black ml-auto cursor-pointer duration-150"
      onClick={onDeleteClick}
    />
  );

  const quantityUpdateHandler = async (count) => {
    setLoading(true);
    await onQuantityUpdate(product.code, count);
    setLoading(false);
  };

  const countNode = (
    <>
      <div className="mb-2-0 md:text-2-0 text-2-6">
        {t('count')} ({totalCount} {product.unit}):
      </div>
      <Count
        variant="secondary"
        className="mt-1-5"
        count={product.quantity}
        max={100}
        onChange={quantityUpdateHandler}
        disabled={loading}
      />
      {totalCount > product.stockCount && product.stockCount !== 0 && (
        <div className="mt-1-0 text-red text-1-6">{t('order.notEnoughInStock')}</div>
      )}
      {product.stockCount === 0 && <div className="mt-1-0 text-red md:text-1-6 text-2-4">{t('order.outOfStock')}</div>}
    </>
  );

  return (
    <div className={clsx(className, 'md:pb-3-0 pb-4-0 border-b border-grey-200 md:pr-5-5 pr-3-0 font-md')}>
      <div className="flex">
        <div className="md:w-1/4 w-40-percent mr-3-0">
          <Image
            src={process.env.STATIC_RESOURCES_URL.concat(product.image)}
            alt="Gallery"
            width={368}
            height={227}
            loading="eager"
            objectFit="cover"
            layout="responsive"
          />
        </div>
        <div className="md:flex flex-1">
          <div className="md:w-1/3 md:mr-3-0">
            <div className=" flex items-center justify-between">
              <div className="md:text-2-4 text-2-6 mr-3-0 md:mr-0">{product.title}</div>
              <div className="md:hidden">{delIcon}</div>
            </div>
            <div className="md:mt-2-6 mt-1-0 font-lt md:text-1-8 text-2-6">
              <SVG src={FarmerIcon} className="inline md:w-1-7 w-2-3 mr-1-7" />
              {product.farmer}
            </div>
          </div>
          <div className="w-1/3 mr-3-0 md:block hidden">{countNode}</div>
          <div className="md:w-1/6 md:mr-3-0 md:block flex items-center">
            <div className="md:mb-3-0 md:text-2-0 text-2-6">{t('price')}</div>
            <div className="md:ml-0 ml-1-0 md:text-2-0 text-3-0">
              <p className={clsx({ 'line-through md:text-1-8 text-2-6 text-grey': product.saleActive })}>
                {(product.quantity * product.unitCost)?.toFixed(2)} ₾
              </p>
              {product.saleActive && <p className="text-red">{(product.quantity * product.saleCost)?.toFixed(2)} ₾</p>}
            </div>
          </div>
          <div className="flex-1 md:flex hidden items-center w-1/6">{delIcon}</div>
        </div>
      </div>
      <div className="ml-auto w-mc mt-1-0 md:hidden">{countNode}</div>
    </div>
  );
};

SingleCartItem.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object,
  onQuantityUpdate: PropTypes.func,
  onDeleteClick: PropTypes.func
};

SingleCartItem.defaultProps = {
  className: '',
  product: {},
  onQuantityUpdate: () => {},
  onDeleteClick: () => {}
};

export default SingleCartItem;
