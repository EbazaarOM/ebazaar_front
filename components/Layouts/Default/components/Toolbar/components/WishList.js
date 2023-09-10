import PropType from 'prop-types';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/Base/Button';
import { IconButton } from '@/components/Base/IconButton';
import { RouterLink } from '@/components/Base/RouterLink';
import { SingleUsertoolProduct } from '@/components/Base/SingleUsertoolProduct';
import { SVG } from '@/components/Base/SVG';
import { EmptyCartIcon } from '@/components/Vectors/EmptyCartIcon';
import { HeartIcon } from '@/components/Vectors/HeartIcon';
import { ProductPreview } from '@/models/ProductPreview';
import { addCartItem } from '@/utils/product/cart';
import { signInStatus } from '@/utils/constants/signInStatus';
import { useTranslations } from '@/next-intl/useTranslations';
import { deleteWishlistItemAction, loadWishlistPreview, setProductPreview } from '@/store/actions/products.action';

const options = { take: 10 };

const WishList = ({ userSignInStatus, className, opened, toggle }) => {
  const {
    productPreview,
    wishlistPreview: { items: wishlist, total }
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const router = useRouter();
  const isSignedIn = userSignInStatus === signInStatus.SIGNED_IN;
  const t = useTranslations();

  const loadWishlist = () => dispatch(loadWishlistPreview(isSignedIn, options));

  React.useEffect(() => {
    if (userSignInStatus !== signInStatus.LOADING) {
      loadWishlist();
    }
  }, [userSignInStatus]);

  React.useEffect(() => {
    if (productPreview !== null && !productPreview.isCart) {
      loadWishlist();
    }
  }, [productPreview]);

  const addToCartHandler = async (product) => {
    await addCartItem(isSignedIn, product.code);
    dispatch(setProductPreview(new ProductPreview(product)));

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

  const deleteHandler = async (code) => {
    dispatch(deleteWishlistItemAction(isSignedIn, code));
  };

  const clickHandler = () => {
    if (window.innerWidth > 768) {
      toggle();
    } else {
      router.push('/wishlist');
    }
  };

  const elem =
    wishlist && wishlist.length > 0 ? (
      <div className="flex flex-col h-full">
        <div className="custom-scrollbar overflow-auto border-b border-grey-200 flex-1">
          {wishlist.map((x) => (
            <SingleUsertoolProduct
              key={x.code}
              item={x}
              className="border-b border-grey-200 last:border-b-0"
              isWishlist
              onDeleteClick={() => deleteHandler(x.code)}
              onCartClick={() => addToCartHandler(x)}
            />
          ))}
        </div>
        <div className="px-4-0 py-2-5">
          <RouterLink href="/wishlist">
            <Button className="bg-blue text-white mr-3-0 border border-blue hover:bg-white hover:text-blue duration-150 w-full">
              {t('seeWishlist')}
            </Button>
          </RouterLink>
        </div>
      </div>
    ) : (
      <div className="p-6-5 flex flex-col items-center">
        <SVG src={EmptyCartIcon} className="w-6-0 text-grey-300" />
        <div className="mt-2-5 font-md text-2-0">{t('emptyWishlist')}</div>
      </div>
    );
  return (
    <div className={className}>
      <div className="relative">
        <IconButton
          aria-label="Wishlist"
          className="md:bg-red-secondary bg-red md:w-6-0 md:h-6-0 w-9-0 h-9-0 md:hover:opacity-80 duration-150"
          onClick={clickHandler}
        >
          <SVG src={HeartIcon} className="md:w-2-4 w-3-6 md:text-red text-red-secondary transform translate-y-0-2" />
        </IconButton>
        {!!total && (
          <div className="absolute -mt-0-5 -mr-0-5 top-0 right-0 rounded-60-0 bg-red flex items-center justify-center text-white md:text-1-4 text-2-4 md:min-w-2-1 min-w-3-5 md:h-2-1 h-3-5 px-0-5">
            {total}
          </div>
        )}
        {opened && <div className="triangle" />}
      </div>
      {process.browser &&
        opened &&
        ((container) => (container ? ReactDOM.createPortal(elem, container) : null))(
          document.getElementById('user-toolbar-portal')
        )}
    </div>
  );
};

WishList.propTypes = {
  className: PropType.string,
  opened: PropType.bool,
  toggle: PropType.func,
  userSignInStatus: PropType.oneOf(Object.values(signInStatus))
};
WishList.defaultProps = {
  className: '',
  opened: false,
  toggle: () => {},
  userSignInStatus: signInStatus.LOADING
};

export default WishList;
