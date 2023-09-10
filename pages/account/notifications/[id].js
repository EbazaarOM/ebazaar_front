import { getNotification, setNotificationSeen } from '@/api/notifications';
import { BackButton } from '@/components/Base/BackButton';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import { IconButton } from '@/components/Base/IconButton';
import { SVG } from '@/components/Base/SVG';
import { DashboardLayout } from '@/components/Layouts/DashboardLayout';
import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { CalendarIcon } from '@/components/Vectors/CalendarIcon';
import { ClockIcon } from '@/components/Vectors/ClockIcon';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { useTranslations } from '@/next-intl/useTranslations';
import { loadNotificationsPreview } from '@/store/actions/notifications.action';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const NotificationsById = () => {
  const t = useTranslations(['dashboard']);
  useBreadcrumbDispatcher([{ href: '/account/notifications', title: t('notifications') }]);

  const [notification, setNotification] = React.useState({});

  const router = useRouter();
  const dispatch = useDispatch();

  const fetchNotification = async () => {
    const res = await getNotification(router.query.id);
    setNotification(res);
  };

  const updateUserSeenNotifications = async () => {
    await setNotificationSeen(router.query.id);
    dispatch(loadNotificationsPreview());
  };

  React.useEffect(() => {
    fetchNotification();
    updateUserSeenNotifications();
  }, [router.query.id]);

  const ebazaarIcon = (
    <div className="flex items-center">
      <div className="md:w-2-6 w-5-0 md:h-2-6 h-5-0 bg-grey-200 rounded-full mr-1-7" />
      <div className="font-md md:text-1-6 text-2-6">ebazaar</div>
    </div>
  );

  const goBack = () => router.push('/account/notifications');

  return (
    <>
      <HeaderTagsRenderer title={t('notifications')} />
      <div className="h-full flex flex-col">
        <div className="md:hidden flex items-center">
          <IconButton className="bg-white w-7-2 h-7-2 mr-2-0" onClick={goBack}>
            <SVG src={ArrowDownIcon} className="w-2-2 transform rotate-90 -translate-x-0-1" />
          </IconButton>
          <div className="md:text-1-8 text-2-8 font-rm">{t('back')}</div>
        </div>
        <div className="md:mt-0 mt-3-0 pt-4-0 pb-6-0 bg-white flex-1">
          <div className="md:text-2-0 text-2-6 font-md px-6-0 border-b border-grey-200 pb-3-5">
            {t('myNotifications')}
          </div>
          <div className="md:px-6-0 px-4-0 md:pt-4-0 pt-3-2 pb-6-0">
            <div className="flex items-center justify-between">
              <BackButton title={t('back')} onClick={goBack} className="md:flex hidden" />
              <div className="md:hidden">{ebazaarIcon}</div>
              <div className="flex items-center ml-auto text-grey-300 font-rm md:text-1-4 text-2-4">
                <div className="flex items-center mr-1-1">
                  <SVG src={CalendarIcon} className="md:w-1-8 w-2-8 md:mr-1-0 mr-1-4" />
                  <span>{dayjs(notification.createDate).format('DD.MM.YYYY')}</span>
                </div>
                <div className="flex items-center">
                  <SVG src={ClockIcon} className="md:w-1-9 w-2-8 md:mr-1-0 mr-1-4" />
                  <span>{dayjs(notification.createDate).format('hh:mm')}</span>
                </div>
              </div>
            </div>

            <div className="mt-5-6">
              <div className="md:block hidden">{ebazaarIcon}</div>
              <div
                className="md:mt-2-0 md:text-1-6 text-2-6 font-rm"
                dangerouslySetInnerHTML={{ __html: notification.body }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

NotificationsById.getLayout = DashboardLayout.getLayout();

export default NotificationsById;
