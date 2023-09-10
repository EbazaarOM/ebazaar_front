import PropTypes from 'prop-types';
import { userTypes } from '@/utils/constants/userTypes';
import { SuccessBox } from '@/components/Base/SuccessBox';
import { confirmUser } from '@/api/user/account';
import { BackButton } from '@/components/Base/BackButton';
import { useTranslations } from '@/next-intl/useTranslations';
import { useRouter } from 'next/router';
import { logInUser } from '@/store/actions/user.action';
import { useDispatch } from 'react-redux';
import { PhysicalPersonForm } from './components/PhysicalPersonForm';
import { CreatePasswordForm } from '../CreatePasswordForm';
import { JuridicalForm } from './components/JuridicalForm';

let timeout = null;

const buttonClassSet =
  'hover:bg-green-100 hover:border-green-100 border border-grey-200 hover:text-green duration-150 w-full md:h-7-0 h-10-0 md:text-2-0 text-2-8 font-rm upper';

const Registration = (props) => {
  const { onAuthorizationClick, onClose } = props;
  const [type, setType] = React.useState(null);
  const [tokenInfo, setTokenInfo] = React.useState(null);
  const [finished, setFinished] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const isCheckoutPage = router.pathname === '/cart/checkout';

  const codeConfirmHandler = ({ token, identifier }) => {
    setTokenInfo({ token, identifier });
  };

  const t = useTranslations();

  const passwordCreateHandler = async (info) => {
    try {
      const { signInResult, token } = await confirmUser({ ...tokenInfo, ...info });
      if (signInResult.succeeded) {
        setFinished(true);
        dispatch(logInUser(token));
        dataLayer.push({ event: 'gtm.click', click_id: 1234 });
        timeout = setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {tokenInfo === null ? (
        <>
          {type === null && (
            <>
              <BackButton title={t('selectUserType')} className="md:mb-4-0 mb-8-0" onClick={onAuthorizationClick} />
              <div className="grid md:grid-cols-2 gap-3-0">
                <button type="button" className={buttonClassSet} onClick={() => setType(userTypes.PHYSICAL)}>
                  {t('physical')}
                </button>
                <button type="button" className={buttonClassSet} onClick={() => setType(userTypes.JURIDICAL)}>
                  {t('juridical')}
                </button>
              </div>
            </>
          )}
          {type === userTypes.PHYSICAL && (
            <PhysicalPersonForm onCodeConfirm={codeConfirmHandler} onBackClick={() => setType(null)} />
          )}
          {type === userTypes.JURIDICAL && (
            <JuridicalForm onCodeConfirm={codeConfirmHandler} onBackClick={() => setType(null)} />
          )}
        </>
      ) : (
        <>
          {!finished ? (
            <CreatePasswordForm
              onSubmit={passwordCreateHandler}
              onBackClick={() => {
                setType(null);
                setTokenInfo(null);
              }}
            />
          ) : (
            !isCheckoutPage && (
              <SuccessBox title={t('successfullyRegistered')} description={t('successfullyRegisteredDescr')} />
            )
          )}
        </>
      )}
    </>
  );
};

Registration.propTypes = {
  onAuthorizationClick: PropTypes.func,
  onClose: PropTypes.func
};

Registration.defaultProps = {
  onAuthorizationClick: () => {},
  onClose: () => {}
};

export default Registration;
