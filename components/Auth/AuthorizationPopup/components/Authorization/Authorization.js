import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { TextField } from '@/components/Base/TextField';
import { Button } from '@/components/Base/Button';
import { FacebookIcon } from '@/components/Vectors/FacebookIcon';
import { SVG } from '@/components/Base/SVG';
import { GoogleIcon } from '@/components/Vectors/GoogleIcon';
import { externalLogin, login } from '@/api/user/account';
import { authProviders } from '@/utils/constants/authProviders';
import { useTranslations } from '@/next-intl/useTranslations';
import { logInUser } from '@/store/actions/user.action';

const socialAuthButtonClassSet =
  'md:h-7-0 h-10-0 md:rounded-10-0 rounded-20-0 flex items-center justify-center md:text-2-0 text-3-0 font-rm border border-grey-200 cursor-pointer group duration-150';

const AuthorizationPopup = (props) => {
  const { onRegistrationClick, onPasswordResetClick, onClose } = props;
  const [values, setValues] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState(null);
  const dispatch = useDispatch();

  const t = useTranslations();

  const inputChangeHandler = (key, val) => {
    if (errorMessage) setErrorMessage(null);
    setValues({ ...values, [key]: val });
  };

  const signInHandler = ({ signInResult, token: tokenResponse }) => {
    if (signInResult.succeeded) {
      dispatch(logInUser(tokenResponse));
      onClose();
    }
  };

  const externalLoginHandler = async (accessToken, provider) => {
    try {
      const res = await externalLogin({ accessToken, provider });
      signInHandler(res);
    } catch (error) {
      setErrorMessage({ type: 'external', message: t('emailUsed') });
      console.log(error);
    }
  };

  const fbAuthHandler = () => {
    FB.login(
      (response) => {
        const { authResponse } = response;
        if (response.authResponse) {
          const { accessToken } = authResponse;
          externalLoginHandler(accessToken, authProviders.FACEBOOK);
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  const googleAuthHandler = () => {
    window.GoogleAuth.signIn()
      .then((user) => {
        const { access_token: accessToken } = user.getAuthResponse();
        externalLoginHandler(accessToken, authProviders.GOOGLE);
      })
      .catch((error) => console.log(error));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login(values);
      signInHandler(res);
    } catch (error) {
      setErrorMessage({ type: 'login', message: t('notValidUsernamePassword') });
    }
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <TextField
          errored={errorMessage?.type === 'login'}
          placeholder={t('identifier')}
          value={values.identifier || ''}
          onChange={(value) => inputChangeHandler('identifier', value)}
          className="mb-4-0"
        />
        <TextField
          errored={errorMessage?.type === 'login'}
          placeholder={t('password')}
          value={values.password || ''}
          onChange={(value) => inputChangeHandler('password', value)}
          className="mb-2-0"
          type="password"
        />
        {errorMessage && errorMessage.type === 'login' && (
          <div className="mb-1-0 text-red font-rm md:text-1-6 text-2-4">{errorMessage.message}</div>
        )}
        <div className="mb-4-0 font-rm md:text-2-0 text-2-8">
          {t('forgotPassword')}?{' '}
          <button className="text-blue-100 hover:underline font-rm" type="button" onClick={onPasswordResetClick}>
            {t('passwordRecover')}
          </button>
        </div>
        <div className="grid md:grid-cols-2 md:gap-3-0 gap-4-0">
          <Button
            size="xl"
            type="submit"
            className="bg-blue hover:bg-white text-white border border-blue hover:text-black ml-auto duration-150 w-full"
          >
            {t('login')}
          </Button>
          <Button
            size="xl"
            onClick={onRegistrationClick}
            className="bg-lightblue hover:bg-white border border-lightblue ml-auto duration-150 w-full"
          >
            {t('registration')}
          </Button>
        </div>
      </form>
      <div className="flex items-center md:my-4-0 my-6-0">
        <div className="flex-1 h-0-1 bg-grey-200" />
        <div className="mx-2-0 font-rm md:text-2-0 text-2-8">{t('or')}</div>
        <div className="flex-1 h-0-1 bg-grey-200" />
      </div>
      {errorMessage && errorMessage.type === 'external' && (
        <div className="mb-1-0 text-red font-rm md:text-1-6 text-2-4">{errorMessage.message}</div>
      )}
      <div className="grid md:grid-cols-2 md:gap-3-0 gap-4-0">
        <div
          onClick={fbAuthHandler}
          aria-hidden
          className={clsx(socialAuthButtonClassSet, 'hover:bg-facebook hover:text-white hover:border-facebook')}
        >
          <SVG
            src={FacebookIcon}
            className="md:h-2-4 h-3-3 md:mr-2-0 mr-2-6 group-hover:text-white text-facebook duration-150"
          />
          {t('with', { key: 'Facebook' })}
        </div>
        <div
          onClick={googleAuthHandler}
          aria-hidden
          className={clsx(socialAuthButtonClassSet, 'hover:bg-google hover:text-white hover:border-google')}
        >
          <SVG src={GoogleIcon} className="md:h-2-4 h-3-3 mr-2-0" original />
          {t('with', { key: 'Google' })}
        </div>
      </div>
    </>
  );
};

AuthorizationPopup.propTypes = {
  onRegistrationClick: PropTypes.func,
  onPasswordResetClick: PropTypes.func,
  onClose: PropTypes.func
};

AuthorizationPopup.defaultProps = {
  onRegistrationClick: () => {},
  onPasswordResetClick: () => {},
  onClose: () => {}
};

export default AuthorizationPopup;
