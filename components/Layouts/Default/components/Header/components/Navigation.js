import { Burger } from '@/components/Base/Burger';
import { RouterLink } from '@/components/Base/RouterLink';
import { SVG } from '@/components/Base/SVG';
import { CallAnswerIcon } from '@/components/Vectors/CallAnswerIcon';
import PropTypes from 'prop-types';
import { useTranslations } from 'use-intl';

const Navigation = ({ onCategoriesClick, categoriesIsVisible, className, phone }) => {
  const t = useTranslations('common');
  return (
    <nav className={className}>
      <ul className="flex items-center md:justify-start justify-between md:text-2-0 text-2-6 md:font-rm font-lt">
        <li className="mr-5-7 md:block hidden">
          <button type="button" className="flex items-center" onClick={onCategoriesClick}>
            <Burger isOpened={categoriesIsVisible} className="mr-1-2 h-1-6 w-2-5" />
            {t('categories')}
          </button>
        </li>
        <li className="mr-5-7">
          <RouterLink href="/blogs">{t('blog')}</RouterLink>
        </li>
        <li className="mr-5-7">
          <RouterLink href="/farmers">{t('farmers')}</RouterLink>
        </li>
        {phone && (
          <li>
            <a href={`tel:${phone}`} className="mr-5-7 font-md text-green flex items-center">
              <SVG src={CallAnswerIcon} className="md:w-1-8 w-2-4 md:mr-0-7 mr-1-6" />
              <span>{phone}</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  categoriesIsVisible: PropTypes.bool,
  onCategoriesClick: PropTypes.func,
  className: PropTypes.string,
  phone: PropTypes.string
};
Navigation.defaultProps = {
  categoriesIsVisible: false,
  onCategoriesClick: () => {},
  className: '',
  phone: ''
};

export default Navigation;
