import { useReviews } from '@/api/reviews/swr';
import { Pagination } from '@/components/Base/Pagination';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import { SingleDashboardReview } from '@/components/Dashboard/SingleDashboardReview';
import { DashboardLayout } from '@/components/Layouts/DashboardLayout';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useTranslations } from '@/next-intl/useTranslations';

const PER_PAGE = 6;

const MyReviews = () => {
  const t = useTranslations(['dashboard', 'reviews']);
  useBreadcrumbDispatcher([{ href: '/account/reviews', title: t('myReviews') }]);
  const [page, setPage] = React.useState(1);

  const mounted = useIsMounted();

  const scrollToRef = React.useRef(null);

  React.useEffect(() => {
    if (mounted) {
      scrollToRef.current.scrollIntoView();
    }
  }, [page]);

  const { items, total } = useReviews({ take: PER_PAGE, skip: (page - 1) * PER_PAGE });
  // prefetch
  useReviews({ take: PER_PAGE, skip: page * PER_PAGE });

  return (
    <>
      <HeaderTagsRenderer title={t('myReviews')} />
      <div className="md:px-6-0 px-4-0 pt-4-0 pb-6-0 bg-white h-full" ref={scrollToRef}>
        <div className="md:text-2-0 text-2-6 font-md">{t('myReviews')}</div>
        {items && items.length > 0 && (
          <div className="mt-5-0">
            {items.map((x) => (
              <SingleDashboardReview key={x.id} review={x} className="mb-4-0 last:mb-4-0" />
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

MyReviews.getLayout = DashboardLayout.getLayout();

MyReviews.localeNamespaces = ['reviews'];

export default MyReviews;
