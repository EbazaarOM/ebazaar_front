import clsx from 'clsx';
import { getUserProfile, updateUserProfile } from '@/api/user/account';
import { Button } from '@/components/Base/Button';
import { SVG } from '@/components/Base/SVG';
import { Checkmark } from '@/components/Vectors/Checkmark';
import { Addresses } from '@/components/Dashboard/Addresses';
import { Phones } from '@/components/Dashboard/Phones';
import { SuccessBox } from '@/components/Base/SuccessBox';
import { Popup } from '@/components/Base/Popup';
import { DialogBox } from '@/components/Base/DialogBox';
import { firstLetterToLowerCase } from '@/utils/stringManipulation';
import { Email } from '@/components/Dashboard/Email';
import { userTypes } from '@/utils/constants/userTypes';
import { useTranslations } from '@/next-intl/useTranslations';
import { getPhones } from '@/api/user/phones';
import { getAddresses } from '@/api/user/addresses';
import { UserInputs } from '../UserInputs';

const getFilledFields = (obj) => Object.keys(obj).filter((key) => !!obj[key]);

let timeout = null;

const UserProfile = () => {
  const t = useTranslations(['common', 'dashboard', 'errors']);

  const [profile, setProfile] = React.useState({});
  const [filledFields, setFilledFields] = React.useState([]);
  const [juridicalInfo, setJuridicalInfo] = React.useState({});
  const [phones, setPhones] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);
  const [errored, setErrored] = React.useState([]);

  const isFieldFilled = (x) => filledFields.indexOf(x) > -1;

  const dialogRef = React.useRef(null);
  const successBoxRef = React.useRef(null);

  const userType = React.useMemo(() => profile.userType, [profile]);

  const fetchPhones = async () => {
    const { items: phones } = await getPhones();
    setPhones(phones);
  };

  const fetchAddresses = async () => {
    const { items: addresses } = await getAddresses();
    setAddresses(addresses);
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

  const inputChangeHandler = (key, val, isJuridical = false) => {
    if (errored && errored.length > 0) setErrored([]);
    if (isJuridical) {
      setJuridicalInfo({ ...juridicalInfo, [key]: val });
    } else {
      setProfile({ ...profile, [key]: val });
    }
  };

  const updateProfileHandler = async () => {
    try {
      await updateUserProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        identity: profile.identity,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        juridicalInfo: userType === userTypes.JURIDICAL ? juridicalInfo : null
      });
      dialogRef.current.close();
      successBoxRef.current.open();
      setFilledFields([
        ...(profile.userType === userTypes.JURIDICAL ? getFilledFields(juridicalInfo) : []),
        ...getFilledFields(profile)
      ]);
      setErrored([]);
      timeout = setTimeout(() => {
        successBoxRef.current.close();
      }, 4000);
    } catch (error) {
      dialogRef.current.close();
      if (error.data?.errors) {
        setErrored(
          error.data.errors.map((x) => ({
            key: firstLetterToLowerCase(x.key.split('.')?.pop()),
            value: x.value.map((errVal) => t(`errors.${errVal}`)).join(',')
          }))
        );
      }
    }
  };

  if (Object.keys(profile).length <= 0) return null;

  return (
    <>
      <div className="md:px-6-0 md:pb-4-0 md:border-b border-grey-200 px-5-0">
        <UserInputs
          inputChangeHandler={inputChangeHandler}
          profile={profile}
          juridicalInfo={juridicalInfo}
          errored={errored}
          isFieldFilled={isFieldFilled}
        />
      </div>
      {Object.keys(profile).length > 0 && (
        <div className={clsx('md:px-6-0 pb-4-0 pt-4-0 grid md:grid-cols-3 md:gap-3-0 gap-4-0 px-5-0')}>
          <Phones identifier={profile.userName} phones={phones} fetchPhones={fetchPhones} />
          <Addresses addresses={addresses} fetchAddresses={fetchAddresses} />
          {userType === userTypes.PHYSICAL && (
            <Email
              email={profile.email}
              identifier={profile.userName}
              onEmailAdd={(value) => inputChangeHandler('email', value)}
            />
          )}
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-3-0 md:px-6-0 px-5-0 mt-8-0">
        <Button
          size="xl"
          className="bg-blue border-blue hover:text-blue hover:bg-white text-white border ml-auto duration-150 w-full md:col-start-3"
          onClick={() => dialogRef.current.open()}
        >
          <SVG src={Checkmark} className="w-1-3 mr-1-3 md:block hidden" />
          {t('save')}
        </Button>
      </div>
      <Popup ref={dialogRef} className="md:w-76-5 w-90-percent">
        <DialogBox
          title={`${t('dashboard.personalInfoSaveDialogText')}`}
          onAccept={updateProfileHandler}
          onRefuse={() => dialogRef.current.close()}
        />
      </Popup>
      <Popup ref={successBoxRef} className="bg-white w-76-5 pb-15-0">
        <SuccessBox
          title={t('dashboard.successChangeText')}
          headerTitle={t('dashboard.profile')}
          onClose={() => {
            successBoxRef.current.close();
            clearTimeout(timeout);
          }}
        />
      </Popup>
    </>
  );
};

export default UserProfile;
