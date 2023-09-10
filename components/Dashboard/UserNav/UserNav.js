import { RouterLink } from '@/components/Base/RouterLink';
import { SVG } from '@/components/Base/SVG';
import { BellIcon } from '@/components/Vectors/BellIcon';
import { FarmerIcon } from '@/components/Vectors/FarmerIcon';
import { HistoryIcon } from '@/components/Vectors/HistoryIcon';
import { LockIcon } from '@/components/Vectors/LockIcon';
import { MessageIcon } from '@/components/Vectors/MessageIcon';
import { UserIcon } from '@/components/Vectors/UserIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const itemClassSet = 'flex items-center grey-600 hover:text-blue duration-150';

const routes = [
  {
    titleKey: 'personalInfo',
    href: '/account/profile',
    icon: UserIcon
  },
  {
    titleKey: 'changePassword',
    href: '/account/change-password',
    icon: LockIcon
  },
  {
    titleKey: 'orderHistory',
    href: '/account/order-history',
    icon: HistoryIcon
  },
  {
    titleKey: 'myFarmers',
    href: '/account/farmers',
    icon: FarmerIcon
  },
  {
    titleKey: 'myReviews',
    href: '/account/reviews',
    icon: MessageIcon
  },
  {
    titleKey: 'notifications',
    href: '/account/notifications',
    icon: BellIcon
  }
];

const UserNav = (props) => {
  const { className } = props;

  const { asPath } = useRouter();
  const t = useTranslations(['dashboard']);

  return (
    <ul className={clsx(className, 'font-rm md:text-2-0 text-3-0 text-grey-600')}>
      {routes &&
        routes.map((x, i) => (
          <li className="last:mb-0 mb-4-0" key={x.href.concat(i)}>
            <RouterLink href={x.href} className={clsx(itemClassSet, { 'text-blue': asPath === x.href })}>
              <SVG src={x.icon} className="md:w-1-4 w-2-4 md:mr-2-1 mr-4-0" />
              <span>{t(x.titleKey)}</span>
            </RouterLink>
          </li>
        ))}
    </ul>
  );
};

UserNav.propTypes = {
  className: PropTypes.string
};

UserNav.defaultProps = {
  className: ''
};

export default UserNav;
