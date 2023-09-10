import { getNotificationsByUser } from '@/api/notifications';

export const SET_NOTIFICATIONS_PREVIEW = 'SET_NOTIFICATIONS_PREVIEW';

export const setNotificationsPreview = (payload) => {
  return {
    type: SET_NOTIFICATIONS_PREVIEW,
    value: payload
  };
};

export const loadNotificationsPreview = () => async (dispatch) => {
  const data = await getNotificationsByUser({ take: 10 });
  dispatch(setNotificationsPreview(data));
};
