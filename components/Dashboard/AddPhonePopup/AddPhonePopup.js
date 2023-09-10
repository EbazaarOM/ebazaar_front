import { confirmCode, requestCode } from '@/api/user/account';
import { addPhone, confirmPhone } from '@/api/user/phones';
import { Button } from '@/components/Base/Button';
import { ErrorsRenderer } from '@/components/Base/ErrorsRenderer';
import { RequestCodeForm } from '@/components/Base/RequestCodeForm';
import { SVG } from '@/components/Base/SVG';
import { TextField } from '@/components/Base/TextField';
import { Checkmark } from '@/components/Vectors/Checkmark';
import { XIcon } from '@/components/Vectors/XIcon';
import { BaseError } from '@/models/BaseError';
import { useTranslations } from '@/next-intl/useTranslations';
import { requestCodeTypes } from '@/utils/constants/requestCodeTypes';
import { firstLetterToLowerCase } from '@/utils/stringManipulation';
import PropTypes from 'prop-types';

const AddPhonePopup = ({ onClose, onAdd, identifier }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isCodeVisible, setCodeVisibility] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const t = useTranslations();
  const codeRequestRef = React.useRef(null);

  React.useEffect(() => {
    if (errors.length > 0) {
      setErrors([]);
    }
  }, [phoneNumber, isCodeVisible]);

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
      await requestCode({ identifier }, requestCodeTypes.PHONE_NUMBER_CONFIRMATION);
      return true;
    } catch (error) {
      errorHandler(error);
      return false;
    }
  };

  const addPhoneWrapper = async () => {
    try {
      const { success } = await addPhone({ phoneNumber });
      if (!success) {
        setErrors([new BaseError('custom', 'sms_not_send_phone')]);
      }
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
        await confirmPhone({ token });
        onAdd();
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
      const success = await addPhoneWrapper();
      if (success) {
        setCodeVisibility(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="px-5-0 md:py-5-0 py-11-0 bg-white w-full md:max-h-full md:h-auto h-full overflow-auto custom-scrollbar flex flex-col">
      <SVG
        src={XIcon}
        className="absolute top-5-0 right-5-0 md:w-2-0 w-3-4 cursor-pointer transform hover:rotate-90 duration-150"
        onClick={onClose}
      />
      <div className="md:text-2-0 text-2-8 font-md md:mt-0 mt-4-0">{t('addPhone')}</div>
      <div className="mt-5-0">
        {!isCodeVisible && (
          <TextField
            className="mt-3-1"
            label={t('phoneNumber')}
            placeholder={t('write')}
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        )}
        {isCodeVisible && (
          <RequestCodeForm
            ref={codeRequestRef}
            onCodeRequest={requestCodeWrapper}
            title={t('codeSentOnPhone', { value: phoneNumber })}
          />
        )}
      </div>
      {errors && errors.length > 0 && (
        <ErrorsRenderer className="md:mt-1-0 mt-2-0 md:text-1-8 text-2-8" errors={errors} />
      )}
      <Button
        disabled={loading}
        size="xxl"
        className="md:mt-13-0 mt-auto bg-blue hover:bg-white text-white border border-blue hover:text-blue md:w-auto w-full md:ml-auto duration-150"
        onClick={btnClickHandler}
      >
        <SVG src={Checkmark} className="md:w-1-3 w-3-0 md:mr-1-3 mr-2-0" />
        {t('add')}
      </Button>
    </div>
  );
};

AddPhonePopup.propTypes = {
  onClose: PropTypes.func,
  onAdd: PropTypes.func,
  identifier: PropTypes.string.isRequired
};

AddPhonePopup.defaultProps = {
  onClose: () => {},
  onAdd: () => {}
};

export default AddPhonePopup;
