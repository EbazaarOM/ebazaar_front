import clsx from 'clsx';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FarmerIcon } from '@/components/Vectors/FarmerIcon';
import { SVG } from '@/components/Base/SVG';
import { Pagination } from '@/components/Base/Pagination';
import { useTranslations } from '@/next-intl/useTranslations';

const CheckoutProductsTable = ({ data, className, page, onPageChange, perView }) => {
  const products = data.items;
  const total = data.meta?.total;

  const t = useTranslations(['common', 'order']);

  const getStockInfo = (totalCount, stockCount) => {
    return (
      <div className="text-red md:text-1-6 text-2-4 mt-1-0">
        {totalCount > stockCount && stockCount !== 0 && <span className="">{t('order.notEnoughInStock')}</span>}
        {stockCount === 0 && <span>{t('order.outOfStock')}</span>}
      </div>
    );
  };

  return (
    <div className={clsx(className, 'bg-white font-md md:text-1-6 text-2-6')}>
      <div className="h-10-0 grid row-title px-4-0 border-b border-grey-200">
        <div className="md:text-2-0 text-2-6 upper">{t('products')}</div>
        <div className="md:block hidden">{t('count')}</div>
        <div className="md:block hidden">{t('price')}</div>
      </div>
      <div className="md:px-4-0 px-5-0 pb-4-0 pt-1-0">
        {products &&
          products.map((product, index) => {
            const image = product.images instanceof Array ? product.images[0]?.name : product.image;
            const totalCount = product.quantity * product.pieces;
            const saleApplied = product.saleActive || product.promoUsed;

            return (
              <div key={product.code}>
                {index !== 0 && (
                  <div className="md:grid hidden row">
                    <div />
                    <div>{t('count')}</div>
                    <div>{t('price')}</div>
                  </div>
                )}
                <div className="py-2-0 row grid">
                  <div className="flex product">
                    <div className="w-1/3">
                      <Image
                        src={process.env.STATIC_RESOURCES_URL.concat(image)}
                        alt={product.title}
                        width={124}
                        height={76}
                        loading="eager"
                        objectFit="cover"
                        layout="responsive"
                      />
                    </div>
                    <div className="md:ml-1-8 ml-3-0">
                      <div>{product.title}</div>
                      <div className="font-lt mt-1-6">
                        <SVG src={FarmerIcon} className="md:w-1-7 w-2-3 inline mr-1-4" />
                        {product.farmer}
                      </div>
                    </div>
                  </div>
                  <div className="count md:mt-0 mt-4-0">
                    <div className="md:hidden">{t('count')}</div>
                    <div className="p-1-2 bg-body-bg w-mc rounded-4-0 md:text-1-8 text-2-6 md:mt-0 mt-1-0">{`${totalCount} ${
                      typeof product.unit === 'string' ? product.unit : product.unit?.title
                    }`}</div>
                    <div className="md:block hidden">{getStockInfo(totalCount, product.stockCount)}</div>
                  </div>
                  <div className="price md:mt-0 mt-4-0">
                    <div className="md:hidden">{t('price')}</div>
                    <div className="md:text-2-0 text-2-6 md:mt-0 mt-1-5 flex items-center">
                      <p className={clsx({ 'line-through md:text-1-8 text-2-4 text-grey': saleApplied })}>
                        {(product.quantity * product.unitCost)?.toFixed(2)} ₾
                      </p>
                      {saleApplied && (
                        <p className="text-red ml-2-0">{(product.quantity * product.saleCost)?.toFixed(2)} ₾</p>
                      )}
                    </div>
                  </div>
                  <div className="md:hidden col-span-2">{getStockInfo(totalCount, product.stockCount)}</div>
                </div>
              </div>
            );
          })}
      </div>
      {total > perView && (
        <div className="flex justify-end md:py-2-0 py-5-0 md:px-4-0 px-5-0 border-t border-grey-200">
          <Pagination page={page} onPageChange={onPageChange} pageCount={total / perView} color="primary" isSmall />
        </div>
      )}
      <style jsx>{`
        .row-title {
          grid-template-columns: 56% 28% 16%;
          align-items: center;
        }
        @media only screen and (max-width: 768px) {
          .row-title {
            grid-template-columns: 100%;
          }
        }
        .row {
          grid-template-columns: 56% 28% 16%;
          grid-template-areas: 'a b c';
          align-items: center;
        }
        @media only screen and (max-width: 768px) {
          .row {
            grid-template-columns: 50% 50%;
            grid-template-rows: max-content max-content;
            grid-template-areas:
              'a a'
              'b c';
            align-items: start;
          }
        }
        .product {
          grid-area: a;
        }
        .count {
          grid-area: b;
        }
        .price {
          grid-area: c;
        }
      `}</style>
    </div>
  );
};

CheckoutProductsTable.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  perView: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

CheckoutProductsTable.defaultProps = {
  className: ''
};

export default CheckoutProductsTable;
