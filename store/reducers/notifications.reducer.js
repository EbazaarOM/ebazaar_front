import { SET_NOTIFICATIONS_PREVIEW } from '@/store/actions/notifications.action';

export const defaultState = {
  notificationsPreview: {}
};

const MainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS_PREVIEW:
      return { ...state, notificationsPreview: action.value };

    default:
      return state;
  }
};

export default MainReducer;
