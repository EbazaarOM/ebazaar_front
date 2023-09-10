import { PageLayout } from '@/components/Layouts/PageLayout';
import { Pagination } from '@/components/Base/Pagination';
import { useRouter } from 'next/router';
import { ProductsRenderer } from '@/components/Products/ProductsRenderer';
import { signInStatus } from '@/utils/constants/signInStatus';
import { fetchWishlist } from '@/utils/product/wishlist';
import { useTranslations } from '@/next-intl/useTranslations';
import { useSelector, useDispatch } from 'react-redux';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';

import { deleteWishlistItemAction } from '@/store/actions/products.action';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';

const PER_PAGE = 12;

const WishlistPage = () => {
  const t = useTranslations();
  useBreadcrumbDispatcher([{ href: '/wishlist', title: t('wishlist') }]);

  const dispatch = useDispatch();

  const [{ items: wishlist, total }, setWishlist] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const { userSignInStatus } = useSelector((state) => state.user);
  const isSignedIn = userSignInStatus === signInStatus.SIGNED_IN;

  const router = useRouter();
  const page = +router.query.page || 1;
  const options = React.useMemo(
    () => ({
      take: PER_PAGE,
      skip: PER_PAGE * (page - 1)
    }),
    [page]
  );

  const refetchWishlist = async () => {
    setLoading(true);
    const data = await fetchWishlist(isSignedIn, options);
    setWishlist(data);
    setLoading(false);
  };

  const deleteHandler = async (code) => {
    await dispatch(deleteWishlistItemAction(isSignedIn, code));
    const data = await fetchWishlist(isSignedIn, options);
    setWishlist(data);
  };

  React.useEffect(() => {
    if (userSignInStatus !== signInStatus.LOADING) {
      refetchWishlist();
    }
  }, [userSignInStatus, options]);

  return (
    <>
      <HeaderTagsRenderer title={t('wishlist')} />
      <div className="md:py-4-0 pb-5-0 font-md text-3-6 border-b border-grey-200 upper">{t('wishlist')}</div>
      <ProductsRenderer
        className="grid md:grid-cols-4 grid-cols-2 gap-x-3-0 gap-y-4-5 md:mt-6-8 mt-5-0"
        items={wishlist}
        total={total}
        loading={loading}
        isWishlistPage
        removeFromWishlistPage={deleteHandler}
        perRow={4}
      />
      {total > PER_PAGE && (
        <div className="mt-6-8 flex justify-end">
          <Pagination
            page={page}
            onPageChange={(nextPage) =>
              router.push({ pathname: router.pathname, query: { ...router.query, page: nextPage } }, undefined, {
                shallow: true,
                scroll: true
              })
            }
            pageCount={total / PER_PAGE}
            color="secondary"
          />
        </div>
      )}
    </>
  );
};

WishlistPage.getLayout = PageLayout.getLayout({ hasShare: false });

export default WishlistPage;
