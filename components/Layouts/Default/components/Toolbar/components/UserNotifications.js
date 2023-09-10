import { Button } from '@/components/Base/Button';
import { IconButton } from '@/components/Base/IconButton';
import { RouterLink } from '@/components/Base/RouterLink';
import { SingleNotification } from '@/components/Base/SingleNotification';
import { SVG } from '@/components/Base/SVG';
import { BellIcon } from '@/components/Vectors/BellIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropType from 'prop-types';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';

const UserNotifications = ({ className, opened, toggle }) => {
  const { notificationsPreview } = useSelector((state) => state.notifications);
  const { data: items, meta } = notificationsPreview;
  const t = useTranslations();

  const elem = (
    <div className="flex flex-col h-full">
      <div className="custom-scrollbar overflow-auto border-b border-grey-200 flex-1">
        {items && items.map((x) => <SingleNotification key={x.id} item={x} className="border-b border-grey-200" />)}
      </div>
      <div className="px-4-0 py-2-5">
        <RouterLink href="/account/notifications" className="flex-1">
          <Button className="bg-blue text-white mr-3-0 border border-blue hover:bg-white hover:text-blue duration-150 w-full">
            {t('seeAllNotifications')}
          </Button>
        </RouterLink>
      </div>
    </div>
  );

  return (
    <div className={clsx(className, '')}>
      <div className="relative">
        <IconButton className="bg-body-bg w-6-0 h-6-0 hover:opacity-80 duration-150" onClick={toggle}>
          <SVG src={BellIcon} className="w-1-8" />
        </IconButton>
        {!!meta?.unSeen && (
          <div className="absolute -mt-0-5 -mr-0-5 top-0 right-0 rounded-60-0 bg-red flex items-center justify-center text-white md:text-1-4 text-2-4 md:min-w-2-1 min-w-3-5 md:h-2-1 h-3-5 px-0-5">
            {meta.unSeen}
          </div>
        )}
        {opened && <div className="triangle" />}
      </div>
      {process.browser &&
        opened &&
        ((container) => (container ? ReactDOM.createPortal(elem, container) : null))(
          document.getElementById('user-toolbar-portal')
        )}
    </div>
  );
};

UserNotifications.propTypes = {
  className: PropType.string,
  opened: PropType.bool,
  toggle: PropType.func
};
UserNotifications.defaultProps = {
  className: '',
  opened: false,
  toggle: () => {}
};

export default UserNotifications;
