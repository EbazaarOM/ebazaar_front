import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const UserInfoShort = (props) => {
  const { className, userInfo } = props;
  const t = useTranslations(['dashboard']);

  return (
    <div className={clsx(className, 'font-rm md:text-1-8 text-2-8')}>
      <div className="text-grey-600">{t('username')}:</div>
      <div className="md:mt-1-0 mt-3-0">{userInfo.fullName}</div>
      {userInfo.idNumber && (
        <>
          <div className="text-grey-600 md:mt-1-0 mt-3-0">{t('identificationNumber')}</div>
          <div className="md:mt-1-0 mt-3-0">{userInfo.idNumber}</div>
        </>
      )}
      <div className="text-grey-600 md:mt-1-0 mt-3-0">{t('userID')}:</div>
      <div className="md:mt-1-0 mt-3-0">{userInfo.nameid}</div>
    </div>
  );
};

UserInfoShort.propTypes = {
  className: PropTypes.string,
  userInfo: PropTypes.object.isRequired
};

UserInfoShort.defaultProps = {
  className: ''
};

export default UserInfoShort;
