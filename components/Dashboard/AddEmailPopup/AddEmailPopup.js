import { addEmail, confirmCode, confirmEmail, requestCode } from '@/api/user/account';
import { Button } from '@/components/Base/Button';
import { ErrorsRenderer } from '@/components/Base/ErrorsRenderer';
import { RequestCodeForm } from '@/components/Base/RequestCodeForm';
import { SVG } from '@/components/Base/SVG';
import { TextField } from '@/components/Base/TextField';
import { Checkmark } from '@/components/Vectors/Checkmark';
import { XIcon } from '@/components/Vectors/XIcon';
import { BaseError } from '@/models/BaseError';
import { requestCodeTypes } from '@/utils/constants/requestCodeTypes';
import { firstLetterToLowerCase } from '@/utils/stringManipulation';
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

const AddEmailPopup = ({ onClose, onAdd, identifier }) => {
  const [email, setEmail] = React.useState('');
  const [isCodeVisible, setCodeVisibility] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const t = useTranslations('common');

  const codeRequestRef = React.useRef(null);

  React.useEffect(() => {
    if (errors.length > 0) {
      setErrors([]);
    }
  }, [email, isCodeVisible]);

  const errorHandler = (error) => {
    if (error.data?.errors) {
      const errs = error.data.errors.map((x) => new BaseError(firstLetterToLowerCase(x.key), x.value));
      setErrors(errs);
    } else {
      setErrors([new BaseError('custom', 'error')]);
    }
  };

  const requestCodeWrapper = async () => {
    try {
      await requestCode({ identifier }, requestCodeTypes.EMAIL_CONFIRMATION);
      return true;
    } catch (error) {
      errorHandler(error);
      return false;
    }
  };

  const addEmailWrapper = async () => {
    try {
      const { success } = await addEmail({ email });
      return success;
    } catch (error) {
      errorHandler(error);
      return false;
    }
  };

  const confirmCodeWrapper = async () => {
    const code = codeRequestRef.current.getCode();
    try {
      const { token, success } = await confirmCode({ identifier, code });
      if (success) {
        await confirmEmail({ token });
        onAdd(email);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const btnClickHandler = async () => {
    setLoading(true);
    if (isCodeVisible) {
      await confirmCodeWrapper();
    } else {
      const success = await addEmailWrapper();
      if (success) setCodeVisibility(true);
    }
    setLoading(false);
  };

  return (
    <div className="p-5-0 bg-white w-full max-h-full overflow-auto custom-scrollbar">
      <div className="flex items-center justify-between">
        <span className="text-2-0 font-md">{t('addEmail')}</span>
        <SVG src={XIcon} className="w-2-0 cursor-pointer transform hover:rotate-90 duration-150" onClick={onClose} />
      </div>
      <div className="mt-5-0">
        {!isCodeVisible && <TextField label={t('email')} placeholder={t('write')} value={email} onChange={setEmail} />}
        {isCodeVisible && (
          <RequestCodeForm
            ref={codeRequestRef}
            onCodeRequest={requestCodeWrapper}
            title={t('codeSentOnEmail', { value: email })}
          />
        )}
      </div>
      {errors && errors.length > 0 && (
        <ErrorsRenderer className="md:mt-1-0 mt-2-0 md:text-1-8 text-2-8" errors={errors} />
      )}
      <Button
        disabled={loading}
        size="xxl"
        className="mt-13-0 bg-blue hover:bg-white text-white border border-blue hover:text-blue ml-auto duration-150"
        onClick={btnClickHandler}
      >
        <SVG src={Checkmark} className="w-1-3 mr-1-3" />
        {t('add')}
      </Button>
    </div>
  );
};

AddEmailPopup.propTypes = {
  onClose: PropTypes.func,
  onAdd: PropTypes.func,
  identifier: PropTypes.string.isRequired
};

AddEmailPopup.defaultProps = {
  onClose: () => {},
  onAdd: () => {}
};

export default AddEmailPopup;
