import PropTypes from 'prop-types';
import { SuccessBox } from '@/components/Base/SuccessBox';

import { resetPassword } from '@/api/user/account';
import { useTranslations } from '@/next-intl/useTranslations';
import { CreatePasswordForm } from '../CreatePasswordForm';
import { Form } from './components/Form';

let timeout = null;

const PasswordReset = (props) => {
  const { onAuthorizationClick, onClose } = props;
  const [tokenInfo, setTokenInfo] = React.useState(null);
  const [finished, setFinished] = React.useState(false);

  const t = useTranslations();

  const resetPasswordHandler = async (info) => {
    try {
      await resetPassword({
        ...tokenInfo,
        newPassword: info.password,
        confirmNewPassword: info.confirmPassword
      });
      setFinished(true);
      timeout = setTimeout(() => {
        onClose();
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {tokenInfo === null ? (
        <Form onAuthorizationClick={onAuthorizationClick} onCodeConfirm={setTokenInfo} />
      ) : (
        <>
          {!finished ? (
            <CreatePasswordForm
              onSubmit={resetPasswordHandler}
              withRules={false}
              onBackClick={() => setTokenInfo(null)}
            />
          ) : (
            <SuccessBox title={t('passwordSuccessfullyChange')} />
          )}
        </>
      )}
    </>
  );
};

PasswordReset.propTypes = {
  onAuthorizationClick: PropTypes.func,
  onClose: PropTypes.func
};

PasswordReset.defaultProps = {
  onAuthorizationClick: () => {},
  onClose: () => {}
};

export default PasswordReset;
