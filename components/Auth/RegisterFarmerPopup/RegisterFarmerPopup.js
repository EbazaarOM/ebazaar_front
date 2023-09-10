import PropTypes from 'prop-types';
import { SVG } from '@/components/Base/SVG';
import { TextField } from '@/components/Base/TextField';
import { Button } from '@/components/Base/Button';
import { sendFarmerLead } from '@/api/farmer';
import { firstLetterToLowerCase } from '@/utils/stringManipulation';
import { SuccessBox } from '@/components/Base/SuccessBox';
import { FarmerIcon } from '@/components/Vectors/FarmerIcon';
import { PopupBox } from '@/components/Base/PopupBox';
import { useTranslations } from 'use-intl';
import { BaseError } from '@/models/BaseError';
import { ErrorsRenderer } from '@/components/Base/ErrorsRenderer';

const RegisterFarmerPopup = (props) => {
  const { onClose } = props;
  const [errors, setErrors] = React.useState([]);
  const [info, setInfo] = React.useState({});
  const [finished, setFinished] = React.useState(false);

  const t = useTranslations('common');

  const isFieldErrored = React.useCallback((field) => errors.findIndex((x) => x.key === field) > -1, [errors]);

  const errorHandler = (error) => {
    if (error.data?.errors) {
      const errs = error.data.errors.map((x) => new BaseError(firstLetterToLowerCase(x.key), x.value));
      setErrors(errs);
    } else {
      setErrors([new BaseError('custom', 'error')]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendFarmerLead(info);
      setFinished(true);
    } catch (error) {
      errorHandler(error);
    }
  };

  const inputChangeHandler = (key, val) => {
    if (errors.length > 0) setErrors([]);
    setInfo({ ...info, [key]: val });
  };

  const generateTextfieldProps = (key) => ({
    placeholder: t(key),
    label: t(key),
    value: info[key],
    onChange: (val) => inputChangeHandler(key, val),
    errored: isFieldErrored(key)
  });

  const successTitleNode = <div dangerouslySetInnerHTML={{ __html: t.raw('farmerLeadSuccessRaw') }} />;

  return (
    <PopupBox title={t('registerFarmer')} onClose={onClose} icon={<SVG src={FarmerIcon} className="w-2-0 mr-1-5" />}>
      <div className="pt-4-0 pb-5-3 flex-1">
        {!finished ? (
          <form onSubmit={submitHandler} className="h-full flex flex-col">
            <p className="mb-3-8 font-lt md:text-1-6 text-2-6">{t('farmerLeadCopy')}</p>
            <div className="grid md:grid-cols-2 gap-3-0">
              <TextField {...generateTextfieldProps('firstName')} />
              <TextField {...generateTextfieldProps('lastName')} />
              <TextField {...generateTextfieldProps('phoneNumber')} />
              <TextField {...generateTextfieldProps('region')} />
              <TextField {...generateTextfieldProps('products')} className="md:col-span-2" />
            </div>
            {errors && errors.length > 0 && (
              <ErrorsRenderer className="md:mt-1-0 mt-2-0 md:text-1-8 text-2-8" errors={errors} />
            )}
            <div className="flex-1 flex mt-5-0">
              <Button
                size="xxl"
                type="submit"
                className="bg-blue hover:bg-white text-white border border-blue hover:text-black ml-auto duration-150 mt-auto"
                px="px-8-8"
              >
                {t('send')}
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <SuccessBox title={successTitleNode} />
          </div>
        )}
      </div>
    </PopupBox>
  );
};

RegisterFarmerPopup.propTypes = {
  onClose: PropTypes.func
};

RegisterFarmerPopup.defaultProps = {
  onClose: () => {}
};

export default RegisterFarmerPopup;
