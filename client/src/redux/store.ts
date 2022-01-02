import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import persistStore from 'redux-persist/es/persistStore';

import rootReducer from './root-reducers';

const middleWares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middleWares));
const persistor = persistStore(store);

export { store, persistor };
