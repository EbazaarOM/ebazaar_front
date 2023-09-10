import PropType from 'prop-types';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/Base/Button';
import { IconButton } from '@/components/Base/IconButton';
import { RouterLink } from '@/components/Base/RouterLink';
import { SingleUsertoolProduct } from '@/components/Base/SingleUsertoolProduct';
import { SVG } from '@/components/Base/SVG';
import { ShoppingCartIcon } from '@/components/Vectors/ShoppingCartIcon';
import { EmptyCartIcon } from '@/components/Vectors/EmptyCartIcon';
import { signInStatus } from '@/utils/constants/signInStatus';
import { useTranslations } from '@/next-intl/useTranslations';
import { deleteCartItemAction, loadCartPreview } from '@/store/actions/products.action';

const Cart = ({ userSignInStatus, className, opened, toggle }) => {
  const t = useTranslations();
  const router = useRouter();

  const dispatch = useDispatch();
  const {
    productPreview,
    cartPreview: { items = [], meta = {} }
  } = useSelector((state) => state.products);

  const isSignedIn = userSignInStatus === signInStatus.SIGNED_IN;

  const loadCart = () => dispatch(loadCartPreview(isSignedIn));

  React.useEffect(() => {
    if (userSignInStatus !== signInStatus.LOADING) {
      loadCart();
    }
  }, [userSignInStatus]);

  React.useEffect(() => {
    if (productPreview !== null && productPreview.isCart) {
      loadCart();
    }
  }, [productPreview]);

  const deleteHandler = async (code) => {
    dispatch(deleteCartItemAction(isSignedIn, code));
  };

  const elem =
    items && items.length > 0 ? (
      <div className="flex flex-col h-full">
        <div className="custom-scrollbar overflow-auto border-b border-grey-200 flex-1">
          {items.map((x) => (
            <SingleUsertoolProduct
              key={x.code}
              item={x}
              className="border-b border-grey-200 last:border-b-0"
              onDeleteClick={() => deleteHandler(x.code)}
            />
          ))}
        </div>
        <div className="px-4-0 py-2-5 flex items-center">
          {!!meta.totalCost && (
            <div className="mr-5-0 text-1-8 font-md">
              <span className="pr-1-0">{t('sum')}: </span>
              <span className="text-2-0">{meta.totalCost?.toFixed(2)}</span>
            </div>
          )}
          <RouterLink href="/cart" className="flex-1">
            <Button className="bg-blue text-white mr-3-0 border border-blue hover:bg-white hover:text-blue duration-150 w-full">
              {t('seeCart')}
            </Button>
          </RouterLink>
        </div>
      </div>
    ) : (
      <div className="p-6-5 flex flex-col items-center">
        <SVG src={EmptyCartIcon} className="w-6-0 text-grey-300" />
        <div className="mt-2-5 font-md text-2-0">{t('emptyCart')}</div>
      </div>
    );

  return (
    <div className={clsx(className)}>
      <div className="relative">
        <Button className="bg-yellow text-white hover:opacity-80 duration-150 md:flex hidden" onClick={toggle}>
          <SVG src={ShoppingCartIcon} className="w-2-1 mr-1-2" />
          <span>{t('cart')}</span>
        </Button>
        <IconButton className="w-9-0 h-9-0 md:hidden bg-yellow" onClick={() => router.push('/cart')}>
          <SVG src={ShoppingCartIcon} className="w-3-2 text-body-bg" />
        </IconButton>
        {!!meta.total && (
          <div className="absolute -mt-0-5 top-0 right-0-5 rounded-60-0 bg-red flex items-center justify-center text-white md:text-1-4 text-2-4 md:min-w-2-1 min-w-3-5 md:h-2-1 h-3-5 px-0-5">
            {meta.total}
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

Cart.propTypes = {
  className: PropType.string,
  opened: PropType.bool,
  toggle: PropType.func,
  userSignInStatus: PropType.oneOf(Object.values(signInStatus))
};
Cart.defaultProps = {
  className: '',
  opened: false,
  toggle: () => {},
  userSignInStatus: signInStatus.LOADING
};

export default Cart;
