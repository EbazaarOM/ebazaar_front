import { useTranslations } from '@/next-intl/useTranslations';
import { farmerProfileView } from '@/utils/constants/farmerProfileView';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const FarmerNavigation = ({ className, view, onViewChange }) => {
  const t = useTranslations();

  return (
    <div className={clsx(className, 'upper farmer-navigation')}>
      <div
        className={clsx(
          { 'farmer-navigation__item__active': view === farmerProfileView.PRODUCTS },
          'farmer-navigation__item'
        )}
        onClick={() => onViewChange(farmerProfileView.PRODUCTS)}
        aria-hidden
      >
        {t('farmerProducts')}
      </div>
      <div
        className={clsx(
          { 'farmer-navigation__item__active': view === farmerProfileView.PROFILE },
          'farmer-navigation__item'
        )}
        onClick={() => onViewChange(farmerProfileView.PROFILE)}
        aria-hidden
      >
        {t('farmerProfile')}
      </div>
    </div>
  );
};

FarmerNavigation.propTypes = {
  className: PropTypes.string,
  view: PropTypes.number,
  onViewChange: PropTypes.func
};

FarmerNavigation.defaultProps = {
  className: '',
  view: farmerProfileView.PRODUCTS,
  onViewChange: () => {}
};

export default FarmerNavigation;
