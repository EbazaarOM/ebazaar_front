import { SET_PRODUCT_PREVIEW, SET_CART_PREVIEW, SET_WISHLIST_PREVIEW } from '@/store/actions/products.action';

export const defaultState = {
  productPreview: null,
  cartPreview: {},
  wishlistPreview: {}
};

const MainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PRODUCT_PREVIEW:
      return { ...state, productPreview: action.value };
    case SET_CART_PREVIEW:
      return { ...state, cartPreview: action.value };
    case SET_WISHLIST_PREVIEW:
      return { ...state, wishlistPreview: action.value };

    default:
      return state;
  }
};

export default MainReducer;
