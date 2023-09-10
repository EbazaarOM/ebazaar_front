import PropTypes from 'prop-types';
import { SuccessBox } from '@/components/Base/SuccessBox';

import { confirmCode, createPassword, refreshToken, requestCode } from '@/api/user/account';
import { RequestCodeForm } from '@/components/Base/RequestCodeForm';
import { CreatePasswordForm } from '@/components/Auth/AuthorizationPopup/components/CreatePasswordForm';
import { requestCodeTypes } from '@/utils/constants/requestCodeTypes';
import { firstLetterToLowerCase } from '@/utils/stringManipulation';
import { PopupBox } from '@/components/Base/PopupBox';
import { Button } from '@/components/Base/Button';
import { BaseError } from '@/models/BaseError';
import { ErrorsRenderer } from '@/components/Base/ErrorsRenderer';
import { ebazaarUserRefreshToken } from '@/utils/constants/cookieNames';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { updateTokenInfo } from '@/store/actions/user.action';
import { useTranslations } from '@/next-intl/useTranslations';
import { isEmail } from '@/utils/isEmail';

let timeout = null;

const AddPasswordPopup = ({ identifier, onClose }) => {
  const [token, setToken] = React.useState(null);
  const [step, setStep] = React.useState(0);
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const t = useTranslations(['dashboard', 'common']);

  const codeRequestRef = React.useRef(null);

  const updateToken = async () => {
    try {
      const { token } = await refreshToken({ refreshToken: Cookies.get(ebazaarUserRefreshToken) });
      if (token) {
        dispatch(updateTokenInfo(token));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const errorHandler = (error) => {
    if (error.data?.errors) {
      const errs = error.data.errors.map((x) => new BaseError(firstLetterToLowerCase(x.key), x.value));
      setErrors(errs);
    } else {
      setErrors([new BaseError('custom', 'error')]);
    }
  };

  const createPasswordHandler = async (info) => {
    try {
      await createPassword({
        identifier,
        token,
        newPassword: info.password,
        confirmNewPassword: info.confirmPassword
      });
      await updateToken();
      setStep((x) => x + 1);
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

  const requestCodeWrapper = async () => {
    if (errors.length > 0) setErrors([]);
    try {
      await requestCode({ identifier }, requestCodeTypes.PASSWORD_RESET);
      return true;
    } catch (error) {
      errorHandler(error);
      return false;
    }
  };

  const confirmCodeWrapper = async () => {
    setLoading(true);
    const code = codeRequestRef.current.getCode();
    try {
      const { success, token } = await confirmCode({ identifier, code });
      if (success) {
        setToken(token);
        setStep((x) => x + 1);
      }
    } catch (error) {
      if (error.status === 404) {
        setErrors([new BaseError('code', 'not_valid')]);
      } else {
        errorHandler(error);
      }
    }
    setLoading(false);
  };

  React.useEffect(() => {
    requestCodeWrapper();
  }, []);

  return (
    <PopupBox title={t('addPassword')} onClose={onClose}>
      <div className="pt-5-0 pb-7-0">
        {step === 0 && (
          <>
            <RequestCodeForm
              title={t(isEmail(identifier) ? 'common.codeSentOnEmail' : 'common.codeSentOnPhone', {
                value: identifier
              })}
              onCodeRequest={requestCodeWrapper}
              ref={codeRequestRef}
            />
            {errors && errors.length > 0 && (
              <ErrorsRenderer className="md:mt-1-0 mt-2-0 md:text-1-8 text-2-8" errors={errors} />
            )}
            <Button
              onClick={confirmCodeWrapper}
              className="bg-blue hover:opacity-80 text-white md:ml-auto duration-150 md:mt-5-0 mt-10-0 md:w-auto w-full"
              px="px-10-0"
              size="xl"
              disabled={loading}
            >
              {t('next')}
            </Button>
          </>
        )}
        {step === 1 && <CreatePasswordForm onSubmit={createPasswordHandler} withRules={false} />}
        {step === 2 && <SuccessBox title={t('passwordSuccessfullyAdded')} />}
      </div>
    </PopupBox>
  );
};

AddPasswordPopup.propTypes = {
  identifier: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddPasswordPopup;
