import { Pagination } from '@/components/Base/Pagination';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import { DashboardLayout } from '@/components/Layouts/DashboardLayout';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useTranslations } from '@/next-intl/useTranslations';
import { useNotifications } from '@/api/notifications/swr';
import { SingleNotification } from '@/components/Base/SingleNotification';

const PER_PAGE = 6;

const Notifications = () => {
  const t = useTranslations(['dashboard']);
  useBreadcrumbDispatcher([{ href: '/account/notifications', title: t('notifications') }]);
  const [page, setPage] = React.useState(1);

  const mounted = useIsMounted();

  const scrollToRef = React.useRef(null);

  React.useEffect(() => {
    if (mounted) {
      scrollToRef.current.scrollIntoView();
    }
  }, [page]);

  const { items, total } = useNotifications({ take: PER_PAGE, skip: (page - 1) * PER_PAGE });
  // prefetch
  useNotifications({ take: PER_PAGE, skip: page * PER_PAGE });

  return (
    <>
      <HeaderTagsRenderer title={t('notifications')} />
      <div className="pt-4-0 pb-6-0 bg-white h-full" ref={scrollToRef}>
        <div className="md:text-2-0 text-2-6 font-md px-6-0 border-b border-grey-200 pb-3-5">
          {t('myNotifications')}
        </div>
        {items && items.length > 0 && (
          <div className="">
            {items.map((x) => (
              <SingleNotification item={x} key={x.id} className="border-b border-grey-200" isPage />
            ))}
            {total > PER_PAGE && (
              <div className="mt-6-0 flex justify-end px-6-0">
                <Pagination page={page} onPageChange={setPage} pageCount={total / PER_PAGE} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

Notifications.getLayout = DashboardLayout.getLayout();

export default Notifications;
