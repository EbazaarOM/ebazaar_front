import clsx from 'clsx';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { DeleteIcon } from '@/components/Vectors/DeleteIcon';
import { ShoppingCartIcon } from '@/components/Vectors/ShoppingCartIcon';
import { SVG } from '../SVG';
import { IconButton } from '../IconButton';

const SingleUsertoolProduct = ({ className, item, isWishlist, onDeleteClick, onCartClick }) => {
  return (
    <div className={clsx(className, 'p-3-0')}>
      <div className="flex items-center font-md">
        <div className="w-20-percent mr-3-0">
          <Image
            src={process.env.STATIC_RESOURCES_URL.concat(item.image)}
            alt="Gallery"
            width={86}
            height={53}
            loading="eager"
            objectFit="cover"
            layout="responsive"
          />
        </div>
        <div className="w-35-percent mr-3-0 text-1-6">{item.title}</div>
        <div className="w-20-percent mr-3-0 text-2-0">
          <p className={clsx({ 'line-through text-1-8 text-grey': item.saleActive })}>
            {(item.quantity ? item.quantity * item.unitCost : item.unitCost)?.toFixed(2)} ₾
          </p>
          {item.saleActive && (
            <p className="text-red">{(item.quantity ? item.quantity * item.saleCost : item.saleCost)?.toFixed(2)} ₾</p>
          )}
        </div>
        <div className="flex-1 flex items-center">
          {isWishlist && (
            <IconButton className="bg-body-bg hover:bg-grey-200 duration-150 w-6-0 h-6-0 mr-3-0" onClick={onCartClick}>
              <SVG src={ShoppingCartIcon} className="w-1-7" />
            </IconButton>
          )}
          <SVG
            src={DeleteIcon}
            className="w-1-9 text-grey hover:text-black ml-auto cursor-pointer duration-150"
            onClick={onDeleteClick}
          />
        </div>
      </div>
    </div>
  );
};

SingleUsertoolProduct.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object,
  isWishlist: PropTypes.bool,
  onDeleteClick: PropTypes.func,
  onCartClick: PropTypes.func
};

SingleUsertoolProduct.defaultProps = {
  className: '',
  item: {},
  isWishlist: false,
  onDeleteClick: () => {},
  onCartClick: () => {}
};

export default SingleUsertoolProduct;
