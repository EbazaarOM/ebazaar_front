export const SET_BREADCRUMB = 'SET_BREADCRUMB';
export const SET_AUTH_POPUP_STATUS = 'SET_AUTH_POPUP_STATUS';
export const SET_NEXT_LANGUAGE_ROUTE = 'SET_NEXT_LANGUAGE_ROUTE';

export const setBreadcrumb = (payload) => {
  return {
    type: SET_BREADCRUMB,
    value: payload
  };
};

export const setAuthPopupStatus = (payload) => {
  return {
    type: SET_AUTH_POPUP_STATUS,
    value: payload
  };
};

export const setNextLanguageRoute = (payload) => {
  return {
    type: SET_NEXT_LANGUAGE_ROUTE,
    value: payload
  };
};
