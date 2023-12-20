import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/reducers';
import rootSaga from './sagas/saga';

// ==============================|| REDUX - MAIN STORE ||============================== //
// apply saga middleware https://redux-saga.js.org/docs/introduction/BeginnerTutorial/
const sagaMiddleware = createSagaMiddleware();
// tạo store dựa trên rootReducer
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;
