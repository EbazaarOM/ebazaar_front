import { useMyFarmers } from '@/api/orders/swr';
import { Pagination } from '@/components/Base/Pagination';
import { SingleFarmer } from '@/components/Base/SingleFarmer';
import { DashboardLayout } from '@/components/Layouts/DashboardLayout';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useTranslations } from '@/next-intl/useTranslations';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';

const PER_PAGE = 6;

const MyFarmers = () => {
  const t = useTranslations(['dashboard', 'reviews']);
  useBreadcrumbDispatcher([{ href: '/account/reviews', title: t('myFarmers') }]);
  const [page, setPage] = React.useState(1);

  const mounted = useIsMounted();

  const scrollToRef = React.useRef(null);

  React.useEffect(() => {
    if (mounted) {
      scrollToRef.current.scrollIntoView();
    }
  }, [page]);

  const { items, total } = useMyFarmers({ take: PER_PAGE, skip: (page - 1) * PER_PAGE });
  // Prefetch
  useMyFarmers({ take: PER_PAGE, skip: page * PER_PAGE });

  return (
    <>
      <HeaderTagsRenderer title={t('myFarmers')} />
      <div className="md:px-6-0 px-4-0 pt-4-0 pb-6-0 bg-white h-full" ref={scrollToRef}>
        <div className="md:text-2-0 text-2-6 font-md">{t('myFarmers')}</div>
        {items && items.length > 0 && (
          <div className="mt-5-0 grid md:grid-cols-3 grid-cols-2 md:gap-3-0 gap-2-0">
            {items.map((x) => (
              <SingleFarmer key={x.id} item={x} />
            ))}
          </div>
        )}
        {total > PER_PAGE && (
          <div className="mt-6-0 flex justify-end">
            <Pagination page={page} onPageChange={setPage} pageCount={total / PER_PAGE} />
          </div>
        )}
      </div>
    </>
  );
};

MyFarmers.getLayout = DashboardLayout.getLayout();

export default MyFarmers;
