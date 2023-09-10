import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { PageLayout } from '@/components/Layouts/PageLayout';
import { SingleCartItem } from '@/components/Base/SingleCartItem';
import { signInStatus } from '@/utils/constants/signInStatus';
import { fetchCart, updateCartProductQuantity } from '@/utils/product/cart';
import { Button } from '@/components/Base/Button';
import { RouterLink } from '@/components/Base/RouterLink';
import { Pagination } from '@/components/Base/Pagination';
import { useTranslations } from '@/next-intl/useTranslations';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { deleteCartItemAction, loadCartPreview } from '@/store/actions/products.action';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import { useRelatedProducts } from '@/api/orders/swr';
import { ProductsSection } from '@/components/HomePage/ProductsSection';

const PER_PAGE = 9;

const CartPage = () => {
  const t = useTranslations(['common', 'order']);
  useBreadcrumbDispatcher([{ href: '/cart', title: t('cart') }]);

  const dispatch = useDispatch();

  const [{ items = [], meta = {} }, setCart] = React.useState({});

  const { userSignInStatus } = useSelector((state) => state.user);
  const isSignedIn = userSignInStatus === signInStatus.SIGNED_IN;

  const { items: relatedProducts, mutate: mutateRelatedProducts } = useRelatedProducts({ take: 8 }, isSignedIn);

  const router = useRouter();
  const page = +router.query.page || 1;
  const options = React.useMemo(
    () => ({
      take: PER_PAGE,
      skip: PER_PAGE * (page - 1)
    }),
    [page]
  );

  const refetchCart = async (scroll = false) => {
    const data = await fetchCart(isSignedIn, options);
    setCart(data);
    if (scroll) {
      window.scrollTo(0, 0);
    }
  };

  const deleteHandler = async (code) => {
    await dispatch(deleteCartItemAction(isSignedIn, code));
    const data = await fetchCart(isSignedIn, options);
    setCart(data);
    mutateRelatedProducts();
  };

  const quantityUpdateHandler = async (code, quantity) => {
    await updateCartProductQuantity(isSignedIn, code, quantity);
    refetchCart();
    dispatch(loadCartPreview(isSignedIn));
  };

  React.useEffect(() => {
    if (userSignInStatus !== signInStatus.LOADING) {
      refetchCart(true);
    }
  }, [userSignInStatus, options]);

  return (
    <>
      <HeaderTagsRenderer title={t('cart')} />
      {items && items.length > 0 && (
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-3-0 gap-5-0">
          <div className="md:col-span-3">
            {items.map((x) => (
              <SingleCartItem
                className="md:mb-3-0 mb-4-0 last:mb-0"
                key={x.code}
                product={x}
                onQuantityUpdate={quantityUpdateHandler}
                onDeleteClick={() => deleteHandler(x.code)}
              />
            ))}
            {!!meta.total && meta.total > PER_PAGE && (
              <div className="mt-6-8 flex md:justify-center justify-end">
                <Pagination
                  page={page}
                  onPageChange={(nextPage) =>
                    router.push({ pathname: router.pathname, query: { ...router.query, page: nextPage } }, undefined, {
                      shallow: true
                    })
                  }
                  pageCount={meta.total / PER_PAGE}
                  color="secondary"
                />
              </div>
            )}
          </div>
          <div className="md:py-4-0 pt-4-0 pb-5-0 md:px-3-0 px-4-0 bg-white font-md md:text-1-8 text-2-8 h-mc md:sticky top-8-0 md:row-start-auto row-start-1">
            <p className="text-green md:pb-4-0 pb-4-0 border-b border-grey-200">{t('order.deliveryText')}</p>
            <div className="flex justify-between md:mt-1-7 mt-2-5">
              <p>{t('order.productCount')}: </p>
              <p>{meta.total}</p>
            </div>
            <div className="flex justify-between mt-2-8">
              <p className="md:text-1-8 text-3-0">{t('sum')}: </p>
              <p>{meta.totalCost?.toFixed(2)} ₾</p>
            </div>
            <RouterLink href="/cart/checkout">
              <Button
                className="bg-green border border-green hover:bg-white text-white hover:text-green duration-150 w-full mt-5-0"
                disabled={process.env.BUY_BTN_DISABLED}
              >
                {t('order.goToCheckout')}
              </Button>
            </RouterLink>
          </div>
        </div>
      )}
      {relatedProducts && relatedProducts.length > 0 && (
        <ProductsSection
          className="md:mt-10-0 mt-8-0"
          products={relatedProducts}
          title={t('order.relatedProductsTitle')}
          uniqueName="related-products"
          productsPerView={4}
          onAddCartClick={refetchCart}
        />
      )}
    </>
  );
};

CartPage.getLayout = PageLayout.getLayout({ hasShare: false });

CartPage.localeNamespaces = ['order'];

export default CartPage;
