import { SET_BREADCRUMB, SET_AUTH_POPUP_STATUS, SET_NEXT_LANGUAGE_ROUTE } from '@/store/actions/base.action';

export const defaultState = {
  breadcrumb: [],
  authPopupIsOpened: false,
  nextLanguageRoute: null
};

const MainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_BREADCRUMB:
      return { ...state, breadcrumb: action.value };
    case SET_AUTH_POPUP_STATUS:
      return { ...state, authPopupIsOpened: action.value };
    case SET_NEXT_LANGUAGE_ROUTE:
      return { ...state, nextLanguageRoute: action.value };

    default:
      return state;
  }
};

export default MainReducer;
