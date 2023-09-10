import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import baseReducer from './base.reducer';
import productsReducer from './products.reducer';
import notificationsReducer from './notifications.reducer';

const reducers = {
  user: userReducer,
  base: baseReducer,
  products: productsReducer,
  notifications: notificationsReducer
};

export default combineReducers(reducers);
