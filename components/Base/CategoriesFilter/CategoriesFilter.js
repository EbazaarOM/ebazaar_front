import { ArrowDownIcon } from '@/components/Vectors/ArrowDownIcon';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { SVG } from '../SVG';
import { SingleCategory } from './components/SingleCategory';

const CategoriesFilter = ({ className, categories, onCategoryClick, selectedPath, allCategoryClickHandler }) => {
  const t = useTranslations();
  return (
    <div className={clsx(className, '')}>
      <div className="md:h-11-2 h-15-2 md:px-2-0 px-5-0 flex items-center font-md md:text-1-8 text-3-0 upper border-b border-grey-100">
        {t('categories')}
      </div>
      <div className="md:px-3-0 px-5-0 pt-3-0 pb-2-4">
        <div className="relative md:mb-0-5 mb-2-0 flex items-center">
          <div className="md:w-2-0 w-5-0 flex items-center">
            <SVG src={ArrowDownIcon} className="md:w-1-0 w-2-5 cursor-pointer" />
          </div>
          <div
            onClick={allCategoryClickHandler}
            aria-hidden
            className={clsx('cursor-pointer md:text-1-8 text-4-0 md:font-lt font-rm flex-1', {
              'md:font-md md:text-current text-green': selectedPath.length === 0
            })}
          >
            {t('allCategories')}
          </div>
        </div>
        {categories &&
          categories.map((category) => (
            <SingleCategory
              selectedPath={selectedPath}
              firstLevelCategoryId={category.id}
              key={category.id}
              category={category}
              onCategoryClick={onCategoryClick}
            />
          ))}
      </div>
    </div>
  );
};

CategoriesFilter.propTypes = {
  className: PropTypes.string,
  categories: PropTypes.array,
  onCategoryClick: PropTypes.func,
  selectedPath: PropTypes.array,
  allCategoryClickHandler: PropTypes.func
};

CategoriesFilter.defaultProps = {
  className: '',
  categories: [],
  onCategoryClick: () => {},
  selectedPath: [],
  allCategoryClickHandler: () => {}
};

export default CategoriesFilter;
