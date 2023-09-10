/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getOrderByCode } from '@/api/orders/orders';
import { Button } from '@/components/Base/Button';
import { RouterLink } from '@/components/Base/RouterLink';
import { SVG } from '@/components/Base/SVG';
import { CircledTick } from '@/components/Vectors/CircledTick';
import { useTranslations } from '@/next-intl/useTranslations';
import { signInStatus } from '@/utils/constants/signInStatus';

const SuccessPage = () => {
  const router = useRouter();
  const { userSignInStatus } = useSelector((state) => state.user);
  const [order, setOrder] = React.useState({});
  const { userInfo } = useSelector((state) => state.user);

  const t = useTranslations(['order']);

  const fetchOrder = async () => {
    try {
      const res = await getOrderByCode(router.query.code);
      setOrder(res);

      const items = res.products?.map((product) => ({
        item_id: product.code,
        item_name: product.productTitle,
        currency: 'GEL',
        discount: product.unitCost - product.saleCost,
        item_category: product.categoryTitle,
        price: product.unitCost,
        quantity: product.quantity
      }));

      dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
      dataLayer.push({
        event: 'purchase',
        user_id: userInfo ? userInfo.nameid : '',
        ecommerce: {
          transaction_id: router.query.code,
          value: res.totalCost.toFixed(2),
          shipping: res.deliveryCost.toFixed(2),
          currency: 'GEL',
          items
        }
      });
    } catch (error) {
      router.push('/');
    }
  };

  React.useEffect(() => {
    if (userSignInStatus === signInStatus.SIGNED_IN) {
      fetchOrder();
    } else if (userSignInStatus === signInStatus.SIGNED_OUT) {
      router.push('/');
    }
  }, [userSignInStatus]);

  if (userSignInStatus !== signInStatus.SIGNED_IN && Object.keys(order).length <= 0) return null;

  return (
    <div className="md:mt-5-4 md:w-80-percent m-auto">
      <div className="md:bg-white">
        <div className="flex flex-col items-center pt-2-0 md:pb-4-0 pb-6-0 md:px-0 px-5-0">
          <div className="font-bd md:text-3-0 text-4-0 md:w-20-percent w-80-percent text-center">
            {t('orderAccepted')}
          </div>
          <SVG className="md:w-5-5 w-7-8 text-green md:mt-2-0 mt-4-0" src={CircledTick} />
          <div className="md:mt-2-0 mt-5-0 font-lt md:text-1-8 text-2-8 text-center md:w-50-percent">
            {t('orderSuccessDescription')}
          </div>
        </div>

        <div className="border-t border-grey-200 md:px-13-2 px-5-0 md:h-10-0 h-11-0 flex items-center justify-between md:text-2-0 text-2-8">
          <div className="font-md upper">{t('sumUp')}</div>
          <div className="font-rm">
            {t('orderNumber')}: {order.code}
          </div>
        </div>
        <div className="py-3-0 md:px-13-2 px-5-0 border-t border-grey-200">
          {order?.products &&
            order.products.map((x) => (
              <div key={x.id} className="grid grid-cols-12 items-center gap-3-0 md:text-2-0 text-2-8 mb-3-0 last:mb-0">
                <div className="font-rm md:col-span-2 col-span-6 md:row-start-auto row-start-1">ID: {x.code}</div>
                <div className="md:col-span-4 col-span-8 flex items-center md:row-start-auto row-start-2">
                  <img className="md:w-6-1 w-13-2" src={process.env.STATIC_RESOURCES_URL.concat(x.image)} alt="" />
                  <div className="ml-2-0 font-md">{x.productTitle}</div>
                </div>
                <div className="md:col-span-3 col-span-6 font-lt md:row-start-auto row-start-1">
                  {t('category')}: <strong>{x.categoryTitle}</strong>
                </div>
                <div className="md:col-span-3 col-span-4 text-right md:text-2-4 text-2-8 font-rm md:row-start-auto row-start-2">
                  {(x.saleCost * x.quantity)?.toFixed(2)} ₾
                </div>
              </div>
            ))}
        </div>
        <div className="border-t border-grey-200 md:px-13-2 px-5-0 md:h-10-0 flex md:flex-row flex-col items-center justify-between text-2-0">
          <div className="font-md md:text-1-6 text-2-4 md:w-50-percent md:text-left text-center md:order-1 order-2 md:mt-0 mt-5-0 text-red">
            {t('cancelText')}
            <a className="hover:underline text-blue" href="mailto:info@ebazaar.ge">
              Info@ebazaar.ge
            </a>
          </div>
          <div className="font-md ml-auto md:text-2-4 text-2-8 md:w-auto w-full md:order-2 order-1">
            {t('sum')}: {(order.totalCost + order.deliveryCost)?.toFixed(2)} ₾
          </div>
        </div>
      </div>
      <RouterLink href="/" className="mt-4-0 mx-auto w-mc block">
        <Button className="bg-blue hover:opacity-90 text-white duration-150">{t('goToHomepage')}</Button>
      </RouterLink>
    </div>
  );
};

SuccessPage.localeNamespaces = ['order'];

export default SuccessPage;
