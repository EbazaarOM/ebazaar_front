import { Breadcrumb } from '@/components/Base/Breadcrumb';
import { useTranslations } from '@/next-intl/useTranslations';
import PropTypes from 'prop-types';

const ProductsBreadcrumbRenderer = ({ breadcrumb, onClick, allCategoryClickHandler }) => {
  const [category, ...subCategories] = breadcrumb;
  const t = useTranslations();
  return (
    <Breadcrumb>
      <button type="button" onClick={allCategoryClickHandler}>
        {t('categories')}
      </button>
      {category && (
        <button onClick={() => onClick(category.id)} type="button">
          {category.title}
        </button>
      )}
      {subCategories &&
        subCategories.map((x) => (
          <button onClick={() => onClick(x.id, category.id)} key={x.id} type="button">
            {x.title}
          </button>
        ))}
    </Breadcrumb>
  );
};

ProductsBreadcrumbRenderer.propTypes = {
  onClick: PropTypes.func,
  breadcrumb: PropTypes.array,
  allCategoryClickHandler: PropTypes.func
};

ProductsBreadcrumbRenderer.defaultProps = {
  onClick: () => {},
  breadcrumb: [],
  allCategoryClickHandler: () => {}
};

export default ProductsBreadcrumbRenderer;
