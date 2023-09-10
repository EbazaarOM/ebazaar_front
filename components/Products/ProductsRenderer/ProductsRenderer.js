/* eslint-disable no-nested-ternary */
import { SingleProduct } from '@/components/Base/SingleProduct';
import { useTranslations } from '@/next-intl/useTranslations';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ProductSkeleton } from '../ProductSkeleton';

const ProductsRenderer = ({ items, total, loading, className, perRow, isWishlistPage, removeFromWishlistPage }) => {
  const t = useTranslations();
  return (
    <div className={clsx(className, '')}>
      {loading ? (
        <>
          {Array(perRow)
            .fill(undefined)
            .map((_x, index) => (
              <ProductSkeleton key={JSON.stringify(index)} />
            ))}
        </>
      ) : total === 0 ? (
        <div className="font-rm md:text-2-0 text-3-0 col-span-2">{t('productNotFound')}</div>
      ) : (
        items &&
        items.map((x) => (
          <SingleProduct
            product={x}
            key={x.id || x.code}
            isWishlistPage={isWishlistPage}
            removeFromWishlistPage={() => removeFromWishlistPage(x.code)}
          />
        ))
      )}
    </div>
  );
};

ProductsRenderer.propTypes = {
  className: PropTypes.string,
  total: PropTypes.number,
  items: PropTypes.array,
  loading: PropTypes.bool,
  isWishlistPage: PropTypes.bool,
  perRow: PropTypes.number,
  removeFromWishlistPage: PropTypes.func
};

ProductsRenderer.defaultProps = {
  className: '',
  total: 0,
  items: [],
  loading: false,
  perRow: 3,
  isWishlistPage: false,
  removeFromWishlistPage: () => {}
};

export default ProductsRenderer;
