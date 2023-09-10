import { Pagination } from '@/components/Base/Pagination';
import PropTypes from 'prop-types';
import { Filter } from '@/components/Products/Filter';
import { useRouter } from 'next/router';
import { ProductsBreadcrumbRenderer } from '@/components/Products/ProductsBreadcrumbRenderer';
import { DropDown } from '@/components/Base/DropDown';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import { CategoryPath } from '@/models/CategoryPath';
import { useCategoriesTree, useProducts } from '@/api/products/swr';
import { useIsMounted } from '@/hooks/useIsMounted';
import { ProductsRenderer } from '@/components/Products/ProductsRenderer';
import { PRODUCT_PAGE_TYPES } from '@/utils/constants/productPageTypes';
import { useTranslations } from '@/next-intl/useTranslations';
import { sortByOptions } from '@/utils/constants/sortByOptions';
import { getSingleCategory, getSingleSubCategory } from '@/api/products/categories';

const getCategoryInfo = (subCategoryId, categoryId) => {
  if (subCategoryId) {
    return getSingleSubCategory(subCategoryId);
  }
  if (categoryId) {
    return getSingleCategory(categoryId);
  }
  return Promise.resolve({});
};

const findRecursively = (arr, id, path) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].id === id) {
      return [...path, new CategoryPath(arr[i])];
    }
    if (arr[i].children) {
      const res = findRecursively(arr[i].children, id, [...path, new CategoryPath(arr[i])]);
      if (res.length > 0) return res;
    }
  }
  return [];
};

const PER_PAGE = 12;

const DEFAULT_QUERY = {
  take: PER_PAGE,
  full: false
};

const Products = ({ type, categoryInfo: initialCategoryInfo }) => {
  const [categoryInfo, setCategoryInfo] = React.useState(initialCategoryInfo);
  const additionalQuery = React.useMemo(
    () => (type === 'all' ? {} : { [PRODUCT_PAGE_TYPES[type].queryParameter]: true }),
    [type]
  );

  const t = useTranslations();

  const router = useRouter();
  const isMounted = useIsMounted();
  const scrollToRef = React.useRef(null);

  const routerPush = (query) => {
    router.push({ pathname: router.pathname, query: { ...query, type: router.query.type } }, undefined, {
      scroll: false,
      shallow: true
    });
  };

  const page = +router.query.page || 1;

  const { items, total, isValidating } = useProducts({
    skip: (page - 1) * PER_PAGE,
    ...router.query,
    ...DEFAULT_QUERY,
    ...additionalQuery
  });

  React.useEffect(() => {
    if (isMounted) {
      scrollToRef.current.scrollIntoView();
    }
  }, [page]);

  const { data: categories } = useCategoriesTree({ ...additionalQuery });

  const filterOptions = router.query;
  const addFilter = (options) => routerPush({ ...filterOptions, ...options, page: 1 });

  const selectedSubCategoryId = +router.query.subCategoryId;
  const selectedCategoryId = +router.query.categoryId;

  // Fetch category info on client side only when navigating clientside
  React.useEffect(() => {
    if (isMounted) {
      getCategoryInfo(selectedSubCategoryId, selectedCategoryId).then(setCategoryInfo);
    }
  }, [selectedSubCategoryId, selectedCategoryId]);

  const selectedCategory = React.useMemo(() => {
    if (categories.length > 0) {
      const foundCategory = categories.find((x) => x.id === selectedCategoryId);
      return foundCategory;
    }
    return null;
  }, [categories, selectedCategoryId]);

  const path = React.useMemo(() => {
    if (categories.length > 0) {
      if (selectedCategory) {
        if (selectedCategory.children && selectedSubCategoryId) {
          const p = findRecursively(selectedCategory.children, selectedSubCategoryId, []);
          return [new CategoryPath(selectedCategory), ...p];
        }
        return [new CategoryPath(selectedCategory)];
      }
    }
    return [];
  }, [categories, selectedCategoryId, selectedSubCategoryId]);

  const categoryClickHandler = (categoryId, firstLevelCategoryId) => {
    const query = firstLevelCategoryId
      ? { categoryId: firstLevelCategoryId, subCategoryId: categoryId }
      : { categoryId };
    routerPush(query);
  };

  const allCategoryClickHandler = () => {
    routerPush({});
  };

  const mappedSortByOptions = React.useMemo(
    () => sortByOptions.map((x) => ({ ...x, title: x.title[router.locale] })),
    [router.locale]
  );

  return (
    <>
      <HeaderTagsRenderer
        title={categoryInfo.title || t('products')}
        description={categoryInfo.description}
        image={categoryInfo.image && process.env.STATIC_RESOURCES_URL.concat(categoryInfo.image)}
      />
      <div className="container mt-3-0 md:flex" ref={scrollToRef}>
        <div className="md:mr-3-0 md:w-23-5-percent">
          <Filter
            selectedSubCategoryId={selectedSubCategoryId}
            selectedCategoryId={selectedCategoryId}
            categories={categories}
            path={path}
            categoryClickHandler={categoryClickHandler}
            allCategoryClickHandler={allCategoryClickHandler}
            addFilter={addFilter}
            filterOptions={filterOptions}
            additionalQuery={additionalQuery}
            hasSaleFilter={type !== PRODUCT_PAGE_TYPES.saled.key}
          />
        </div>
        <div className="flex-1">
          <div className="md:h-11-2 md:bg-white md:p-3-0 md:flex items-center justify-between md:mt-0 mt-2-0">
            <div className="md:block hidden">
              <ProductsBreadcrumbRenderer
                breadcrumb={path}
                onClick={categoryClickHandler}
                allCategoryClickHandler={allCategoryClickHandler}
              />
            </div>
            <div className="flex items-center">
              <DropDown
                className="md:w-27-8 w-full md:order-2 order-1"
                items={mappedSortByOptions}
                displayKey="title"
                placeholder={t('sortBy')}
                onSelect={(x) => addFilter({ sortBy: x ? x.value : '' })}
                value={
                  (filterOptions.sortBy && mappedSortByOptions.find((x) => x.value === filterOptions.sortBy)?.title) ||
                  ''
                }
                withClearIcon
                withInput={false}
              />
            </div>
          </div>
          <ProductsRenderer
            className="mt-3-8 grid md:grid-cols-3 grid-cols-2 gap-3-0"
            items={items}
            total={total}
            loading={isValidating}
          />
          {total > PER_PAGE && (
            <div className="mt-6-8 flex justify-end">
              <Pagination
                page={page}
                onPageChange={(nextPage) =>
                  router.push({ pathname: router.pathname, query: { ...router.query, page: nextPage } }, undefined, {
                    shallow: true
                  })
                }
                pageCount={total / PER_PAGE}
                color="secondary"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Products.propTypes = {
  type: PropTypes.string.isRequired,
  categoryInfo: PropTypes.object
};

Products.defaultProps = {
  categoryInfo: null
};

Products.getInitialProps = async ({ query }) => {
  const { type, subCategoryId, categoryId } = query;
  if (!PRODUCT_PAGE_TYPES[type]) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }

  const categoryInfo = await getCategoryInfo(subCategoryId, categoryId);

  return {
    type,
    categoryInfo
  };
};

export default Products;
