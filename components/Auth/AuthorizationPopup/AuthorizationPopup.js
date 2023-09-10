import PropTypes from 'prop-types';
import { authPopupTitleKeys, authPopupViews } from '@/utils/constants/authPopupViews';
import { PopupBox } from '@/components/Base/PopupBox';
import { useTranslations } from '@/next-intl/useTranslations';
import { Authorization } from './components/Authorization';
import { Registration } from './components/Registration';
import { PasswordReset } from './components/PasswordReset';

const AuthorizationPopup = (props) => {
  const { className, onClose } = props;

  const [view, setView] = React.useState(authPopupViews.AUTHORIZATION);

  const t = useTranslations();

  return (
    <PopupBox className={className} title={t(authPopupTitleKeys[view])} onClose={onClose}>
      <div className="pt-4-0 pb-5-0 flex-1">
        {view === authPopupViews.AUTHORIZATION && (
          <Authorization
            onRegistrationClick={() => setView(authPopupViews.REGISTRATION)}
            onPasswordResetClick={() => setView(authPopupViews.PASSWORD_RESET)}
            onClose={onClose}
          />
        )}
        {view === authPopupViews.REGISTRATION && (
          <Registration onAuthorizationClick={() => setView(authPopupViews.AUTHORIZATION)} onClose={onClose} />
        )}
        {view === authPopupViews.PASSWORD_RESET && (
          <PasswordReset onAuthorizationClick={() => setView(authPopupViews.AUTHORIZATION)} onClose={onClose} />
        )}
      </div>
    </PopupBox>
  );
};

AuthorizationPopup.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func
};

AuthorizationPopup.defaultProps = {
  className: '',
  onClose: () => {}
};

export default AuthorizationPopup;
