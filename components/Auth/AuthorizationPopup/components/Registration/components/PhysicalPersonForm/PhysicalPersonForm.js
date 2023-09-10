import { confirmCode, register, requestCode } from '@/api/user/account';
import { Button } from '@/components/Base/Button';
import { TextField } from '@/components/Base/TextField';
import { requestCodeTypes } from '@/utils/constants/requestCodeTypes';
import { userTypes } from '@/utils/constants/userTypes';
import { firstLetterToLowerCase } from '@/utils/stringManipulation';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { BackButton } from '@/components/Base/BackButton';
import { RequestCodeForm } from '@/components/Base/RequestCodeForm';
import { BaseError } from '@/models/BaseError';
import { useTranslations } from '@/next-intl/useTranslations';
import { ErrorsRenderer } from '@/components/Base/ErrorsRenderer';
import { isEmail } from '@/utils/isEmail';

const PhysicalPersonForm = ({ className, onCodeConfirm, onBackClick }) => {
  const [info, setInfo] = React.useState({ userType: userTypes.PHYSICAL });
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [errors, setErrors] = React.useState([]);

  const codeRef = React.useRef(null);

  const isFieldErrored = React.useCallback((field) => errors.findIndex((x) => x.key === field) > -1, [errors]);

  const t = useTranslations();

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
    const code = codeRef.current.getCode();
    try {
      const res = await confirmCode({ identifier: info.identifier, code });
      if (res.success) {
        await onCodeConfirm({ token: res.token, identifier: info.identifier });
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

  const requestCodeClickHandler = async () => {
    setErrors([]);
    try {
      const { success } = await requestCode({ identifier: info.identifier }, requestCodeTypes.REGISTRATION);
      return success;
    } catch (error) {
      setErrors([new BaseError('custom', 'error')]);
      return false;
    }
  };

  const registerWrapper = async () => {
    setLoading(true);
    try {
      await register(info);
      const res = await requestCode({ identifier: info.identifier }, requestCodeTypes.REGISTRATION);
      if (res.success) {
        setStep((x) => x + 1);
      } else {
        setErrors([new BaseError('custom', 'error')]);
      }
    } catch (error) {
      errorHandler(error);
    }
    setLoading(false);
  };

  const nextClickHandler = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (step === 0) {
      registerWrapper();
    } else {
      confirmCodeWrapper();
    }
  };

  const inputChangeHandler = (key, val) => {
    if (errors.length > 0) setErrors([]);
    setInfo({ ...info, [key]: val });
  };

  const generateTextFieldProps = (field) => ({
    errored: isFieldErrored(field),
    label: t(field),
    value: info[field] || '',
    onChange: (value) => inputChangeHandler(field, value)
  });

  return (
    <div className={clsx(className, 'flex flex-col h-full')}>
      <BackButton
        title={
          step === 0 ? t('fillPersonalInfo') : t(isEmail(info.identifier) ? 'emailConfirmation' : 'phoneConfirmation')
        }
        className="md:mb-4-0 mb-8-0"
        onClick={() => (step === 0 ? onBackClick() : setStep(0))}
      />
      <div className="flex-1 flex flex-col">
        {step === 0 ? (
          <form onSubmit={nextClickHandler} className="grid md:grid-cols-2 gap-3-0">
            <TextField {...generateTextFieldProps('firstName')} />
            <TextField {...generateTextFieldProps('lastName')} />
            <TextField {...generateTextFieldProps('identifier')} className="md:col-span-2" />
          </form>
        ) : (
          <RequestCodeForm
            title={t(isEmail(info.identifier) ? 'codeSentOnEmail' : 'codeSentOnPhone', { value: info.identifier })}
            onCodeRequest={requestCodeClickHandler}
            ref={codeRef}
          />
        )}
        {errors && errors.length > 0 && (
          <ErrorsRenderer className="md:mt-1-0 mt-2-0 md:text-1-8 text-2-8" errors={errors} />
        )}
        <Button
          onClick={nextClickHandler}
          className="bg-blue hover:opacity-90 text-white md:ml-auto duration-150 mt-auto"
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

PhysicalPersonForm.propTypes = {
  className: PropTypes.string,
  onCodeConfirm: PropTypes.func,
  onBackClick: PropTypes.func
};

PhysicalPersonForm.defaultProps = {
  className: '',
  onCodeConfirm: () => {},
  onBackClick: () => {}
};

export default PhysicalPersonForm;
