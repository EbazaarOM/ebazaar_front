import { PopupBox } from '@/components/Base/PopupBox';
import { SVG } from '@/components/Base/SVG';
import { UserInfoShort } from '@/components/Dashboard/UserInfoShort';
import { UserNav } from '@/components/Dashboard/UserNav';
import { LogoutIcon } from '@/components/Vectors/LogoutIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import PropType from 'prop-types';

const MobileUserTool = ({ className, onClose, userInfo, logOut }) => {
  const t = useTranslations();
  return (
    <PopupBox className={className} title={t('profile')} onClose={onClose}>
      <div className="font-rm text-2-8 py-5-0 flex items-center justify-between" onClick={logOut} aria-hidden>
        <span>{t('logOut')}</span>
        <SVG src={LogoutIcon} className="w-3-0" />
      </div>
      <div className="h-0-1 bg-grey-200 -mx-5-0" />
      <UserNav className="py-5-0" />
      <div className="h-0-1 bg-grey-200 -mx-5-0" />
      {userInfo && <UserInfoShort className="py-5-0" userInfo={userInfo} />}
    </PopupBox>
  );
};

MobileUserTool.propTypes = {
  className: PropType.string,
  onClose: PropType.func,
  logOut: PropType.func,
  userInfo: PropType.object
};
MobileUserTool.defaultProps = {
  className: '',
  onClose: () => {},
  logOut: () => {},
  userInfo: {}
};

export default MobileUserTool;
