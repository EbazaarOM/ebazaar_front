import PropTypes from 'prop-types';
import { Farmer, Product } from './components';

const SearchResults = ({ products, farmers, t }) => {
  return (
    <>
      {products && products.length > 0 && (
        <div className="border-t border-grey-200">
          {products && (
            <div className="px-7-0 pt-3-5 pb-5-0">
              <div className="font-md md:text-2-0 text-2-6">{t('products')}</div>
              <div className="grid md:grid-cols-3 gap-3-8 md:mt-3-0 mt-4-0">
                {products.map((x) => (
                  <Product product={x} key={x.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {farmers && farmers.length > 0 && (
        <div className="border-t border-grey-200">
          {farmers && (
            <div className="px-7-0 pt-3-5">
              <div className="font-md md:text-2-0 text-2-6">{t('farmers')}</div>
              <div className="grid md:grid-cols-3 gap-3-8 md:mt-3-0 mt-4-0">
                {farmers.map((x) => (
                  <Farmer farmer={x} key={x.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

SearchResults.propTypes = {
  products: PropTypes.array,
  farmers: PropTypes.array,
  t: PropTypes.func
};

SearchResults.defaultProps = {
  products: [],
  farmers: [],
  t: (key) => key
};

export default SearchResults;
