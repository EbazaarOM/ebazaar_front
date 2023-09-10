import clsx from 'clsx';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button } from '@/components/Base/Button';
import { SVG } from '@/components/Base/SVG';
import { CarIcon } from '@/components/Vectors/CarIcon';
import { ShoppingBagIcon } from '@/components/Vectors/ShoppingBagIcon';
import { useTranslations } from '@/next-intl/useTranslations';

const row = 'flex items-center justify-between md:mb-1-6 mb-4-0 last:mb-0';

const totalClassSet = 'md:text-2-0 text-2-6 whitespace-nowrap';
const realTotalClassSet = 'md:text-1-6 text-2-2 text-grey line-through whitespace-nowrap';

const CheckoutSum = ({
  deliveryCost,
  realDeliveryCost,
  totalCost,
  totalRealCost,
  deliveryDate,
  onCashClick,
  onCardClick
}) => {
  const t = useTranslations(['order']);
  const { userInfo } = useSelector((state) => state.user);

  const [cashLoading, setCashLoading] = React.useState(false);
  const [cardLoading, setCardLoading] = React.useState(false);

  const cashClickHandler = async () => {
    setCashLoading(true);
    await onCashClick();
    setCashLoading(false);
  };

  const cardClickHandler = async () => {
    setCardLoading(true);
    await onCardClick();
    setCardLoading(false);
  };

  return (
    <div className="bg-white">
      <div className="h-10-0 flex items-center px-4-0 border-b border-grey-200 md:text-2-0 text-2-6 font-md upper">
        {t('sumUp')}
      </div>
      <div className="px-4-0 md:py-2-5 py-4-0 border-b border-grey-200 font-rm">
        <div className={row}>
          <div className="md:text-2-0 text-3-0">{t('productsSum')}:</div>
          <div className="leading-1-0 relative text-right">
            {totalCost !== totalRealCost && <div className={realTotalClassSet}>{totalRealCost?.toFixed(2)} ₾</div>}
            <div
              className={clsx(totalClassSet, {
                'text-red absolute right-0 top-100-percent': totalCost !== totalRealCost
              })}
            >
              {totalCost?.toFixed(2)} ₾
            </div>
          </div>
        </div>
        <div className={row}>
          <div className="md:text-2-0 text-3-0">{t('deliveryPrice')}:</div>
          <div className="leading-1-0 relative text-right">
            {deliveryCost !== realDeliveryCost && (
              <div className={realTotalClassSet}>{realDeliveryCost?.toFixed(2)} ₾</div>
            )}
            <div
              className={clsx(totalClassSet, {
                'text-red absolute right-0 top-100-percent': deliveryCost !== realDeliveryCost
              })}
            >
              {deliveryCost?.toFixed(2)} ₾
            </div>
          </div>
        </div>
        <div className={row}>
          <div className="font-bd md:text-2-0 text-3-0">{t('sum')}:</div>
          <div className="md:text-2-0 text-2-6">{(totalCost + deliveryCost)?.toFixed(2)} ₾</div>
        </div>
      </div>
      <div className="px-4-0 md:pt-2-1 pt-4-0 md:pb-2-0 pb-4-0 md:text-1-8 text-2-8">
        <Button
          disabled={cardLoading || process.env.BUY_BTN_DISABLED}
          size="xl"
          className="bg-green hover:bg-white text-white hover:text-green border border-green duration-150 w-full"
          onClick={cardClickHandler}
        >
          <SVG src={ShoppingBagIcon} className="md:w-1-6 w-2-4 mr-1-5" />
          <span className="md:text-1-8 text-2-8">{t('buyCard')}</span>
        </Button>
        <Button
          size="xl"
          className="bg-blue hover:bg-white text-white hover:text-blue border border-blue duration-150 w-full mt-3-0"
          onClick={cashClickHandler}
          disabled={cashLoading || process.env.BUY_BTN_DISABLED}
        >
          <span className="md:text-1-8 text-2-8">{t(userInfo?.isJuridical ? 'cashOrTransfer' : 'buyCash')}</span>
        </Button>
        {deliveryDate && (
          <div className={clsx(row, 'mt-3-5 text-green md:text-2-0 text-2-8')}>
            <div className="font-md flex items-center">
              <SVG src={CarIcon} className="md:w-3-2 w-4-0 md:mr-1-0 mr-2-0 text-red" />
              {t('deliveryDate')}:
            </div>
            <div className="md:font-bd font-lt">{dayjs(deliveryDate).format('DD/MM/YYYY')}</div>
          </div>
        )}
        <div className="md:font-lt font-rm mt-3-0">{t('deliveryText')}</div>
      </div>
    </div>
  );
};

CheckoutSum.propTypes = {
  deliveryCost: PropTypes.number.isRequired,
  realDeliveryCost: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
  totalRealCost: PropTypes.number.isRequired,
  deliveryDate: PropTypes.string,
  onCashClick: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired
};

CheckoutSum.defaultProps = {
  deliveryDate: '...'
};

export default CheckoutSum;
