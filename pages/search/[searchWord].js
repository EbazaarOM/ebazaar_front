import { getFarmers } from '@/api/farmer';
import { getProducts } from '@/api/products/products';
import { Pagination } from '@/components/Base/Pagination';
import { Farmer } from '@/components/Base/SearchBar/components/SearchResults/components';
import { SingleFarmer } from '@/components/Base/SingleFarmer';
import { SingleProduct } from '@/components/Base/SingleProduct';
import { useTranslations } from '@/next-intl/useTranslations';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const PRODUCTS_PER_PAGE = 12;
const FARMERS_PER_PAGE = 8;

const SearchPage = ({ products, farmers, totalProduct, totalFarmer }) => {
  const router = useRouter();
  const page = +router.query.page || 1;

  const pageCount = totalProduct > totalFarmer ? totalProduct / PRODUCTS_PER_PAGE : totalFarmer / FARMERS_PER_PAGE;
  const t = useTranslations();

  return (
    <div className="container">
      <div className="md:mt-6-0 mt-4-0 md:font-md font-rm md:text-2-0 text-2-6 upper">{t('searchResults')}</div>
      {products && products.length > 0 && (
        <div className="mt-4-0 border-t border-grey-200">
          <div className="font-md md:text-2-0 text-2-6 mt-4-0">{t('products')}</div>
          <div className="mt-5-0 grid md:grid-cols-4 gap-y-6-0 gap-x-3-0">
            {products.map((x) => (
              <SingleProduct product={x} key={x.id || x.code} />
            ))}
          </div>
        </div>
      )}
      {farmers && farmers.length > 0 && (
        <div className="mt-4-0 border-t border-grey-200">
          <div className="font-md md:text-2-0 text-2-6 mt-4-0">{t('farmers')}</div>
          <div className="mt-5-0 grid md:grid-cols-4 gap-y-5-0 gap-x-3-0">
            {farmers.map((x) => (
              <div key={x.id}>
                <SingleFarmer className="md:block hidden" item={x} />
                <Farmer className="md:hidden" farmer={x} />
              </div>
            ))}
          </div>
        </div>
      )}
      {(totalProduct > PRODUCTS_PER_PAGE || totalFarmer > FARMERS_PER_PAGE) && (
        <div className="mt-6-8 flex justify-end">
          <Pagination
            page={page}
            onPageChange={(nextPage) =>
              router.push({ pathname: router.pathname, query: { ...router.query, page: nextPage } })
            }
            pageCount={pageCount}
            color="secondary"
          />
        </div>
      )}
    </div>
  );
};

SearchPage.propTypes = {
  products: PropTypes.instanceOf(Array),
  totalProduct: PropTypes.number,
  farmers: PropTypes.instanceOf(Array),
  totalFarmer: PropTypes.number
};

SearchPage.defaultProps = {
  products: [],
  totalProduct: 0,
  farmers: [],
  totalFarmer: 0
};

SearchPage.getInitialProps = async ({ query }) => {
  const { searchWord, page = 1 } = query;

  const fetchData = () =>
    Promise.all([
      getProducts({
        searchWord,
        take: PRODUCTS_PER_PAGE,
        skip: (page - 1) * PRODUCTS_PER_PAGE
      }),
      getFarmers({
        searchWord,
        take: FARMERS_PER_PAGE,
        skip: (page - 1) * FARMERS_PER_PAGE
      })
    ]);

  const [{ items: products, total: totalProduct }, { items: farmers, total: totalFarmer }] = await fetchData();

  return {
    products,
    totalProduct,
    farmers,
    totalFarmer
  };
};

export default SearchPage;
