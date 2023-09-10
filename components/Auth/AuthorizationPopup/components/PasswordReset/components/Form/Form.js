import PropTypes from 'prop-types';

import { TextField } from '@/components/Base/TextField';
import { Button } from '@/components/Base/Button';
import { confirmCode, requestCode } from '@/api/user/account';
import { requestCodeTypes } from '@/utils/constants/requestCodeTypes';
import { firstLetterToLowerCase } from '@/utils/stringManipulation';
import { BackButton } from '@/components/Base/BackButton';
import { RequestCodeForm } from '@/components/Base/RequestCodeForm';
import { useTranslations } from '@/next-intl/useTranslations';
import { ErrorsRenderer } from '@/components/Base/ErrorsRenderer';
import { BaseError } from '@/models/BaseError';

const PasswordReset = (props) => {
  const { onAuthorizationClick, onCodeConfirm } = props;
  const [step, setStep] = React.useState(0);
  const [errors, setErrors] = React.useState([]);
  const [identifier, setIdentifier] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const t = useTranslations(['common']);

  const codeRequestRef = React.useRef(null);

  const errorHandler = (error) => {
    if (error.data?.errors) {
      const errs = error.data.errors.map((x) => new BaseError(firstLetterToLowerCase(x.key), x.value));
      setErrors(errs);
    } else {
      setErrors([new BaseError('custom', 'error')]);
    }
  };

  const confirmCodeWrapper = async () => {
    setLoading(true);
    const code = codeRequestRef.current.getCode();
    try {
      const res = await confirmCode({ identifier, code });
      if (res.success) {
        await onCodeConfirm({ token: res.token, identifier });
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

  const requestCodeWrapper = async () => {
    try {
      await requestCode({ identifier }, requestCodeTypes.PASSWORD_RESET);
      return true;
    } catch (error) {
      if (error.status === 404) {
        setErrors([new BaseError('identifier', 'not_valid')]);
      } else {
        errorHandler(error);
      }
      return false;
    }
  };

  const nextClickHandler = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (step === 0) {
      const success = await requestCodeWrapper();
      if (success) setStep((x) => x + 1);
    } else {
      confirmCodeWrapper();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <BackButton
        title={step === 0 ? t('fillPersonalInfo') : t('confirmation')}
        className="mb-4-0"
        onClick={() => (step === 0 ? onAuthorizationClick() : setStep(0))}
      />
      <div className="flex-1 flex flex-col">
        {step === 0 && (
          <form onSubmit={nextClickHandler} className="grid grid-cols-2 gap-3-0">
            <TextField label={t('identifier')} value={identifier} onChange={setIdentifier} className="col-span-2" />
          </form>
        )}
        {step === 1 && (
          <RequestCodeForm
            title={t('codeSentOn', { identifier })}
            onCodeRequest={requestCodeWrapper}
            ref={codeRequestRef}
          />
        )}

        {errors && errors.length > 0 && (
          <ErrorsRenderer className="md:mt-1-0 mt-2-0 md:text-1-8 text-2-8" errors={errors} />
        )}
        <Button
          onClick={nextClickHandler}
          className="bg-blue hover:opacity-90 text-white md:ml-auto duration-150 col-span-2 mt-auto"
          px="px-10-0"
          size="xxl"
          disabled={loading}
        >
          {t('next')}
        </Button>
      </div>
    </div>
  );
};

PasswordReset.propTypes = {
  onAuthorizationClick: PropTypes.func,
  onCodeConfirm: PropTypes.func
};

PasswordReset.defaultProps = {
  onAuthorizationClick: () => {},
  onCodeConfirm: () => {}
};

export default PasswordReset;
