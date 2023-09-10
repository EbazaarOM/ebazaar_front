import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { PageLayout } from '@/components/Layouts/PageLayout';
import { signInStatus } from '@/utils/constants/signInStatus';
import { CheckoutProductsTable } from '@/components/Checkout/CheckoutProductsTable';
import { CheckoutSum } from '@/components/Checkout/CheckoutSum';
import { getCartProductsByCodes } from '@/api/products/products';
import { checkoutCart, checkoutSingle } from '@/api/orders/checkout';
import { Popup } from '@/components/Base/Popup';
import { BaseError } from '@/models/BaseError';
import { firstLetterToLowerCase } from '@/utils/stringManipulation';
import { CheckoutErrorRenderer } from '@/components/Checkout/CheckoutErrorRenderer';
import { fetchCart } from '@/utils/product/cart';
import { useTranslations } from '@/next-intl/useTranslations';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { setAuthPopupStatus } from '@/store/actions/base.action';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import { getDeliveryDate } from '@/utils/getDeliveryDate';
import { PromoCode } from '@/components/Checkout/PromoCode';
import { CheckoutUserInfo } from '@/components/Checkout/CheckoutUserInfo';

const PRODUCT_PER_VIEW = 10;

const errorHandler = (error, setter) => {
  if (error.data?.errors) {
    const errs = error.data.errors.map((x) => new BaseError(firstLetterToLowerCase(x.key), x.value));
    setter(errs);
  } else {
    setter([new BaseError('Error', 'Error')]);
  }
};

const CheckoutPage = () => {
  const t = useTranslations(['common', 'order']);
  useBreadcrumbDispatcher([{ href: '/cart/checkout', title: t('order.checkout') }]);

  const { userSignInStatus } = useSelector((state) => state.user);
  const isUserSignedIn = userSignInStatus === signInStatus.SIGNED_IN;
  const isUserSignedOut = userSignInStatus === signInStatus.SIGNED_OUT;

  const dispatch = useDispatch();
  const [cart, setCart] = React.useState({});
  const [errors, setErrors] = React.useState([]);
  const [cartPage, setCartPage] = React.useState(1);

  const [promoCode, setPromoCode] = React.useState('');
  const [promoCodeErrors, setPromoCodeErrors] = React.useState([]);
  const [isValidPromoCode, setIsValidPromoCode] = React.useState(false);

  const userProfileRef = React.useRef(null);
  const { userInfo } = useSelector((state) => state.user);

  const router = useRouter();
  const { code: productCode, quantity } = router.query;

  React.useEffect(() => {
    if (isUserSignedOut) {
      dispatch(setAuthPopupStatus(true));
    }
  }, [isUserSignedOut]);

  const loadSingleProduct = async (promoCode) => {
    const res = await getCartProductsByCodes([{ code: productCode, quantity }], { take: -1, promoCode });
    setCart({ items: res.data, meta: res.meta || {} });
  };

  const loadCart = async (promoCode) => {
    const data = await fetchCart(isUserSignedIn, {
      take: PRODUCT_PER_VIEW,
      skip: PRODUCT_PER_VIEW * (cartPage - 1),
      promoCode
    });
    setCart(data);
  };

  const loadCartInfo = async (promoCode = '') => {
    try {
      if (productCode) {
        await loadSingleProduct(promoCode);
      } else if (userSignInStatus !== signInStatus.LOADING) {
        await loadCart(promoCode);
      }
      if (promoCode && !isValidPromoCode) {
        setIsValidPromoCode(true);
        if (promoCodeErrors && promoCodeErrors.length > 0) {
          setPromoCodeErrors([]);
        }
      }
    } catch (error) {
      if (promoCode) {
        errorHandler(error, setPromoCodeErrors);
      } else {
        setCart({ items: [], meta: {} });
      }
    }
  };

  React.useEffect(() => {
    loadCartInfo(isValidPromoCode ? promoCode : '');
  }, [userSignInStatus, productCode, cartPage]);

  const checkout = async (isCash) => {
    try {
      const { pay, success, code } = productCode
        ? await checkoutSingle({
            product_code: productCode,
            quantity,
            cash: isCash,
            promoCode: isValidPromoCode ? promoCode : ''
          })
        : await checkoutCart({ cash: isCash, promoCode: isValidPromoCode ? promoCode : '' });
      if (!success) {
        setErrors([new BaseError('Error', 'Error')]);
      } else {
        const items = cart.items?.map((product) => ({
          item_id: product.code,
          item_name: product.title,
          currency: 'GEL',
          discount: product.saleActive ? product.unitCost - product.saleCost : 0,
          item_category: product.categoryTitle,
          price: product.unitCost,
          quantity: product.quantity
        }));
        dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
        dataLayer.push({
          event: 'begin_checkout',
          user_id: userInfo ? userInfo.nameid : '',
          ecommerce: {
            items
          }
        });
      }
      return { success, pay, code };
    } catch (error) {
      errorHandler(error, setErrors);
      return { success: false };
    }
  };

  const checkoutValidator = async (cb) => {
    if (isUserSignedOut) {
      dispatch(setAuthPopupStatus(true));
    } else if (!userProfileRef.current.isCheckoutFieldsFilled()) {
      setErrors([new BaseError('Error', 'FillAllFields')]);
    } else {
      await cb();
    }
  };

  const cashClickHandler = async () => {
    const { success, code } = await checkout(true);
    if (success && code) {
      const lang = router.locale === 'ka' ? '' : '/en';
      window.location.href = `${process.env.FRONTEND_URL}${lang}/cart/checkout/success/${code}`;
    }
  };

  const cardClickHandler = async () => {
    const { pay, success } = await checkout(false);
    if (success && pay) {
      const {
        response: { transactionUrl }
      } = pay;
      window.location.href = transactionUrl;
    }
  };

  const promoCodeChangeHandler = (val) => {
    setPromoCode(val.toUpperCase());
    if (promoCodeErrors && promoCodeErrors.length > 0) {
      setPromoCodeErrors([]);
    }
  };

  return (
    <>
      <HeaderTagsRenderer title={t('order.checkout')} />
      {cart && cart.meta?.total > 0 && (
        <div className="flex md:flex-row flex-col">
          <div className="flex-1 md:order-1 order-2 md:mt-0 mt-5-0">
            {isUserSignedIn && (
              <div className="bg-white mb-4-0 pt-4-0 pb-5-0">
                <div className="md:px-6-0 px-4-0 mb-4-0 flex items-center justify-between">
                  <p className="text-2-0 font-md upper">{t('order.finishAuth')}</p>
                </div>
                <CheckoutUserInfo ref={userProfileRef} />
              </div>
            )}
            {Object.keys(cart).length > 0 && (
              <CheckoutProductsTable
                data={cart}
                page={cartPage}
                onPageChange={setCartPage}
                perView={PRODUCT_PER_VIEW}
              />
            )}
          </div>
          <div className="md:w-23-5-percent md:ml-3-0 md:sticky md:top-8-0 h-mc md:order-2 order-1">
            <CheckoutSum
              deliveryCost={cart.meta?.deliveryCost || 0}
              realDeliveryCost={cart.meta?.realDeliveryCost || 0}
              totalCost={cart.meta?.totalCost || 0}
              totalRealCost={cart.meta?.totalRealCost || 0}
              deliveryDate={getDeliveryDate()}
              onCashClick={() => checkoutValidator(cashClickHandler)}
              onCardClick={() => checkoutValidator(cardClickHandler)}
            />
            {isUserSignedIn && (
              <PromoCode
                onAddClick={loadCartInfo}
                errors={promoCodeErrors}
                promoCode={promoCode}
                setPromoCode={promoCodeChangeHandler}
                isValidPromoCode={isValidPromoCode}
              />
            )}
          </div>
          <Popup isOpened={errors.length > 0} onClose={() => setErrors([])}>
            <CheckoutErrorRenderer errors={errors} onClose={() => setErrors([])} />
          </Popup>
        </div>
      )}
    </>
  );
};

CheckoutPage.getLayout = PageLayout.getLayout({ hasShare: false });

CheckoutPage.localeNamespaces = ['order'];

export default CheckoutPage;
