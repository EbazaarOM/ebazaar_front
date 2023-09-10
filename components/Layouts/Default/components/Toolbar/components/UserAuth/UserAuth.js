import clsx from 'clsx';
import { useRouter } from 'next/router';
import PropType from 'prop-types';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/Base/Button';
import { IconButton } from '@/components/Base/IconButton';
import { Popup } from '@/components/Base/Popup';
import { SVG } from '@/components/Base/SVG';
import { UserIcon } from '@/components/Vectors/UserIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import { setAuthPopupStatus } from '@/store/actions/base.action';
import { removeAuthTokens } from '@/utils/removeAuthTokens';

import { Avatar, MobileUserTool } from './components';

const dropDownItemClassSet = 'flex items-center px-3-0 h-8-0 border-b border-grey-200 last:border-b-0';

const UserAuth = ({ className, isSignedIn, opened, toggle }) => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const t = useTranslations();
  const [mobileUserToolIsOpened, setMobileUserToolIsOpened] = React.useState();

  const openAuthPopup = () => dispatch(setAuthPopupStatus(true));

  const router = useRouter();

  const profileClickHandler = () => {
    toggle();
    router.push('/account/profile');
  };

  const logOut = () => {
    toggle();
    removeAuthTokens();
    window.location.href = router.locale === 'ka' ? '/' : `/${router.locale}`;
  };

  const avatarClickHandler = () => {
    if (window.innerWidth > 768) {
      toggle();
    } else {
      setMobileUserToolIsOpened(true);
    }
  };

  const elem = (
    <ul className="w-33-1 font-rm text-2-0">
      <li className={clsx(dropDownItemClassSet, 'text-grey')}>ID: {userInfo?.nameid}</li>
      <li
        className={clsx(dropDownItemClassSet, 'hover:bg-lightblue cursor-pointer')}
        aria-hidden
        onClick={profileClickHandler}
      >
        {t('cabinet')}
      </li>
      <li className={clsx(dropDownItemClassSet, 'hover:bg-lightblue cursor-pointer')} aria-hidden onClick={logOut}>
        {t('logOut')}
      </li>
    </ul>
  );

  React.useEffect(() => {
    if (mobileUserToolIsOpened && window.innerWidth <= 768) {
      setMobileUserToolIsOpened(false);
    }
  }, [router]);

  return (
    <div className={className}>
      {isSignedIn ? (
        <>
          <div className="relative">
            {userInfo && <Avatar name={userInfo.fullName} onClick={avatarClickHandler} />}
            {opened && <div className="triangle" />}
          </div>
          <div className="md:hidden">
            <Popup className="w-full h-full bg-white" isOpened={mobileUserToolIsOpened}>
              <MobileUserTool userInfo={userInfo} onClose={() => setMobileUserToolIsOpened(false)} logOut={logOut} />
            </Popup>
          </div>
        </>
      ) : (
        <>
          <Button className="bg-blue text-white hover:opacity-80 duration-150 md:flex hidden" onClick={openAuthPopup}>
            <SVG src={UserIcon} className="w-1-4 mr-1-7" />
            <span>{t('authorization')}</span>
          </Button>
          <IconButton className="w-9-0 h-9-0 md:hidden bg-blue" onClick={openAuthPopup}>
            <SVG src={UserIcon} className="w-2-1 text-body-bg" />
          </IconButton>
        </>
      )}

      {process.browser &&
        opened &&
        ((container) => (container ? ReactDOM.createPortal(elem, container) : null))(
          document.getElementById('user-toolbar-portal')
        )}
    </div>
  );
};

UserAuth.propTypes = {
  className: PropType.string,
  opened: PropType.bool,
  toggle: PropType.func,
  isSignedIn: PropType.bool
};
UserAuth.defaultProps = {
  className: '',
  opened: false,
  toggle: () => {},
  isSignedIn: false
};

export default UserAuth;
