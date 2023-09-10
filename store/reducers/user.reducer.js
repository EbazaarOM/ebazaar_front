import { SET_USER, SET_USER_SIGN_IN_STATUS } from '@/store/actions/user.action';
import { signInStatus } from '@/utils/constants/signInStatus';

export const defaultState = {
  userInfo: null,
  userSignInStatus: signInStatus.LOADING
};

const MainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, userInfo: action.value };
    case SET_USER_SIGN_IN_STATUS:
      return { ...state, userSignInStatus: action.value };

    default:
      return state;
  }
};

export default MainReducer;
