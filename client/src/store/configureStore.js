import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from "../reducers/auth";
import thunk from 'redux-thunk';

export default () => {
  const store = createStore(combineReducers({auth: authReducer}), {}, applyMiddleware(thunk));
  return store;
};