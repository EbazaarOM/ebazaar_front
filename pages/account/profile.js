import { DashboardLayout } from '@/components/Layouts/DashboardLayout';
import { UserProfile } from '@/components/Dashboard/UserProfile';
import { useTranslations } from '@/next-intl/useTranslations';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';

const Profile = () => {
  const t = useTranslations(['dashboard']);
  useBreadcrumbDispatcher([{ href: '/account/profile', title: t('dashboard.profile') }]);
  return (
    <>
      <HeaderTagsRenderer title={t('dashboard.profile')} />
      <div className="md:pb-6-0 pb-12-0 pt-4-0 bg-white h-full">
        <div className="md:px-6-0 px-5-0 md:font-md font-rm md:text-2-0 text-2-8 md:mb-7-6 mb-4-0">
          {t('personalInfo')}
        </div>
        <UserProfile />
      </div>
    </>
  );
};

Profile.getLayout = DashboardLayout.getLayout();

export default Profile;
