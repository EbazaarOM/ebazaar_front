import { changePassword } from '@/api/user/account';
import { Button } from '@/components/Base/Button';
import { Popup } from '@/components/Base/Popup';
import { SuccessBox } from '@/components/Base/SuccessBox';
import { SVG } from '@/components/Base/SVG';
import { TextField } from '@/components/Base/TextField';
import AddPasswordPopup from '@/components/Dashboard/AddPasswordPopup/AddPasswordPopup';
import { DashboardLayout } from '@/components/Layouts/DashboardLayout';
import { Checkmark } from '@/components/Vectors/Checkmark';
import { useTranslations } from '@/next-intl/useTranslations';
import { isValidPassword } from '@/utils/isValidPassword';
import { useSelector } from 'react-redux';
import { useBreadcrumbDispatcher } from '@/hooks/useBreadcrumbDispatcher';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';

const ChangePassword = () => {
  const t = useTranslations(['dashboard', 'common']);
  useBreadcrumbDispatcher([{ href: '/account/change-password', title: t('changePassword') }]);
  const [info, setInfo] = React.useState({});
  const [errMsg, setErrMsg] = React.useState('');
  const { userInfo } = useSelector((state) => state.user);

  const successBoxRef = React.useRef(null);
  const resetPasswordRef = React.useRef(null);

  const inputChangeHandler = (key, value) => {
    if (errMsg) setErrMsg('');
    setInfo({ ...info, [key]: value });
  };

  const generateTextFieldProps = (key) => ({
    className: 'mt-3-0',
    value: info[key] || '',
    onChange: (val) => inputChangeHandler(key, val),
    type: 'password'
  });

  const changePasswordWrapper = async () => {
    try {
      const { success } = await changePassword(info);
      if (success) {
        setInfo({});
        successBoxRef.current.open();
      } else {
        setErrMsg(t('common.error'));
      }
    } catch (error) {
      if (error.status === 409) {
        setErrMsg(t('common.samePasswords'));
      } else {
        setErrMsg(t('common.error'));
      }
    }
  };

  const saveHandler = () => {
    setErrMsg('');
    if (!info.password || !info.confirmPassword || !info.currentPassword) {
      setErrMsg(t('common.fillAllFields'));
    } else if (info.password !== info.confirmPassword) {
      setErrMsg(t('common.passwordsDoNotMatch'));
    } else if (!isValidPassword(info.password)) {
      setErrMsg(t('common.passwordDoNotMatchMinimumRequirements'));
    } else {
      changePasswordWrapper();
    }
  };

  return (
    <>
      <HeaderTagsRenderer title={t('changePassword')} />
      {userInfo && (
        <div className="md:px-6-0 px-5-0 pt-4-0 md:pb-6-0 pb-15-0 bg-white h-full">
          <div className="font-md md:text-2-0 text-2-8">{t('changePassword')}</div>

          {userInfo?.hasPassword ? (
            <>
              <div className="md:mt-5-0 mt-3-0 md:w-60-percent">
                <div className="font-lt md:text-1-8 text-2-8">{t('changePasswordCopy')}</div>
                <TextField {...generateTextFieldProps('currentPassword')} label={t('currentPassword')} />
                <TextField {...generateTextFieldProps('password')} label={t('newPassword')} />
                <TextField {...generateTextFieldProps('confirmPassword')} label={t('confirmNewPassword')} />

                {errMsg && <div className="font-md text-1-8 text-red mt-3-0">{errMsg}</div>}
              </div>
              <Button
                size="xl"
                className="bg-blue hover:bg-white text-white border border-blue hover:text-blue ml-auto duration-150 md:w-auto w-full md:mt-0 mt-15-0"
                onClick={saveHandler}
              >
                <SVG src={Checkmark} className="w-1-3 mr-1-3 md:block hidden" />
                {t('common.save')}
              </Button>
            </>
          ) : (
            <Button
              size="xl"
              className="bg-blue hover:bg-white text-white border border-blue hover:text-blue duration-150 md:w-auto w-full mt-10-0"
              onClick={() => resetPasswordRef.current.open()}
            >
              {t('addPassword')}
            </Button>
          )}
          <Popup ref={successBoxRef} className="bg-white md:w-76-5 w-90-percent">
            <SuccessBox
              title={t('passwordSuccessfullyChanged')}
              headerTitle={t('changePassword')}
              onClose={() => successBoxRef.current.close()}
            />
          </Popup>
          <Popup ref={resetPasswordRef} className="bg-white md:w-76-5 w-full md:max-h-full md:h-auto h-full">
            <AddPasswordPopup identifier={userInfo.username} onClose={() => resetPasswordRef.current.close()} />
          </Popup>
        </div>
      )}
    </>
  );
};

ChangePassword.getInitialProps = async () => {
  return {};
};

ChangePassword.getLayout = DashboardLayout.getLayout();

export default ChangePassword;
