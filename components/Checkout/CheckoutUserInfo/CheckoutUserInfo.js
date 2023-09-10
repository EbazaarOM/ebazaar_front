import clsx from 'clsx';
import { useRouter } from 'next/router';
import { getUserProfile } from '@/api/user/account';
import { Addresses } from '@/components/Dashboard/Addresses';
import { Phones } from '@/components/Dashboard/Phones';
import { userTypes } from '@/utils/constants/userTypes';
import { useTranslations } from '@/next-intl/useTranslations';
import { getPhones } from '@/api/user/phones';
import { getAddresses } from '@/api/user/addresses';
import { MailIcon } from '@/components/Vectors/MailIcon';
import { SVG } from '@/components/Base/SVG';
import { Button } from '@/components/Base/Button';
import { TextField } from '@/components/Base/TextField';
import { juridicalTypes } from '@/utils/constants/juridicalTypes';

const checkoutFieldsPhysical = [];
const checkoutFieldsPhysicalJuridical = [];
// const checkoutFieldsPhysicalJuridical = [
//   'commercialName',
//   'contactPersonFirstName',
//   'contactPersonLastName',
//   'directorFirstName',
//   'directorLastName',
//   'directorLastName',
//   'identificationNumber',
//   'juridicalName',
//   'juridicalType'
// ];

const getFilledFields = (obj) => Object.keys(obj).filter((key) => !!obj[key]);

const CheckoutUserInfo = React.forwardRef((_, ref) => {
  const t = useTranslations(['common', 'dashboard', 'errors']);

  const [profile, setProfile] = React.useState({});
  const [filledFields, setFilledFields] = React.useState([]);
  const [juridicalInfo, setJuridicalInfo] = React.useState({});
  const [phones, setPhones] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);
  const [errored, setErrored] = React.useState([]);

  const isFieldErrored = (x) => errored.findIndex((err) => err.key === x) > -1;
  const isFieldFilled = (x) => filledFields.indexOf(x) > -1;

  const userType = React.useMemo(() => profile.userType, [profile]);

  const { locale } = useRouter();

  const mappedJuridicalTypes = React.useMemo(
    () => juridicalTypes.map((x) => ({ ...x, title: x.title[locale] })),
    [locale]
  );

  React.useImperativeHandle(ref, () => ({
    isCheckoutFieldsFilled() {
      const notFilled = [];
      (profile.userType === userTypes.JURIDICAL ? checkoutFieldsPhysicalJuridical : checkoutFieldsPhysical).forEach(
        (x) => {
          if (!isFieldFilled(x)) {
            notFilled.push({ key: x, value: t('errors.required') });
          }
        }
      );
      if (addresses.length <= 0) notFilled.push({ key: 'address', value: t('errors.required') });
      if (phones.length <= 0) notFilled.push({ key: 'phone', value: t('errors.required') });
      setErrored(notFilled);
      return notFilled.length === 0;
    }
  }));

  const fetchPhones = async () => {
    const { items: phones } = await getPhones();
    setPhones(phones);
    if (errored.length > 0) setErrored([]);
  };

  const fetchAddresses = async () => {
    const { items: addresses } = await getAddresses();
    setAddresses(addresses);
    if (errored.length > 0) setErrored([]);
  };

  const fetchUser = async () => {
    try {
      const { juridicalInfo, ...baseInfo } = await getUserProfile();
      let juridicalFilledFields = [];
      if (baseInfo.userType === userTypes.JURIDICAL) {
        juridicalFilledFields = getFilledFields(juridicalInfo);
        setJuridicalInfo(juridicalInfo);
      }
      setFilledFields([...juridicalFilledFields, ...getFilledFields(baseInfo)]);
      setProfile(baseInfo);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchUser();
    fetchPhones();
    fetchAddresses();
  }, []);

  if (Object.keys(profile).length <= 0) return null;

  const emailFieldIsVisible = userType === userTypes.PHYSICAL && profile.email;

  const generateTextFieldProps = (key) => ({
    label: t(key),
    value: juridicalInfo[key] || '',
    disabled: true
  });

  return (
    <>
      {userType === userTypes.JURIDICAL && (
        <div className="md:px-6-0 md:pb-4-0 md:border-b border-grey-200 px-4-0 grid md:grid-cols-3 gap-x-3-0 gap-y-4-0">
          <TextField
            value={mappedJuridicalTypes.find((x) => x.value === juridicalInfo.juridicalType)?.title}
            label={t('juridicalType')}
            disabled
            className="col-span-2"
          />
          <TextField {...generateTextFieldProps('commercialName')} className="col-start-1" />
          <TextField {...generateTextFieldProps('juridicalName')} />
          <TextField {...generateTextFieldProps('identificationNumber')} />
          <TextField {...generateTextFieldProps('directorFirstName')} />
          <TextField {...generateTextFieldProps('directorLastName')} />
          <TextField {...generateTextFieldProps('contactPersonFirstName')} />
          <TextField {...generateTextFieldProps('contactPersonLastName')} />
          <TextField value={profile.email} label={t('companyEmail')} disabled className="col-span-2" />
        </div>
      )}
      {Object.keys(profile).length > 0 && (
        <div
          className={clsx(
            [emailFieldIsVisible ? 'md:grid-cols-3' : 'md:grid-cols-2'],
            'md:px-6-0 pb-4-0 pt-4-0 grid md:gap-3-0 gap-4-0 px-4-0'
          )}
        >
          <Phones
            identifier={profile.userName}
            errored={isFieldErrored('phone')}
            phones={phones}
            fetchPhones={fetchPhones}
          />
          <Addresses errored={isFieldErrored('address')} addresses={addresses} fetchAddresses={fetchAddresses} />

          {emailFieldIsVisible && (
            <div>
              <Button
                size="custom"
                className="w-full md:h-7-0 h-9-0 md:text-2-0 text-2-8 bg-grey-50 text-grey-600 pointer-events-none"
              >
                <SVG src={MailIcon} className="w-2-0 mr-1-8" />
                <span>{t('email')}</span>
              </Button>
              {profile.email && (
                <div className="md:mt-6-0 mt-4-0 font-rm md:text-1-6 text-2-6 px-3-0 py-2-2 border border-grey-200">
                  {profile.email}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
});

CheckoutUserInfo.displayName = 'CheckoutUserInfo';

export default CheckoutUserInfo;
