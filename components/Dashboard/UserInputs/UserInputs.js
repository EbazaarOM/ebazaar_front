import { DatePicker } from '@/components/Base/DatePicker';
import { DropDown } from '@/components/Base/DropDown';
import { TextField } from '@/components/Base/TextField';
import { DashboardLayout } from '@/components/Layouts/DashboardLayout';
import { gender } from '@/utils/constants/gender';
import { userTypes } from '@/utils/constants/userTypes';
import { juridicalTypes } from '@/utils/constants/juridicalTypes';
import { useRouter } from 'next/router';
import { useTranslations } from '@/next-intl/useTranslations';
import PropTypes from 'prop-types';

const UserInputs = ({ inputChangeHandler, profile, juridicalInfo, errored, isFieldFilled }) => {
  const t = useTranslations(['common', 'dashboard', 'errors']);

  const { locale } = useRouter();

  const getErroredFieldInfo = (x) => errored.find((err) => err.key === x) || {};

  const userType = React.useMemo(() => profile.userType, [profile]);

  const mappedJuridicalTypes = React.useMemo(
    () => juridicalTypes.map((x) => ({ ...x, title: x.title[locale] })),
    [locale]
  );

  const mappedGender = React.useMemo(() => gender.map((x) => ({ ...x, title: x.title[locale] })), [locale]);

  const generateTextFieldProps = (key, isJuridical = false) => ({
    errorMessage: getErroredFieldInfo(key).value,
    label: t(key),
    placeholder: t('addInfo'),
    value: (isJuridical ? juridicalInfo[key] : profile[key]) || '',
    onChange: (value) => inputChangeHandler(key, value, isJuridical),
    disabled: isFieldFilled(key)
  });

  return (
    <div className="grid md:grid-cols-3 gap-x-3-0 gap-y-4-0">
      {userType === userTypes.PHYSICAL && (
        <>
          <TextField {...generateTextFieldProps('firstName')} />
          <TextField {...generateTextFieldProps('lastName')} />
          <DropDown
            errorMessage={getErroredFieldInfo('gender').value}
            size="big"
            items={mappedGender}
            displayKey="title"
            placeholder={t('addInfo')}
            label={t('sex')}
            onSelect={(x) => inputChangeHandler('gender', x.value)}
            value={mappedGender.find((x) => x.value === profile.gender)?.title || ''}
          />
          <DatePicker
            errorMessage={getErroredFieldInfo('dateOfBirth').value}
            label={t('dateOfBirth')}
            size="big"
            date={profile.dateOfBirth}
            onSelect={(value) => inputChangeHandler('dateOfBirth', value)}
            format="DD/MM/YY"
            placeholder={t('select')}
          />
        </>
      )}
      {userType === userTypes.JURIDICAL && (
        <>
          <DropDown
            className="col-span-2"
            label={t('juridicalType')}
            size="big"
            displayKey="title"
            onSelect={(val) => inputChangeHandler('juridicalType', val ? val.value : '', true)}
            items={mappedJuridicalTypes}
            value={mappedJuridicalTypes.find((x) => x.value === juridicalInfo.juridicalType)?.title}
            disabled={isFieldFilled('juridicalType')}
          />
          <TextField {...generateTextFieldProps('commercialName', true)} className="col-start-1" />
          <TextField {...generateTextFieldProps('juridicalName', true)} />
          <TextField {...generateTextFieldProps('identificationNumber', true)} />
          <TextField {...generateTextFieldProps('directorFirstName', true)} />
          <TextField {...generateTextFieldProps('directorLastName', true)} />
          <TextField {...generateTextFieldProps('contactPersonFirstName', true)} />
          <TextField {...generateTextFieldProps('contactPersonLastName', true)} />
          <TextField value={profile.email} label={t('companyEmail')} disabled className="col-span-2" />
        </>
      )}
    </div>
  );
};

UserInputs.propTypes = {
  inputChangeHandler: PropTypes.func,
  profile: PropTypes.object,
  juridicalInfo: PropTypes.object,
  errored: PropTypes.array,
  isFieldFilled: PropTypes.func
};

UserInputs.defaultProps = {
  inputChangeHandler: () => {},
  profile: {},
  juridicalInfo: {},
  errored: [],
  isFieldFilled: () => {}
};

UserInputs.getLayout = DashboardLayout.getLayout();

export default UserInputs;
