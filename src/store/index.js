import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/reducers';
import rootSaga from './sagas/saga';

// ==============================|| REDUX - MAIN STORE ||============================== //
const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
const persister = 'Free';

sagaMiddleware.run(rootSaga);
export { store, persister };
