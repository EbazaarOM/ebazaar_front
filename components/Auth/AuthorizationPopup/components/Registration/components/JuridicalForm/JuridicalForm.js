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
import { DropDown } from '@/components/Base/DropDown';
import { juridicalTypes } from '@/utils/constants/juridicalTypes';
import { useRegions } from '@/api/shared/swr';
import { BaseError } from '@/models/BaseError';
import { ErrorsRenderer } from '@/components/Base/ErrorsRenderer';
import { useTranslations } from '@/next-intl/useTranslations';
import { useRouter } from 'next/router';

const JuridicalForm = ({ className, onCodeConfirm, onBackClick }) => {
  const [info, setInfo] = React.useState({ userType: userTypes.JURIDICAL });
  const [juridicalInfo, setJuridicalInfo] = React.useState({});
  const [address, setAddress] = React.useState({ address: '' });
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [errors, setErrors] = React.useState([]);
  const { locale } = useRouter();

  const { items: regions } = useRegions({ take: -1, hasDelivery: true });
  const codeRef = React.useRef(null);
  const t = useTranslations();
  const isFieldErrored = React.useCallback((field) => errors.findIndex((x) => x.key === field) > -1, [errors]);

  const selectedRegion = React.useMemo(
    () => (address.regionId ? regions.find((x) => x.id === +address.regionId) : regions.find((x) => x.isTbilisi)),
    [address.regionId, regions]
  );

  const errorHandler = (error) => {
    if (error.data?.errors) {
      const errs = error.data.errors.map(
        (x) =>
          new BaseError(x.key === 'Identifier' ? 'email' : firstLetterToLowerCase(x.key?.split('.').pop()), x.value)
      );
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
      await requestCode({ identifier: info.identifier }, requestCodeTypes.REGISTRATION);
      return true;
    } catch (error) {
      setErrors([new BaseError('custom', 'error')]);
      return false;
    }
  };

  const registerWrapper = async () => {
    setLoading(true);
    try {
      await register({ ...info, juridicalInfo, address: { ...address, regionId: selectedRegion.id } });
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

  const inputChangeHandler = (key, val, isJuridical = false) => {
    if (errors.length > 0) setErrors([]);
    if (isJuridical) {
      setJuridicalInfo({ ...juridicalInfo, [key]: val });
    } else {
      setInfo({ ...info, [key]: val });
    }
  };

  const generateJuridicalTextFieldProps = (field) => ({
    errored: isFieldErrored(field),
    label: t(field),
    value: juridicalInfo[field] || '',
    onChange: (value) => inputChangeHandler(field, value, true)
  });

  const mappedJuridicalTypes = juridicalTypes.map((x) => ({ ...x, title: x.title[locale] }));

  return (
    <div className={clsx(className, 'flex flex-col h-full')}>
      <BackButton
        title={step === 0 ? t('fillPersonalInfo') : t('emailConfirmation')}
        className="md:mb-4-0 mb-8-0"
        onClick={() => (step === 0 ? onBackClick() : setStep(0))}
      />
      <div className="flex-1 flex flex-col">
        {step === 0 ? (
          <form onSubmit={nextClickHandler} className="grid md:grid-cols-2 gap-3-0">
            <DropDown
              errored={isFieldErrored('juridicalType')}
              className="md:col-span-2"
              label={t('juridicalType')}
              size="big"
              placeholder={t('juridicalType')}
              displayKey="title"
              onSelect={(val) => inputChangeHandler('juridicalType', val ? val.value : '', true)}
              items={mappedJuridicalTypes}
              value={mappedJuridicalTypes.find((x) => x.value === juridicalInfo.juridicalType)?.title}
            />
            <TextField {...generateJuridicalTextFieldProps('commercialName')} />
            <TextField {...generateJuridicalTextFieldProps('juridicalName')} />
            <TextField {...generateJuridicalTextFieldProps('directorFirstName')} />
            <TextField {...generateJuridicalTextFieldProps('directorLastName')} />
            <TextField {...generateJuridicalTextFieldProps('contactPersonFirstName')} />
            <TextField {...generateJuridicalTextFieldProps('contactPersonLastName')} />
            <TextField {...generateJuridicalTextFieldProps('identificationNumber')} />
            <TextField {...generateJuridicalTextFieldProps('phoneNumber')} />
            <DropDown
              errored={isFieldErrored('regionId')}
              size="big"
              items={regions}
              displayKey="title"
              label={t('city')}
              placeholder={t('select')}
              onSelect={(value) => setAddress({ ...address, regionId: value ? value.id : null })}
              value={selectedRegion?.title || ''}
            />
            <TextField
              errored={isFieldErrored('address')}
              label={t('address')}
              placeholder={t('write')}
              value={address.address || ''}
              onChange={(value) => setAddress({ ...address, address: value })}
            />
            <TextField
              errored={isFieldErrored('email')}
              label={t('email')}
              value={info.identifier || ''}
              onChange={(value) => inputChangeHandler('identifier', value)}
              className="md:col-span-2"
            />
          </form>
        ) : (
          <RequestCodeForm
            title={t('codeSentOnEmail', { value: info.identifier })}
            onCodeRequest={requestCodeClickHandler}
            ref={codeRef}
          />
        )}
        {errors && errors.length > 0 && (
          <ErrorsRenderer className="md:mt-1-0 mt-2-0 md:text-1-8 text-2-8" errors={errors} />
        )}
        <div className="flex-1 mt-5-0 flex">
          <Button
            onClick={nextClickHandler}
            className="bg-blue hover:opacity-90 text-white md:ml-auto md:w-auto w-full duration-150 mt-auto"
            px="px-10-0"
            size="xxl"
            disabled={loading}
          >
            {t('next')}
          </Button>
        </div>
      </div>
    </div>
  );
};

JuridicalForm.propTypes = {
  className: PropTypes.string,
  onCodeConfirm: PropTypes.func,
  onBackClick: PropTypes.func
};

JuridicalForm.defaultProps = {
  className: '',
  onCodeConfirm: () => {},
  onBackClick: () => {}
};

export default JuridicalForm;
