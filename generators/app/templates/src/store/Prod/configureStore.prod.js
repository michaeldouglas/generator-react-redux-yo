import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from './../../middleware/api';
import rootReducer from './../../reducers';

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api)
  );

  return store;
};

export default configureStore;
