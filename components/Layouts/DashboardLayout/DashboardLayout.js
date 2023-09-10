import PropTypes from 'prop-types';
import { DefaultLayout } from '@/components/Layouts/Default';
import { Breadcrumb } from '@/components/Base/Breadcrumb';
import { RouterLink } from '@/components/Base/RouterLink';
import { UserNav } from '@/components/Dashboard/UserNav';
import { signInStatus } from '@/utils/constants/signInStatus';
import Router from 'next/router';
import { UserInfoShort } from '@/components/Dashboard/UserInfoShort';
import { useSelector } from 'react-redux';
import { useTranslations } from '@/next-intl/useTranslations';

const DashboardLayout = ({ children }) => {
  const {
    user: { userSignInStatus, userInfo },
    base: { breadcrumb }
  } = useSelector((state) => state);

  const t = useTranslations();
  React.useEffect(() => {
    if (userSignInStatus === signInStatus.SIGNED_OUT) {
      Router.push('/');
    }
  }, [userSignInStatus]);

  if (userSignInStatus === signInStatus.LOADING || userSignInStatus === signInStatus.SIGNED_OUT) return null;

  return (
    <div className="container">
      <div className="flex items-center py-3-0 justify-between">
        <Breadcrumb>
          <RouterLink href="/">{t('home')}</RouterLink>
          {breadcrumb?.map((x) => (
            <RouterLink key={JSON.stringify(x.href)} href={x.href}>
              {x.title}
            </RouterLink>
          ))}
        </Breadcrumb>
      </div>
      <div className="flex">
        <div className="mr-3-0 w-23-5-percent md:block hidden">
          <div className="bg-white py-4-0 px-5-4">
            <UserNav />
          </div>
          {userInfo && (
            <div className="bg-white mt-3-0 py-4-0 px-5-4 ">
              <UserInfoShort userInfo={userInfo} />
            </div>
          )}
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};

DashboardLayout.getLayout =
  (layoutProps = {}) =>
  (page, { ...props }) =>
    DefaultLayout.getLayout(<DashboardLayout {...layoutProps}>{page}</DashboardLayout>, {
      ...props
    });

export default DashboardLayout;
