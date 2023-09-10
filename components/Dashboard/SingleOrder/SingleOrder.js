import clsx from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';
import { addMultipleCartItem } from '@/api/orders/cart';
import { getInvoice } from '@/api/orders/orders';
import { Accordion, AccordionDetails, AccordionSummary } from '@/components/Base/Accordion';
import { ArticleTools } from '@/components/Base/ArticleTools';
import { Button } from '@/components/Base/Button';
import { SVG } from '@/components/Base/SVG';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import { loadCartPreview } from '@/store/actions/products.action';
import { PinIcon } from '@/components/Vectors/PinIcon';
import { OrderProduct } from '../OrderProduct';

const paymentType = {
  Cash: 'cash',
  Card: 'card',
  Partial: 'partial'
};

const reviewWritableOrderStatuses = ['Delivered', 'PartiallyDelivered', 'PartiallyReturned'];

// eslint-disable-next-line react/prop-types
const Col = ({ className, title, value }) => {
  return (
    <div className={clsx(className, 'md:text-1-6 text-2-6 md:block flex items-start md:mb-0 mb-1-0')}>
      <div className="font-md">{title}</div>
      <div className="mr-1-0 md:hidden font-md">:</div>
      <div className="font-lt md:mt-2-0">{value}</div>
    </div>
  );
};

const SingleOrder = ({ className, order, isJuridical }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const dispatch = useDispatch();

  const t = useTranslations(['common', 'order', 'orderStatuses']);
  const router = useRouter();

  const reorderClickHandler = async () => {
    if (order.products && order.products.length > 0) {
      setBtnDisabled(true);
      try {
        await addMultipleCartItem(order.products.map((x) => ({ code: x.code, quantity: x.quantity || 1 })));
        dispatch(loadCartPreview(true));
        router.push('/cart');
      } catch (error) {
        console.log(error);
      }
      setBtnDisabled(false);
    }
  };

  const downloadInvoice = async () => {
    try {
      const blob = await getInvoice(order.code);
      saveAs(blob, `Invoice#${order.code}`);
    } catch (error) {
      console.log(error);
    }
  };

  const canWriteReview = reviewWritableOrderStatuses.indexOf(order.orderStatus) > -1;

  return (
    <Accordion expanded={expanded} className={clsx(className, 'border border-grey-200')}>
      <AccordionSummary
        className="px-3-0 md:py-3-0 py-4-5 hover:bg-body-bg group duration-150 cursor-pointer relative"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="singleorder-custom-grid">
          <Col title={t('order.orderNumber')} value={`#${order.code}`} />
          <Col title={t('order.date')} value={dayjs(order.createDate).format('DD/MM/YYYY')} />
          <Col title={t('order.sum')} value={(order.totalCost + order.deliveryCost)?.toFixed(2)} />
          <Col title={t('order.paymentMethod')} value={t(`order.${paymentType[order.paymentType]}`)} />
          <Col title={t('order.status')} value={t(`orderStatuses.${order.orderStatus}`)} />
          <div className={clsx(className, 'md:text-1-6 text-2-6 md:block flex items-start md:mb-0 mb-1-0')}>
            <div className="font-md md:block hidden">{t('order.open')}</div>
            <div className="bg-body-bg md:w-3-0 md:h-3-0 w-4-8 h-4-8 rounded-full group-hover:bg-grey-200 duration-150 items-center justify-center m-auto md:mt-2-0 flex md:static absolute top-4-0 right-3-0">
              <SVG
                src={ArrowDownIcon}
                className={clsx({ 'rotate-180': expanded }, 'transform md:w-1-0 w-1-3 duration-200')}
              />
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails className="border-t border-grey-200">
        {order.products &&
          order.products.map((x) => (
            <OrderProduct
              className="border-b border-grey-200"
              product={x}
              key={x.id}
              orderCode={order.code}
              canWriteReview={canWriteReview}
            />
          ))}
        <div className="px-3-0 pt-3-0 pb-4-0">
          <div className="singleorder-custom-grid md:text-1-6 text-2-6">
            {order.promoCodeUsed && (
              <div className="md:mb-0 mb-3-0 md:col-span-6">
                <div className="font-md">{t('order.promoCode')}</div>
                <div className="md:mt-3-0 mt-2-0 font-lt">{order.promoCode}</div>
              </div>
            )}
            <div className="md:col-span-3">
              <div className="font-md flex items-center">
                <SVG src={PinIcon} className="md:mr-1-0 mr-1-8 md:w-1-8 w-2-8" />
                {t('order.deliveryAddress')}
              </div>
              <div className="md:mt-3-0 mt-2-0 font-lt">{order.deliveryAddress}</div>
            </div>
            <div className="md:mt-0 mt-3-0">
              <div className="font-md">{t('order.deliveryDate')}</div>
              <div className="md:mt-3-0 mt-2-0 font-lt">{dayjs(order.dateOfArrival).format('DD/MM/YYYY') || '--'}</div>
            </div>
            <div className="md:mt-0 mt-3-0 md:col-span-2">
              <div className="font-md">{t('order.deliveryPrice')}</div>
              <div className="md:mt-3-0 mt-2-0 font-lt">{order.deliveryCost?.toFixed(2)} ₾</div>
            </div>
            <div className="md:mt-0 mt-3-0">
              <div className="font-md">{t('share')}</div>
              <ArticleTools
                className="md:mt-3-0 mt-2-0"
                url={process.env.FRONTEND_URL.concat(`orders/${order.id}`)}
                quote={t('order.orderShareText')}
              />
            </div>
          </div>
          <div className="md:pr-3-0 mt-5-0 flex items-center">
            {isJuridical && (
              <Button
                size="sm"
                className="bg-lightblue text-blue md:w-mc w-full hover:opacity-80 duration-150"
                onClick={downloadInvoice}
                disabled={btnDisabled || process.env.BUY_BTN_DISABLED}
              >
                {t('order.downloadInvoice')}
              </Button>
            )}

            <Button
              className="bg-blue text-white md:ml-auto md:w-mc w-full hover:opacity-80 duration-150"
              onClick={reorderClickHandler}
              disabled={btnDisabled || process.env.BUY_BTN_DISABLED}
            >
              {t('order.reorder')}
            </Button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

SingleOrder.propTypes = {
  className: PropTypes.string,
  order: PropTypes.object,
  isJuridical: PropTypes.bool
};

SingleOrder.defaultProps = {
  className: '',
  order: {},
  isJuridical: false
};

export default SingleOrder;
