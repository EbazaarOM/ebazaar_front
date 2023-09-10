import { getSingleFarmer } from '@/api/farmer';
import { Cover } from '@/components/Farmer/Cover';
import { FarmerNavigation } from '@/components/Farmer/FarmerNavigation';
import { FarmerProfile } from '@/components/Farmer/FarmerProfile';
import { PageLayout } from '@/components/Layouts/PageLayout';
import { farmerProfileView } from '@/utils/constants/farmerProfileView';
import PropTypes from 'prop-types';
import { CategoryPath } from '@/models/CategoryPath';
import { useRouter } from 'next/router';
import { useCategoriesTree, useProducts } from '@/api/products/swr';
import { Filter } from '@/components/Products/Filter';
import { Pagination } from '@/components/Base/Pagination';
import clsx from 'clsx';
import { useIsMounted } from '@/hooks/useIsMounted';
import { ProductsRenderer } from '@/components/Products/ProductsRenderer';
import { DropDown } from '@/components/Base/DropDown';
import { useTranslations } from '@/next-intl/useTranslations';
import { sortByOptions } from '@/utils/constants/sortByOptions';
import stripHTMLTagsFromString from '@/utils/stripHTMLTagsFromString';
import { HeaderTagsRenderer } from '@/components/Base/HeaderTagsRenderer';
import { useDispatch } from 'react-redux';
import { setBreadcrumb } from '@/store/actions/base.action';

const hidden = 'pointer-events-none opacity-0 absolute w-0 h-0 overflow-hidden';

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

const PER_PAGE = 9;

const FarmerById = ({ farmerInfo }) => {
  const t = useTranslations();
  const fullName = farmerInfo.commercialName || `${farmerInfo.firstName} ${farmerInfo.lastName}`;
  const breadcrumb = [
    { href: '/farmers', title: t('farmers') },
    { href: `/farmers/${farmerInfo.id}`, title: fullName }
  ];

  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
  }, [router.query.id]);

  const view = +router.query.view || farmerProfileView.PRODUCTS;
  const { data: categories } = useCategoriesTree({ farmerId: farmerInfo.id });
  const scrollToRef = React.useRef(null);
  const isMounted = useIsMounted();

  const routerPush = (query) => {
    router.push({ pathname: '/farmers/[id]', query: { ...query, id: farmerInfo.id, view } }, undefined, {
      scroll: false,
      shallow: true
    });
  };

  const page = +router.query.page || 1;

  const { items, total, isValidating } = useProducts({
    farmer_id: farmerInfo.id,
    take: PER_PAGE,
    skip: (page - 1) * PER_PAGE,
    ...router.query,
    full: false
  });

  React.useEffect(() => {
    if (isMounted) {
      scrollToRef.current.scrollIntoView();
    }
  }, [page]);

  const filterOptions = router.query;
  const addFilter = (options) => routerPush({ ...filterOptions, ...options, page: 1 });

  const selectedSubCategoryId = +router.query.subCategoryId;
  const selectedCategoryId = +router.query.categoryId;

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
        title={fullName}
        metaTitle={fullName}
        description={stripHTMLTagsFromString(farmerInfo.text || '')}
        image={farmerInfo.profileImage && process.env.STATIC_RESOURCES_URL.concat(farmerInfo.profileImage)}
      />
      <Cover info={farmerInfo} />
      <div className="flex md:mt-1-5 mt-5-0">
        <div className="w-23-5-percent mr-3-0 md:block hidden" />
        <div
          className="md:h-11-2 h-14-0 flex-1 flex items-center justify-between bg-white md:mx-0 -mx-5-0"
          ref={scrollToRef}
        >
          <FarmerNavigation
            view={view}
            onViewChange={(view) =>
              router.push({ query: { ...router.query, view } }, undefined, { scroll: false, shallow: true })
            }
            className="md:border-r border-grey-200 md:px-3-0 md:w-auto w-full"
          />
          <div
            className={clsx(
              { 'pointer-events-none opacity-60': view === farmerProfileView.PROFILE },
              'md:block hidden px-3-6'
            )}
          >
            <DropDown
              className="md:w-27-8 w-36-3 md:order-2 order-1"
              items={mappedSortByOptions}
              displayKey="title"
              placeholder={t('sortBy')}
              onSelect={(x) => addFilter({ sortBy: x ? x.value : '' })}
              value={
                (filterOptions.sortBy && mappedSortByOptions.find((x) => x.value === filterOptions.sortBy)?.title) || ''
              }
              withClearIcon
            />
          </div>
        </div>
      </div>
      <div className="md:flex md:mt-5-7 mt-8-0">
        <div
          className={clsx(
            { 'pointer-events-none md:block hidden': view === farmerProfileView.PROFILE },
            'md:mr-3-0 md:w-23-5-percent relative'
          )}
        >
          <Filter
            selectedSubCategoryId={selectedSubCategoryId}
            selectedCategoryId={selectedCategoryId}
            categories={categories}
            path={path}
            categoryClickHandler={categoryClickHandler}
            allCategoryClickHandler={allCategoryClickHandler}
            addFilter={addFilter}
            filterOptions={filterOptions}
            isFarmerPage
          />
          {view === farmerProfileView.PROFILE && (
            <div className="absolute inset-0 bg-white opacity-50 md:block hidden" />
          )}
          <DropDown
            className="md:hidden w-full mt-2-1"
            items={mappedSortByOptions}
            displayKey="title"
            placeholder={t('sortBy')}
            onSelect={(x) => addFilter({ sortBy: x ? x.value : '' })}
            value={
              (filterOptions.sortBy && mappedSortByOptions.find((x) => x.value === filterOptions.sortBy)?.title) || ''
            }
            withClearIcon
          />
        </div>

        <div className="flex-1 md:mt-0 mt-7-2">
          <div className={clsx({ [hidden]: view !== farmerProfileView.PROFILE })}>
            <FarmerProfile info={farmerInfo} />
          </div>
          <div className={clsx({ [hidden]: view !== farmerProfileView.PRODUCTS })}>
            <ProductsRenderer
              className="mt-3-8 grid md:grid-cols-3 grid-cols-2 gap-x-3-0 gap-y-4-5"
              items={items}
              total={total}
              loading={isValidating}
            />
            {total > PER_PAGE && (
              <div className="mt-6-8 flex justify-end">
                <Pagination
                  page={+router.query.page || 1}
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
      </div>
    </>
  );
};

FarmerById.propTypes = {
  farmerInfo: PropTypes.object
};

FarmerById.defaultProps = {
  farmerInfo: {}
};

FarmerById.getInitialProps = async ({ query }) => {
  const { id } = query;

  const farmerInfo = await getSingleFarmer(id);

  return {
    farmerInfo
  };
};

FarmerById.getLayout = PageLayout.getLayout();

export default FarmerById;
