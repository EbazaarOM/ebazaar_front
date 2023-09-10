import PropTypes from 'prop-types';

import Image from 'next/image';
import { TagIcon } from '@/components/Vectors/TagIcon';
import { SVG } from '@/components/Base/SVG';
import clsx from 'clsx';
import { RouterLink } from '@/components/Base/RouterLink';

const variantsSet = {
  page: {
    container: 'md:block flex',
    imageWrapper: 'md:w-full w-30-percent',
    title: 'font-rm md:text-2-4 text-2-6 md:mt-2-0 upper',
    priceIcon: 'md:w-1-4 w-2-4',
    price: 'font-rm md:text-1-8 text-2-6 md:mt-2-0'
  },
  component: {
    container: 'flex',
    imageWrapper: 'w-30-percent',
    title: 'font-rm md:text-1-8 text-2-6 upper',
    priceIcon: 'md:w-1-7 w-2-4',
    price: 'font-bd md:text-2-0 text-2-6'
  }
};

const Product = ({ product, isPage }) => {
  const dimensions = isPage ? { width: 367, height: 227 } : { width: 126, height: 78 };

  const classes = isPage ? variantsSet.page : variantsSet.component;

  return (
    <RouterLink href={`/products/detailed/${product.code}`} className={classes.container}>
      <div className={clsx(classes.imageWrapper, 'relative')}>
        <Image
          src={process.env.STATIC_RESOURCES_URL.concat(product.image)}
          alt={product.title}
          {...dimensions}
          loading="eager"
          objectFit="cover"
          layout="responsive"
        />
      </div>
      <div className={clsx('flex flex-col', [isPage ? 'md:ml-0 ml-2-0' : 'ml-2-0 md:justify-between'])}>
        <div className={classes.title}>{product.title}</div>
        <div className="">
          <div className={clsx(classes.price)}>
            <SVG src={TagIcon} className={clsx(classes.priceIcon, 'inline mr-1-0')} />
            <span className={clsx({ 'line-through text-grey md:text-1-8 text-2-4': product.saleActive })}>
              {product.unitCost?.toFixed(2)} ₾
            </span>
          </div>
          {product.saleActive && (
            <div className={clsx(classes.price, 'text-red')}>
              <SVG src={TagIcon} className={clsx(classes.priceIcon, 'inline mr-1-0')} />
              <span className="">{product.saleCost?.toFixed(2)} ₾</span>
            </div>
          )}
        </div>
      </div>
    </RouterLink>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  isPage: PropTypes.bool
};

Product.defaultProps = {
  product: {},
  isPage: false
};

export default Product;
