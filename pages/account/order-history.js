import { useSelector } from 'react-redux';
import { useOrders } from '@/api/orders/swr';
import { Pagination } from '@/components/Base/Pagination';
import { SingleOrder } from '@/components/Dashboard/SingleOrder';
import { DashboardLayout } from '@/components/Layouts/DashboardLayout';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useTranslations } from '@/next-intl/useTranslations';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';

const PER_PAGE = 6;

const OrderHistory = () => {
  const t = useTranslations(['dashboard']);
  useBreadcrumbDispatcher([{ href: '/account/order-history', title: t('orderHistory') }]);
  const [page, setPage] = React.useState(1);
  const { items, total } = useOrders({ take: PER_PAGE, skip: (page - 1) * PER_PAGE });
  // prefetch
  useOrders({ take: PER_PAGE, skip: page * PER_PAGE });
  const mounted = useIsMounted();

  const scrollToRef = React.useRef(null);

  React.useEffect(() => {
    if (mounted) {
      scrollToRef.current.scrollIntoView();
    }
  }, [page]);

  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <HeaderTagsRenderer title={t('orderHistory')} />
      <div className="md:px-6-0 px-4-0 pt-4-0 pb-6-0 bg-white h-full" ref={scrollToRef}>
        <div className="md:text-2-0 text-2-6 font-md">{t('orderHistory')}</div>
        {items && items.length > 0 && (
          <div className="mt-5-0">
            {items.map((x) => (
              <SingleOrder className="mb-3-0" key={x.id} order={x} isJuridical={userInfo.isJuridical} />
            ))}
            {total > PER_PAGE && (
              <div className="mt-6-0 flex justify-end">
                <Pagination page={page} onPageChange={setPage} pageCount={total / PER_PAGE} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

OrderHistory.getLayout = DashboardLayout.getLayout();

OrderHistory.localeNamespaces = ['order', 'reviews', 'orderStatuses'];

export default OrderHistory;
