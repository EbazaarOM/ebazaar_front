import { Button } from '@/components/Base/Button';
import { Location } from '@/components/Base/Location';
import { PriceTag } from '@/components/Base/PriceTag';
import { SVG } from '@/components/Base/SVG';
import { EyeIcon } from '@/components/Vectors/EyeIcon';
import { FarmerIcon } from '@/components/Vectors/FarmerIcon';
import { HeartIcon } from '@/components/Vectors/HeartIcon';
import { ShoppingBagIcon } from '@/components/Vectors/ShoppingBagIcon';
import { ShoppingCartIcon } from '@/components/Vectors/ShoppingCartIcon';
import { StarIcon } from '@/components/Vectors/StarIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import { generateFullAddress } from '@/utils/generateFullAddress';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Count } from './components';

const btnBaseClassSet = 'w-full group duration-150 hover:bg-transparent border';

const ProductDetails = ({ className, details, onCartClick, onWishlistClick, onBuyClick }) => {
  const [count, setCount] = React.useState(1);
  const t = useTranslations();

  const totalPrice = count * (details.saleActive ? details.saleCost : details.unitCost);
  const totalPieces = Math.round(count * details.pieces * 100) / 100;
  const farmerData = details.farmerData || {};
  const fullAddress = generateFullAddress(farmerData.address);

  return (
    <div className={clsx(className, '')}>
      <div className="font-rm flex items-center justify-between">
        <div className="md:text-2-0 text-2-8">ID: {details.code}</div>
        <div className="text-1-8 md:flex items-center hidden">
          <SVG src={EyeIcon} className="w-2-2 mr-1-4" />
          {details.views}
        </div>
        {!!details.rating && (
          <div className="md:hidden flex items-center md:text-3-0 text-3-6">
            <SVG src={StarIcon} className="w-4-0 mr-1-4 text-yellow" />
            {details.rating?.toFixed(1)}
          </div>
        )}
      </div>
      <div className="md:mt-2-0 mt-2-5 font-rm md:text-3-0 text-3-6 flex items-center just justify-between">
        <div className="md:mr-3-0">{details.title}</div>
        {!!details.rating && (
          <div className="md:flex hidden items-center">
            <SVG src={StarIcon} className="w-4-0 mr-1-4 text-yellow" />
            {details.rating?.toFixed(1)}
          </div>
        )}
      </div>
      <div className="md:flex md:mt-2-1 mt-3-0 border-b border-grey-300 md:pb-4-0 pb-6-0">
        <div className="flex-1 md:flex md:flex-col md:justify-between">
          <PriceTag value={details.unitCost} saleCost={details.saleActive ? details.saleCost : null} size="xl" />
          <div className="mt-3-0">
            <p className="font-md md:text-1-8 text-3-8">
              {t('count')} ( {totalPieces} {details.unit && details.unit.title} ):
            </p>
            <Count
              className="md:mt-1-5 mt-3-0"
              count={count}
              max={Math.floor(details.stockCount / details.pieces)}
              onChange={setCount}
            />
          </div>
        </div>
        <div className="md:ml-4-0 md:w-50-percent md:mt-0 mt-5-0 flex flex-col">
          <Button
            size="xxl"
            className={clsx(
              btnBaseClassSet,
              'bg-yellow border-yellow text-white hover:text-black md:mt-0 mt-4-0 md:order-1 order-3'
            )}
            onClick={() => onCartClick(count)}
          >
            <SVG src={ShoppingCartIcon} className="md:w-2-1 w-2-4 mr-1-6 group-hover:text-yellow" />
            <span className="md:text-2-0 text-2-8">{t('addToCart')}</span>
          </Button>
          <Button
            size="xxl"
            className={clsx(btnBaseClassSet, 'bg-red border-red text-white hover:text-black md:mt-2-0 mt-4-0 order-2')}
            onClick={onWishlistClick}
          >
            <SVG src={HeartIcon} className="md:w-2-2 w-3-4 mr-1-6 group-hover:text-red" />
            <span className="md:text-2-0 text-2-8">{t('addToWishlist')}</span>
          </Button>
          <Button
            size="xxl"
            disabled={process.env.BUY_BTN_DISABLED}
            className={clsx(
              btnBaseClassSet,
              'bg-green border-green text-white hover:text-black md:mt-2-0 md:order-3 order-1'
            )}
            onClick={() => onBuyClick(count)}
          >
            <SVG src={ShoppingBagIcon} className="md:w-2-0 w-3-0 mr-1-6 group-hover:text-green" />
            <span className="md:text-2-0 text-2-8">
              {t('buy')} ( {totalPrice.toFixed(2)} ₾ )
            </span>
          </Button>
        </div>
      </div>
      <div className="md:flex items-center mt-4-2">
        <div className="font-rm md:text-1-8 text-2-8 md:px-2-1 px-3-0 md:py-0-9 py-1-2 bg-green-100 text-green rounded-40-0 mr-10-0 w-mc">
          {t('inStock')}: {details.stockCount} {details.unit && details.unit.title}
        </div>
        <div className="flex-1 md:justify-end flex md:mt-0 mt-4-0">
          <Location address={fullAddress} className="mr-4-0" />
          <div className="flex items-start">
            <SVG src={FarmerIcon} className="md:w-2-0 w-2-5 mr-1-6 h-auto mt-0-5" />
            <span className="md:text-2-0 text-2-6 font-lt flex-1">
              {farmerData.commercialName || `${farmerData.firstName || ''} ${farmerData.lastName || ''}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  className: PropTypes.string,
  details: PropTypes.object,
  onCartClick: PropTypes.func,
  onWishlistClick: PropTypes.func,
  onBuyClick: PropTypes.func
};

ProductDetails.defaultProps = {
  className: '',
  details: {},
  onCartClick: () => {},
  onWishlistClick: () => {},
  onBuyClick: () => {}
};

export default ProductDetails;
