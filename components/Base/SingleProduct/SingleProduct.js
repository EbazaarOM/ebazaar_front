import PropTypes from 'prop-types';
import Image from 'next/image';
import { SVG } from '@/components/Base/SVG';
import { HeartIcon } from '@/components/Vectors/HeartIcon';
import { ShoppingCartIcon } from '@/components/Vectors/ShoppingCartIcon';
import { ShoppingBagIcon } from '@/components/Vectors/ShoppingBagIcon';
import { Button } from '@/components/Base/Button';
import { IconButton } from '@/components/Base/IconButton';
import clsx from 'clsx';
import { SaleBadge } from '@/components/Base/SaleBadge';
import { Location } from '@/components/Base/Location';
import { Rating } from '@/components/Base/Rating';
import { RouterLink } from '@/components/Base/RouterLink';
import { PriceTag } from '@/components/Base/PriceTag';
import { useRouter } from 'next/router';
import { signInStatus } from '@/utils/constants/signInStatus';
import { DeleteIcon } from '@/components/Vectors/DeleteIcon';
import { ProductPreview } from '@/models/ProductPreview';
import { addWishlistItem } from '@/utils/product/wishlist';
import { addCartItem } from '@/utils/product/cart';
import { useTranslations } from '@/next-intl/useTranslations';
import { useSelector, useDispatch } from 'react-redux';
import { setProductPreview } from '@/store/actions/products.action';
import { Sticker } from '../Sticker';

const variantsSet = ['primary', 'big'];

const SingleProduct = ({ className, product, variant, isWishlistPage, removeFromWishlistPage, onAddCartClick }) => {
  const router = useRouter();
  const { userSignInStatus } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const isUserSignedIn = userSignInStatus === signInStatus.SIGNED_IN;

  const buyClickHandler = () => {
    router.push({ pathname: '/cart/checkout', query: { code: product.code, quantity: 1 } });
  };

  const t = useTranslations();

  const wishlistIconClickHandler = async () => {
    await addWishlistItem(isUserSignedIn, product.code);
    dispatch(setProductPreview(new ProductPreview(product, false)));

    dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.

    dataLayer.push({
      event: 'add_to_wishlist',
      user_id: userInfo ? userInfo.nameid : '',
      ecommerce: {
        currency: 'GEL',
        value: product.unitCost,
        items: [
          {
            item_id: product.code,
            item_name: product.title,
            currency: 'GEL',
            discount: product.saleActive ? product.unitCost - product.saleCost : 0,
            item_category: product.categoryTitle,
            price: product.unitCost,
            quantity: 1
          }
        ]
      }
    });
  };

  const cartClickHandler = async () => {
    await addCartItem(isUserSignedIn, product.code);
    dispatch(setProductPreview(new ProductPreview(product, true)));
    onAddCartClick();

    dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    dataLayer.push({
      event: 'add_to_cart',
      user_id: userInfo ? userInfo.nameid : '',
      ecommerce: {
        items: [
          {
            item_id: product.code,
            item_name: product.title,
            currency: 'GEL',
            discount: product.saleActive ? product.unitCost - product.saleCost : 0,
            item_category: product.categoryTitle,
            price: product.unitCost,
            quantity: 1
          }
        ]
      }
    });
  };

  const wishListIcon = isWishlistPage ? (
    <IconButton
      aria-label="Delete from wishlist"
      className={clsx('h-6-0 w-6-0 border border-white hover:bg-black hover:border-black duration-150')}
      onClick={removeFromWishlistPage}
    >
      <SVG src={DeleteIcon} className="text-white w-1-9" />
    </IconButton>
  ) : (
    <IconButton
      aria-label="Add to wishlist"
      className="h-6-0 w-6-0 border border-red-secondary hover:bg-red-secondary duration-150"
      onClick={wishlistIconClickHandler}
    >
      <SVG src={HeartIcon} className="text-red w-2-4" />
    </IconButton>
  );

  const addCartIcon = (
    <>
      <Button
        px={variant === 'primary' ? 'px-2-0' : ''}
        className="bg-white hover:bg-yellow hover:text-white duration-150 md:flex hidden"
        onClick={cartClickHandler}
      >
        <SVG src={ShoppingCartIcon} className="w-2-0 mr-1-0" />
        <span className={clsx({ 'text-1-6': variant === 'primary' }, 'font-lt')}>{t('addToCart')}</span>
      </Button>
      <IconButton className="md:hidden h-9-0 w-9-0 bg-white" onClick={cartClickHandler} aria-label="Add to cart">
        <SVG src={ShoppingCartIcon} className="text-black w-3-5" />
      </IconButton>
    </>
  );

  const addressObj = isWishlistPage ? product.location || {} : product;

  const address =
    (addressObj.region ? `${addressObj.region}` : '') +
    (addressObj.municipality ? `, ${addressObj.municipality}` : '') +
    (addressObj.village ? `, ${addressObj.village}` : '');

  return (
    <div className={clsx(className, 'h-full flex flex-col justify-between')}>
      <div>
        <div className="relative">
          <RouterLink
            href={`/products/detailed/${product.code}`}
            className="block shine-effect relative"
            title={product.title}
            style={{ paddingBottom: '60%' }}
          >
            {product.image && (
              <Image
                src={process.env.STATIC_RESOURCES_URL.concat(product.image)}
                layout="fill"
                objectFit="cover"
                alt={product.title}
              />
            )}
          </RouterLink>

          <div className="absolute left-3-0 right-3-0 md:top-3-0 top-2-0 flex justify-between pointer-events-none">
            <div className="flex justify-between w-full">
              <div className="flex flex-wrap flex-1">
                {product.stickers &&
                  product.stickers.map((x) => (
                    <Sticker key={x.id} sticker={x} className="md:w-5-0 w-4-0 md:mr-2-0 md:mb-2-0 mr-1-2 mb-1-2" />
                  ))}
              </div>
              {product.saleActive && (
                <SaleBadge
                  className="md:-mt-4-7 -mt-3-5 pointer-events-auto ml-auto"
                  percent={product.salePercentage}
                />
              )}
            </div>
          </div>
          <div
            className={clsx('absolute md:bottom-3-0 md:right-3-0 bottom-2-0 right-2-0', {
              'md:hidden': variant !== 'primary'
            })}
          >
            {wishListIcon}
          </div>
        </div>
        <div className="md:flex items-start justify-between mt-2-0">
          <RouterLink href={`/products/detailed/${product.code}`}>
            <div className="font-rm upper md:text-2-4 text-2-6 line-clamp-2">{product.title}</div>
          </RouterLink>
          {!!product.rating && <Rating value={product.rating?.toFixed(1)} className="md:mt-0 mt-1-0" />}
        </div>
        <div className="flex flex-col">
          <Location className="mt-2-0 md:order-1 order-2" address={address} />
          <PriceTag
            value={product.unitCost}
            saleCost={product.saleActive ? product.saleCost : null}
            className="md:mt-1-0 mt-2-0 md:order-2 order-1"
          />
        </div>
      </div>
      <div className="flex justify-between md:mt-2-5 mt-3-0">
        <div>{addCartIcon}</div>
        <Button
          px={variant === 'primary' ? 'md:px-2-0 px-3-0' : 'md:px-2-5 px-3-5'}
          className="bg-white hover:bg-green hover:text-white group duration-150"
          onClick={buyClickHandler}
          disabled={process.env.BUY_BTN_DISABLED}
        >
          <SVG src={ShoppingBagIcon} className="md:w-2-0 w-3-0 md:mr-1-0 mr-2-0 text-green group-hover:text-white" />
          <span className="font-lt">{t('buy')}</span>
        </Button>
        <div className={clsx('hidden', { 'md:block': variant === 'big' })}>{wishListIcon}</div>
      </div>
    </div>
  );
};

SingleProduct.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object,
  variant: PropTypes.oneOf(variantsSet),
  isWishlistPage: PropTypes.bool,
  removeFromWishlistPage: PropTypes.func,
  onAddCartClick: PropTypes.func
};

SingleProduct.defaultProps = {
  className: '',
  product: {},
  variant: 'primary',
  isWishlistPage: false,
  removeFromWishlistPage: () => {},
  onAddCartClick: () => {}
};

export default SingleProduct;
